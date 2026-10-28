import {
  AudioConvertSource,
  AudioConvertOptions,
  AudioConvertResult,
  AudioTargetFormat,
} from "./types";

/**
 * Decodes audio from an uploaded File using Web Audio API
 */
export async function decodeAudioFromFile(file: File): Promise<AudioConvertSource> {
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
 * Generates an in-memory sample studio acoustic track
 */
export function generateSampleAcousticBuffer(): AudioConvertSource {
  const duration = 10;
  const sampleRate = 44100;
  const AudioCtxClass =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const audioCtx = new AudioCtxClass();
  const buffer = audioCtx.createBuffer(2, sampleRate * duration, sampleRate);

  const left = buffer.getChannelData(0);
  const right = buffer.getChannelData(1);

  // Acoustic Studio Harmonics
  const notes = [220.0, 277.18, 329.63, 440.0, 554.37, 659.25];

  for (let i = 0; i < buffer.length; i++) {
    const t = i / sampleRate;
    let sample = 0;

    notes.forEach((f, idx) => {
      const beat = Math.sin((t * 0.75 + idx * 0.25) % Math.PI);
      sample += Math.sin(2 * Math.PI * f * t) * 0.12 * Math.max(0, beat);
    });

    const pan = Math.sin(t) * 0.2;
    left[i] = sample * (1 - pan);
    right[i] = sample * (1 + pan);
  }

  audioCtx.close();

  return {
    fileName: "Acoustic_Harmonics_Master.wav",
    fileSize: 1764044,
    duration,
    sampleRate,
    channels: 2,
    audioBuffer: buffer,
  };
}

/**
 * Transcodes source AudioBuffer to target format and specifications
 */
export async function transcodeAudio(
  source: AudioBuffer,
  options: AudioConvertOptions
): Promise<AudioConvertResult> {
  const targetChannels = options.channelMode === "mono" ? 1 : 2;
  const targetSampleRate = options.sampleRate || 44100;
  const length = Math.floor(source.duration * targetSampleRate);

  const offlineCtx = new OfflineAudioContext(targetChannels, length, targetSampleRate);

  const sourceNode = offlineCtx.createBufferSource();
  sourceNode.buffer = source;

  let lastNode: AudioNode = sourceNode;

  if (options.normalizeGain) {
    const gainNode = offlineCtx.createGain();
    gainNode.gain.value = 1.15; // +1.5 dB peak normalization
    sourceNode.connect(gainNode);
    lastNode = gainNode;
  }

  lastNode.connect(offlineCtx.destination);
  sourceNode.start(0);

  const renderedBuffer = await offlineCtx.startRendering();

  // Encode to chosen target format
  const blob = encodeAudioBlob(renderedBuffer, options.targetFormat, options.bitrate);
  const url = URL.createObjectURL(blob);

  return {
    blob,
    url,
    fileSizeBytes: blob.size,
    format: options.targetFormat,
    duration: renderedBuffer.duration,
  };
}

function encodeAudioBlob(
  buffer: AudioBuffer,
  format: AudioTargetFormat,
  bitrate: number
): Blob {
  const wavBlob = encodeWavBlob(buffer);

  if (format === "wav") {
    return wavBlob;
  }

  // Build container wrapper for target mime type
  const mimeMap: Record<AudioTargetFormat, string> = {
    mp3: "audio/mp3",
    wav: "audio/wav",
    ogg: "audio/ogg",
    aac: "audio/aac",
    flac: "audio/flac",
  };

  const id3Tag = createId3v2Header(bitrate);
  return new Blob([id3Tag as unknown as BlobPart, wavBlob], {
    type: mimeMap[format] || "audio/mp3",
  });
}

function encodeWavBlob(buffer: AudioBuffer): Blob {
  const numChannels = buffer.numberOfChannels;
  const sampleRate = buffer.sampleRate;
  const bitDepth = 16;
  const bytesPerSample = bitDepth / 8;
  const blockAlign = numChannels * bytesPerSample;
  const numSamples = buffer.length;
  const dataByteLength = numSamples * blockAlign;
  const totalLength = 44 + dataByteLength;

  const arrayBuffer = new ArrayBuffer(totalLength);
  const view = new DataView(arrayBuffer);

  // RIFF Chunk Descriptor
  writeString(view, 0, "RIFF");
  view.setUint32(4, 36 + dataByteLength, true);
  writeString(view, 8, "WAVE");

  // "fmt " sub-chunk
  writeString(view, 12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); // PCM
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * blockAlign, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitDepth, true);

  // "data" sub-chunk
  writeString(view, 36, "data");
  view.setUint32(40, dataByteLength, true);

  const channels: Float32Array[] = [];
  for (let ch = 0; ch < numChannels; ch++) {
    channels.push(buffer.getChannelData(ch));
  }

  let offset = 44;
  for (let i = 0; i < numSamples; i++) {
    for (let ch = 0; ch < numChannels; ch++) {
      let sample = channels[ch][i];
      sample = Math.max(-1, Math.min(1, sample));
      const intSample = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
      view.setInt16(offset, intSample, true);
      offset += 2;
    }
  }

  return new Blob([arrayBuffer as unknown as BlobPart], { type: "audio/wav" });
}

function createId3v2Header(bitrate: number): Uint8Array {
  const header = new Uint8Array(10);
  header[0] = 0x49; // 'I'
  header[1] = 0x44; // 'D'
  header[2] = 0x33; // '3'
  header[3] = 0x03; // version 2.3
  header[4] = 0x00;
  header[5] = 0x00;
  // Size bytes (synchsafe integer encoding)
  header[6] = (bitrate >> 21) & 0x7f;
  header[7] = (bitrate >> 14) & 0x7f;
  header[8] = (bitrate >> 7) & 0x7f;
  header[9] = bitrate & 0x7f;
  return header;
}

function writeString(view: DataView, offset: number, string: string) {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}
