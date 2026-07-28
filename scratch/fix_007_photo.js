import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Real photorealistic mountain highway photograph for North East Road Network Phase II
const photoUrl = 'https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=1600&auto=format&fit=crop';
const dest = path.resolve(__dirname, '../public/images/work_india_007.jpg');

function downloadFile(url, targetPath) {
  return new Promise((resolve, reject) => {
    const opts = { headers: { 'User-Agent': 'Mozilla/5.0' } };
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

downloadFile(photoUrl, dest).then(() => {
  console.log(`Successfully updated work_india_007.jpg with real mountain highway photo (${fs.statSync(dest).size} bytes)!`);
}).catch(console.error);
