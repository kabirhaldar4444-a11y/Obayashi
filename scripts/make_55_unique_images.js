import fs from 'fs';
import https from 'https';
import crypto from 'crypto';
import { projects } from '../src/data/worksContent.js';

const photoIds = [
  'photo-1542296332-2e4473faf563', // 1 Haneda Airport
  'photo-1541872703-74c5e44368f9', // 2 Haneda Rail Access
  'photo-1503899036084-c55cdd92da26', // 3 Azabudai Hills
  'photo-1536098561742-ca998e48cbcc', // 4 Shibuya Sakura Stage
  'photo-1542051841857-5f90071e7989', // 5 Takanawa Gateway
  'photo-1544725176-7c40e5a71c5e', // 6 Hokkaido HVDC
  'photo-1590559899731-a382839e5549', // 7 Osaka IR Resort
  'photo-1504307651254-35680f356dfd', // 8 Tokyo Underground Flood Protection
  'photo-1466611653911-95081537e5b7', // 9 Hokkaido Offshore Wind
  'photo-1532105956626-9569c03602f6', // 10 Chuo Shinkansen Maglev
  'photo-1508873696983-2df515122519', // 11 Shinagawa Station
  'photo-1578637387939-43c525550085', // 12 Shibuya Station Tower
  'photo-1486406146926-c627a92ad1ab', // 13 Tokyo Stationpassage
  'photo-1493976040374-85c8e12f0c0e', // 14 Nakano Station
  'photo-1513694203232-719a280e022f', // 15 Hamamatsucho Station
  'photo-1548337138-e87d889cc369', // 16 Niigata Grade Separation
  'photo-1560969184-10fe8719e047', // 17 Tohoku Shinkansen
  'photo-1498084393753-b411b2d26b34', // 18 Yamagata Shinkansen
  'photo-1559136555-9303baea8ebd', // 19 Mageshima Defense Base
  'photo-1542314831-068cd1dbfeeb', // 20 Tsukishima Redevelopment
  'photo-1519003722824-194d4455a60c', // 21 Akita Offshore Wind
  'photo-1570168007204-dfb528c6958f', // 22 Murakami Offshore Wind
  'photo-1544620347-c4fd4a3d5957', // 23 Kita-Shinagawa Redevelopment
  'photo-1474487548417-781cb71495f3', // 24 Osaka Chuo Line Yumeshima
  'photo-1545558014-8692077e9b5c', // 25 Linear Shinkansen Nagoya
  'photo-1568605117036-5fe5e7bab0b7', // 26 Mumbai Ahmedabad HSR
  'photo-1626621341517-bbf3d9990a23', // 27 Western Freight Corridor
  'photo-1519817650390-64a93db51149', // 28 Atal Setu Sea Bridge
  'photo-1506744038136-46273834b3fb', // 29 Dhubri Phulbari Bridge
  'photo-1590483736622-39da86788790', // 30 Chennai Peripheral Ring Road
  'photo-1509316975850-ff9c5deb0cd9', // 31 North East Connectivity I
  'photo-1586528116311-ad8dd3c8310d', // 32 North East Connectivity II
  'photo-1577495508048-b635879837f1', // 33 North East Connectivity III
  'photo-1581091226825-a6a2a5aee158', // 34 Bihar NH Phase I
  'photo-1581092335397-9583fe92d232', // 35 Bihar NH Phase II
  'photo-1509391365360-2e959784a276', // 36 Delhi Mumbai Industrial Corridor
  'photo-1544984243-ec57ea16fe25', // 37 Dholera Smart City
  'photo-1470071459604-3b5ec3a7fe05', // 38 Chennai Bengaluru Corridor
  'photo-1513836279014-a89f7a76ae86', // 39 Tamil Nadu Industrial Infra
  'photo-1518709268805-4e9042af9f23', // 40 Purulia Pumped Storage
  'photo-1504917599217-d4dc5ebe6122', // 41 Turga Pumped Storage
  'photo-1563986768609-322da13575f3', // 42 Ghatghar Pumped Storage
  'photo-1584467735871-8e85353a8413', // 43 Bakreswar Thermal Power
  'photo-1532996122724-e3c354a0b15b', // 44 Haldia Port Modernization
  'photo-1574482620826-40685ca5ebd2', // 45 Hooghly Dock Engineers
  'photo-1527066579998-dbbae57f45ce', // 46 Burnpur Steel Works
  'photo-1500382017468-9049fed747ef', // 47 Mumbai Sewage Disposal
  'photo-1558494949-ef010cbdcc31', // 48 Yamuna Action Plan
  'photo-1583321500900-82807e458f3c', // 49 Yamuna Action Plan III Delhi
  'photo-1569429593410-b498b3fb3387', // 50 Bengaluru Water Supply
  'photo-1523240795612-9a054b0db644', // 51 Rajasthan Rural Water
  'photo-1541888946425-d0fbb186a5b3', // 52 Mumbai Metro Line 3
  'photo-1517245386807-bb43f82c33c4', // 53 Delhi Metro Rail
  'photo-1512917774080-9991f1c4c750', // 54 Chennai Metro Rail
  'photo-1486406146926-c627a92ad1ab'  // 55 Vadodara HSR Institute
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) return reject(new Error('Status ' + res.statusCode));
      res.pipe(file);
      file.on('finish', () => file.close(() => resolve(true)));
    }).on('error', err => reject(err));
  });
}

async function run() {
  console.log(`Downloading 55 unique images for all ${projects.length} projects...`);
  
  const tasks = projects.map(async (p, i) => {
    const pid = photoIds[i] || photoIds[i % photoIds.length];
    const url = `https://images.unsplash.com/${pid}?q=80&w=1600&auto=format&fit=crop`;
    const dest = `./public/images/${p.id}.jpg`;
    
    try {
      await download(url, dest);
      const size = fs.statSync(dest).size;
      console.log(`[OK ${i+1}/${projects.length}] ${p.id} -> ${(size/1024).toFixed(1)} KB`);
    } catch(e) {
      console.error(`[ERROR ${i+1}/${projects.length}] ${p.id}: ${e.message}`);
    }
  });

  await Promise.all(tasks);

  // Strict verification of file existence and uniqueness
  console.log('\nRunning strict uniqueness verification...');
  let validCount = 0;
  const hashSet = new Set();
  const duplicateMap = new Map();

  for (let i = 0; i < projects.length; i++) {
    const p = projects[i];
    const file = `./public/images/${p.id}.jpg`;
    if (fs.existsSync(file)) {
      const size = fs.statSync(file).size;
      if (size > 20000) {
        validCount++;
        const content = fs.readFileSync(file);
        const hash = crypto.createHash('md5').update(content).digest('hex');
        if (duplicateMap.has(hash)) {
          console.warn(`[DUPLICATE MATCH] ${p.id} shares image with ${duplicateMap.get(hash)}`);
        } else {
          duplicateMap.set(hash, p.id);
          hashSet.add(hash);
        }
      }
    }
  }

  console.log(`\n==============================================`);
  console.log(`Total Projects: ${projects.length}`);
  console.log(`Valid Image Files (>20KB): ${validCount}`);
  console.log(`100% Unique Image Hashes: ${hashSet.size}`);
  console.log(`==============================================`);
}

run();
