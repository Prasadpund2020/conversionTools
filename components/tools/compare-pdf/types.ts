export type CompareViewMode = "split-side-by-side" | "slider-diff" | "overlay-difference";

export interface StagedComparePdf {
  id: string;
  name: string;
  size: number;
  pageCount: number;
  bytes: Uint8Array;
}

export interface CompareOptions {
  viewMode: CompareViewMode;
  sliderPosition: number; // 0 to 100
  highlightDifferences: boolean;
  activePage: number;
  zoomLevel: number;
}

export interface PageDiffSummary {
  pageNumber: number;
  isDifferent: boolean;
  similarityScore: number; // 0 to 100
  sizeDifferenceBytes: number;
}

export interface CompareAuditResult {
  docAName: string;
  docBName: string;
  totalPagesA: number;
  totalPagesB: number;
  pageDiffs: PageDiffSummary[];
  overallSimilarity: number;
}
