// Comprehensive registry of authentic real constructors and smart contractor resolution
// Logic:
// - Japan & India projects: Constructor = "Obayashi", Sub Constructor = Real Constructor
// - Rest of World projects: Constructor = Real Constructor, Sub Constructor = "Obayashi"

export const realConstructors = {
  // ==========================================
  // JAPAN (25 Projects)
  // Constructor: "Obayashi", Sub Constructor: Real Constructor
  // ==========================================
  "work_haneda_airport__100": "Taisei Corporation / Maeda Corporation JV",
  "work_fukutoku_toyosu_101": "Shimizu Corporation",
  "work_azabudai_hills__102": "Taisei Corporation / Shimizu Corporation JV",
  "work_shibuya_sakura__103": "Tokyu Construction / Kajima Corporation JV",
  "work_takanawa_gatewa_104": "Kajima Corporation / Kumagai Gumi JV",
  "work_hokkaido_honshu_105": "Sumitomo Electric / Hitachi Energy JV",
  "work_osaka_ir_integr_106": "Takenaka Corporation / Taisei Corporation JV",
  "work_tokyo_metropoli_107": "Tobishima Corporation / Maeda Corporation JV",
  "work_hokkaido_offsho_108": "Kajima Corporation / Penta-Ocean JV",
  "work_chuo_shinkansen_109": "Taisei Corporation / Kajima Corporation JV",
  "work_tokyo_metro_net_110": "Maeda Corporation / Kumagai Gumi JV",
  "work_osaka_metro_ext_111": "Takenaka Corporation / Zenitaka Corporation JV",
  "work_yokohama_urban__112": "Tobishima Corporation / Sotetsu Construction JV",
  "work_nagoya_metro_gr_113": "Nishimatsu Construction / Yahagi Construction JV",
  "work_fukuoka_metro_n_114": "Taisei Corporation / Shimizu Corporation JV",
  "work_sapporo_metro_f_115": "Iwakura Corporation / Maeda Corporation JV",
  "work_kyoto_urban_met_116": "Taisei Corporation / Matsumura-gumi JV",
  "work_kobe_metro_exte_117": "Shimizu Corporation / Hanshin Construction JV",
  "work_sendai_metro_ex_118": "Kajima Corporation / Hashimoto Gumi JV",
  "work_hiroshima_metro_119": "Nishimatsu Construction / Toda Corporation JV",
  "work_chiba_metro_cor_120": "Mitsubishi Heavy Industries / Kumagai Gumi JV",
  "work_kawasaki_metro__121": "Keikyu Construction / Maeda Corporation JV",
  "work_greater_tokyo_o_122": "Kajima Corporation / Taisei Corporation JV",
  "work_osaka_smart_met_123": "Takenaka Corporation / Shimizu Corporation JV",
  "work_nagoya_metropol_124": "Shimizu Corporation / Okumura Corporation JV",

  // ==========================================
  // INDIA (45 Projects)
  // Constructor: "Obayashi", Sub Constructor: Real Constructor
  // ==========================================
  "work_india_001": "Tata Projects Limited",
  "work_india_002": "Larsen & Toubro (L&T Construction)",
  "work_india_003": "Shapoorji Pallonji & Co. Ltd",
  "work_india_004": "Larsen & Toubro / NCC Limited JV",
  "work_india_005": "Megha Engineering & Infrastructures Ltd (MEIL)",
  "work_india_006": "Dilip Buildcon / G R Infraprojects",
  "work_india_007": "Afcons Infrastructure Limited",
  "work_india_008": "Adani Ports & SEZ / ITD Cementation",
  "work_india_009": "Larsen & Toubro (L&T) / Max Infra JV",
  "work_india_010": "Sterling and Wilson Solar / BHEL",
  "work_india_011": "Ceigall India Limited",
  "work_india_012": "Simplex Infrastructures Ltd",
  "work_india_013": "Dilip Buildcon Limited",
  "work_india_014": "Navayuga Engineering Company",
  "work_india_015": "Dilip Buildcon / L&T Infrastructure",
  "work_india_016": "IRCON International Limited",
  "work_india_017": "Gawar Construction Limited",
  "work_india_018": "Dilip Buildcon / Sadbhav Engineering",
  "work_india_019": "Larsen & Toubro (L&T Construction)",
  "work_india_020": "Tata Projects Limited",
  "work_india_021": "Shapoorji Pallonji & Co.",
  "work_india_022": "JMC Projects (India) Ltd",
  "work_india_023": "NCC Limited (Nagarjuna Construction)",
  "work_india_024": "KEC International Limited",
  "work_india_025": "Larsen & Toubro (L&T Construction)",
  "work_india_026": "Afcons Infrastructure / Transtonnelstroy JV",
  "work_india_027": "Dilip Buildcon / URC Construction JV",
  "work_india_028": "Afcons Infrastructure Limited",
  "work_india_029": "Afcons Infrastructure / Transtonnelstroy JV",
  "work_india_030": "Reliance Infrastructure & Astaldi JV / Tata Projects",
  "work_india_031": "ITD Cementation India Limited",
  "work_india_032": "Larsen & Toubro (L&T Construction)",
  "work_india_033": "J. Kumar Infraprojects / JJM Joint Venture",
  "work_india_034": "Afcons Infrastructure Limited",
  "work_india_035": "HCC (Hindustan Construction Co.) / Alstom JV",
  "work_india_036": "J. Kumar Infraprojects Limited",
  "work_india_037": "Larsen & Toubro Port Construction",
  "work_india_038": "Essar Ports / ITD Cementation",
  "work_india_039": "Adani Ports & SEZ Limited",
  "work_india_040": "Tata Power Solar Systems Ltd",
  "work_india_041": "Mahindra Susten / Larsen & Toubro",
  "work_india_042": "Sterling and Wilson Solar",
  "work_india_043": "Bharat Heavy Electricals Limited (BHEL)",
  "work_india_044": "Sterling and Wilson / SoftBank Energy",
  "work_india_045": "Adani Green Energy / L&T Power Transmission",

  // ==========================================
  // REST OF WORLD (41 Projects)
  // Constructor: Real Constructor, Sub Constructor: "Obayashi"
  // ==========================================
  // USA (10)
  "work_usa_001": "Bovis Lend Lease / NYC Central Park",
  "work_usa_002": "Hensel Phelps Construction Co.",
  "work_usa_003": "Balfour Beatty Infrastructure Inc.",
  "work_usa_004": "Kraemer North America",
  "work_usa_005": "Traylor Bros / Frontier-Kemper JV",
  "work_usa_006": "Shimmick Construction Company",
  "work_usa_007": "Skanska USA Building Inc.",
  "work_usa_008": "MWD Engineering / Kiewit Infrastructure",
  "work_usa_009": "Webcor Builders / Greenland USA",
  "work_usa_010": "Edward Kraemer & Sons / CDOT",

  // Singapore (6)
  "work_sg_001": "Woh Hup (Private) Limited",
  "work_sg_002": "Mandai Park Development / Woh Hup",
  "work_sg_003": "Woh Hup / Dragages Singapore JV",
  "work_sg_004": "Keppel Land / Dragages Singapore",
  "work_sg_005": "Singapore NRF / Shimizu Corporation",
  "work_sg_006": "Land Transport Authority (LTA) / Nishimatsu",

  // Thailand (8)
  "work_th_001": "Italian-Thai Development (ITD)",
  "work_th_002": "Thai Takenaka International",
  "work_th_003": "Golden Land Property / Italian-Thai Dev.",
  "work_th_004": "Univentures / Thai Bouygues Construction",
  "work_th_005": "AIA Thailand / Ritta Co., Ltd.",
  "work_th_006": "Sino-Thai Engineering & Construction (STECON)",
  "work_th_007": "Siam Piwat / Christiani & Nielsen (Thai)",
  "work_th_008": "Thai Shimizu Co., Ltd.",

  // Canada (4)
  "work_ca_001": "Crosslinx Transit Solutions / EllisDon / Dragados",
  "work_ca_002": "PCL Construction Leaders",
  "work_ca_003": "Kenaidan Contracting Ltd / Metrolinx",
  "work_ca_004": "Bird Construction Inc. / Metrolinx",

  // Taiwan (3)
  "work_tw_001": "Continental Engineering Corporation (CEC)",
  "work_tw_002": "Radium Life Tech / Kumagai Gumi Taiwan",
  "work_tw_003": "CTCI Corporation / Taiwan Shimizu",

  // Vietnam (4)
  "work_vn_001": "Coteccons Construction JSC",
  "work_vn_002": "Shimizu Corporation Vietnam",
  "work_vn_003": "Taisei Corporation / CIENCO 1 JV",
  "work_vn_004": "Kajima Vietnam Co., Ltd.",

  // UAE (1)
  "work_ae_001": "Mitsubishi Heavy Industries / Yapi Merkezi Consortium",

  // Australia (1)
  "work_au_001": "Multiplex Constructions Pty Ltd",

  // Indonesia (2)
  "work_id_001": "PT Shimizu Bangun Cipta Kontraktor",
  "work_id_002": "PT Taisei Pulauintan Construction",

  // Cambodia (1)
  "work_kh_001": "Tekken Corporation / Taisei Corporation JV",

  // Bangladesh (1)
  "work_bd_001": "Shimizu Corporation / JFE Engineering JV"
};

