const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

const mumbaiPath = './public/images/work_mumbai_ahmedabad_rail_200.jpg';
const mumbaiBuf = fs.readFileSync(mumbaiPath);
const mumbaiHash = crypto.createHash('sha256').update(mumbaiBuf).digest('hex');

console.log(`[VERIFICATION] Mumbai-Ahmedabad Rail Image Size: ${(mumbaiBuf.length / 1024).toFixed(2)} KB`);
console.log(`[VERIFICATION] Mumbai-Ahmedabad Rail Image SHA256: ${mumbaiHash}`);

const dir = './public/images';
const files = fs.readdirSync(dir);
let isUnique = true;
let totalImages = 0;

files.forEach(f => {
  if (f === 'work_mumbai_ahmedabad_rail_200.jpg') return;
  const filePath = path.join(dir, f);
  if (fs.lstatSync(filePath).isFile()) {
    totalImages++;
    const buf = fs.readFileSync(filePath);
    const hash = crypto.createHash('sha256').update(buf).digest('hex');
    if (hash === mumbaiHash) {
      console.error(`[ERROR] Duplicate detected! Mumbai-Ahmedabad image matches ${f}`);
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
