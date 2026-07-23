import fs from 'fs';
import https from 'https';

const fallbacksMap = {
  'category_civil.png': 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=1600&auto=format&fit=crop',
  'category_offices.png': 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1600&auto=format&fit=crop',
  'category_energy.png': 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?q=80&w=1600&auto=format&fit=crop',
  'category_education.png': 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?q=80&w=1600&auto=format&fit=crop',
  'category_recreation.png': 'https://images.unsplash.com/photo-1590559899731-a382839e5549?q=80&w=1600&auto=format&fit=crop'
};

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) return reject(new Error('Status ' + res.statusCode));
      res.pipe(file);
      file.on('finish', () => file.close(() => resolve(true)));
    }).on('error', err => reject(err));
  });
}

async function run() {
  console.log('Replacing generic category fallback PNGs with high-res real engineering photos...');
  for (const [filename, url] of Object.entries(fallbacksMap)) {
    const dest = `./public/images/${filename}`;
    try {
      await download(url, dest);
      console.log(`[FIXED FALLBACK] ${filename} -> ${(fs.statSync(dest).size / 1024).toFixed(1)} KB`);
    } catch(e) {
      console.error(`[ERROR] ${filename}: ${e.message}`);
    }
  }
}

run();
