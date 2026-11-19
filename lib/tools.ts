import { ToolItem, ToolCategory } from "@/types/tools";
import { ALL_TOOLS, CATEGORIES } from "@/data/tools";

// ─── Category slug mapping ─────────────────────────────────────────────────────
const CATEGORY_SLUG_MAP: Record<ToolCategory, string> = {
  all: "all",
  pdf: "pdf",
  image: "image",
  "video-audio": "video-audio",
  downloaders: "downloaders",
  "edit-convert": "edit-convert",
  more: "more",
};

const SLUG_TO_CATEGORY: Record<string, ToolCategory> = Object.fromEntries(
  Object.entries(CATEGORY_SLUG_MAP).map(([k, v]) => [v, k as ToolCategory])
) as Record<string, ToolCategory>;

// ─── URL generators ─────────────────────────────────────────────────────────────

/**
 * Returns the canonical URL path for a tool.
 * e.g. "/all-tools/pdf/pdf-to-word"
 */
export function getToolUrl(tool: ToolItem): string {
  const catSlug = getCategorySlug(tool.category);
  return `/all-tools/${catSlug}/${tool.id}`;
}

/**
 * Returns the canonical URL path for a category page.
 * e.g. "/all-tools/pdf"
 */
export function getCategoryUrl(category: ToolCategory): string {
  if (category === "all") return "/all-tools";
  return `/all-tools/${getCategorySlug(category)}`;
}

export function getCategorySlug(category: ToolCategory): string {
  return CATEGORY_SLUG_MAP[category] || category;
}

export function categoryFromSlug(slug: string): ToolCategory | null {
  return SLUG_TO_CATEGORY[slug] ?? null;
}

// ─── Data lookups ───────────────────────────────────────────────────────────────

/**
 * Find a tool by its slug (id).
 */
export function getToolBySlug(slug: string): ToolItem | undefined {
  return ALL_TOOLS.find((t) => t.id === slug);
}

/**
 * Find a tool by category slug + tool slug.
 */
export function getToolBySlugs(
  categorySlug: string,
  toolSlug: string
): ToolItem | undefined {
  const category = categoryFromSlug(categorySlug);
  if (!category) return undefined;
  return ALL_TOOLS.find(
    (t) => t.id === toolSlug && getCategorySlug(t.category) === categorySlug
  );
}

/**
 * Get all tools for a given category slug.
 */
export function getToolsByCategory(categorySlug: string): ToolItem[] {
  const category = categoryFromSlug(categorySlug);
  if (!category || category === "all") return ALL_TOOLS;
  return ALL_TOOLS.filter((t) => t.category === category);
}

/**
 * Get the CategoryInfo for a slug.
 */
export function getCategoryInfo(categorySlug: string) {
  const category = categoryFromSlug(categorySlug);
  if (!category) return undefined;
  return CATEGORIES.find((c) => c.id === category);
}

/**
 * Determine whether a tool is published and ready for public indexing.
 * Considers explicit isPublished / status, falls back to isPrimaryAction for backward compatibility,
 * and ensures status !== "draft" && status !== "coming-soon".
 */
export function isToolPublished(tool: ToolItem): boolean {
  if (tool.status === "draft" || tool.status === "coming-soon") return false;
  if (tool.isPublished === false) return false;
  if (tool.isPublished === true) return true;
  return Boolean(tool.isPrimaryAction);
}

/**
 * Get all published tools from the central registry.
 */
export function getPublishedTools(): ToolItem[] {
  return ALL_TOOLS.filter(isToolPublished);
}

// ─── SEO helpers ────────────────────────────────────────────────────────────────

const CATEGORY_SEO: Record<
  string,
  { title: string; description: string; keywords: string[] }
> = {
  pdf: {
    title: "Free PDF Tools Online",
    description:
      "Compare two PDFs, redact with a visual cover, add a PDF stamp, merge, split, compress, and rearrange pages. Each PDF tool page states what it changes in the file.",
    keywords: [
      "free pdf tools",
      "compare pdf files online",
      "redact pdf free",
      "pdf stamp",
      "merge pdf",
      "organize pdf pages",
    ],
  },
  image: {
    title: "Free Image Tools Online",
    description:
      "Convert images to WebP, turn JPG into PNG, resize photos, add a watermark, and remove a solid background. Image tools run in your browser.",
    keywords: [
      "webp converter",
      "jpg to png",
      "resize image online",
      "watermark image",
      "remove background",
    ],
  },
  "video-audio": {
    title: "Video and Audio Tools Online",
    description:
      "Extract audio from a video file the browser can decode, trim clips, mute a track, or change playback speed. Check each tool for the file type it actually writes.",
    keywords: [
      "extract audio from video",
      "trim video online",
      "mute video",
      "audio tools",
    ],
  },
  downloaders: {
    title: "Media Link Tools",
    description:
      "These pages look up a public YouTube title and thumbnail, or show a preview for an Instagram or X link. They do not save the platform video file.",
    keywords: [
      "youtube video details",
      "media link lookup",
    ],
  },
  "edit-convert": {
    title: "Edit and Convert Files Online",
    description:
      "Convert Markdown, Word, or Excel into PDF, and read text from a PNG, JPG, or WebP when your browser supports text detection.",
    keywords: [
      "markdown to pdf",
      "word to pdf",
      "ocr scanner online",
      "excel to pdf",
    ],
  },
  more: {
    title: "Barcode, QR, and Base64 Tools",
    description:
      "Scan a barcode with your camera in Chrome or Edge, generate a QR code, or encode any file, including a PDF, as Base64 in the browser.",
    keywords: [
      "online barcode scanner free",
      "qr code generator",
      "base64 encoder",
      "pdf to base64",
    ],
  },
};

export function getCategorySeo(categorySlug: string) {
  return CATEGORY_SEO[categorySlug];
}

const CATEGORY_TOOL_LABEL: Record<string, string> = {
  pdf: "PDF",
  image: "Image",
  "video-audio": "Video & Audio",
  downloaders: "Downloader",
  "edit-convert": "Edit & Convert",
  more: "Utility",
};

export function getToolSeo(tool: ToolItem) {
  const cleanCat = CATEGORY_TOOL_LABEL[tool.category] || "Tool";
  const description =
    tool.seoDescription ||
    `${tool.description} Free client-side tool with instant browser execution and zero file uploads.`;

  return {
    title: `${tool.title} — Free Online ${cleanCat} Tool`,
    description,
    keywords: [
      tool.title.toLowerCase(),
      tool.id.replace(/-/g, " "),
      `free ${tool.title.toLowerCase()} online`,
      `${tool.title.toLowerCase()} in browser`,
      `private ${tool.title.toLowerCase()}`,
      `client-side ${tool.title.toLowerCase()}`,
      `${cleanCat.toLowerCase()} tool`,
    ],
  };
}
