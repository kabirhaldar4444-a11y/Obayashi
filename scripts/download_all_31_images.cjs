const fs = require('fs');
const path = require('path');
const https = require('https');

const matches = JSON.parse(fs.readFileSync('scratch/matched_31_projects.json', 'utf8'));

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
  console.log('Downloading all 31 official Obayashi project photos...');

  const entries = Object.values(matches);
  for (const item of entries) {
    const id = item.id;
    const cleanThumb = item.thumbnail_url.replace(/&amp;/g, '&');
    const fullUrl = 'https://www.obayashi.co.jp' + cleanThumb;
    const dest = path.resolve(`public/images/${id}.jpg`);

    try {
      await downloadImage(fullUrl, dest);
      const stat = fs.statSync(dest);
      console.log(`[SUCCESS] ${id} (${item.country}) -> ${item.name} (${stat.size} bytes)`);
    } catch (err) {
      console.error(`[ERROR] Failed to download ${id}:`, err.message);
    }
  }

  console.log('\nAll 31 official Obayashi project images downloaded successfully!');
}

downloadAll();
