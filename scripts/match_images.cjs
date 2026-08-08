const fs = require('fs');
const path = require('path');

const dir = 'public/OBAYASHI Indian Project';
const files = fs.readdirSync(dir);

console.log('Total files in OBAYASHI Indian Project:', files.length);

const worksContent = fs.readFileSync('src/data/worksContent.js', 'utf8');
const projectsMatch = worksContent.match(/export const projects = (\[[\s\S]*?\]);/);
const projects = eval(projectsMatch[1]);
const indianProjects = projects.filter(p => p.locationCategory === 'India');

console.log('Total Indian projects in data:', indianProjects.length);

function normalize(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

const fileMap = {};
files.forEach(f => {
  const nameWithoutExt = path.parse(f).name;
  fileMap[normalize(nameWithoutExt)] = f;
});

const matched = [];
const missing = [];

indianProjects.forEach((p, idx) => {
  const normTitle = normalize(p.title);
  let foundFile = fileMap[normTitle];

  // Try flexible matching if not exact match
  if (!foundFile) {
    for (const f of files) {
      const normFile = normalize(path.parse(f).name);
      if (normTitle.includes(normFile) || normFile.includes(normTitle)) {
        foundFile = f;
        break;
      }
      // Specific checks
      if (p.title.includes('East Coast') && f.includes('East Coast')) {
        foundFile = f;
        break;
      }
      if (p.title.includes('Indore') && f.includes('Indore') && p.title.includes('Smart') && f.includes('Smart')) {
        foundFile = f;
        break;
      }
    }
  }

  if (foundFile) {
    matched.push({ slNo: idx + 1, id: p.id, title: p.title, file: foundFile });
  } else {
    missing.push({ slNo: idx + 1, id: p.id, title: p.title });
  }
});

console.log('\n--- MATCHED (' + matched.length + ' / ' + indianProjects.length + ') ---');
matched.forEach(m => console.log(`${m.slNo}. [${m.id}] ${m.title} -> ${m.file}`));

console.log('\n--- MISSING (' + missing.length + ') ---');
missing.forEach(m => console.log(`${m.slNo}. [${m.id}] ${m.title}`));

const matchedFileNames = new Set(matched.map(m => m.file));
const unusedFiles = files.filter(f => !matchedFileNames.has(f));
console.log('\n--- UNUSED FILES IN FOLDER (' + unusedFiles.length + ') ---');
unusedFiles.forEach(f => console.log(f));
