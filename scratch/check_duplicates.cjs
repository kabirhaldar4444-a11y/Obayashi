const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

const content = fs.readFileSync('./src/data/worksContent.js', 'utf8');
const blocks = content.split('"id":');
const projects = [];

for (let i = 1; i < blocks.length; i++) {
  const block = blocks[i];
  const idMatch = /^\s*"([^"]+)"/.exec(block);
  if (!idMatch) continue;
  const id = idMatch[1];
  const titleMatch = /"title":\s*"([^"]+)"/.exec(block);
  const title = titleMatch ? titleMatch[1] : "Unknown";
  projects.push({ id, title });
}

const hashes = {};
projects.forEach(p => {
  const imgPath = `./public/images/${p.id}.jpg`;
  if (fs.existsSync(imgPath)) {
    const fileBuffer = fs.readFileSync(imgPath);
    const hashSum = crypto.createHash('sha256');
    hashSum.update(fileBuffer);
    const hex = hashSum.digest('hex');
    if (!hashes[hex]) {
      hashes[hex] = [];
    }
    hashes[hex].push(p);
  }
});

let duplicatesCount = 0;
console.log("Duplicate image groups:");
for (const [hex, list] of Object.entries(hashes)) {
  if (list.length > 1) {
    duplicatesCount++;
    console.log(`\nHash: ${hex.substring(0, 10)}...`);
    list.forEach(p => {
      console.log(` - ${p.id}: ${p.title}`);
    });
  }
}
console.log(`\nTotal duplicate groups: ${duplicatesCount}`);
