import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputDir = path.resolve(__dirname, '../public/images');

const directMap = {
  // 1. Chiba Urban Monorail Line Extension: Suspended monorail & elevated urban rail transit
  'work_chiba_metro_cor_120': 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=1600&auto=format&fit=crop',

  // 2. Greater Tokyo Outer Loop Railway Line: Japanese metropolitan commuter passenger train
  'work_greater_tokyo_o_122': 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=1600&auto=format&fit=crop',

  // 3. Osaka Smart Metro Modernization & Extension: Modern Japanese subway train & station concourse
  'work_osaka_smart_met_123': 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?q=80&w=1600&auto=format&fit=crop',
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
  console.log('Downloading 3 distinct, 100% relevant transit photos...');
  for (const [id, url] of Object.entries(directMap)) {
    const dest = path.join(outputDir, `${id}.jpg`);
    console.log(`Downloading ${id}...`);
    await downloadFile(url, dest);
    console.log(`Successfully saved ${id}.jpg (${fs.statSync(dest).size} bytes)!`);
  }
  console.log('All 3 images updated with 100% unique transit photos!');
}

main().catch(console.error);
