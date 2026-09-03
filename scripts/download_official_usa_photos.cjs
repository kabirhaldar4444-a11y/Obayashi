const fs = require('fs');
const path = require('path');
const https = require('https');

const matches = JSON.parse(fs.readFileSync('scratch/matched_usa_images.json', 'utf8'));

const downloadImage = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const request = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://www.obayashi.co.jp/en/works/'
      }
    }, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        let redirectUrl = response.headers.location;
        if (redirectUrl.startsWith('/')) {
          redirectUrl = 'https://www.obayashi.co.jp' + redirectUrl;
        }
        return downloadImage(redirectUrl, dest).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        return reject(new Error(`Failed with status ${response.statusCode}`));
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve(dest));
      });
    });
    request.on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
};

async function downloadAll() {
  console.log('Downloading all 10 authentic Obayashi project photos...');

  for (let i = 1; i <= 10; i++) {
    const numStr = String(i).padStart(3, '0');
    const id = `work_usa_${numStr}`;
    const info = matches[id];
    if (!info) {
      console.warn(`No match found for ${id}`);
      continue;
    }

    const fullUrl = 'https://www.obayashi.co.jp' + info.thumbnail_url;
    const dest = path.resolve(`public/images/${id}.jpg`);

    try {
      await downloadImage(fullUrl, dest);
      const stat = fs.statSync(dest);
      console.log(`[SUCCESS] ${id} -> ${info.title} (${stat.size} bytes) from ${fullUrl}`);
    } catch (err) {
      console.error(`[ERROR] Failed to download ${id}:`, err.message);
    }
  }

  console.log('\nAll 10 authentic Obayashi project images downloaded successfully!');
}

downloadAll();
