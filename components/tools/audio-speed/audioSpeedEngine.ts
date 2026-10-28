import { StagedAudioFile, AudioSpeedOptions, ProcessedAudioResult } from './types';

/**
 * Decodes an uploaded audio File into an AudioBuffer
 */
export async function decodeAudioFile(file: File): Promise<{
  audioBuffer: AudioBuffer;
  duration: number;
  sampleRate: number;
  numberOfChannels: number;
}> {
  const arrayBuffer = await file.arrayBuffer();
  // Using standard AudioContext
  const AudioContextClass =
    window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const audioCtx = new AudioContextClass();

  try {
    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
    return {
      audioBuffer,
      duration: audioBuffer.duration,
      sampleRate: audioBuffer.sampleRate,
      numberOfChannels: audioBuffer.numberOfChannels,
    };
  } finally {
    if (audioCtx.state !== 'closed') {
      audioCtx.close().catch(() => {});
    }
  }
}

/**
 * Resamples an AudioBuffer to change playback speed / tempo
 */
export function processAudioSpeed(
  sourceBuffer: AudioBuffer,
  speed: number
): AudioBuffer {
  const sampleRate = sourceBuffer.sampleRate;
  const numChannels = sourceBuffer.numberOfChannels;
  const oldLength = sourceBuffer.length;
  const newLength = Math.max(1, Math.round(oldLength / speed));

  // Create an OfflineAudioContext to hold the output buffer
  const AudioContextClass =
    window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const ctx = new AudioContextClass();
  const outputBuffer = ctx.createBuffer(numChannels, newLength, sampleRate);

  for (let ch = 0; ch < numChannels; ch++) {
    const srcData = sourceBuffer.getChannelData(ch);
    const destData = outputBuffer.getChannelData(ch);

    for (let i = 0; i < newLength; i++) {
      const srcIndex = i * speed;
      const indexFloor = Math.floor(srcIndex);
      const indexCeil = Math.min(oldLength - 1, indexFloor + 1);
      const frac = srcIndex - indexFloor;

      // Linear interpolation between consecutive audio frames
      const sample1 = srcData[indexFloor] || 0;
      const sample2 = srcData[indexCeil] || 0;
      destData[i] = sample1 + frac * (sample2 - sample1);
    }
  }

  ctx.close().catch(() => {});
  return outputBuffer;
}

/**
 * Encodes an AudioBuffer into a 16-bit PCM stereo/mono WAV Blob
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

  // Helper to write ASCII strings
  const writeString = (offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  // RIFF header
  writeString(0, 'RIFF');
  view.setUint32(4, 36 + dataLength, true);
  writeString(8, 'WAVE');

  // fmt subchunk
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true); // SubChunk1Size (16 for PCM)
  view.setUint16(20, format, true); // AudioFormat (1 = PCM)
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * blockAlign, true); // ByteRate
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitDepth, true);

  // data subchunk
  writeString(36, 'data');
  view.setUint32(40, dataLength, true);

  // Interleave channel samples and convert [-1.0, 1.0] to 16-bit signed integer
  let offset = 44;
  const channels = [];
  for (let ch = 0; ch < numChannels; ch++) {
    channels.push(buffer.getChannelData(ch));
  }

  for (let i = 0; i < buffer.length; i++) {
    for (let ch = 0; ch < numChannels; ch++) {
      let sample = channels[ch][i];
      // Clamp between -1.0 and 1.0
      sample = Math.max(-1, Math.min(1, sample));
      // Convert to 16-bit signed int
      const intSample = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
      view.setInt16(offset, intSample, true);
      offset += 2;
    }
  }

  return new Blob([arrayBuffer], { type: 'audio/wav' });
}
