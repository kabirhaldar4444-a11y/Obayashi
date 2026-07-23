import http from 'http';

function testUrl(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      console.log(`[${res.statusCode}] ${url} (Content-Type: ${res.headers['content-type']})`);
      resolve(res.statusCode);
    }).on('error', (err) => {
      console.error(`[ERROR] ${url}: ${err.message}`);
      resolve(null);
    });
  });
}

async function run() {
  console.log('Testing localhost dev server static image response...');
  await testUrl('http://localhost:5173/images/work_haneda_airport__100.jpg?v=curated_2026');
  await testUrl('http://localhost:5173/images/work_azabudai_hills__102.jpg');
  await testUrl('http://localhost:5173/images/work_india_002.jpg');
}

run();
