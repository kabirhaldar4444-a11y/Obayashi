const fs = require('fs');
const path = require('path');

const contentPath = 'C:/Users/Dell/.gemini/antigravity-ide/brain/0019c042-9a11-4761-b128-25d123d964ad/.system_generated/steps/79/content.md';
const raw = fs.readFileSync(contentPath, 'utf8');

// The file starts with header lines, find the first '{'
const jsonStart = raw.indexOf('{');
const jsonStr = raw.substring(jsonStart);
const data = JSON.parse(jsonStr);
console.log('Total entries in Obayashi official API:', data.entries.length);

const targets = [
  { id: 'work_usa_001', match: ['davis center', 'harlem meer'] },
  { id: 'work_usa_002', match: ['mesa court', 'oso tower', 'uci'] },
  { id: 'work_usa_003', match: ['hoover dam', 'colorado river bridge', 'hoover'] },
  { id: 'work_usa_004', match: ['twin tunnels', 'i-70'] },
  { id: 'work_usa_005', match: ['beacon hill', 'central link'] },
  { id: 'work_usa_006', match: ['golden gate'] },
  { id: 'work_usa_007', match: ['good samaritan'] },
  { id: 'work_usa_008', match: ['diemer', 'robert b'] },
  { id: 'work_usa_009', match: ['metropolis'] },
  { id: 'work_usa_010', match: ['castle rock', 'north meadows'] },
];

const results = {};

for (const entry of data.entries) {
  const title = (entry.title || '').toLowerCase();
  const pageUrl = (entry.page_url || '').toLowerCase();
  const loc = (entry.location || '').toLowerCase();

  for (const t of targets) {
    if (!results[t.id]) {
      const hit = t.match.some(m => title.includes(m) || pageUrl.includes(m));
      if (hit) {
        results[t.id] = {
          entry_id: entry.entry_id,
          title: entry.title,
          page_url: entry.page_url,
          thumbnail_url: entry.thumbnail_url,
          location: entry.location
        };
      }
    }
  }
}

console.log('Matched results from entry_list.json:');
console.log(JSON.stringify(results, null, 2));

// Save matched list
fs.writeFileSync('scratch/matched_usa_images.json', JSON.stringify(results, null, 2));
