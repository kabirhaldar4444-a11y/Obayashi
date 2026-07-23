import fs from 'fs';
import https from 'https';
import crypto from 'crypto';
import { projects } from '../src/data/worksContent.js';

const verifiedPool = [
  'https://images.unsplash.com/photo-1542296332-2e4473faf563?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1590559899731-a382839e5549?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1532105956626-9569c03602f6?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1578637387939-43c525550085?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1548337138-e87d889cc369?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1560969184-10fe8719e047?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1498084393753-b411b2d26b34?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=1600&auto=format&fit=crop'
];

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

async function finalize() {
  console.log(`Auditing all ${projects.length} projects...`);

  const downloadTasks = projects.map(async (p, i) => {
    const dest = `./public/images/${p.id}.jpg`;
    const needDownload = !fs.existsSync(dest) || fs.statSync(dest).size < 20000;
    
    if (needDownload) {
      const baseUrl = verifiedPool[i % verifiedPool.length];
      const url = `${baseUrl}&uniqueSeed=${i + 1000}`;
      try {
        await download(url, dest);
        console.log(`[FIXED ${i+1}/${projects.length}] ${p.id} -> ${(fs.statSync(dest).size / 1024).toFixed(1)} KB`);
      } catch (e) {
        console.error(`[ERROR] ${p.id}: ${e.message}`);
      }
    }
  });

  await Promise.all(downloadTasks);

  // Summary Audit
  let validTotal = 0;
  for (const p of projects) {
    const dest = `./public/images/${p.id}.jpg`;
    if (fs.existsSync(dest) && fs.statSync(dest).size > 20000) {
      validTotal++;
    }
  }

  console.log(`\n==============================================`);
  console.log(`Total Projects: ${projects.length}`);
  console.log(`Valid Image Files (>20KB): ${validTotal}`);
  console.log(`==============================================`);
}

finalize();
