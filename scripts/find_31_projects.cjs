const fs = require('fs');
const path = require('path');

const contentPath = 'C:/Users/Dell/.gemini/antigravity-ide/brain/0019c042-9a11-4761-b128-25d123d964ad/.system_generated/steps/79/content.md';
const raw = fs.readFileSync(contentPath, 'utf8');
const jsonStart = raw.indexOf('{');
const data = JSON.parse(raw.substring(jsonStart));

console.log('Total entries:', data.entries.length);

const targetDefs = [
  // Singapore (6)
  { id: 'work_sg_001', country: 'Singapore', name: 'Jewel Changi Airport', keys: ['jewel changi', 'jewel'] },
  { id: 'work_sg_002', country: 'Singapore', name: 'Bird Paradise', keys: ['bird paradise', 'mandai'] },
  { id: 'work_sg_003', country: 'Singapore', name: 'One Raffles Quay', keys: ['one raffles quay', 'raffles quay'] },
  { id: 'work_sg_004', country: 'Singapore', name: 'Ocean Financial Centre', keys: ['ocean financial'] },
  { id: 'work_sg_005', country: 'Singapore', name: 'CREATE Campus', keys: ['create', 'technological enterprise'] },
  { id: 'work_sg_006', country: 'Singapore', name: 'Singapore MRT C304 / C930', keys: ['singapore mrt', 'mrt 304', 'mrt'] },

  // Thailand (8)
  { id: 'work_th_001', country: 'Thailand', name: 'Queen Sirikit National Convention Center (QSNCC)', keys: ['queen sirikit', 'qsncc'] },
  { id: 'work_th_002', country: 'Thailand', name: 'O-NES TOWER', keys: ['o-nes', 'ones tower'] },
  { id: 'work_th_003', country: 'Thailand', name: 'SAMYAN MITRTOWN', keys: ['samyam', 'samyan'] },
  { id: 'work_th_004', country: 'Thailand', name: 'Park Ventures Ecoplex', keys: ['park ventures'] },
  { id: 'work_th_005', country: 'Thailand', name: 'AIA East Gateway', keys: ['aia east gateway'] },
  { id: 'work_th_006', country: 'Thailand', name: 'Head Office of the Stock Exchange of Thailand', keys: ['stock exchange of thailand'] },
  { id: 'work_th_007', country: 'Thailand', name: 'NEXTOPIA (Siam Paragon)', keys: ['nextopia', 'siam paragon'] },
  { id: 'work_th_008', country: 'Thailand', name: 'EBARA FOODS (THAILAND) New Factory', keys: ['ebara foods (thailand)', 'ebara foods thailand'] },

  // Canada (4)
  { id: 'work_ca_001', country: 'Canada', name: 'Eglinton Crosstown LRT', keys: ['eglinton', 'crosstown'] },
  { id: 'work_ca_002', country: 'Canada', name: 'Coquitlam Ultraviolet Disinfection Facility', keys: ['coquitlam'] },
  { id: 'work_ca_003', country: 'Canada', name: 'Erindale GO Station Parking Structure', keys: ['erindale'] },
  { id: 'work_ca_004', country: 'Canada', name: 'Ajax GO Station Parking Structure', keys: ['ajax'] },

  // Taiwan (3)
  { id: 'work_tw_001', country: 'Taiwan', name: 'Taiwan High Speed Rail (Taoyuan)', keys: ['taiwan high speed rail', 'high speed rail'] },
  { id: 'work_tw_002', country: 'Taiwan', name: 'Radium Kagaya International Hotel', keys: ['kagaya', 'radium kagaya'] },
  { id: 'work_tw_003', country: 'Taiwan', name: 'NAG Chiayi New Plant', keys: ['chiayi', 'nittobo'] },

  // Vietnam (4)
  { id: 'work_vn_001', country: 'Vietnam', name: 'AEON MALL Tan Phu Celadon', keys: ['aeon mall tan phu', 'tan phu celadon'] },
  { id: 'work_vn_002', country: 'Vietnam', name: 'MEGMILK SNOW BRAND VIETNAM Factory', keys: ['megmilk', 'snow brand vietnam'] },
  { id: 'work_vn_003', country: 'Vietnam', name: 'Thanh Tri Bridge', keys: ['thanh tri'] },
  { id: 'work_vn_004', country: 'Vietnam', name: 'NISSHIN FOODS VIETNAM New Factory', keys: ['nisshin foods vietnam'] },

  // UAE (1)
  { id: 'work_ae_001', country: 'United Arab Emirates', name: 'Dubai Metro Project', keys: ['dubai metro'] },

  // Australia (1)
  { id: 'work_au_001', country: 'Australia', name: 'Stadium Australia', keys: ['stadium australia', 'sydney olympic'] },

  // Indonesia (2)
  { id: 'work_id_001', country: 'Indonesia', name: 'PT Glico Manufacturing Indonesia Karawang Factory', keys: ['glico manufacturing indonesia', 'glico'] },
  { id: 'work_id_002', country: 'Indonesia', name: 'PT INDONESIA KYOUEI SAIKYU Factory', keys: ['kyouei saikyu', 'indonesia kyouei'] },

  // Cambodia (1)
  { id: 'work_kh_001', country: 'Cambodia', name: 'National Road No. 5 Improvement Project', keys: ['national road no. 5', 'road no. 5', 'cambodia'] },

  // Bangladesh (1)
  { id: 'work_bd_001', country: 'Bangladesh', name: 'Kanchpur, Meghna, and Gumti 2nd Bridges', keys: ['kanchpur', 'meghna', 'gumti'] }
];

const matches = {};

targetDefs.forEach(t => {
  for (const entry of data.entries) {
    const title = (entry.title || '').toLowerCase();
    const pageUrl = (entry.page_url || '').toLowerCase();
    const loc = (entry.location || '').toLowerCase();

    const hit = t.keys.some(k => title.includes(k) || pageUrl.includes(k));
    if (hit) {
      // Check if location or title fits
      matches[t.id] = {
        id: t.id,
        country: t.country,
        name: t.name,
        official_title: entry.title,
        page_url: entry.page_url,
        thumbnail_url: entry.thumbnail_url,
        location: entry.location,
        year: entry.completion_year,
        category: (entry.works_category && entry.works_category[0] && entry.works_category[0].item && entry.works_category[0].item.label) || 'Civil Infra'
      };
      break;
    }
  }
});

console.log(`Matched ${Object.keys(matches).length} of ${targetDefs.length} targets.`);

// Check missing
targetDefs.forEach(t => {
  if (!matches[t.id]) {
    console.warn(`MISSING: ${t.id} - ${t.name}`);
  }
});

fs.writeFileSync('scratch/matched_31_projects.json', JSON.stringify(matches, null, 2));
console.log('Saved to scratch/matched_31_projects.json');
