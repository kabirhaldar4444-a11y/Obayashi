import https from 'https';
import fs from 'fs';

const projectQueries = [
  { id: 'work_haneda_airport__100', query: 'Tokyo_International_Airport', fallbackQuery: 'Haneda_Airport' },
  { id: 'work_fukutoku_toyosu_101', query: 'Haneda_Airport_Access_Line', fallbackQuery: 'JR_East' },
  { id: 'work_azabudai_hills__102', query: 'Azabudai_Hills', fallbackQuery: 'Azabudai_Hills_Mori_JP_Tower' },
  { id: 'work_shibuya_sakura__103', query: 'Shibuya_Sakura_Stage', fallbackQuery: 'Shibuya' },
  { id: 'work_takanawa_gatewa_104', query: 'Takanawa_Gateway_Station', fallbackQuery: 'Takanawa_Gateway' },
  { id: 'work_hokkaido_honshu_105', query: 'Hokkaido-Honshu_HVDC_Link', fallbackQuery: 'High-voltage_direct_current' },
  { id: 'work_osaka_ir_integr_106', query: 'Yumeshima', fallbackQuery: 'Osaka_Bay' },
  { id: 'work_tokyo_metropoli_107', query: 'Metropolitan_Area_Outer_Underground_Discharge_Channel', fallbackQuery: 'G-Cans' },
  { id: 'work_hokkaido_offsho_108', query: 'Wind_power_in_Japan', fallbackQuery: 'Offshore_wind_power' },
  { id: 'work_chuo_shinkansen_109', query: 'Chūō_Shinkansen', fallbackQuery: 'L0_Series' },
  { id: 'work_tokyo_metro_net_110', query: 'Shinagawa_Station', fallbackQuery: 'Shinagawa' },
  { id: 'work_osaka_metro_ext_111', query: 'Shibuya_Scramble_Square', fallbackQuery: 'Shibuya_Station' },
  { id: 'work_yokohama_urban__112', query: 'Tokyo_Station', fallbackQuery: 'Marunouchi' },
  { id: 'work_nagoya_metro_gr_113', query: 'Nakano_Station_(Tokyo)', fallbackQuery: 'Nakano,_Tokyo' },
  { id: 'work_fukuoka_metro_n_114', query: 'Hamamatsuchō_Station', fallbackQuery: 'Tokyo_Monorail' },
  { id: 'work_sapporo_metro_f_115', query: 'Niigata_Station', fallbackQuery: 'Niigata' },
  { id: 'work_kyoto_urban_met_116', query: 'Tōhoku_Shinkansen', fallbackQuery: 'E5_Series_Shinkansen' },
  { id: 'work_kobe_metro_exte_117', query: 'Yamagata_Shinkansen', fallbackQuery: 'E8_Series_Shinkansen' },
  { id: 'work_sendai_metro_ex_118', query: 'Mageshima', fallbackQuery: 'Kagoshima' },
  { id: 'work_hiroshima_metro_119', query: 'Tsukishima', fallbackQuery: 'Chuo,_Tokyo' },
  { id: 'work_chiba_metro_cor_120', query: 'Wind_power_in_Japan', fallbackQuery: 'Akita' },
  { id: 'work_kawasaki_metro__121', query: 'Wind_power_in_Japan', fallbackQuery: 'Niigata' },
  { id: 'work_greater_tokyo_o_122', query: 'Kita-Shinagawa_Station', fallbackQuery: 'Shinagawa' },
  { id: 'work_osaka_smart_met_123', query: 'Osaka_Metro_Chūō_Line', fallbackQuery: 'Osaka_Metro' },
  { id: 'work_nagoya_metropol_124', query: 'Nagoya_Station', fallbackQuery: 'JR_Central_Towers' },
  { id: 'work_mumbai_ahmedabad_rail_200', query: 'Mumbai–Ahmedabad_high-speed_rail_corridor', fallbackQuery: 'High-speed_rail_in_India' },
  { id: 'work_india_002', query: 'Western_Dedicated_Freight_Corridor', fallbackQuery: 'Dedicated_Freight_Corridor_Corporation_of_India' },
  { id: 'work_india_003', query: 'Mumbai_Trans_Harbour_Link', fallbackQuery: 'Atal_Setu' },
  { id: 'work_india_004', query: 'Dhubri–Phulbari_Bridge', fallbackQuery: 'Brahmaputra_River' },
  { id: 'work_india_005', query: 'Chennai_Peripheral_Ring_Road', fallbackQuery: 'Outer_Ring_Road,_Chennai' },
  { id: 'work_india_006', query: 'National_Highway_6_(India)', fallbackQuery: 'Shillong' },
  { id: 'work_india_007', query: 'National_Highway_40_(India)', fallbackQuery: 'Mizoram' },
  { id: 'work_india_008', query: 'National_Highway_44_(India)', fallbackQuery: 'Chenani-Nashri_Tunnel' },
  { id: 'work_india_009', query: 'National_Highway_31_(India)', fallbackQuery: 'Bihar' },
  { id: 'work_india_010', query: 'Mahatma_Gandhi_Setu', fallbackQuery: 'Patna' },
  { id: 'work_india_011', query: 'Delhi–Mumbai_Industrial_Corridor_Project', fallbackQuery: 'DMIC' },
  { id: 'work_india_012', query: 'Dholera', fallbackQuery: 'Dholera_SIR' },
  { id: 'work_india_013', query: 'Chennai_Bengaluru_Industrial_Corridor', fallbackQuery: 'Bengaluru' },
  { id: 'work_india_014', query: 'SIPCOT', fallbackQuery: 'Tamil_Nadu' },
  { id: 'work_india_015', query: 'Purulia_Pumped_Storage_Project', fallbackQuery: 'Purulia' },
  { id: 'work_india_016', query: 'Purulia_Pumped_Storage_Project', fallbackQuery: 'Purulia' },
  { id: 'work_india_017', query: 'Ghatghar_Pumped_Storage_Hydroelectric_Power_Station', fallbackQuery: 'Ghatghar' },
  { id: 'work_india_018', query: 'Bakreswar_Thermal_Power_Station', fallbackQuery: 'Bakreswar' },
  { id: 'work_india_019', query: 'Haldia_Dock_Complex', fallbackQuery: 'Haldia' },
  { id: 'work_india_020', query: 'Hooghly_Dock_%26_Port_Engineers', fallbackQuery: 'Hooghly_River' },
  { id: 'work_india_021', query: 'IISCO_Steel_Plant', fallbackQuery: 'Burnpur' },
  { id: 'work_india_022', query: 'Bandra', fallbackQuery: 'Mumbai' },
  { id: 'work_india_023', query: 'Yamuna_Action_Plan', fallbackQuery: 'Yamuna' },
  { id: 'work_india_024', query: 'Okhla', fallbackQuery: 'Delhi' },
  { id: 'work_india_025', query: 'Bangalore_Water_Supply_and_Sewerage_Board', fallbackQuery: 'Bengaluru' },
  { id: 'work_india_026', query: 'Indira_Gandhi_Canal', fallbackQuery: 'Rajasthan' },
  { id: 'work_india_027', query: 'Line_3_(Mumbai_Metro)', fallbackQuery: 'Mumbai_Metro' },
  { id: 'work_india_028', query: 'Delhi_Metro', fallbackQuery: 'Delhi_Metro_Yellow_Line' },
  { id: 'work_india_029', query: 'Chennai_Metro', fallbackQuery: 'Chennai' },
  { id: 'work_india_030', query: 'National_High_Speed_Rail_Corporation_Limited', fallbackQuery: 'Vadodara' }
];

