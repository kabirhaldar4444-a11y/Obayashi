const fs = require('fs');
const content = fs.readFileSync('./src/data/worksContent.js', 'utf8');

// We want to find each project block to ensure we match the right id with the right title
// Each project starts with { and ends with } (approx)
// Let's do a more robust match: split by "id":
const blocks = content.split('"id":');
const results = [];

for (let i = 1; i < blocks.length; i++) {
  const block = blocks[i];
  const idMatch = /^\s*"([^"]+)"/.exec(block);
  if (!idMatch) continue;
  const id = idMatch[1];
  
  const titleMatch = /"title":\s*"([^"]+)"/.exec(block);
  const title = titleMatch ? titleMatch[1] : "Unknown";
  
  results.push({ id, title });
}

console.log(`Found ${results.length} projects.`);
let missingCount = 0;
results.forEach(p => {
  const imgPath = `./public/images/${p.id}.jpg`;
  if (!fs.existsSync(imgPath)) {
    missingCount++;
    console.log(`MISSING: ${p.id} - ${p.title}`);
  }
});
console.log(`Total missing: ${missingCount}`);
