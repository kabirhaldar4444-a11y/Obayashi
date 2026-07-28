import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Top-tier high-resolution photographs strictly matching the project topics
const photoMap = {
  // 1. Haneda Airport Terminal 2 International Expansion: Jet aircraft, terminal gates, apron tarmac
  'work_haneda_airport__100': 'https://images.unsplash.com/photo-1542296332-2e4473faf563?q=80&w=2000&auto=format&fit=crop',

  // 2. Fukutoku & Toyosu District Redevelopment: Waterfront modern glass office towers & urban plaza
  'work_fukutoku_toyosu_101': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop',

  // 3. Azabudai Hills Development: Iconic futuristic Japanese skyscraper & green urban rooftop redevelopment
  'work_azabudai_hills__102': 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=2000&auto=format&fit=crop',

  // 4. Shibuya Sakura Stage Redevelopment: Modern Shibuya high-rise complex & skyway bridges
  'work_shibuya_sakura__103': 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?q=80&w=2000&auto=format&fit=crop',

  // 5. Hokkaido Offshore Wind Power Development: Offshore wind turbines over ocean waters
  'work_hokkaido_offsho_108': 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=2000&auto=format&fit=crop',
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
  console.log('Downloading 5 curated photos to public/images...');
  for (const [id, url] of Object.entries(photoMap)) {
    const dest = path.join(outputDir, `${id}.jpg`);
    console.log(`Downloading ${id} -> ${dest}`);
    await download(url, dest);
    console.log(`Saved ${id}.jpg successfully (${fs.statSync(dest).size} bytes)`);
  }
  console.log('All 5 project photos successfully updated!');
}

run().catch(console.error);
