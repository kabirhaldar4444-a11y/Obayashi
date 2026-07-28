import { projects } from '../src/data/worksContent.js';
import fs from 'fs';

console.log('Total projects:', projects.length);
projects.forEach((p, i) => {
  const imgPath = `./public/images/${p.id}.jpg`;
  const exists = fs.existsSync(imgPath);
  const size = exists ? fs.statSync(imgPath).size : 0;
  console.log(`${i + 1}. [${p.id}] locCat="${p.locationCategory}" loc="${p.location}" cat="${p.category}"`);
  console.log(`   Title: "${p.title}"`);
  console.log(`   Img: ${imgPath} (${(size / 1024).toFixed(1)} KB)`);
});
