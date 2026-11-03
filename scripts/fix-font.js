const fs = require('fs');
const filePath = 'app/layout.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const target = `const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});`;

const replacement = `const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});`;

// Normalize line endings for replacement
const normalizedContent = content.replace(/\r\n/g, '\n');
const normalizedTarget = target.replace(/\r\n/g, '\n');

if (normalizedContent.includes(normalizedTarget)) {
  const isCRLF = content.includes('\r\n');
  const normalizedReplacement = replacement.replace(/\r\n/g, '\n');
  let newContent = normalizedContent.replace(normalizedTarget, normalizedReplacement);
  if (isCRLF) {
    newContent = newContent.replace(/\n/g, '\r\n');
  }
  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log('SUCCESS');
} else {
  console.error('Target not found in normalized content');
  process.exit(1);
}

