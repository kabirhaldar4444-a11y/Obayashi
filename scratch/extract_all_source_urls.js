import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import projects data
import { projects } from '../src/data/worksContent.js';

// Aggregate map of original web source links (Wikimedia Commons & Unsplash CDN photography)
const sourceUrls = {
  // Japan Projects
  'work_haneda_airport__100': 'https://images.unsplash.com/photo-1542296332-2e4473faf563?q=80&w=1600&auto=format&fit=crop', // Haneda Airport Tarmac & Terminal
  'work_fukutoku_toyosu_101': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Toyosu_2014.JPG/1920px-Toyosu_2014.JPG', // Wikimedia Commons - Toyosu Bayside
  'work_azabudai_hills__102': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Azabudai_Hills_%28Garden_Plaza_B%2C_towers%2C_and_sign%3B_2025-11-06%29.jpg/1920px-Azabudai_Hills_%28Garden_Plaza_B%2C_towers%2C_and_sign%3B_2025-11-06%29.jpg', // Wikimedia Commons - Azabudai Hills
  'work_shibuya_sakura__103': 'https://images.unsplash.com/photo-1555636222-cae831e670b3?q=80&w=1600&auto=format&fit=crop', // Modern Shibuya High-Rise Architecture
  'work_takanawa_gatewa_104': 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=1600&auto=format&fit=crop', // Takanawa Gateway Smart City Hub
  'work_hokkaido_honshu_105': 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?q=80&w=1600&auto=format&fit=crop', // HVDC Power Grid Transmission
  'work_osaka_ir_integr_106': 'https://images.unsplash.com/photo-1590559899731-a382839e5549?q=80&w=1600&auto=format&fit=crop', // Osaka Waterfront Bay Resort
  'work_tokyo_metropoli_107': 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1600&auto=format&fit=crop', // Tokyo Flood Control Tunnel Infrastructure
  'work_hokkaido_offsho_108': 'https://images.unsplash.com/photo-1548337138-e87d889cc369?q=80&w=1600&auto=format&fit=crop', // Offshore Wind Turbine Generator
  'work_chuo_shinkansen_109': 'https://images.unsplash.com/photo-1532105956626-9569c03602f6?q=80&w=1600&auto=format&fit=crop', // Superconducting Maglev High Speed Rail
  'work_tokyo_metro_net_110': 'https://images.unsplash.com/photo-1578637387939-43c525550085?q=80&w=1600&auto=format&fit=crop', // Tokyo Metro Subway Network
  'work_osaka_metro_ext_111': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Osaka-Metro_Series400-409-01.jpg/1920px-Osaka-Metro_Series400-409-01.jpg', // Wikimedia Commons - Osaka Metro Series 400
  'work_yokohama_urban__112': 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1600&auto=format&fit=crop', // Yokohama Municipal Subway
  'work_nagoya_metro_gr_113': 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Shiyakusho_Station_1060.JPG', // Wikimedia Commons - Nagoya Meijo Line
  'work_fukuoka_metro_n_114': 'https://images.unsplash.com/photo-1548337138-e87d889cc369?q=80&w=1600&auto=format&fit=crop', // Fukuoka Subway Rapid Transit
  'work_sapporo_metro_f_115': 'https://images.unsplash.com/photo-1560969184-10fe8719e047?q=80&w=1600&auto=format&fit=crop', // Sapporo Subway System
  'work_kyoto_urban_met_116': 'https://images.unsplash.com/photo-1498084393753-b411b2d26b34?q=80&w=1600&auto=format&fit=crop', // Kyoto Underground Transit
  'work_kobe_metro_exte_117': 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=1600&auto=format&fit=crop', // Kobe Wangan Transit Line
  'work_sendai_metro_ex_118': 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1600&auto=format&fit=crop', // Sendai Subway Network
  'work_hiroshima_metro_119': 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=1600&auto=format&fit=crop', // Hiroshima Transit Infrastructure
  'work_chiba_metro_cor_120': 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=1600&auto=format&fit=crop', // Chiba Suspended Monorail Line
  'work_kawasaki_metro__121': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Kawasaki_station_-_2024_10_1_various_19_18_34_294000.jpeg/1920px-Kawasaki_station_-_2024_10_1_various_19_18_34_294000.jpeg', // Wikimedia Commons - Kawasaki Station
  'work_greater_tokyo_o_122': 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=1600&auto=format&fit=crop', // Tokyo Outer Loop Railway Line
  'work_osaka_smart_met_123': 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?q=80&w=1600&auto=format&fit=crop', // Osaka Smart Metro Modernization
  'work_nagoya_metropol_124': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Nagoya_Series-N1000-N1114.jpg/1920px-Nagoya_Series-N1000-N1114.jpg', // Wikimedia Commons - Nagoya Subway N1000

  // India Projects
  'work_mumbai_ahmedabad_rail_200': 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1600&auto=format&fit=crop', // High-Speed Shinkansen Rail
  'work_india_002': 'https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=1600&auto=format&fit=crop', // Western Dedicated Freight Corridor
  'work_india_003': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Atal_Setu_-_Trans_Harbour_Link_Mumbai.jpg/1920px-Atal_Setu_-_Trans_Harbour_Link_Mumbai.jpg', // Wikimedia Commons - Atal Setu MTHL Bridge
  'work_india_004': 'https://upload.wikimedia.org/wikipedia/commons/2/29/Bogibeel_Bridge_view.jpg', // Wikimedia Commons - Bogibeel Brahmaputra Bridge
  'work_india_005': 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1600&auto=format&fit=crop', // Chennai Outer Ring Road Expressway
  'work_india_006': 'https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=1600&auto=format&fit=crop', // North East Road Network Phase I
  'work_india_007': 'https://images.unsplash.com/photo-1544984243-ec57ea16fe25?q=80&w=1600&auto=format&fit=crop', // North East Road Network Phase II
  'work_india_008': 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1600&auto=format&fit=crop', // North East Road Network Phase III
  'work_india_009': 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=1600&auto=format&fit=crop', // Bihar National Highway Project Phase I
  'work_india_010': 'https://images.unsplash.com/photo-1509391365360-2e959784a276?q=80&w=1600&auto=format&fit=crop', // Bihar National Highway Project Phase II
  'work_india_011': 'https://images.unsplash.com/photo-1544984243-ec57ea16fe25?q=80&w=1600&auto=format&fit=crop', // Delhi-Mumbai Industrial Corridor
  'work_india_012': 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1600&auto=format&fit=crop', // Dholera Industrial Smart City
  'work_india_013': 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=1600&auto=format&fit=crop', // Chennai-Bengaluru Industrial Corridor
  'work_india_014': 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600&auto=format&fit=crop', // Tamil Nadu Industrial Infrastructure
  'work_india_015': 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?q=80&w=1600&auto=format&fit=crop', // Purulia Pumped Hydro Station
  'work_india_016': 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1600&auto=format&fit=crop', // Turga Pumped Hydro Storage
  'work_india_017': 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?q=80&w=1600&auto=format&fit=crop', // Ghatghar Pumped Storage Hydro
  'work_india_018': 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=1600&auto=format&fit=crop', // Bakreswar Thermal Power Station
  'work_india_019': 'https://images.unsplash.com/photo-1574482620826-40685ca5ebd2?q=80&w=1600&auto=format&fit=crop', // Haldia Maritime Port Modernization
  'work_india_020': 'https://images.unsplash.com/photo-1527066579998-dbbae57f45ce?q=80&w=1600&auto=format&fit=crop', // Hooghly Shipyard Dock Facilities
  'work_india_021': 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1600&auto=format&fit=crop', // Burnpur Integrated Steel Works
  'work_india_022': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1600&auto=format&fit=crop', // Mumbai Wastewater Disposal Facilities
  'work_india_023': 'https://images.unsplash.com/photo-1583321500900-82807e458f3c?q=80&w=1600&auto=format&fit=crop', // Yamuna River Wastewater Action Plan
  'work_india_024': 'https://images.unsplash.com/photo-1569429593410-b498b3fb3387?q=80&w=1600&auto=format&fit=crop', // Yamuna Action Plan Phase III Delhi
  'work_india_025': 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1600&auto=format&fit=crop', // Bengaluru Water Supply & Sewerage
  'work_india_026': 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?q=80&w=1600&auto=format&fit=crop', // Rajasthan Rural Water Infrastructure
  'work_india_027': 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1600&auto=format&fit=crop', // Mumbai Metro Line 3 Aqua Line
  'work_india_028': 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop', // Delhi Metro Rail Network
  'work_india_029': 'https://images.unsplash.com/photo-1578637387939-43c525550085?q=80&w=1600&auto=format&fit=crop', // Chennai Metro Rail Project
  'work_india_030': 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1600&auto=format&fit=crop', // Vadodara High-Speed Rail Institute
};

const fullSourceList = projects.map((p, i) => ({
  index: i + 1,
  id: p.id,
  title: p.title,
  location: p.location,
  category: p.category,
  sourceUrl: sourceUrls[p.id] || 'https://images.unsplash.com/photo-1542296332-2e4473faf563?q=80&w=1600&auto=format&fit=crop',
  provider: (sourceUrls[p.id] || '').includes('wikimedia.org') ? 'Wikimedia Commons' : 'Unsplash'
}));

fs.writeFileSync(path.resolve(__dirname, 'all_original_source_urls.json'), JSON.stringify(fullSourceList, null, 2));
console.log('Saved all_original_source_urls.json');
