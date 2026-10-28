import { AudioMeta, BoosterOptions, BoosterResult } from "./types";

/**
 * Decodes audio from an uploaded File (Audio or Video) using Web Audio API
 */
export async function decodeAudioFromMediaFile(file: File): Promise<AudioMeta> {
  const arrayBuffer = await file.arrayBuffer();
  const AudioCtxClass =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const audioCtx = new AudioCtxClass();

  try {
    const decoded = await audioCtx.decodeAudioData(arrayBuffer);
    const audioUrl = URL.createObjectURL(file);

    return {
      fileName: file.name,
      fileSize: file.size,
      duration: decoded.duration,
      sampleRate: decoded.sampleRate,
      channels: decoded.numberOfChannels,
      audioBuffer: decoded,
      audioUrl,
    };
  } finally {
    if (audioCtx.state !== "closed") {
      audioCtx.close();
    }
  }
}

/**
 * Generates an in-memory sample studio audio track
 */
export function generateSampleAudioBuffer(): AudioMeta {
  const duration = 12;
  const sampleRate = 44100;
  const AudioCtxClass =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const audioCtx = new AudioCtxClass();
  const buffer = audioCtx.createBuffer(2, sampleRate * duration, sampleRate);

  const left = buffer.getChannelData(0);
  const right = buffer.getChannelData(1);

  // Warm chord progression (Lo-Fi Acoustic Studio)
  const freqs = [130.81, 164.81, 196.0, 246.94, 293.66, 392.0];

  for (let i = 0; i < buffer.length; i++) {
    const t = i / sampleRate;
    let val = 0;

    freqs.forEach((f, idx) => {
      const envelope = Math.sin((t * 0.4 + idx * 0.3) % Math.PI);
      val += Math.sin(2 * Math.PI * f * t) * 0.14 * Math.max(0, envelope);
    });

    // Gentle stereo pan
    const pan = Math.sin(t * 0.6) * 0.25;
    left[i] = val * (1 - pan);
    right[i] = val * (1 + pan);
  }

  audioCtx.close();

  return {
    fileName: "LoFi_Studio_Session.wav",
    fileSize: 2116800,
    duration,
    sampleRate,
    channels: 2,
    audioBuffer: buffer,
  };
}

/**
 * Processes audio buffer applying volume gain multiplier, limiter, and EQ filters
 */
export async function processVolumeBoost(
  sourceBuffer: AudioBuffer,
  options: BoosterOptions
): Promise<BoosterResult> {
  const channels = sourceBuffer.numberOfChannels;
  const length = sourceBuffer.length;
  const sampleRate = sourceBuffer.sampleRate;

  const offlineCtx = new OfflineAudioContext(channels, length, sampleRate);

  const sourceNode = offlineCtx.createBufferSource();
  sourceNode.buffer = sourceBuffer;

  // 1. Bass Shelf Filter
  const bassFilter = offlineCtx.createBiquadFilter();
  bassFilter.type = "lowshelf";
  bassFilter.frequency.value = 180;
  bassFilter.gain.value = options.bassBoostDb || 0;

  // 2. Treble Shelf Filter
  const trebleFilter = offlineCtx.createBiquadFilter();
  trebleFilter.type = "highshelf";
  trebleFilter.frequency.value = 6000;
  trebleFilter.gain.value = options.trebleBoostDb || 0;

  // 3. Volume Gain Multiplier (1.0x - 3.0x)
  const gainNode = offlineCtx.createGain();
  gainNode.gain.value = options.boostMultiplier;

  // 4. Soft Limiter / Dynamic Compression (Prevents harsh digital clipping)
  let lastNode: AudioNode = gainNode;

  if (options.limiterEnabled) {
    const limiter = offlineCtx.createDynamicsCompressor();
    limiter.threshold.value = -1.0; // dB
    limiter.knee.value = 40;
    limiter.ratio.value = 16;
    limiter.attack.value = 0.003;
    limiter.release.value = 0.25;

    gainNode.connect(limiter);
    lastNode = limiter;
  }

  // Connect Audio Graph
  sourceNode.connect(bassFilter);
  bassFilter.connect(trebleFilter);
  trebleFilter.connect(gainNode);
  lastNode.connect(offlineCtx.destination);

  sourceNode.start(0);

  const renderedBuffer = await offlineCtx.startRendering();

  // Encode to 16-bit WAV PCM Blob
  const wavBlob = encodeWavBlob(renderedBuffer);
  const url = URL.createObjectURL(wavBlob);

  return {
    blob: wavBlob,
    url,
    fileSizeBytes: wavBlob.size,
    renderedBuffer,
  };
}

/**
 * Encodes an AudioBuffer into standard 16-bit PCM stereo/mono WAV Blob
 */
export function encodeWavBlob(buffer: AudioBuffer): Blob {
  const numChannels = buffer.numberOfChannels;
  const sampleRate = buffer.sampleRate;
  const format = 1; // PCM
  const bitDepth = 16;

  const bytesPerSample = bitDepth / 8;
  const blockAlign = numChannels * bytesPerSample;

  const numSamples = buffer.length;
  const dataByteLength = numSamples * blockAlign;
  const headerByteLength = 44;
  const totalLength = headerByteLength + dataByteLength;

  const arrayBuffer = new ArrayBuffer(totalLength);
  const view = new DataView(arrayBuffer);

  // Write RIFF Header
  writeString(view, 0, "RIFF");
  view.setUint32(4, 36 + dataByteLength, true);
  writeString(view, 8, "WAVE");

  // Write "fmt " Subchunk
  writeString(view, 12, "fmt ");
  view.setUint32(16, 16, true); // Subchunk1Size
  view.setUint16(20, format, true);
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * blockAlign, true); // ByteRate
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitDepth, true);

  // Write "data" Subchunk
  writeString(view, 36, "data");
  view.setUint32(40, dataByteLength, true);

  // Interleave and scale Float32 samples to Int16
  const channels: Float32Array[] = [];
  for (let ch = 0; ch < numChannels; ch++) {
    channels.push(buffer.getChannelData(ch));
  }

  let offset = 44;
  for (let i = 0; i < numSamples; i++) {
    for (let ch = 0; ch < numChannels; ch++) {
      let sample = channels[ch][i];
      // Clamp between -1 and +1
      sample = Math.max(-1, Math.min(1, sample));
      // Scale to 16-bit signed integer
      const intSample = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
      view.setInt16(offset, intSample, true);
      offset += 2;
    }
  }

  return new Blob([arrayBuffer as unknown as BlobPart], { type: "audio/wav" });
}

function writeString(view: DataView, offset: number, string: string) {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}
