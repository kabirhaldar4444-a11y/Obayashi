import fs from 'fs';
import path from 'path';

const cacheDir = './node_modules/.vite';

if (fs.existsSync(cacheDir)) {
  fs.rmSync(cacheDir, { recursive: true, force: true });
  console.log('Successfully cleared Vite cache directory (node_modules/.vite).');
} else {
  console.log('Vite cache directory does not exist.');
}
