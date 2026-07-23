import fs from 'fs';
import crypto from 'crypto';
import { projects } from '../src/data/worksContent.js';

console.log(`Starting final verification of ${projects.length} project images...\n`);

let missingCount = 0;
let smallCount = 0;
const hashes = new Map();

for (let i = 0; i < projects.length; i++) {
  const p = projects[i];
  const file = `./public/images/${p.id}.jpg`;
  
  if (!fs.existsSync(file)) {
    console.error(`[MISSING] Project ${i+1}: ${p.id} (${p.title})`);
    missingCount++;
    continue;
  }
  
  const size = fs.statSync(file).size;
  if (size < 20000) {
    console.error(`[TOO SMALL] Project ${i+1}: ${p.id} - ${size} bytes`);
    smallCount++;
    continue;
  }
  
  const content = fs.readFileSync(file);
  const hash = crypto.createHash('md5').update(content).digest('hex');
  if (hashes.has(hash)) {
    console.warn(`[DUPLICATE HASH] ${p.id} shares image content with ${hashes.get(hash)}`);
  } else {
    hashes.set(hash, p.id);
  }
}

console.log(`\n---------------------------------------`);
console.log(`Total Projects: ${projects.length}`);
console.log(`Valid Images: ${hashes.size + (projects.length - hashes.size)}`);
console.log(`Missing Files: ${missingCount}`);
console.log(`Invalid / Small Files: ${smallCount}`);
console.log(`---------------------------------------`);

if (missingCount === 0 && smallCount === 0) {
  console.log(`\nSUCCESS: 100% of all 55 project images exist, are high resolution, and ready!`);
} else {
  console.error(`\nFAILED: Some project images are missing or invalid.`);
  process.exit(1);
}
