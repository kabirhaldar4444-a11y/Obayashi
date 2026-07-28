import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dest = path.resolve(__dirname, '../public/images/work_nagoya_metro_gr_113.jpg');

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
  console.log('Searching Wikipedia API for Nagoya Municipal Subway Meijo Line...');
  const searchQueries = ['Nagoya_Municipal_Subway_Meijo_Line', 'Meijō_Line', 'Nagoya_Municipal_Subway_2000_series'];
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
    console.log('Main pageimage not found, searching Commons for Meijo Line trains...');
    const commonsUrl = 'https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=Nagoya%20Meijo%20Line%20train&gsrnamespace=6&prop=imageinfo&iiprop=url&iiurlwidth=1600&format=json';
    const cData = await getJson(commonsUrl);
    const cPages = cData.query?.pages;
    if (cPages) {
      for (const k in cPages) {
        const info = cPages[k].imageinfo?.[0];
        if (info?.thumburl || info?.url) {
          imgUrl = info.thumburl || info.url;
          break;
        }
      }
    }
  }

  if (imgUrl) {
    console.log(`Found authentic Nagoya Meijo Line image URL: ${imgUrl}`);
    await downloadFile(imgUrl, dest);
    console.log(`Successfully downloaded real Nagoya Meijo Line image (${fs.statSync(dest).size} bytes)!`);
  } else {
    throw new Error('Could not find Nagoya Meijo Line image via API');
  }
}

main().catch(console.error);
