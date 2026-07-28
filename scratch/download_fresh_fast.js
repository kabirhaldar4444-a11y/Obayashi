import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Tested, ultra-fast high-resolution direct Unsplash images matching projects 2-5
const freshMap = {
  // 2. Fukutoku & Toyosu District Redevelopment: Tokyo bayfront modern towers & commercial waterfront
  'work_fukutoku_toyosu_101': 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1600&auto=format&fit=crop',

  // 3. Azabudai Hills Development: Stunning modern glass skyscraper & elevated green urban landscaping
  'work_azabudai_hills__102': 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1600&auto=format&fit=crop',

  // 4. Shibuya Sakura Stage Redevelopment: Shibuya modern high-rise urban architecture & skyways
  'work_shibuya_sakura__103': 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=1600&auto=format&fit=crop',

  // 5. Hokkaido Offshore Wind Power Development: Offshore wind turbines over ocean waters
  'work_hokkaido_offsho_108': 'https://images.unsplash.com/photo-1548337138-e87d889cc369?q=80&w=1600&auto=format&fit=crop',
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
  console.log('Downloading fresh images 2-5...');
  for (const [id, url] of Object.entries(freshMap)) {
    const dest = path.join(outputDir, `${id}.jpg`);
    console.log(`Downloading ${id}...`);
    await downloadFile(url, dest);
    console.log(`Saved ${id}.jpg (${fs.statSync(dest).size} bytes)`);
  }
  console.log('All fresh images 2-5 successfully downloaded!');
}

run().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
