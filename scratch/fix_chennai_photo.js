import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dest = path.resolve(__dirname, '../public/images/work_india_005.jpg');

function getJson(url) {
  return new Promise((resolve, reject) => {
    const opts = { headers: { 'User-Agent': 'ObayashiWikiFetcher/1.0 (contact@obayashi.co.jp)' } };
    https.get(url, opts, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch(e) { reject(e); }
      });
    }).on('error', reject);
  });
}

function downloadFile(url, targetPath) {
  return new Promise((resolve, reject) => {
    const opts = { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } };
    https.get(url, opts, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return downloadFile(res.headers.location, targetPath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      const file = fs.createWriteStream(targetPath);
      res.pipe(file);
      file.on('finish', () => file.close(() => resolve()));
    }).on('error', reject);
  });
}

async function main() {
  console.log('Searching Wikipedia API for Chennai Outer Ring Road / Ring Road Expressway...');
  const searchQueries = ['Outer_Ring_Road,_Chennai', 'Chennai_Bypass'];
  let imgUrl = null;

  for (const q of searchQueries) {
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${q}&prop=pageimages&format=json&pithumbsize=1600`;
    const data = await getJson(searchUrl);
    const pages = data.query?.pages;
    if (pages) {
      for (const pageId in pages) {
        if (pages[pageId].thumbnail?.source) {
          imgUrl = pages[pageId].thumbnail.source;
          break;
        }
      }
    }
    if (imgUrl) break;
  }

  // Backup reliable high-res ring road / multi-lane expressway photograph
  if (!imgUrl) {
    imgUrl = 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1600&auto=format&fit=crop';
  }

  console.log(`Downloading Chennai Peripheral Ring Road image from: ${imgUrl}`);
  await downloadFile(imgUrl, dest);
  console.log(`Successfully saved work_india_005.jpg (${fs.statSync(dest).size} bytes)!`);
}

main().catch(console.error);
