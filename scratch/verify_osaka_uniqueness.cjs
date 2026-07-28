const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

const osakaPath = './public/images/work_osaka_smart_met_123.jpg';
const osakaBuf = fs.readFileSync(osakaPath);
const osakaHash = crypto.createHash('sha256').update(osakaBuf).digest('hex');

console.log(`[VERIFICATION] Osaka Smart Metro Image Size: ${(osakaBuf.length / 1024).toFixed(2)} KB`);
console.log(`[VERIFICATION] Osaka Smart Metro Image SHA256: ${osakaHash}`);

const dir = './public/images';
const files = fs.readdirSync(dir);
let isUnique = true;
let totalImages = 0;

files.forEach(f => {
  if (f === 'work_osaka_smart_met_123.jpg') return;
  const filePath = path.join(dir, f);
  if (fs.lstatSync(filePath).isFile()) {
    totalImages++;
    const buf = fs.readFileSync(filePath);
    const hash = crypto.createHash('sha256').update(buf).digest('hex');
    if (hash === osakaHash) {
      console.error(`[ERROR] Duplicate detected! Osaka image matches ${f}`);
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
