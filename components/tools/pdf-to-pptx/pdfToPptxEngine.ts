import JSZip from 'jszip';
import { PDFDocument } from 'pdf-lib';
import {
  StagedPdfToPptxFile,
  PptxOptions,
  PptxResult,
} from './types';

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
}

export async function parsePdfForPptx(file: File): Promise<StagedPdfToPptxFile> {
  const arrayBuffer = await file.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);
  const pdfDoc = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const pageCount = pdfDoc.getPageCount();

  return {
    id: `pdf-pptx-${Date.now()}`,
    name: file.name,
    size: file.size,
    bytes,
    pageCount,
  };
}

/**
 * Converts PDF pages into slides inside a valid OpenXML (.pptx) presentation
 */
export async function convertPdfToPptx(
  file: StagedPdfToPptxFile,
  options: PptxOptions,
  onProgress?: (progress: number, status: string) => void
): Promise<PptxResult> {
  const pdfjsLib = await import('pdfjs-dist');
  if (typeof window !== 'undefined') {
    pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdfjs/pdf.worker.min.mjs';
  }

  const pdf = await pdfjsLib.getDocument({ data: file.bytes as any }).promise;
  const numPages = pdf.numPages;

  const zip = new JSZip();

  // Slide dimensions in EMUs (English Metric Units: 1 pt = 12700 EMUs, 1 inch = 914400 EMUs)
  // 16:9 Widescreen standard: 13.333 x 7.5 inches = 12192000 x 6858000 EMUs
  // 4:3 Standard: 10 x 7.5 inches = 9144000 x 6858000 EMUs
  let slideCx = 12192000;
  let slideCy = 6858000;

  if (options.ratio === '4:3') {
    slideCx = 9144000;
    slideCy = 6858000;
  }

  // 1. [Content_Types].xml
  let contentTypesXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Default Extension="jpeg" ContentType="image/jpeg"/>
  <Default Extension="jpg" ContentType="image/jpeg"/>
  <Override PartName="/ppt/presentation.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml"/>`;

  // 2. ppt/_rels/presentation.xml.rels
  let presRelsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">`;

  // 3. ppt/presentation.xml slide list
  let sldIdLst = '';

  // Render each page to an image and add slide XML
  for (let p = 1; p <= numPages; p++) {
    if (onProgress) {
      onProgress(Math.round(((p - 1) / numPages) * 90), `Rendering slide ${p} of ${numPages}...`);
    }

    const page = await pdf.getPage(p);
    const viewport = page.getViewport({ scale: 2.0 }); // 2x scale for crisp slide rendering

    const canvas = document.createElement('canvas');
    canvas.width = Math.round(viewport.width);
    canvas.height = Math.round(viewport.height);
    const ctx = canvas.getContext('2d');

    if (ctx) {
      await (page.render({
        canvasContext: ctx,
        viewport,
        canvas,
      } as any)).promise;
    }

    const imgBase64 = canvas.toDataURL('image/jpeg', options.quality || 0.88).split(',')[1];
    zip.file(`ppt/media/image${p}.jpg`, imgBase64, { base64: true });

    // Append to Content_Types
    contentTypesXml += `
  <Override PartName="/ppt/slides/slide${p}.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>`;

    // Append to presentation.xml.rels
    presRelsXml += `
  <Relationship Id="rId${p}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide${p}.xml"/>`;

    // Append to sldIdLst
    sldIdLst += `
      <p:sldId id="${255 + p}" r:id="rId${p}"/>`;

    // Individual slide XML
    const slideXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:cSld>
    <p:spTree>
      <p:nvGrpSpPr>
        <p:cNvPr id="1" name=""/>
        <p:cNvGrpSpPr/>
        <p:nvPr/>
      </p:nvGrpSpPr>
      <p:grpSpPr>
        <a:xfrm>
          <a:off x="0" y="0"/>
          <a:ext cx="0" cy="0"/>
          <a:chOff x="0" y="0"/>
          <a:chExt cx="0" cy="0"/>
        </a:xfrm>
      </p:grpSpPr>
      <p:pic>
        <p:nvPicPr>
          <p:cNvPr id="2" name="Slide Image ${p}"/>
          <p:cNvPicPr>
            <a:picLocks noChangeAspect="1"/>
          </p:cNvPicPr>
          <p:nvPr/>
        </p:nvPicPr>
        <p:blipFill>
          <a:blip r:embed="rId1"/>
          <a:stretch>
            <a:fillRect/>
          </a:stretch>
        </p:blipFill>
        <p:spPr>
          <a:xfrm>
            <a:off x="0" y="0"/>
            <a:ext cx="${slideCx}" cy="${slideCy}"/>
          </a:xfrm>
          <a:prstGeom prst="rect">
            <a:avLst/>
          </a:prstGeom>
        </p:spPr>
      </p:pic>
    </p:spTree>
  </p:cSld>
  <p:clrMapOvr>
    <a:masterClrMapping/>
  </p:clrMapOvr>
</p:sld>`;
    zip.file(`ppt/slides/slide${p}.xml`, slideXml);

    // Slide rels
    const slideRelsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="../media/image${p}.jpg"/>
</Relationships>`;
    zip.file(`ppt/slides/_rels/slide${p}.xml.rels`, slideRelsXml);
  }

  contentTypesXml += `
</Types>`;
  zip.file('[Content_Types].xml', contentTypesXml);

  presRelsXml += `
</Relationships>`;
  zip.file('ppt/_rels/presentation.xml.rels', presRelsXml);

  // Root _rels/.rels
  const rootRelsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="ppt/presentation.xml"/>
</Relationships>`;
  zip.file('_rels/.rels', rootRelsXml);

  // ppt/presentation.xml
  const presentationXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:presentation xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:sldMasterIdLst/>
  <p:sldIdLst>${sldIdLst}
  </p:sldIdLst>
  <p:sldSz cx="${slideCx}" cy="${slideCy}" type="${options.ratio === '4:3' ? 'screen4x3' : 'screen16x9'}"/>
  <p:notesSz cx="6858000" cy="9144000"/>
</p:presentation>`;
  zip.file('ppt/presentation.xml', presentationXml);

  if (onProgress) {
    onProgress(95, 'Packaging OpenXML .pptx bundle...');
  }

  const pptxBlob = await zip.generateAsync({
    type: 'blob',
    mimeType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    compression: 'DEFLATE',
  });

  const downloadUrl = URL.createObjectURL(pptxBlob);
  const baseName = file.name.replace(/\.[^/.]+$/, '');
  const fileName = `${baseName}_presentation.pptx`;

  return {
    blob: pptxBlob,
    downloadUrl,
    fileName,
    slideCount: numPages,
    sizeBytes: pptxBlob.size,
  };
}
