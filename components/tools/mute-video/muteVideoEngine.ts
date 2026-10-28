import { MuteVideoMeta, MuteOptions, MuteResult } from "./types";

/**
 * Loads metadata from an uploaded video file
 */
export async function loadMuteVideoMeta(file: File): Promise<MuteVideoMeta> {
  const videoUrl = URL.createObjectURL(file);
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.preload = "metadata";
    video.src = videoUrl;

    video.onloadedmetadata = () => {
      resolve({
        fileName: file.name,
        fileSize: file.size,
        duration: video.duration || 8,
        width: video.videoWidth || 640,
        height: video.videoHeight || 360,
        videoUrl,
        mimeType: file.type || "video/mp4",
      });
    };

    video.onerror = () => {
      reject(new Error("Unable to parse video file"));
    };
  });
}

/**
 * Generates an in-memory sample video WITH sound track so the user can test stripping audio
 */
export async function generateSampleVideoWithSound(): Promise<MuteVideoMeta> {
  const canvas = document.createElement("canvas");
  canvas.width = 640;
  canvas.height = 360;
  const ctx = canvas.getContext("2d")!;

  const fps = 30;
  const durationSec = 8;
  const totalFrames = fps * durationSec;

  const stream = canvas.captureStream(fps);

  // Add audible oscillator sound track
  const AudioCtxClass =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  let audioCtx: AudioContext | null = null;

  try {
    audioCtx = new AudioCtxClass();
    const dest = audioCtx.createMediaStreamDestination();
    const osc = audioCtx.createOscillator();
    osc.frequency.value = 330;
    osc.connect(dest);
    osc.start();
    const audioTrack = dest.stream.getAudioTracks()[0];
    if (audioTrack) {
      stream.addTrack(audioTrack);
    }
  } catch {
    // Optional
  }

  const mimeType = MediaRecorder.isTypeSupported("video/webm;codecs=vp9")
    ? "video/webm;codecs=vp9"
    : "video/webm";

  const recorder = new MediaRecorder(stream, { mimeType });
  const chunks: Blob[] = [];

  recorder.ondataavailable = (e) => {
    if (e.data.size > 0) chunks.push(e.data);
  };

  recorder.start();

  for (let f = 0; f < totalFrames; f++) {
    const t = f / fps;

    // Ambient Rose / Sunset Canvas Art
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, `hsl(${340 + t * 5}, 75%, 25%)`);
    gradient.addColorStop(1, `hsl(${10 + t * 5}, 85%, 40%)`);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Audio Speaker Waves Animation
    ctx.strokeStyle = "rgba(255, 255, 255, 0.85)";
    ctx.lineWidth = 3;
    const waveRadius = 40 + ((f * 4) % 100);
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2 - 25, waveRadius, 0, Math.PI * 2);
    ctx.stroke();

    // Speaker Icon in Center
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2 - 25, 25, 0, Math.PI * 2);
    ctx.fill();

    // Title
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 20px 'Plus Jakarta Sans', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Audio Track Detected (Ready to Mute)", canvas.width / 2, canvas.height / 2 + 65);

    ctx.font = "14px monospace";
    ctx.fillStyle = "#ffe4e6";
    ctx.fillText(`Timestamp: 00:0${Math.floor(t)} / 00:08`, canvas.width / 2, canvas.height / 2 + 95);

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
        fileName: "Sample_Clip_With_Sound.mp4",
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
 * Strips all audio tracks from a video file in pure browser memory
 */
export async function executeMuteVideo(
  meta: MuteVideoMeta,
  options: MuteOptions,
  onProgress?: (progress: number) => void
): Promise<MuteResult> {
  const video = document.createElement("video");
  video.src = meta.videoUrl;
  video.muted = true; // Crucial: muted playback
  video.playbackRate = options.playbackSpeed || 1;

  await new Promise((r) => {
    video.onloadedmetadata = r;
  });

  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth || 640;
  canvas.height = video.videoHeight || 360;
  const ctx = canvas.getContext("2d")!;

  const fps = 30;
  // Capture video stream ONLY (ZERO audio tracks added to stream!)
  const stream = canvas.captureStream(fps);

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

  video.currentTime = 0;
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
        duration: meta.duration,
      });
    };

    recorder.onerror = reject;

    recorder.start(100);
    video.play();

    const drawInterval = setInterval(() => {
      if (video.currentTime >= meta.duration || video.paused || video.ended) {
        clearInterval(drawInterval);
        video.pause();
        recorder.stop();
      } else {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const currentProgress = (video.currentTime / meta.duration) * 100;
        if (onProgress) onProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    }, 1000 / fps);
  });
}
