import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputDir = path.resolve(__dirname, '../public/images');

const directMap = {
  // Phase I: Mountain highway winding through hills
  'work_india_006': 'https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=1600&auto=format&fit=crop',

  // Phase II: High-altitude mountain pass road & bridge infrastructure
  'work_india_007': 'https://images.unsplash.com/photo-1544984243-ec57ea16fe25?q=80&w=1600&auto=format&fit=crop',

  // Phase III: Curved mountain highway corridor with retaining wall structure
  'work_india_008': 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1600&auto=format&fit=crop',
};

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const opts = { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } };
    https.get(url, opts, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => file.close(() => resolve()));
    }).on('error', reject);
  });
}

async function main() {
  console.log('Downloading 3 distinct mountain highway photos for North East Road Network...');
  for (const [id, url] of Object.entries(directMap)) {
    const dest = path.join(outputDir, `${id}.jpg`);
    console.log(`Downloading ${id}...`);
    await downloadFile(url, dest);
    console.log(`Successfully saved ${id}.jpg (${fs.statSync(dest).size} bytes)!`);
  }
  console.log('All 3 North East Road Network photos updated successfully!');
}

main().catch(console.error);
