const fs = require("fs");
const path = require("path");

const outPath = path.join(__dirname, "..", "app", "favicon.ico");

function setPixel(pixels, width, height, x, y, rgba) {
  if (x < 0 || y < 0 || x >= width || y >= height) return;
  const i = (y * width + x) * 4;
  pixels[i] = rgba[0];
  pixels[i + 1] = rgba[1];
  pixels[i + 2] = rgba[2];
  pixels[i + 3] = rgba[3];
}

function inRoundRect(x, y, left, top, right, bottom, radius) {
  if (x < left || x >= right || y < top || y >= bottom) return false;
  const cx = x < left + radius ? left + radius : x >= right - radius ? right - radius - 1 : x;
  const cy = y < top + radius ? top + radius : y >= bottom - radius ? bottom - radius - 1 : y;
  const dx = x - cx;
  const dy = y - cy;
  return dx * dx + dy * dy <= radius * radius;
}

const glyphs = {
  S: ["11110", "10000", "10000", "11110", "00001", "00001", "11110"],
  B: ["11110", "10001", "10001", "11110", "10001", "10001", "11110"],
};

function drawGlyph(pixels, width, height, char, startX, startY, scale, color) {
  const rows = glyphs[char];
  rows.forEach((row, y) => {
    [...row].forEach((cell, x) => {
      if (cell !== "1") return;
      for (let yy = 0; yy < scale; yy += 1) {
        for (let xx = 0; xx < scale; xx += 1) {
          setPixel(pixels, width, height, startX + x * scale + xx, startY + y * scale + yy, color);
        }
      }
    });
  });
}

function createImage(size) {
  const pixels = Buffer.alloc(size * size * 4);
  const blue = [37, 99, 235, 255];
  const blueDark = [29, 78, 216, 255];
  const white = [255, 255, 255, 255];
  const slate = [15, 23, 42, 255];
  const green = [22, 163, 74, 255];

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      if (inRoundRect(x, y, 1, 1, size - 1, size - 1, Math.round(size * 0.22))) {
        const t = (x + y) / (size * 2);
        setPixel(pixels, size, size, x, y, [
          Math.round(blue[0] * (1 - t) + blueDark[0] * t),
          Math.round(blue[1] * (1 - t) + blueDark[1] * t),
          Math.round(blue[2] * (1 - t) + blueDark[2] * t),
          255,
        ]);
      }
    }
  }

  const paperLeft = Math.round(size * 0.23);
  const paperTop = Math.round(size * 0.16);
  const paperRight = Math.round(size * 0.77);
  const paperBottom = Math.round(size * 0.84);
  const paperRadius = Math.max(2, Math.round(size * 0.08));

  for (let y = paperTop; y < paperBottom; y += 1) {
    for (let x = paperLeft; x < paperRight; x += 1) {
      if (inRoundRect(x, y, paperLeft, paperTop, paperRight, paperBottom, paperRadius)) {
        setPixel(pixels, size, size, x, y, white);
      }
    }
  }

  const headerHeight = Math.max(3, Math.round(size * 0.16));
  for (let y = paperTop + 2; y < paperTop + headerHeight; y += 1) {
    for (let x = paperLeft + 3; x < paperRight - 3; x += 1) {
      setPixel(pixels, size, size, x, y, [219, 234, 254, 255]);
    }
  }

  const lineStart = paperTop + Math.round(size * 0.38);
  for (let i = 0; i < 3; i += 1) {
    const y = lineStart + i * Math.max(3, Math.round(size * 0.1));
    for (let x = paperLeft + 4; x < paperRight - 4; x += 1) {
      setPixel(pixels, size, size, x, y, i === 2 ? green : [148, 163, 184, 255]);
    }
  }

  const scale = Math.max(1, Math.floor(size / 32));
  const glyphY = paperTop + Math.round(size * 0.05);
  drawGlyph(pixels, size, size, "S", paperLeft + Math.round(size * 0.12), glyphY, scale, slate);
  drawGlyph(pixels, size, size, "B", paperLeft + Math.round(size * 0.36), glyphY, scale, slate);

  return pixels;
}

function createBmpIcon(size) {
  const rgba = createImage(size);
  const xorSize = size * size * 4;
  const maskStride = Math.ceil(size / 32) * 4;
  const andSize = maskStride * size;
  const dib = Buffer.alloc(40 + xorSize + andSize);

  dib.writeUInt32LE(40, 0);
  dib.writeInt32LE(size, 4);
  dib.writeInt32LE(size * 2, 8);
  dib.writeUInt16LE(1, 12);
  dib.writeUInt16LE(32, 14);
  dib.writeUInt32LE(0, 16);
  dib.writeUInt32LE(xorSize + andSize, 20);

  let offset = 40;
  for (let y = size - 1; y >= 0; y -= 1) {
    for (let x = 0; x < size; x += 1) {
      const source = (y * size + x) * 4;
      dib[offset] = rgba[source + 2];
      dib[offset + 1] = rgba[source + 1];
      dib[offset + 2] = rgba[source];
      dib[offset + 3] = rgba[source + 3];
      offset += 4;
    }
  }

  return dib;
}

const sizes = [16, 32, 48, 64];
const images = sizes.map((size) => ({ size, data: createBmpIcon(size) }));
const headerSize = 6 + images.length * 16;
let imageOffset = headerSize;
const fileSize = headerSize + images.reduce((sum, image) => sum + image.data.length, 0);
const ico = Buffer.alloc(fileSize);

ico.writeUInt16LE(0, 0);
ico.writeUInt16LE(1, 2);
ico.writeUInt16LE(images.length, 4);

images.forEach((image, index) => {
  const entry = 6 + index * 16;
  ico[entry] = image.size;
  ico[entry + 1] = image.size;
  ico[entry + 2] = 0;
  ico[entry + 3] = 0;
  ico.writeUInt16LE(1, entry + 4);
  ico.writeUInt16LE(32, entry + 6);
  ico.writeUInt32LE(image.data.length, entry + 8);
  ico.writeUInt32LE(imageOffset, entry + 12);
  image.data.copy(ico, imageOffset);
  imageOffset += image.data.length;
});

fs.writeFileSync(outPath, ico);
console.log(`Created ${outPath} (${ico.length} bytes)`);
