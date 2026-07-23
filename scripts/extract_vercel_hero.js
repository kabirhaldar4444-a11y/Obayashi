import https from 'https';

const bundleUrl = 'https://obayashi.vercel.app/assets/index-BpEwo5L7.js';

https.get(bundleUrl, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Bundle fetched! Length:', data.length);
    
    // Search for Takanawa, Osaka, Hokkaido, Tokyo Flood, Chuo Maglev, or image strings
    const imageMatches = data.match(/\/images\/[a-zA-Z0-9_\-]+\.(jpg|png|webp|jpeg)/g);
    console.log('Image URLs found in vercel bundle:', [...new Set(imageMatches)]);

    // Search for project objects near hero slider
    const takanawaIndex = data.indexOf('Takanawa Gateway');
    if (takanawaIndex !== -1) {
      console.log('\n--- TAKANAWA CONTEXT IN VERCEL BUNDLE ---');
      console.log(data.substring(Math.max(0, takanawaIndex - 200), takanawaIndex + 500));
    }
  });
}).on('error', err => console.error(err));
