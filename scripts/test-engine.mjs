import { extractYouTubeVideoId, formatBytes, verifyMp4Header } from "../components/tools/youtube-downloader/youtubeEngine.ts";
import fs from "fs";
import path from "path";

console.log("=== STEP 1: URL VALIDATION TESTS ===");
const validUrls = [
  "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "https://youtu.be/dQw4w9WgXcQ",
  "https://www.youtube.com/shorts/dQw4w9WgXcQ",
  "https://www.youtube.com/embed/dQw4w9WgXcQ",
  "dQw4w9WgXcQ",
  "test-authorized",
];

for (const u of validUrls) {
  const id = extractYouTubeVideoId(u);
  console.log(`URL: ${u} => Extracted ID: ${id} (${id ? "PASS" : "FAIL"})`);
  if (!id) throw new Error(`Failed to extract ID from valid URL: ${u}`);
}

const invalidUrls = [
  "",
  "https://example.com/video.mp4",
  "not-a-valid-url-at-all",
  "https://youtube.com/watch?invalid=true",
];

for (const u of invalidUrls) {
  const id = extractYouTubeVideoId(u);
  console.log(`Invalid URL: "${u}" => Extracted ID: ${id} (${id === null ? "PASS (Correctly rejected)" : "FAIL"})`);
  if (id !== null) throw new Error(`Incorrectly accepted invalid URL: ${u}`);
}

console.log("\n=== STEP 2: CONTAINER & SIGNATURE VERIFICATION TESTS ===");

// Test 2A: The old bug - 1024 zero bytes (the 1 KB placeholder)
const oldDummyBuffer = new Uint8Array(1024);
const dummyCheck = verifyMp4Header(oldDummyBuffer);
console.log("Old 1 KB dummy buffer test:", dummyCheck);
if (dummyCheck.isValid) {
  throw new Error("Old 1 KB dummy buffer was incorrectly accepted as valid MP4!");
} else {
  console.log("PASS: 1 KB dummy buffer was successfully detected and REJECTED.");
}

// Test 2B: HTML error page disguised as MP4
const htmlBuffer = new TextEncoder().encode("<!DOCTYPE html><html><body>Error 404</body></html>");
const htmlCheck = verifyMp4Header(htmlBuffer);
console.log("HTML response disguised as MP4 test:", htmlCheck);
if (htmlCheck.isValid) {
  throw new Error("HTML response was incorrectly accepted as valid MP4!");
} else {
  console.log("PASS: HTML response was successfully detected and REJECTED.");
}

// Test 2C: JSON error response disguised as MP4
const jsonBuffer = new TextEncoder().encode('{"error": "Video unavailable", "status": 404}');
const jsonCheck = verifyMp4Header(jsonBuffer);
console.log("JSON response disguised as MP4 test:", jsonCheck);
if (jsonCheck.isValid) {
  throw new Error("JSON response was incorrectly accepted as valid MP4!");
} else {
  console.log("PASS: JSON response was successfully detected and REJECTED.");
}

// Test 2D: Real, authorized MP4 file (public/samples/flower.mp4)
const realMp4Bytes = fs.readFileSync(path.join(process.cwd(), "public", "samples", "flower.mp4"));
const realMp4Check = verifyMp4Header(new Uint8Array(realMp4Bytes));
console.log("Genuine MP4 file test:", realMp4Check);
console.log(`Genuine file size: ${realMp4Bytes.length} bytes (${formatBytes(realMp4Bytes.length)})`);
if (!realMp4Check.isValid) {
  throw new Error("Real MP4 was incorrectly rejected!");
} else {
  console.log(`PASS: Genuine MP4 verified successfully with brand: "${realMp4Check.brand}"`);
}

console.log("\nALL DIRECT ENGINE & CONTAINER TESTS PASSED!");
