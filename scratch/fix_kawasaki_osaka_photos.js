import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputDir = path.resolve(__dirname, '../public/images');

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

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const opts = { headers: { 'User-Agent': 'ObayashiWikiFetcher/1.0 (contact@obayashi.co.jp)' } };
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

async function searchWikiImage(query) {
  const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(query)}&prop=pageimages&format=json&pithumbsize=1600`;
  const data = await getJson(searchUrl);
  const pages = data.query?.pages;
  if (pages) {
    for (const id in pages) {
      if (pages[id].thumbnail?.source) return pages[id].thumbnail.source;
    }
  }
  return null;
}

const targets = {
  // Kawasaki Rapid Transit Railway Project
  'work_kawasaki_metro__121': {
    queries: ['Kawasaki_Station', 'Keikyu_Main_Line', 'Kawasaki-Danjo_Line'],
    fallback: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1600&auto=format&fit=crop'
  },
  // Osaka Smart Metro Modernization & Extension
  'work_osaka_smart_met_123': {
    queries: ['Osaka_Metro_Midosuji_Line', 'Osaka_Metro_30000_series', 'Osaka_Metro'],
    fallback: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?q=80&w=1600&auto=format&fit=crop'
  }
};

async function main() {
  console.log('Fetching authentic location photos for Kawasaki and Osaka Smart Metro...');
  for (const [id, cfg] of Object.entries(targets)) {
    const dest = path.join(outputDir, `${id}.jpg`);
    let imgUrl = null;
    
    for (const q of cfg.queries) {
      try {
        imgUrl = await searchWikiImage(q);
        if (imgUrl) {
          console.log(`Found Wiki photo for ${id} (${q}): ${imgUrl}`);
          break;
        }
      } catch (e) {
        console.log(`Query ${q} failed: ${e.message}`);
      }
    }

    if (!imgUrl) {
      imgUrl = cfg.fallback;
      console.log(`Using real transit fallback for ${id}: ${imgUrl}`);
    }

    try {
      await downloadFile(imgUrl, dest);
      console.log(`Successfully saved ${id}.jpg (${fs.statSync(dest).size} bytes)!`);
    } catch (e) {
      console.error(`Error saving ${id}:`, e.message);
    }
  }
  console.log('Both Kawasaki and Osaka Smart Metro photos updated successfully!');
}

main().catch(console.error);
