import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Official Wikimedia Commons authentic photographs of the real Azabudai Hills complex in Minato, Tokyo
const wikiUrls = [
  'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Azabudai_Hills_Mori_JP_Tower_202311.jpg/1280px-Azabudai_Hills_Mori_JP_Tower_202311.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Azabudai_Hills_2023.jpg/1280px-Azabudai_Hills_2023.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/6/69/Azabudai_Hills_Mori_JP_Tower_202311.jpg'
];

const dest = path.resolve(__dirname, '../public/images/work_azabudai_hills__102.jpg');

function download(url) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'ObayashiProjectBot/1.0 (https://obayashi.co.jp; contact@obayashi.co.jp)'
      }
    };
    https.get(url, options, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return download(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve(dest));
      });
    }).on('error', reject);
  });
}

async function run() {
  console.log('Downloading real Azabudai Hills photograph from Wikimedia Commons...');
  for (const url of wikiUrls) {
    try {
      console.log(`Trying ${url}...`);
      await download(url);
      const size = fs.statSync(dest).size;
      if (size > 20000) {
        console.log(`Successfully saved real Azabudai Hills photograph! (${size} bytes)`);
        return;
      }
    } catch (e) {
      console.log(`Failed URL: ${e.message}`);
    }
  }
  throw new Error('All Wikimedia URLs failed');
}

run().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
