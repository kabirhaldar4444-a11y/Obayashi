const fs = require('fs');
const path = require('path');

const srcDir = 'public/OBAYASHI Indian Project';
const destDir = 'public/images';

const worksContent = fs.readFileSync('src/data/worksContent.js', 'utf8');
const projectsMatch = worksContent.match(/export const projects = (\[[\s\S]*?\]);/);
const projects = eval(projectsMatch[1]);
const indianProjects = projects.filter(p => p.locationCategory === 'India');

const files = fs.readdirSync(srcDir);

function normalize(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

const fileMap = {};
files.forEach(f => {
  const nameWithoutExt = path.parse(f).name;
  fileMap[normalize(nameWithoutExt)] = f;
});

const mappings = [];
const missing = [];

indianProjects.forEach((p, idx) => {
  const normTitle = normalize(p.title);
  let foundFile = fileMap[normTitle];

  if (!foundFile) {
    for (const f of files) {
      const normFile = normalize(path.parse(f).name);
      if (normTitle.includes(normFile) || normFile.includes(normTitle)) {
        foundFile = f;
        break;
      }
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
    const srcPath = path.join(srcDir, foundFile);
    const targetJpg = path.join(destDir, `${p.id}.jpg`);
    
    // Copy the file
    fs.copyFileSync(srcPath, targetJpg);
    
    // Also copy with original extension if png or jpeg
    const ext = path.extname(foundFile).toLowerCase();
    if (ext !== '.jpg') {
      const targetOrigExt = path.join(destDir, `${p.id}${ext}`);
      fs.copyFileSync(srcPath, targetOrigExt);
    }

    const stat = fs.statSync(srcPath);
    mappings.push({
      slNo: idx + 1,
      id: p.id,
      title: p.title,
      sourceFile: foundFile,
      sizeKB: Math.round(stat.size / 1024)
    });
  } else {
    missing.push({
      slNo: idx + 1,
      id: p.id,
      title: p.title
    });
  }
});

console.log(`Successfully mapped and copied ${mappings.length} / ${indianProjects.length} images.`);
mappings.forEach(m => {
  console.log(`✓ [${m.slNo}] ${m.title} -> ${m.sourceFile} (${m.sizeKB} KB)`);
});

if (missing.length > 0) {
  console.log(`\n⚠️ Missing Images (${missing.length}):`);
  missing.forEach(m => {
    console.log(`- [Sl No. ${m.slNo}] "${m.title}" (${m.id})`);
  });
}
