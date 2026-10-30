export interface ProtectOptions {
  userPassword: string;
  confirmPassword: string;
  ownerPassword?: string;
  allowPrinting: boolean;
  allowCopying: boolean;
  allowModifying: boolean;
  encryptionStrength: "aes-256" | "standard-rc4";
}

export interface StagedProtectFile {
  id: string;
  name: string;
  size: number;
  pageCount: number;
  bytes: Uint8Array;
}

export interface ProtectResult {
  blob: Blob;
  downloadUrl: string;
  fileName: string;
  sizeBytes: number;
  pageCount: number;
}
