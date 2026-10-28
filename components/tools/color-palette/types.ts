export interface SwatchColor {
  hex: string;
  rgb: [number, number, number];
  hsl: [number, number, number];
  percentage: number;
}

export interface StagedColorPaletteFile {
  id: string;
  name: string;
  size: number;
  width: number;
  height: number;
  imageUrl: string;
  imageElement: HTMLImageElement;
}

export interface ColorPaletteOptions {
  colorCount: 5 | 6 | 8 | 10;
  sortOrder: 'dominance' | 'hue' | 'luminance';
}
