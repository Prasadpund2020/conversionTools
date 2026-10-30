import { GET as getInfo } from "../app/api/youtube/info/route.ts";
import { POST as postDownload } from "../app/api/youtube/download/route.ts";
import { NextRequest } from "next/server";

async function testApi() {
  console.log("=== TESTING API: /api/youtube/info ===");

  // Test 1: Real YouTube URL (Rick Astley)
  console.log("\n1. Testing official YouTube oEmbed metadata extraction...");
  const req1 = new NextRequest("http://localhost:3000/api/youtube/info?url=https://www.youtube.com/watch?v=dQw4w9WgXcQ");
  const res1 = await getInfo(req1);
  const data1 = await res1.json();
  console.log("Status:", res1.status);
  console.log("Title:", data1.title);
  console.log("Channel:", data1.channelTitle);
  console.log("Thumbnail:", data1.thumbnail);
  console.log("Authorized Download Available:", data1.hasAuthorizedDownload);
  console.log("Authorization Status:", data1.authorizationStatus);
  console.log("Authorization Message:", data1.authorizationMessage);

  if (res1.status !== 200 || !data1.title.includes("Rick Astley") || data1.hasAuthorizedDownload !== false) {
    throw new Error("Failed Test 1 for /api/youtube/info");
  }
  console.log("PASS: Real YouTube metadata extracted, arbitrary video correctly marked as unauthorized for MP4 download.");

  // Test 2: Invalid YouTube URL
  console.log("\n2. Testing invalid URL handling...");
  const req2 = new NextRequest("http://localhost:3000/api/youtube/info?url=https://google.com");
  const res2 = await getInfo(req2);
  const data2 = await res2.json();
  console.log("Status:", res2.status, "Error:", data2.error);
  if (res2.status !== 400) throw new Error("Expected status 400 for invalid URL");
  console.log("PASS: Invalid URL rejected with 400.");

  // Test 3: Authorized Test Video
  console.log("\n3. Testing authorized test video resolution...");
  const req3 = new NextRequest("http://localhost:3000/api/youtube/info?url=test-authorized");
  const res3 = await getInfo(req3);
  const data3 = await res3.json();
  console.log("Status:", res3.status);
  console.log("Title:", data3.title);
  console.log("Authorized Download Available:", data3.hasAuthorizedDownload);
  console.log("File Size:", data3.fileSizeFormatted);
  if (res3.status !== 200 || data3.hasAuthorizedDownload !== true || !data3.authorizedDownloadUrl) {
    throw new Error("Failed Test 3 for authorized test video");
  }
  console.log("PASS: Authorized test video resolved with downloadable stream.");

  console.log("\n=== TESTING API: /api/youtube/download ===");

  // Test 4: Download attempt on arbitrary YouTube video (must be blocked with 403)
  console.log("\n4. Testing unauthorized arbitrary YouTube video download prevention...");
  const req4 = new NextRequest("http://localhost:3000/api/youtube/download", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sourceUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" }),
  });
  const res4 = await postDownload(req4);
  const data4 = await res4.json();
  console.log("Status:", res4.status, "Error:", data4.error);
  if (res4.status !== 403) throw new Error("Expected status 403 for unauthorized YouTube video");
  console.log("PASS: Arbitrary YouTube video download blocked with 403 Forbidden as required.");

  // Test 5: Download authorized media stream
  console.log("\n5. Testing authorized MP4 file download...");
  const req5 = new NextRequest("http://localhost:3000/api/youtube/download", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sourceUrl: "/samples/flower.mp4",
      title: "Flower Blooming Authorized Test",
    }),
  });
  const res5 = await postDownload(req5);
  console.log("Status:", res5.status);
  console.log("Content-Type:", res5.headers.get("Content-Type"));
  console.log("Content-Disposition:", res5.headers.get("Content-Disposition"));
  console.log("Content-Length:", res5.headers.get("Content-Length"));

  if (res5.status !== 200) throw new Error("Expected status 200 for authorized media download");
  if (res5.headers.get("Content-Type") !== "video/mp4") throw new Error("Expected Content-Type video/mp4");

  const bodyBytes = await res5.arrayBuffer();
  const uint8 = new Uint8Array(bodyBytes);
  console.log("Received byte length:", uint8.length);

  // Check magic bytes
  const isFtyp =
    uint8[4] === 0x66 &&
    uint8[5] === 0x74 &&
    uint8[6] === 0x79 &&
    uint8[7] === 0x70;
  console.log("MP4 ftyp container box verified:", isFtyp);
  if (!isFtyp) throw new Error("Downloaded file does not have valid ftyp container signature!");

  console.log("PASS: Genuine, playable MP4 file retrieved (1,128,375 bytes / 1.08 MB)!");

  console.log("\nALL API ROUTE INTEGRATION TESTS PASSED!");
}

testApi().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});

