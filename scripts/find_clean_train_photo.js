import fs from 'fs';
import https from 'https';
import crypto from 'crypto';

const obamaHash = '68a27e7558ccdf98ff97fb255bc5421b';
const cleanTrainUrl = 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1600&auto=format&fit=crop';
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
  console.log('Downloading clean Japanese train photo for work_fukutoku_toyosu_101.jpg...');
  await download(cleanTrainUrl, dest);
  
  const hash = crypto.createHash('md5').update(fs.readFileSync(dest)).digest('hex');
  console.log(`New hash for work_fukutoku_toyosu_101.jpg: ${hash}`);
  
  if (hash === obamaHash) {
    console.error('ERROR: Still Obama hash!');
  } else {
    console.log('SUCCESS: Obama photo completely purged and replaced with Japanese train photo!');
  }
}

run();
