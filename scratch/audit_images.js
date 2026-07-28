const fs = require('fs');
const content = fs.readFileSync('./src/data/worksContent.js', 'utf8');

// Let's find all project definitions. We can find the "id" fields.
const idRegex = /"id":\s*"([^"]+)"/g;
const titleRegex = /"title":\s*"([^"]+)"/g;

let matches;
const ids = [];
while ((matches = idRegex.exec(content)) !== null) {
  ids.push(matches[1]);
}

const titles = [];
let tMatches;
while ((tMatches = titleRegex.exec(content)) !== null) {
  titles.push(tMatches[1]);
}

console.log(`Found ${ids.length} projects.`);
let missingCount = 0;
for (let i = 0; i < ids.length; i++) {
  const id = ids[i];
  const title = titles[i] || "Unknown";
  const imgPath = `./public/images/${id}.jpg`;
  if (!fs.existsSync(imgPath)) {
    missingCount++;
    console.log(`MISSING: ${id} - ${title}`);
  }
}
console.log(`Total missing: ${missingCount}`);
