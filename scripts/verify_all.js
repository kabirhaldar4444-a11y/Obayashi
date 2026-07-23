import fs from 'fs';
import https from 'https';

const fallbackPhoto = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop';

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

async function verify() {
  const projects = JSON.parse(fs.readFileSync('./src/data/parsed_projects.json', 'utf8'));
  console.log(`Checking ${projects.length} project images...`);
  
  let validCount = 0;
  let fixedCount = 0;

  for (let i = 0; i < projects.length; i++) {
    const p = projects[i];
    const path = `./public/images/${p.id}.jpg`;
    let isValid = false;
    
    if (fs.existsSync(path)) {
      const size = fs.statSync(path).size;
      if (size > 20000) {
        isValid = true;
        validCount++;
      }
    }
    
    if (!isValid) {
      console.log(`Fixing missing image for project ${i+1}/${projects.length}: ${p.id} (${p.title})`);
      try {
        await download(fallbackPhoto, path);
        fixedCount++;
      } catch (e) {
        console.error(`Failed to download fallback for ${p.id}: ${e.message}`);
      }
    }
  }

  console.log(`\nVerification Summary:`);
  console.log(`- Total projects: ${projects.length}`);
  console.log(`- Pre-existing valid images: ${validCount}`);
  console.log(`- Fixed missing images: ${fixedCount}`);
  console.log(`- Final valid total: ${validCount + fixedCount} of ${projects.length}`);
}

verify();
