import fs from 'fs';
import https from 'https';

const url = 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=1600&auto=format&fit=crop';
const dest = './public/images/work_fukutoku_toyosu_101.jpg';

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
  console.log('Replacing work_fukutoku_toyosu_101.jpg (Obama photo) with real Japanese railway train photo...');
  await download(url, dest);
  console.log(`[SUCCESS] work_fukutoku_toyosu_101.jpg replaced! New size: ${(fs.statSync(dest).size / 1024).toFixed(1)} KB`);
}

run();
