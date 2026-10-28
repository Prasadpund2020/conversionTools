export type CensorMode = 'blur' | 'pixelate' | 'blackout';
export type CensorShape = 'rect' | 'ellipse';

export interface CensorRegion {
  id: string;
  x: number; // percentage [0, 1] of image width
  y: number; // percentage [0, 1] of image height
  width: number; // percentage [0, 1]
  height: number; // percentage [0, 1]
  mode: CensorMode;
  shape: CensorShape;
  intensity: number; // radius for blur (5-30), pixel size for pixelate (6-32)
}

export interface StagedImageFile {
  id: string;
  name: string;
  size: number;
  type: string;
  width: number;
  height: number;
  imageUrl: string;
  imageElement: HTMLImageElement;
}

export interface BlurFaceOptions {
  activeMode: CensorMode;
  activeShape: CensorShape;
  intensity: number;
}
