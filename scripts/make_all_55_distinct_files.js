import fs from 'fs';
import https from 'https';
import crypto from 'crypto';
import { projects } from '../src/data/worksContent.js';

const imageMap = {
  'work_haneda_airport__100': 'https://images.unsplash.com/photo-1542296332-2e4473faf563?q=80&w=1600&auto=format&fit=crop',
  'work_fukutoku_toyosu_101': 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=1600&auto=format&fit=crop',
  'work_azabudai_hills__102': 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1600&auto=format&fit=crop',
  'work_shibuya_sakura__103': 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?q=80&w=1600&auto=format&fit=crop',
  'work_takanawa_gatewa_104': 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=1600&auto=format&fit=crop',
  'work_hokkaido_honshu_105': 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?q=80&w=1600&auto=format&fit=crop',
  'work_osaka_ir_integr_106': 'https://images.unsplash.com/photo-1590559899731-a382839e5549?q=80&w=1600&auto=format&fit=crop',
  'work_tokyo_metropoli_107': 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1600&auto=format&fit=crop',
  'work_hokkaido_offsho_108': 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=1600&auto=format&fit=crop',
  'work_chuo_shinkansen_109': 'https://images.unsplash.com/photo-1532105956626-9569c03602f6?q=80&w=1600&auto=format&fit=crop',
  'work_tokyo_metro_net_110': 'https://images.unsplash.com/photo-1578637387939-43c525550085?q=80&w=1600&auto=format&fit=crop',
  'work_osaka_metro_ext_111': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop',
  'work_yokohama_urban__112': 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1600&auto=format&fit=crop',
  'work_nagoya_metro_gr_113': 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1600&auto=format&fit=crop',
  'work_fukuoka_metro_n_114': 'https://images.unsplash.com/photo-1548337138-e87d889cc369?q=80&w=1600&auto=format&fit=crop',
  'work_sapporo_metro_f_115': 'https://images.unsplash.com/photo-1560969184-10fe8719e047?q=80&w=1600&auto=format&fit=crop',
  'work_kyoto_urban_met_116': 'https://images.unsplash.com/photo-1498084393753-b411b2d26b34?q=80&w=1600&auto=format&fit=crop',
  'work_kobe_metro_exte_117': 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=1600&auto=format&fit=crop',
  'work_sendai_metro_ex_118': 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1600&auto=format&fit=crop',
  'work_hiroshima_metro_119': 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=1600&auto=format&fit=crop',
  'work_chiba_metro_cor_120': 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=1600&auto=format&fit=crop',
  'work_kawasaki_metro__121': 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1600&auto=format&fit=crop',
  'work_greater_tokyo_o_122': 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=1600&auto=format&fit=crop',
  'work_osaka_smart_met_123': 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?q=80&w=1600&auto=format&fit=crop',
  'work_nagoya_metropol_124': 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1600&auto=format&fit=crop',
  'work_mumbai_ahmedabad_rail_200': 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1600&auto=format&fit=crop',
  'work_india_002': 'https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=1600&auto=format&fit=crop',
  'work_india_003': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop',
  'work_india_004': 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?q=80&w=1600&auto=format&fit=crop',
  'work_india_005': 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1600&auto=format&fit=crop',
  'work_india_006': 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1600&auto=format&fit=crop',
  'work_india_007': 'https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=1600&auto=format&fit=crop',
  'work_india_008': 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1600&auto=format&fit=crop',
  'work_india_009': 'https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=1600&auto=format&fit=crop',
  'work_india_010': 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1600&auto=format&fit=crop',
  'work_india_011': 'https://images.unsplash.com/photo-1544984243-ec57ea16fe25?q=80&w=1600&auto=format&fit=crop',
  'work_india_012': 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1600&auto=format&fit=crop',
  'work_india_013': 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=1600&auto=format&fit=crop',
  'work_india_014': 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600&auto=format&fit=crop',
  'work_india_015': 'https://images.unsplash.com/photo-1544984243-ec57ea16fe25?q=80&w=1600&auto=format&fit=crop',
  'work_india_016': 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1600&auto=format&fit=crop',
  'work_india_017': 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?q=80&w=1600&auto=format&fit=crop',
  'work_india_018': 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=1600&auto=format&fit=crop',
  'work_india_019': 'https://images.unsplash.com/photo-1574482620826-40685ca5ebd2?q=80&w=1600&auto=format&fit=crop',
  'work_india_020': 'https://images.unsplash.com/photo-1527066579998-dbbae57f45ce?q=80&w=1600&auto=format&fit=crop',
  'work_india_021': 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1600&auto=format&fit=crop',
  'work_india_022': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1600&auto=format&fit=crop',
  'work_india_023': 'https://images.unsplash.com/photo-1583321500900-82807e458f3c?q=80&w=1600&auto=format&fit=crop',
  'work_india_024': 'https://images.unsplash.com/photo-1569429593410-b498b3fb3387?q=80&w=1600&auto=format&fit=crop',
  'work_india_025': 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1600&auto=format&fit=crop',
  'work_india_026': 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1600&auto=format&fit=crop',
  'work_india_027': 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=1600&auto=format&fit=crop',
  'work_india_028': 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?q=80&w=1600&auto=format&fit=crop',
  'work_india_029': 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=1600&auto=format&fit=crop',
  'work_india_030': 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?q=80&w=1600&auto=format&fit=crop'
};

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
  console.log(`Downloading images for all ${projects.length} projects...`);
  const tasks = projects.map(async (p) => {
    const dest = `./public/images/${p.id}.jpg`;
    const url = imageMap[p.id] || 'https://images.unsplash.com/photo-1542296332-2e4473faf563?q=80&w=1600&auto=format&fit=crop';
    try {
      await download(url, dest);
      console.log(`[OK] ${p.id} -> ${(fs.statSync(dest).size / 1024).toFixed(1)} KB`);
    } catch(e) {
      console.error(`[ERROR] ${p.id}: ${e.message}`);
    }
  });

  await Promise.all(tasks);

  // Uniqueness check
  const hashes = new Map();
  let validCount = 0;
  for (const p of projects) {
    const dest = `./public/images/${p.id}.jpg`;
    if (fs.existsSync(dest) && fs.statSync(dest).size > 20000) {
      validCount++;
      const content = fs.readFileSync(dest);
      const hash = crypto.createHash('md5').update(content).digest('hex');
      hashes.set(hash, p.id);
    }
  }

  console.log(`\n==============================================`);
  console.log(`Total Projects: ${projects.length}`);
  console.log(`Valid Image Files (>20KB): ${validCount}`);
  console.log(`Unique Image Hashes: ${hashes.size}`);
  console.log(`==============================================`);
}

run();
