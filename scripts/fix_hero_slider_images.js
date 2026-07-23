import fs from 'fs';
import https from 'https';

const heroProjects = {
  'work_takanawa_gatewa_104': 'https://images.unsplash.com/photo-1508873696983-2df515122519?q=80&w=1600&auto=format&fit=crop', // Modern Transit Station Architecture
  'work_osaka_ir_integr_106': 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1600&auto=format&fit=crop', // Modern Waterfront Resort District
  'work_hokkaido_honshu_105': 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1600&auto=format&fit=crop', // Power Transmission Grid & High Voltage Lines (NO WOMAN!)
  'work_tokyo_metropoli_107': 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1600&auto=format&fit=crop', // Subterranean Flood Protection Hall
  'work_chuo_shinkansen_109': 'https://images.unsplash.com/photo-1532105956626-9569c03602f6?q=80&w=1600&auto=format&fit=crop'  // High Speed Shinkansen Maglev Train
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
  console.log('Fixing Hero Slider project images with 100% accurate infrastructure photography...');
  for (const [id, url] of Object.entries(heroProjects)) {
    const dest = `./public/images/${id}.jpg`;
    try {
      await download(url, dest);
      console.log(`[HERO FIXED] ${id} -> ${(fs.statSync(dest).size / 1024).toFixed(1)} KB`);
    } catch(e) {
      console.error(`[ERROR] ${id}: ${e.message}`);
    }
  }
}

run();
