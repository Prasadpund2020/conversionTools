import { AudioTrackItem, AudioJoinerOptions, AudioJoinerResult } from './types';

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

/**
 * Decodes an individual audio file into an AudioTrackItem
 */
export async function decodeAudioTrack(file: File): Promise<AudioTrackItem> {
  const arrayBuffer = await file.arrayBuffer();
  const AudioContextClass =
    window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const audioCtx = new AudioContextClass();

  try {
    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
    return {
      id: `track-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      name: file.name,
      size: file.size,
      duration: audioBuffer.duration,
      sampleRate: audioBuffer.sampleRate,
      numberOfChannels: audioBuffer.numberOfChannels,
      audioBuffer,
    };
  } finally {
    if (audioCtx.state !== 'closed') {
      audioCtx.close().catch(() => {});
    }
  }
}

/**
 * Encodes an AudioBuffer into a 16-bit PCM WAV Blob
 */
export function audioBufferToWav(buffer: AudioBuffer): Blob {
  const numChannels = buffer.numberOfChannels;
  const sampleRate = buffer.sampleRate;
  const format = 1; // PCM
  const bitDepth = 16;
  const bytesPerSample = bitDepth / 8;
  const blockAlign = numChannels * bytesPerSample;

  const dataLength = buffer.length * blockAlign;
  const bufferLength = 44 + dataLength;

  const arrayBuffer = new ArrayBuffer(bufferLength);
  const view = new DataView(arrayBuffer);

  const writeString = (offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  writeString(0, 'RIFF');
  view.setUint32(4, 36 + dataLength, true);
  writeString(8, 'WAVE');

  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, format, true);
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * blockAlign, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitDepth, true);

  writeString(36, 'data');
  view.setUint32(40, dataLength, true);

  let offset = 44;
  const channels = [];
  for (let ch = 0; ch < numChannels; ch++) {
    channels.push(buffer.getChannelData(ch));
  }

  for (let i = 0; i < buffer.length; i++) {
    for (let ch = 0; ch < numChannels; ch++) {
      let sample = channels[ch][i];
      sample = Math.max(-1, Math.min(1, sample));
      const intSample = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
      view.setInt16(offset, intSample, true);
      offset += 2;
    }
  }

  return new Blob([arrayBuffer], { type: 'audio/wav' });
}

/**
 * Joins multiple audio tracks in sequence with optional crossfade
 */
export async function joinAudioTracks(
  tracks: AudioTrackItem[],
  options: AudioJoinerOptions,
  onProgress?: (progress: number, status: string) => void
): Promise<AudioJoinerResult> {
  if (tracks.length === 0) {
    throw new Error('Please select at least one audio track to join.');
  }

  const AudioContextClass =
    window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const ctx = new AudioContextClass();

  // Use common sample rate and channel count
  const targetSampleRate = tracks[0].sampleRate || 44100;
  const targetChannels = 2; // Stereo output

  // Calculate total sample length taking crossfading into account
  let totalSamples = 0;
  for (let i = 0; i < tracks.length; i++) {
    const trackSamples = Math.round(tracks[i].duration * targetSampleRate);
    if (i > 0 && options.crossfadeDuration > 0) {
      const crossfadeSamples = Math.min(
        trackSamples,
        Math.round(options.crossfadeDuration * targetSampleRate)
      );
      totalSamples += trackSamples - crossfadeSamples;
    } else {
      totalSamples += trackSamples;
    }
  }

  totalSamples = Math.max(1, totalSamples);
  const outBuffer = ctx.createBuffer(targetChannels, totalSamples, targetSampleRate);
  const leftOut = outBuffer.getChannelData(0);
  const rightOut = outBuffer.getChannelData(1);

  let currentSampleOffset = 0;

  for (let t = 0; t < tracks.length; t++) {
    if (onProgress) {
      onProgress(
        Math.round(((t + 1) / tracks.length) * 80),
        `Merging track ${t + 1} of ${tracks.length}: "${tracks[t].name}"...`
      );
    }

    const track = tracks[t];
    const srcBuf = track.audioBuffer;
    const srcChannels = srcBuf.numberOfChannels;
    const srcLeft = srcBuf.getChannelData(0);
    const srcRight = srcChannels > 1 ? srcBuf.getChannelData(1) : srcLeft;
    const trackLength = srcBuf.length;

    // Resample factor if track sample rate differs
    const rateRatio = srcBuf.sampleRate / targetSampleRate;

    const crossfadeSamples =
      t > 0 && options.crossfadeDuration > 0
        ? Math.round(options.crossfadeDuration * targetSampleRate)
        : 0;

    const targetTrackLength = Math.round(track.duration * targetSampleRate);

    for (let i = 0; i < targetTrackLength; i++) {
      const outIdx = currentSampleOffset + i;
      if (outIdx >= totalSamples) break;

      const srcIdx = Math.floor(i * rateRatio);
      const lSample = srcLeft[srcIdx] || 0;
      const rSample = srcRight[srcIdx] || 0;

      if (crossfadeSamples > 0 && i < crossfadeSamples) {
        // Crossfade in curve
        const gainIn = i / crossfadeSamples;
        leftOut[outIdx] = leftOut[outIdx] * (1 - gainIn) + lSample * gainIn;
        rightOut[outIdx] = rightOut[outIdx] * (1 - gainIn) + rSample * gainIn;
      } else {
        leftOut[outIdx] = lSample;
        rightOut[outIdx] = rSample;
      }
    }

    currentSampleOffset += targetTrackLength - crossfadeSamples;
  }

  if (onProgress) onProgress(90, 'Encoding 16-bit Master Audio WAV...');

  const wavBlob = audioBufferToWav(outBuffer);
  const downloadUrl = URL.createObjectURL(wavBlob);
  const fileName = `joined_${tracks.length}_tracks.wav`;

  ctx.close().catch(() => {});

  return {
    blob: wavBlob,
    downloadUrl,
    fileName,
    duration: outBuffer.duration,
    sizeBytes: wavBlob.size,
    trackCount: tracks.length,
  };
}
