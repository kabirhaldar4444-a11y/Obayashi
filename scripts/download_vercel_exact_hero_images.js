import fs from 'fs';
import https from 'https';

const vercelImages = [
  'work_takanawa_gatewa_104.jpg',
  'work_osaka_ir_integr_106.jpg',
  'work_hokkaido_honshu_105.jpg',
  'work_tokyo_metropoli_107.jpg',
  'work_chuo_shinkansen_109.jpg'
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) return reject(new Error('HTTP status ' + res.statusCode));
      res.pipe(file);
      file.on('finish', () => file.close(() => resolve(true)));
    }).on('error', err => reject(err));
  });
}

async function run() {
  console.log('Downloading EXACT hero slider images from https://obayashi.vercel.app...');
  for (const filename of vercelImages) {
    const url = `https://obayashi.vercel.app/images/${filename}`;
    const dest = `./public/images/${filename}`;
    try {
      await download(url, dest);
      const size = fs.statSync(dest).size;
      console.log(`[VERCEL DOWNLOAD SUCCESS] ${filename} -> ${(size/1024).toFixed(1)} KB`);
    } catch(e) {
      console.error(`[VERCEL DOWNLOAD ERROR] ${filename}: ${e.message}`);
    }
  }
}

run();
