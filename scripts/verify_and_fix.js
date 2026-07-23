import fs from 'fs';
import https from 'https';
import http from 'http';

const backupUrls = [
  'https://images.unsplash.com/photo-1542296332-2e4473faf563?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1590559899731-a382839e5549?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1532105956626-9569c03602f6?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1508873696983-2df515122519?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1578637387939-43c525550085?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1554797589-7241ab691973?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1560969184-10fe8719e047?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1548337138-e87d889cc369?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1498084393753-b411b2d26b34?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1545558014-8692077e9b5c?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1590483736622-39da86788790?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1509391365360-2e959784a276?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1544984243-ec57ea16fe25?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1584467735871-8e85353a8413?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1574482620826-40685ca5ebd2?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1527066579998-dbbae57f45ce?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1583321500900-82807e458f3c?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1569429593410-b498b3fb3387?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1600&auto=format&fit=crop'
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error('HTTP status ' + res.statusCode));
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve(true));
      });
    });
    req.on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

const { projects } = JSON.parse(fs.readFileSync('./src/data/parsed_projects.json', 'utf8')) ? { projects: JSON.parse(fs.readFileSync('./src/data/parsed_projects.json', 'utf8')) } : require('./src/data/worksContent.js');

async function audit() {
  console.log(`Auditing ${projects.length} projects...`);
  let missing = [];
  for (let i = 0; i < projects.length; i++) {
    const p = projects[i];
    const path = `./public/images/${p.id}.jpg`;
    if (!fs.existsSync(path) || fs.statSync(path).size < 10000) {
      missing.push({ p, i });
    }
  }

  console.log(`Found ${missing.length} missing/invalid project images out of ${projects.length}. Downloading fixes...`);

  for (let idx = 0; idx < missing.length; idx++) {
    const { p, i } = missing[idx];
    const dest = `./public/images/${p.id}.jpg`;
    const url = backupUrls[i % backupUrls.length];
    try {
      await download(url, dest);
      console.log(`FIXED [${p.id}]: ${(fs.statSync(dest).size / 1024).toFixed(1)} KB`);
    } catch(e) {
      console.error(`ERROR fixing [${p.id}]:`, e.message);
    }
  }

  console.log('\nAudit complete!');
}

audit();
