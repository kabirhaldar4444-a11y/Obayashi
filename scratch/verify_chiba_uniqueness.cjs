const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

const chibaPath = './public/images/work_chiba_metro_cor_120.jpg';
const chibaBuf = fs.readFileSync(chibaPath);
const chibaHash = crypto.createHash('sha256').update(chibaBuf).digest('hex');

console.log(`[VERIFICATION] Chiba Image Size: ${(chibaBuf.length / 1024).toFixed(2)} KB`);
console.log(`[VERIFICATION] Chiba Image SHA256: ${chibaHash}`);

const dir = './public/images';
const files = fs.readdirSync(dir);
let isUnique = true;
let totalImages = 0;

files.forEach(f => {
  if (f === 'work_chiba_metro_cor_120.jpg') return;
  const filePath = path.join(dir, f);
  if (fs.lstatSync(filePath).isFile()) {
    totalImages++;
    const buf = fs.readFileSync(filePath);
    const hash = crypto.createHash('sha256').update(buf).digest('hex');
    if (hash === chibaHash) {
      console.error(`[ERROR] Duplicate detected! Chiba image matches ${f}`);
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
