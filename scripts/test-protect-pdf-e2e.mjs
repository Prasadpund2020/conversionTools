import { createSampleProtectPdf, parsePdfForProtect, protectPdfDocument } from "../components/tools/protect-pdf/protectPdfEngine.ts";
import { parsePdfForUnlock, unlockPdfDocument } from "../components/tools/unlock-pdf/unlockPdfEngine.ts";
import { PDFDocument } from "pdf-lib";

async function testProtectPdfE2E() {
  console.log("=== STEP 1: CREATE SAMPLE PDF ===");
  const sampleFile = await createSampleProtectPdf();
  console.log("Sample file created:", sampleFile.name, `(${sampleFile.size} bytes)`);

  const stagedFile = await parsePdfForProtect(sampleFile);
  console.log("Staged file parsed successfully, pageCount:", stagedFile.pageCount);

  const testPassword = "MySecretPDFPassword2026!";

  console.log("\n=== STEP 2: PROTECT PDF WITH PASSWORD (AES-256) ===");
  const protectResult = await protectPdfDocument(stagedFile, {
    userPassword: testPassword,
    confirmPassword: testPassword,
    allowPrinting: true,
    allowCopying: false,
    allowModifying: false,
    encryptionStrength: "aes-256",
  });

  console.log("Protected PDF created:", protectResult.fileName);
  console.log("Size:", protectResult.sizeBytes, "bytes");

  const protectedArrayBuf = await protectResult.blob.arrayBuffer();
  const protectedBytes = new Uint8Array(protectedArrayBuf);

  console.log("\n=== STEP 3: VERIFY PDF REQUIRES PASSWORD (NO BYPASS) ===");
  let failedWithoutPassword = false;
  try {
    await PDFDocument.load(protectedBytes);
  } catch (err) {
    failedWithoutPassword = true;
    console.log("PASS: pdf-lib refused to load without password:", err.message);
  }
  if (!failedWithoutPassword) {
    throw new Error("ERROR: The protected PDF loaded without a password! It is NOT properly locked.");
  }

  console.log("\n=== STEP 4: VERIFY PDFJS ENFORCES PASSWORD PROMPT ===");
  const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
  let promptReceived = false;
  const loadingTask = pdfjs.getDocument({ data: protectedBytes });
  loadingTask.onPassword = (callback, reason) => {
    promptReceived = true;
    console.log(`PDF.js intercepted encryption (reason: ${reason}). Supplying correct password...`);
    callback(testPassword);
  };

  const loadedDoc = await loadingTask.promise;
  console.log("PDF.js decrypted document successfully! Pages:", loadedDoc.numPages);
  if (!promptReceived || loadedDoc.numPages !== 1) {
    throw new Error("Failed to verify password prompt in PDF.js!");
  }

  console.log("\n=== STEP 5: VERIFY UNLOCK-PDF CAN UNLOCK WITH PASSWORD ===");
  const freshBytes = new Uint8Array(await protectResult.blob.arrayBuffer());
  const unlockFile = new File([freshBytes], protectResult.fileName, { type: "application/pdf" });
  const stagedUnlock = await parsePdfForUnlock(unlockFile);
  console.log("Unlock tool detected encryption:", stagedUnlock.isEncrypted);
  if (!stagedUnlock.isEncrypted) {
    throw new Error("Unlock tool failed to detect that the PDF is encrypted!");
  }

  const unlockedResult = await unlockPdfDocument(stagedUnlock, testPassword);
  console.log("Unlocked PDF size:", unlockedResult.sizeBytes, "bytes");

  // Verify the unlocked PDF can now be opened without any password
  const unlockedArrayBuf = await unlockedResult.blob.arrayBuffer();
  const unlockedDoc = await PDFDocument.load(new Uint8Array(unlockedArrayBuf));
  console.log("Unlocked PDF loaded freely without password! Page count:", unlockedDoc.getPageCount());

  console.log("\nALL PROTECT-PDF E2E TESTS PASSED 100%!");
}

testProtectPdfE2E().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
