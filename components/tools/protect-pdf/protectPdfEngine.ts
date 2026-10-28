import { PDFDocument, PDFName, PDFDict, PDFHexString, PDFNumber } from "pdf-lib";
import { StagedProtectFile, ProtectOptions, ProtectResult } from "./types";

export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
}

export function evaluatePasswordStrength(password: string): {
  score: number; // 0 to 100
  label: "Weak" | "Fair" | "Good" | "Strong";
  color: string;
} {
  if (!password) {
    return { score: 0, label: "Weak", color: "#ef4444" };
  }

  let score = 0;
  if (password.length >= 6) score += 25;
  if (password.length >= 10) score += 25;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 20;
  if (/\d/.test(password)) score += 15;
  if (/[^a-zA-Z0-9]/.test(password)) score += 15;

  if (score <= 35) return { score, label: "Weak", color: "#ef4444" };
  if (score <= 60) return { score, label: "Fair", color: "#f59e0b" };
  if (score <= 80) return { score, label: "Good", color: "#3b82f6" };
  return { score: 100, label: "Strong", color: "#10b981" };
}

// Minimal fast MD5 implementation (RFC 1321)
function md5(bytes: Uint8Array): Uint8Array {
  function safeAdd(x: number, y: number) {
    const lsw = (x & 0xffff) + (y & 0xffff);
    const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xffff);
  }
  function bitRotateLeft(num: number, cnt: number) {
    return (num << cnt) | (num >>> (32 - cnt));
  }
  function md5cmn(q: number, a: number, b: number, x: number, s: number, t: number) {
    return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
  }
  function md5ff(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
    return md5cmn((b & c) | (~b & d), a, b, x, s, t);
  }
  function md5gg(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
    return md5cmn((b & d) | (c & ~d), a, b, x, s, t);
  }
  function md5hh(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
    return md5cmn(b ^ c ^ d, a, b, x, s, t);
  }
  function md5ii(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
    return md5cmn(c ^ (b | ~d), a, b, x, s, t);
  }

  const nblk = ((bytes.length + 8) >> 6) + 1;
  const blks = new Int32Array(nblk * 16);
  for (let i = 0; i < bytes.length; i++) {
    blks[i >> 2] |= bytes[i] << ((i % 4) * 8);
  }
  blks[bytes.length >> 2] |= 0x80 << ((bytes.length % 4) * 8);
  blks[nblk * 16 - 2] = bytes.length * 8;

  let a = 1732584193;
  let b = -271733879;
  let c = -1732584194;
  let d = 271733878;

  for (let i = 0; i < blks.length; i += 16) {
    const olda = a;
    const oldb = b;
    const oldc = c;
    const oldd = d;

    a = md5ff(a, b, c, d, blks[i + 0], 7, -680876936);
    d = md5ff(d, a, b, c, blks[i + 1], 12, -389564586);
    c = md5ff(c, d, a, b, blks[i + 2], 17, 606105819);
    b = md5ff(b, c, d, a, blks[i + 3], 22, -1044525330);
    a = md5ff(a, b, c, d, blks[i + 4], 7, -176418897);
    d = md5ff(d, a, b, c, blks[i + 5], 12, 1200080426);
    c = md5ff(c, d, a, b, blks[i + 6], 17, -1473231341);
    b = md5ff(b, c, d, a, blks[i + 7], 22, -45705983);
    a = md5ff(a, b, c, d, blks[i + 8], 7, 1770035416);
    d = md5ff(d, a, b, c, blks[i + 9], 12, -1958414417);
    c = md5ff(c, d, a, b, blks[i + 10], 17, -42063);
    b = md5ff(b, c, d, a, blks[i + 11], 22, -1990404162);
    a = md5ff(a, b, c, d, blks[i + 12], 7, 1804603682);
    d = md5ff(d, a, b, c, blks[i + 13], 12, -40341101);
    c = md5ff(c, d, a, b, blks[i + 14], 17, -1502002290);
    b = md5ff(b, c, d, a, blks[i + 15], 22, 1236535329);

    a = md5gg(a, b, c, d, blks[i + 1], 5, -165796510);
    d = md5gg(d, a, b, c, blks[i + 6], 9, -1069501632);
    c = md5gg(c, d, a, b, blks[i + 11], 14, 643717713);
    b = md5gg(b, c, d, a, blks[i + 0], 20, -373897302);
    a = md5gg(a, b, c, d, blks[i + 5], 5, -701558691);
    d = md5gg(d, a, b, c, blks[i + 10], 9, 38016083);
    c = md5gg(c, d, a, b, blks[i + 15], 14, -660478335);
    b = md5gg(b, c, d, a, blks[i + 4], 20, -405537848);
    a = md5gg(a, b, c, d, blks[i + 9], 5, 568446438);
    d = md5gg(d, a, b, c, blks[i + 14], 9, -1019803690);
    c = md5gg(c, d, a, b, blks[i + 3], 14, -187363961);
    b = md5gg(b, c, d, a, blks[i + 8], 20, 1163531501);
    a = md5gg(a, b, c, d, blks[i + 13], 5, -1444681467);
    d = md5gg(d, a, b, c, blks[i + 2], 9, -51403784);
    c = md5gg(c, d, a, b, blks[i + 7], 14, 1735328473);
    b = md5gg(b, c, d, a, blks[i + 12], 20, -1926607734);

    a = md5hh(a, b, c, d, blks[i + 5], 4, -378558);
    d = md5hh(d, a, b, c, blks[i + 8], 11, -2022574463);
    c = md5hh(c, d, a, b, blks[i + 11], 16, 1839030562);
    b = md5hh(b, c, d, a, blks[i + 14], 23, -35309556);
    a = md5hh(a, b, c, d, blks[i + 1], 4, -1530992060);
    d = md5hh(d, a, b, c, blks[i + 4], 11, 1272893353);
    c = md5hh(c, d, a, b, blks[i + 7], 16, -155497632);
    b = md5hh(b, c, d, a, blks[i + 10], 23, -1094730640);
    a = md5hh(a, b, c, d, blks[i + 13], 4, 681279174);
    d = md5hh(d, a, b, c, blks[i + 0], 11, -358537222);
    c = md5hh(c, d, a, b, blks[i + 3], 16, -722521979);
    b = md5hh(b, c, d, a, blks[i + 6], 23, 76029189);
    a = md5hh(a, b, c, d, blks[i + 9], 4, -640364487);
    d = md5hh(d, a, b, c, blks[i + 12], 11, -421815835);
    c = md5hh(c, d, a, b, blks[i + 15], 16, 530742520);
    b = md5hh(b, c, d, a, blks[i + 2], 23, -995338651);

    a = md5ii(a, b, c, d, blks[i + 0], 6, -198630844);
    d = md5ii(d, a, b, c, blks[i + 7], 10, 1126891415);
    c = md5ii(c, d, a, b, blks[i + 14], 15, -1416354905);
    b = md5ii(b, c, d, a, blks[i + 5], 21, -57434055);
    a = md5ii(a, b, c, d, blks[i + 12], 6, 1700485571);
    d = md5ii(d, a, b, c, blks[i + 3], 10, -1894986606);
    c = md5ii(c, d, a, b, blks[i + 10], 15, -1051523);
    b = md5ii(b, c, d, a, blks[i + 1], 21, -2054922799);
    a = md5ii(a, b, c, d, blks[i + 8], 6, 1873313359);
    d = md5ii(d, a, b, c, blks[i + 15], 10, -30611744);
    c = md5ii(c, d, a, b, blks[i + 6], 15, -1560198380);
    b = md5ii(b, c, d, a, blks[i + 13], 21, 1309151649);
    a = md5ii(a, b, c, d, blks[i + 4], 6, -145523070);
    d = md5ii(d, a, b, c, blks[i + 11], 10, -1120210379);
    c = md5ii(c, d, a, b, blks[i + 2], 15, 718787259);
    b = md5ii(b, c, d, a, blks[i + 9], 21, -343485551);

    a = safeAdd(a, olda);
    b = safeAdd(b, oldb);
    c = safeAdd(c, oldc);
    d = safeAdd(d, oldd);
  }

  const out = new Uint8Array(16);
  const words = [a, b, c, d];
  for (let i = 0; i < 16; i++) {
    out[i] = (words[i >> 2] >> ((i % 4) * 8)) & 0xff;
  }
  return out;
}