function fetchWikiImage(query) {
  return new Promise((resolve) => {
    const url = 'https://en.wikipedia.org/api/rest_v1/page/summary/' + encodeURIComponent(query);
    https.get(url, { headers: { 'User-Agent': 'ObayashiProjectAuditor/1.0 (contact@obayashi.co.jp)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.originalimage && json.originalimage.source) {
            return resolve(json.originalimage.source);
          }
          if (json.thumbnail && json.thumbnail.source) {
            return resolve(json.thumbnail.source);
          }
          resolve(null);
        } catch(e) { resolve(null); }
      });
    }).on('error', () => resolve(null));
  });
}

async function auditAll() {
  console.log('Auditing and fetching Wikipedia/Wikimedia exact real photos...');
  const results = {};
  for (const item of projectQueries) {
    let img = await fetchWikiImage(item.query);
    if (!img && item.fallbackQuery) {
      img = await fetchWikiImage(item.fallbackQuery);
    }
    results[item.id] = img;
    console.log(`[${item.id}]: ${img ? 'FOUND -> ' + img.substring(0, 60) + '...' : 'NONE'}`);
  }
  
  fs.writeFileSync('./scripts/wiki_results.json', JSON.stringify(results, null, 2));
  console.log('Saved wiki results to ./scripts/wiki_results.json');
}

auditAll();
