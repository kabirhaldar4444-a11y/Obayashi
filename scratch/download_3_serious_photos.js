import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Explicitly chosen, 100% relevant, serious exterior architectural photography
const seriousPhotoMap = {
  // 1. Fukutoku & Toyosu District Redevelopment: Clean modern glass office tower in commercial business district
  'work_fukutoku_toyosu_101': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop',

  // 2. Azabudai Hills Development: Stunning high-rise skyscraper exterior facade soaring into the sky
  'work_azabudai_hills__102': 'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=1600&auto=format&fit=crop',

  // 3. Shibuya Sakura Stage Redevelopment: Modern glass commercial tower & urban office complex exterior
  'work_shibuya_sakura__103': 'https://images.unsplash.com/photo-1555636222-cae831e670b3?q=80&w=1600&auto=format&fit=crop',
};

const outputDir = path.resolve(__dirname, '../public/images');

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve());
      });
    });
    req.on('error', reject);
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error(`Timeout downloading ${url}`));
    });
  });
}

async function run() {
  console.log('Downloading 100% relevant architectural photos for the 3 projects...');
  for (const [id, url] of Object.entries(seriousPhotoMap)) {
    const dest = path.join(outputDir, `${id}.jpg`);
    console.log(`Downloading ${id}...`);
    await downloadFile(url, dest);
    console.log(`Successfully saved ${id}.jpg (${fs.statSync(dest).size} bytes)`);
  }
  console.log('All 3 project photos replaced with authentic architectural photography!');
}

run().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
