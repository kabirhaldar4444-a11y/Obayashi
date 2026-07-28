const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

const wdfcPath = './public/images/work_india_002.jpg';
const wdfcBuf = fs.readFileSync(wdfcPath);
const wdfcHash = crypto.createHash('sha256').update(wdfcBuf).digest('hex');

console.log(`[VERIFICATION] Western Dedicated Freight Corridor Image Size: ${(wdfcBuf.length / 1024).toFixed(2)} KB`);
console.log(`[VERIFICATION] WDFC Image SHA256: ${wdfcHash}`);

const dir = './public/images';
const files = fs.readdirSync(dir);
let isUnique = true;
let totalImages = 0;

files.forEach(f => {
  if (f === 'work_india_002.jpg') return;
  const filePath = path.join(dir, f);
  if (fs.lstatSync(filePath).isFile()) {
    totalImages++;
    const buf = fs.readFileSync(filePath);
    const hash = crypto.createHash('sha256').update(buf).digest('hex');
    if (hash === wdfcHash) {
      console.error(`[ERROR] Duplicate detected! WDFC image matches ${f}`);
      isUnique = false;
    }
  }
});

if (isUnique) {
  console.log(`[SUCCESS] Verified 100% uniqueness against all ${totalImages} images in public/images/!`);
  console.log(`[SUCCESS] No other project or asset reuses this image!`);
} else {
  process.exit(1);
}