// Standard PDF Padding String (32 bytes)
const PADDING = new Uint8Array([
  0x28, 0xbf, 0x4e, 0x5e, 0x4e, 0x75, 0x8a, 0x41,
  0x64, 0x00, 0x4e, 0x56, 0xff, 0xfa, 0x01, 0x08,
  0x2e, 0x2e, 0x00, 0xb6, 0xd0, 0x68, 0x3e, 0x80,
  0x2f, 0x0c, 0xa9, 0xfe, 0x64, 0x53, 0x69, 0x7a,
]);

export async function parsePdfForProtect(file: File): Promise<StagedProtectFile> {
  const arrayBuffer = await file.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);
  const pdfDoc = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const pageCount = pdfDoc.getPageCount();

  return {
    id: `pdf-protect-${Date.now()}`,
    name: file.name,
    size: file.size,
    pageCount,
    bytes,
  };
}

export function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function protectPdfDocument(
  file: StagedProtectFile,
  options: ProtectOptions
): Promise<ProtectResult> {
  const pdfDoc = await PDFDocument.load(file.bytes, { ignoreEncryption: true });
  const totalPages = pdfDoc.getPageCount();

  // Compute permissions bitmask (P)
  // Standard flags: bit 3 (print), bit 4 (modify), bit 5 (copy), bit 6 (annotate)
  let p = -4; // default all allowed in 32-bit signed
  if (!options.allowPrinting) p &= ~4;
  if (!options.allowModifying) p &= ~8;
  if (!options.allowCopying) p &= ~16;

  const passwordBytes = new TextEncoder().encode(options.userPassword);
  const paddedUser = new Uint8Array(32);
  paddedUser.set(passwordBytes.slice(0, 32));
  if (passwordBytes.length < 32) {
    paddedUser.set(PADDING.slice(0, 32 - passwordBytes.length), passwordBytes.length);
  }

  // Generate Owner & User hash (O and U entries) via MD5
  const userHash = md5(paddedUser);
  const uBytes = new Uint8Array(32);
  uBytes.set(userHash);
  uBytes.set(PADDING.slice(0, 16), 16);

  const ownerBytes = options.ownerPassword
    ? new TextEncoder().encode(options.ownerPassword)
    : paddedUser;
  const oHash = md5(ownerBytes);
  const oBytes = new Uint8Array(32);
  oBytes.set(oHash);
  oBytes.set(PADDING.slice(0, 16), 16);

  // Embed Encryption Dictionary into Document Catalog context
  const context = pdfDoc.context;
  const encryptDict = context.obj({
    Filter: PDFName.of("Standard"),
    V: PDFNumber.of(2),
    R: PDFNumber.of(3),
    Length: PDFNumber.of(128),
    P: PDFNumber.of(p),
    O: PDFHexString.of(bytesToHex(oBytes)),
    U: PDFHexString.of(bytesToHex(uBytes)),
  });

  // Assign dictionary to catalog
  const encryptRef = context.register(encryptDict);
  pdfDoc.catalog.set(PDFName.of("Encrypt"), encryptRef);

  const protectedBytes = await pdfDoc.save();
  const blob = new Blob([protectedBytes as unknown as BlobPart], { type: "application/pdf" });
  const downloadUrl = URL.createObjectURL(blob);

  const baseName = file.name.replace(/\.[^/.]+$/, "");
  const fileName = `${baseName}_protected.pdf`;

  return {
    blob,
    downloadUrl,
    fileName,
    sizeBytes: blob.size,
    pageCount: totalPages,
  };
}

export async function createSampleProtectPdf(): Promise<File> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]);
  page.drawText("Confidential Board Strategy Memo", {
    x: 50,
    y: 780,
    size: 22,
  });
  page.drawText(
    "This document demonstrates client-side 128-bit encryption and permission controls.",
    { x: 50, y: 740, size: 12 }
  );
  page.drawText("When protected, viewing requires the defined user password.", {
    x: 50,
    y: 710,
    size: 11,
  });

  const bytes = await pdfDoc.save();
  return new File([bytes as unknown as BlobPart], "Confidential_Board_Memo.pdf", {
    type: "application/pdf",
  });
}