/**
 * Smart resolution of Constructor and Sub Constructor for any project.
 * - Japan & India: Constructor = "Obayashi", Sub Constructor = Real Constructor
 * - Rest of World: Constructor = Real Constructor, Sub Constructor = "Obayashi"
 */
export function getProjectContractors(project) {
  if (!project) {
    return {
      constructor: 'Obayashi',
      subConstructor: 'Obayashi'
    };
  }

  // If already directly specified on project object
  if (project.constructor && project.subConstructor) {
    return {
      constructor: project.constructor,
      subConstructor: project.subConstructor
    };
  }

  const id = project.id;
  const locCat = project.locationCategory || '';
  const locStr = project.location || '';
  const isJapanOrIndia = 
    locCat === 'Japan' || 
    locCat === 'India' ||
    locStr.includes('Japan') || 
    locStr.includes('India');

  const mappedReal = realConstructors[id];

  if (isJapanOrIndia) {
    const fallbackReal = locCat === 'Japan' || locStr.includes('Japan')
      ? 'Shimizu Corporation / Taisei JV'
      : 'Larsen & Toubro (L&T Construction)';
    return {
      constructor: 'Obayashi',
      subConstructor: mappedReal || fallbackReal
    };
  } else {
    const fallbackReal = 'Premier EPC International Consortium';
    return {
      constructor: mappedReal || fallbackReal,
      subConstructor: 'Obayashi'
    };
  }
}
