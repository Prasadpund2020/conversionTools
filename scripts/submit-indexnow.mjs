// IndexNow Instant Indexing Dispatcher
// Submits canonical URLs directly to Bing, Copilot, and IndexNow participating search engines.

const HOST = "freeconvertingtools.co.in";
const KEY = "b67909dc8a7d4a23b8f10257e2a9b401";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

const URLS = [
  `https://${HOST}/`,
  `https://${HOST}/all-tools`,
  `https://${HOST}/all-tools/pdf`,
  `https://${HOST}/all-tools/image`,
  `https://${HOST}/all-tools/video-audio`,
  `https://${HOST}/all-tools/downloaders`,
  `https://${HOST}/all-tools/edit-convert`,
  `https://${HOST}/all-tools/more`,
  // PDF Tools (19 tools)
  `https://${HOST}/all-tools/pdf/add-page-numbers`,
  `https://${HOST}/all-tools/pdf/compare-pdf`,
  `https://${HOST}/all-tools/pdf/compress-pdf`,
  `https://${HOST}/all-tools/pdf/grayscale-pdf`,
  `https://${HOST}/all-tools/pdf/html-to-pdf`,
  `https://${HOST}/all-tools/pdf/image-to-pdf`,
  `https://${HOST}/all-tools/pdf/organize-pdf`,
  `https://${HOST}/all-tools/pdf/pdf-merge`,
  `https://${HOST}/all-tools/pdf/pdf-to-excel`,
  `https://${HOST}/all-tools/pdf/pdf-to-jpg`,
  `https://${HOST}/all-tools/pdf/pdf-to-pptx`,
  `https://${HOST}/all-tools/pdf/pdf-to-word`,
  `https://${HOST}/all-tools/pdf/protect-pdf`,
  `https://${HOST}/all-tools/pdf/redact-pdf`,
  `https://${HOST}/all-tools/pdf/repair-pdf`,
  `https://${HOST}/all-tools/pdf/sign-pdf`,
  `https://${HOST}/all-tools/pdf/split-pdf`,
  `https://${HOST}/all-tools/pdf/unlock-pdf`,
  `https://${HOST}/all-tools/pdf/watermark-pdf`,
  // Image Tools (10 tools)
  `https://${HOST}/all-tools/image/blur-face`,
  `https://${HOST}/all-tools/image/color-palette`,
  `https://${HOST}/all-tools/image/compress-image`,
  `https://${HOST}/all-tools/image/convert-webp`,
  `https://${HOST}/all-tools/image/crop-image`,
  `https://${HOST}/all-tools/image/image-upscaler`,
  `https://${HOST}/all-tools/image/jpg-to-png`,
  `https://${HOST}/all-tools/image/remove-bg`,
  `https://${HOST}/all-tools/image/resize-image`,
  `https://${HOST}/all-tools/image/watermark-image`,
  // Video & Audio Tools (9 tools)
  `https://${HOST}/all-tools/video-audio/audio-joiner`,
  `https://${HOST}/all-tools/video-audio/audio-speed`,
  `https://${HOST}/all-tools/video-audio/convert-audio`,
  `https://${HOST}/all-tools/video-audio/mute-video`,
  `https://${HOST}/all-tools/video-audio/trim-video`,
  `https://${HOST}/all-tools/video-audio/video-to-gif`,
  `https://${HOST}/all-tools/video-audio/video-to-mp3`,
  `https://${HOST}/all-tools/video-audio/voice-recorder`,
  `https://${HOST}/all-tools/video-audio/volume-booster`,
  // Media Downloaders (4 tools)
  `https://${HOST}/all-tools/downloaders/insta-reels`,
  `https://${HOST}/all-tools/downloaders/tiktok-saver`,
  `https://${HOST}/all-tools/downloaders/twitter-media`,
  `https://${HOST}/all-tools/downloaders/youtube-downloader`,
  // Edit & Convert Tools (6 tools)
  `https://${HOST}/all-tools/edit-convert/epub-to-pdf`,
  `https://${HOST}/all-tools/edit-convert/excel-to-pdf`,
  `https://${HOST}/all-tools/edit-convert/json-csv`,
  `https://${HOST}/all-tools/edit-convert/markdown-to-pdf`,
  `https://${HOST}/all-tools/edit-convert/ocr-scanner`,
  `https://${HOST}/all-tools/edit-convert/word-to-pdf`,
  // More Tools (3 tools)
  `https://${HOST}/all-tools/more/barcode-scanner`,
  `https://${HOST}/all-tools/more/base64-converter`,
  `https://${HOST}/all-tools/more/qr-generator`,
];

async function submitIndexNow() {
  console.log(`[IndexNow] Submitting ${URLS.length} URLs for ${HOST}...`);
  try {
    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        host: HOST,
        key: KEY,
        keyLocation: KEY_LOCATION,
        urlList: URLS,
      }),
    });

    if (response.ok || response.status === 200 || response.status === 202) {
      console.log(`[IndexNow] Successfully submitted ${URLS.length} URLs to IndexNow! (Status: ${response.status})`);
    } else {
      console.log(`[IndexNow] Response status: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error("[IndexNow] Failed to submit:", error.message);
  }
}

submitIndexNow();
