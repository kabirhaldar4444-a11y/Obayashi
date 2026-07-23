import fs from 'fs';
import https from 'https';
import crypto from 'crypto';
import { projects } from '../src/data/worksContent.js';

const fixMap = {
  'work_india_019': 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600&auto=format&fit=crop',
  'work_india_027': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1600&auto=format&fit=crop',
  'work_india_030': 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1600&auto=format&fit=crop'
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

async function fix3() {
  for (const [id, url] of Object.entries(fixMap)) {
    const dest = `./public/images/${id}.jpg`;
    try {
      await download(url, dest);
      console.log(`[FIXED] ${id} -> ${(fs.statSync(dest).size / 1024).toFixed(1)} KB`);
    } catch(e) {
      console.error(`[ERROR] ${id}: ${e.message}`);
    }
  }

  // Final Audit of all 55
  console.log('\nFinal audit across all 55 projects:');
  let validCount = 0;
  const hashSet = new Set();

  for (let i = 0; i < projects.length; i++) {
    const p = projects[i];
    const file = `./public/images/${p.id}.jpg`;
    if (fs.existsSync(file)) {
      const size = fs.statSync(file).size;
      if (size > 20000) {
        validCount++;
        const content = fs.readFileSync(file);
        const hash = crypto.createHash('md5').update(content).digest('hex');
        hashSet.add(hash);
      }
    }
  }

  console.log(`\n==============================================`);
  console.log(`Total Projects: ${projects.length}`);
  console.log(`Valid Images (>20KB): ${validCount}`);
  console.log(`Unique Image Hashes: ${hashSet.size}`);
  console.log(`==============================================`);
}

fix3();
