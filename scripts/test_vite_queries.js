import http from 'http';

function check(path) {
  return new Promise((resolve) => {
    http.get('http://localhost:5173' + path, (res) => {
      console.log(`[${res.statusCode}] http://localhost:5173${path}`);
      resolve();
    }).on('error', err => {
      console.log(`[ERR] ${path}: ${err.message}`);
      resolve();
    });
  });
}

async function run() {
  await check('/images/work_fukutoku_toyosu_101.jpg');
  await check('/images/work_fukutoku_toyosu_101.jpg?v=curated_2026');
  await check('/images/work_azabudai_hills__102.jpg');
  await check('/images/work_azabudai_hills__102.jpg?v=curated_2026');
}

run();
