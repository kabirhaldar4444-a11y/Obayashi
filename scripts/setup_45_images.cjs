const fs = require('fs');
const path = require('path');

const imgDir = path.resolve('public/images');
const files = fs.readdirSync(imgDir);

// Find valid image sources (> 80KB)
const validSources = files.filter(f => {
  if (!f.endsWith('.jpg') && !f.endsWith('.png')) return false;
  if (f.startsWith('japan_') || f.startsWith('india_3d')) return false;
  const stat = fs.statSync(path.join(imgDir, f));
  return stat.size > 80000;
});

console.log('Found valid sources:', validSources.length);

for (let i = 1; i <= 45; i++) {
  const numStr = String(i).padStart(3, '0');
  const targetName = `work_india_${numStr}.jpg`;
  const targetPath = path.join(imgDir, targetName);

  // If target already exists and is > 80KB, keep it or re-ensure
  const srcIndex = (i * 3 + 7) % validSources.length;
  const sourceFile = validSources[srcIndex];

  if (!fs.existsSync(targetPath) || fs.statSync(targetPath).size < 10000) {
    fs.copyFileSync(path.join(imgDir, sourceFile), targetPath);
    console.log(`Copied ${sourceFile} -> ${targetName}`);
  } else {
    console.log(`Kept existing ${targetName} (${fs.statSync(targetPath).size} bytes)`);
  }
}
