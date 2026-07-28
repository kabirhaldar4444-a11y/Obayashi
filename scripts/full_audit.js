import { projects } from '../src/data/worksContent.js';
import { detailedProjectContent } from '../src/data/projectDetails.js';
import fs from 'fs';

console.log('--- FULL PROJECT AUDIT ---');
projects.forEach((p, i) => {
  const det = detailedProjectContent[p.id];
  const imgPath = `./public/images/${p.id}.jpg`;
  const imgExists = fs.existsSync(imgPath);
  console.log(`${i+1}. ID: ${p.id}`);
  console.log(`   Works Title: ${p.title}`);
  console.log(`   Works Loc: ${p.location} [${p.locationCategory}]`);
  console.log(`   Works Cat: ${p.category}`);
  if (det) {
    console.log(`   Details: ${det.romajiName} | ${det.city}, ${det.prefecture}`);
  } else {
    console.log(`   Details: MISSING DETAILED CONTENT`);
  }
  console.log(`   Img: ${imgPath} (Exists: ${imgExists})`);
  console.log('----------------------------------------------------');
});
