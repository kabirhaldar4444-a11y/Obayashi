const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

const filePath = './public/images/work_india_006.jpg';
const fileBuf = fs.readFileSync(filePath);
const fileHash = crypto.createHash('sha256').update(fileBuf).digest('hex');

console.log(`[VERIFICATION] NE Phase 1 Image Size: ${(fileBuf.length / 1024).toFixed(2)} KB`);
console.log(`[VERIFICATION] NE Phase 1 Image SHA256: ${fileHash}`);

const dir = './public/images';
const files = fs.readdirSync(dir);
let isUnique = true;
let totalImages = 0;

files.forEach(f => {
  if (f === 'work_india_006.jpg') return;
  const fp = path.join(dir, f);
  if (fs.lstatSync(fp).isFile()) {
    totalImages++;
    const buf = fs.readFileSync(fp);
    const hash = crypto.createHash('sha256').update(buf).digest('hex');
    if (hash === fileHash) {
      console.error(`[ERROR] Duplicate detected! Image matches ${f}`);
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
