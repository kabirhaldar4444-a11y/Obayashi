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
  // 1. Chiba Urban Monorail Line Extension
  'work_chiba_metro_cor_120': {
    queries: ['Chiba_Urban_Monorail'],
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Chiba-monorail-urban-flyer.jpg/1920px-Chiba-monorail-urban-flyer.jpg'
  },

  // 2. Greater Tokyo Outer Loop Railway Line
  'work_greater_tokyo_o_122': {
    queries: ['Musashino_Line', 'E231_series'],
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/JR_East_E231-0_Musashino_line.jpg/1920px-JR_East_E231-0_Musashino_line.jpg'
  },

  // 3. Osaka Smart Metro Modernization & Extension
  'work_osaka_smart_met_123': {
    queries: ['Midosuji_Line', 'Osaka_Metro_30000_series'],
    fallback: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=1600&auto=format&fit=crop'
  }
};

async function main() {
  console.log('Fixing Chiba Monorail, Greater Tokyo Outer Loop, and Osaka Smart Metro photos...');
  for (const [id, cfg] of Object.entries(targets)) {
    const dest = path.join(outputDir, `${id}.jpg`);
    let imgUrl = null;

    for (const q of cfg.queries) {
      try {
        imgUrl = await searchWikiImage(q);
        if (imgUrl) {
          console.log(`Found Wiki image for ${id} (${q}): ${imgUrl}`);
          break;
        }
      } catch (e) {
        console.log(`Wiki search ${q} failed: ${e.message}`);
      }
    }

    if (!imgUrl) {
      imgUrl = cfg.fallback;
      console.log(`Using real infrastructure fallback for ${id}: ${imgUrl}`);
    }

    try {
      await downloadFile(imgUrl, dest);
      console.log(`Successfully saved ${id}.jpg (${fs.statSync(dest).size} bytes)!`);
    } catch (e) {
      console.error(`Error saving ${id}:`, e.message);
      // If direct Wiki download hit rate limiting, use rock-solid Unsplash fallback
      if (cfg.fallback) {
        console.log(`Retrying with fallback for ${id}...`);
        await downloadFile(cfg.fallback, dest);
        console.log(`Successfully saved ${id}.jpg via fallback (${fs.statSync(dest).size} bytes)!`);
      }
    }
  }
  console.log('All 3 project photos successfully updated!');
}

main().catch(console.error);
