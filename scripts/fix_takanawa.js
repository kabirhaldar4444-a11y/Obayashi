import fs from 'fs';
import https from 'https';

const url = 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=1600&auto=format&fit=crop';
const dest = './public/images/work_takanawa_gatewa_104.jpg';

function download(u, d) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(d);
    https.get(u, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return download(res.headers.location, d).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) return reject(new Error('Status ' + res.statusCode));
      res.pipe(file);
      file.on('finish', () => file.close(() => resolve(true)));
    }).on('error', err => reject(err));
  });
}

async function run() {
  await download(url, dest);
  console.log(`[HERO FIXED] work_takanawa_gatewa_104.jpg -> ${(fs.statSync(dest).size / 1024).toFixed(1)} KB`);
}

run();
