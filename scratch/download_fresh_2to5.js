import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Completely fresh, newly selected photorealistic images for projects 2 through 5
const freshMap = {
  // 2. Fukutoku & Toyosu District Redevelopment: Tokyo waterfront skyline & commercial glass towers
  'work_fukutoku_toyosu_101': 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=2000&auto=format&fit=crop',

  // 3. Azabudai Hills Development: Stunning modern glass skyscraper with green landscaping
  'work_azabudai_hills__102': 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2000&auto=format&fit=crop',

  // 4. Shibuya Sakura Stage Redevelopment: Shibuya modern high-rise urban architecture & skyways
  'work_shibuya_sakura__103': 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=2000&auto=format&fit=crop',

  // 5. Hokkaido Offshore Wind Power Development: Offshore wind turbine generators in open ocean waters
  'work_hokkaido_offsho_108': 'https://images.unsplash.com/photo-1548337138-e87d889cc369?q=80&w=2000&auto=format&fit=crop',
};

const outputDir = path.resolve(__dirname, '../public/images');

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return download(response.headers.location, dest).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve(dest));
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  console.log('Downloading fresh images for projects 2 to 5...');
  for (const [id, url] of Object.entries(freshMap)) {
    const dest = path.join(outputDir, `${id}.jpg`);
    console.log(`Downloading ${id} -> ${dest}`);
    await download(url, dest);
    console.log(`Saved ${id}.jpg successfully (${fs.statSync(dest).size} bytes)`);
  }
  console.log('Fresh images 2-5 successfully updated!');
}

run().catch(console.error);
