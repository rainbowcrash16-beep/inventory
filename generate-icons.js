// generate-icons.js
// Run with: node generate-icons.js
// Requires: npm install canvas

const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const outDir = path.join(__dirname, 'icons');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

function drawIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  const pad = size * 0.1;
  const r = size * 0.22;

  // Background
  ctx.fillStyle = '#0A0A0F';
  ctx.fillRect(0, 0, size, size);

  // Rounded background card
  ctx.beginPath();
  ctx.roundRect(pad, pad, size - pad * 2, size - pad * 2, r);
  ctx.fillStyle = '#12121A';
  ctx.fill();
  ctx.strokeStyle = '#1E1E2E';
  ctx.lineWidth = size * 0.02;
  ctx.stroke();

  // House icon
  const cx = size / 2;
  const cy = size / 2;
  const hs = size * 0.28;

  ctx.strokeStyle = '#00D4AA';
  ctx.lineWidth = size * 0.055;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  // Roof
  ctx.beginPath();
  ctx.moveTo(cx - hs, cy + hs * 0.1);
  ctx.lineTo(cx, cy - hs);
  ctx.lineTo(cx + hs, cy + hs * 0.1);
  ctx.stroke();

  // Walls
  ctx.beginPath();
  ctx.moveTo(cx - hs * 0.7, cy + hs * 0.1);
  ctx.lineTo(cx - hs * 0.7, cy + hs);
  ctx.lineTo(cx + hs * 0.7, cy + hs);
  ctx.lineTo(cx + hs * 0.7, cy + hs * 0.1);
  ctx.stroke();

  // Door
  ctx.beginPath();
  ctx.moveTo(cx - hs * 0.18, cy + hs);
  ctx.lineTo(cx - hs * 0.18, cy + hs * 0.45);
  ctx.lineTo(cx + hs * 0.18, cy + hs * 0.45);
  ctx.lineTo(cx + hs * 0.18, cy + hs);
  ctx.stroke();

  return canvas;
}

sizes.forEach(size => {
  const canvas = drawIcon(size);
  const buf = canvas.toBuffer('image/png');
  const outPath = path.join(outDir, `icon-${size}.png`);
  fs.writeFileSync(outPath, buf);
  console.log(`✔ Generated icon-${size}.png`);
});

console.log('\nAll icons generated in ./icons/');
