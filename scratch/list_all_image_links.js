import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { projects } from '../src/data/worksContent.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicImagesDir = path.resolve(__dirname, '../public/images');

console.log(`Total projects count: ${projects.length}`);

const report = projects.map((p, idx) => {
  const fileBasename = `${p.id}.jpg`;
  const absolutePath = path.join(publicImagesDir, fileBasename).replace(/\\/g, '/');
  const exists = fs.existsSync(path.join(publicImagesDir, fileBasename));
  const size = exists ? fs.statSync(path.join(publicImagesDir, fileBasename)).size : 0;
  return {
    num: idx + 1,
    id: p.id,
    title: p.title,
    location: p.location,
    category: p.category,
    relativePath: `/images/${fileBasename}`,
    absoluteFileUrl: `file:///${absolutePath}`,
    sizeBytes: size
  };
});

fs.writeFileSync(path.resolve(__dirname, 'all_project_image_links.json'), JSON.stringify(report, null, 2));
console.log('Saved all_project_image_links.json');
