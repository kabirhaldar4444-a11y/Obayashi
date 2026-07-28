import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dest = path.resolve(__dirname, '../public/images/work_osaka_smart_met_123.jpg');

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
    const opts = { headers: { 'User-Agent': 'ObayashiWikiFetcher/1.0 (contact@obayashi.co.jp)' } };
    https.get(url, opts, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return downloadFile(res.headers.location, targetPath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode}`));
      const file = fs.createWriteStream(targetPath);
      res.pipe(file);
      file.on('finish', () => file.close(() => resolve()));
    }).on('error', reject);
  });
}

async function main() {
  console.log('Searching Wikipedia API for distinct Osaka Metro Midosuji Line 30000 series photo...');
  const searchQueries = ['Osaka_Metro_30000_series', 'Midosuji_Line'];
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

  if (!imgUrl) {
    imgUrl = 'https://images.unsplash.com/photo-1578637387939-43c525550085?q=80&w=1600&auto=format&fit=crop';
  }

  console.log(`Downloading distinct image for Osaka Smart Metro: ${imgUrl}`);
  await downloadFile(imgUrl, dest);
  console.log(`Successfully saved unique work_osaka_smart_met_123.jpg (${fs.statSync(dest).size} bytes)!`);
}

main().catch(console.error);
