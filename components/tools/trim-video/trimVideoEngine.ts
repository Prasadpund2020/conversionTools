import { VideoMeta, TrimOptions, TrimResult } from "./types";

/**
 * Loads video metadata from an uploaded file
 */
export async function loadVideoMeta(file: File): Promise<VideoMeta> {
  const videoUrl = URL.createObjectURL(file);
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.preload = "metadata";
    video.src = videoUrl;

    video.onloadedmetadata = () => {
      resolve({
        fileName: file.name,
        fileSize: file.size,
        duration: video.duration || 10,
        width: video.videoWidth || 1280,
        height: video.videoHeight || 720,
        videoUrl,
        mimeType: file.type || "video/mp4",
      });
    };

    video.onerror = () => {
      reject(new Error("Unable to parse video metadata"));
    };
  });
}

/**
 * Generates an in-memory 10-second sample animated demo video using HTML5 Canvas & MediaRecorder
 */
export async function generateSampleVideo(): Promise<VideoMeta> {
  const canvas = document.createElement("canvas");
  canvas.width = 640;
  canvas.height = 360;
  const ctx = canvas.getContext("2d")!;

  const fps = 30;
  const durationSec = 10;
  const totalFrames = fps * durationSec;

  const stream = canvas.captureStream(fps);

  // Audio tone track
  const AudioCtxClass =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  let audioTrack: MediaStreamTrack | null = null;
  let audioCtx: AudioContext | null = null;

  try {
    audioCtx = new AudioCtxClass();
    const dest = audioCtx.createMediaStreamDestination();
    const osc = audioCtx.createOscillator();
    osc.frequency.value = 440;
    osc.connect(dest);
    osc.start();
    audioTrack = dest.stream.getAudioTracks()[0];
    if (audioTrack) {
      stream.addTrack(audioTrack);
    }
  } catch {
    // Audio synthesis optional
  }

  const mimeType = MediaRecorder.isTypeSupported("video/webm;codecs=vp9")
    ? "video/webm;codecs=vp9"
    : MediaRecorder.isTypeSupported("video/webm")
    ? "video/webm"
    : "video/mp4";

  const recorder = new MediaRecorder(stream, { mimeType });
  const chunks: Blob[] = [];

  recorder.ondataavailable = (e) => {
    if (e.data.size > 0) chunks.push(e.data);
  };

  recorder.start();

  for (let f = 0; f < totalFrames; f++) {
    const t = f / fps;
    const progress = t / durationSec;

    // Background gradient animation
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, `hsl(${t * 36}, 70%, 20%)`);
    gradient.addColorStop(1, `hsl(${t * 36 + 60}, 80%, 35%)`);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Decorative Rotating Box
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2 - 20);
    ctx.rotate(t * 1.5);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
    ctx.lineWidth = 4;
    ctx.strokeRect(-50, -50, 100, 100);
    ctx.restore();

    // Center Title
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 22px 'Plus Jakarta Sans', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("FileLab High-Speed Video Trim Demo", canvas.width / 2, canvas.height / 2 + 60);

    // Dynamic Timer
    ctx.font = "16px monospace";
    ctx.fillStyle = "#e0e7ff";
    ctx.fillText(`Timestamp: 00:0${Math.floor(t)} / 00:10 • Frame ${f + 1}`, canvas.width / 2, canvas.height / 2 + 90);

    // Bottom progress bar
    ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
    ctx.fillRect(40, canvas.height - 24, canvas.width - 80, 8);
    ctx.fillStyle = "#a855f7";
    ctx.fillRect(40, canvas.height - 24, (canvas.width - 80) * progress, 8);

    await new Promise((r) => setTimeout(r, 1000 / fps));
  }

  recorder.stop();
  if (audioCtx) {
    audioCtx.close();
  }

  return new Promise((resolve) => {
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: mimeType });
      const videoUrl = URL.createObjectURL(blob);
      resolve({
        fileName: "Sample_Trim_Clip.mp4",
        fileSize: blob.size,
        duration: durationSec,
        width: 640,
        height: 360,
        videoUrl,
        mimeType,
      });
    };
  });
}

/**
 * Trims a video file using browser Canvas stream and MediaRecorder in client memory
 */
export async function trimVideo(
  videoMeta: VideoMeta,
  options: TrimOptions,
  onProgress?: (progress: number) => void
): Promise<TrimResult> {
  const start = Math.max(0, options.startTime);
  const end = Math.min(videoMeta.duration, Math.max(start + 0.2, options.endTime));
  const trimDuration = end - start;

  const video = document.createElement("video");
  video.src = videoMeta.videoUrl;
  video.muted = options.removeAudio;
  video.playbackRate = options.playbackSpeed || 1;

  await new Promise((r) => {
    video.onloadedmetadata = r;
  });

  const canvas = document.createElement("canvas");
  let targetWidth = video.videoWidth || 640;
  let targetHeight = video.videoHeight || 360;

  if (options.resolution === "720p" && targetHeight > 720) {
    targetWidth = Math.round((targetWidth * 720) / targetHeight);
    targetHeight = 720;
  } else if (options.resolution === "480p" && targetHeight > 480) {
    targetWidth = Math.round((targetWidth * 480) / targetHeight);
    targetHeight = 480;
  }

  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const ctx = canvas.getContext("2d")!;

  const fps = 30;
  const stream = canvas.captureStream(fps);

  // If preserving audio, capture audio from video element
  if (!options.removeAudio) {
    try {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioCtx = new AudioCtxClass();
      const source = audioCtx.createMediaElementSource(video);
      const dest = audioCtx.createMediaStreamDestination();
      source.connect(dest);
      source.connect(audioCtx.destination);
      const audioTrack = dest.stream.getAudioTracks()[0];
      if (audioTrack) {
        stream.addTrack(audioTrack);
      }
    } catch {
      // Audio stream capture fallback
    }
  }

  const outputMime =
    options.outputFormat === "mp4" && MediaRecorder.isTypeSupported("video/mp4")
      ? "video/mp4"
      : MediaRecorder.isTypeSupported("video/webm;codecs=vp9")
      ? "video/webm;codecs=vp9"
      : "video/webm";

  const recorder = new MediaRecorder(stream, { mimeType: outputMime });
  const chunks: Blob[] = [];

  recorder.ondataavailable = (e) => {
    if (e.data.size > 0) chunks.push(e.data);
  };

  video.currentTime = start;
  await new Promise((r) => {
    video.onseeked = r;
  });

  return new Promise((resolve, reject) => {
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: outputMime });
      const url = URL.createObjectURL(blob);
      resolve({
        blob,
        url,
        fileSizeBytes: blob.size,
        trimmedDuration: trimDuration,
      });
    };

    recorder.onerror = reject;

    recorder.start(100);
    video.play();

    const drawInterval = setInterval(() => {
      if (video.currentTime >= end || video.paused || video.ended) {
        clearInterval(drawInterval);
        video.pause();
        recorder.stop();
      } else {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const currentProgress = ((video.currentTime - start) / trimDuration) * 100;
        if (onProgress) onProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    }, 1000 / fps);
  });
}

/**
 * Helper to format seconds to MM:SS or HH:MM:SS
 */
export function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  const ms = Math.floor((seconds % 1) * 10);
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}.${ms}`;
}
