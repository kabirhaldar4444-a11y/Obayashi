import fs from 'fs';
import https from 'https';
import crypto from 'crypto';
import { projects } from '../src/data/worksContent.js';
import { detailedProjectContent } from '../src/data/projectDetails.js';

// Map of correct titles, subtitles, summaries, and descriptions for Japan projects 100-124
const japanFixes = {
  "work_haneda_airport__100": {
    title: "Haneda Airport Terminal 2 International Expansion",
    subtitle: "A major airport infrastructure expansion project completed to increase international passenger capacity at Tokyo's Haneda Airport.",
    location: "Tokyo, Japan"
  },
  "work_fukutoku_toyosu_101": {
    title: "Fukutoku & Toyosu District Redevelopment",
    subtitle: "A large mixed-use urban redevelopment project transforming the Toyosu area into a modern business, residential, and commercial hub.",
    location: "Tokyo, Japan"
  },
  "work_azabudai_hills__102": {
    title: "Azabudai Hills Development",
    subtitle: "One of Japan's largest urban redevelopment projects featuring high-rise commercial towers, residential spaces, and green plazas.",
    location: "Tokyo, Japan"
  },
  "work_shibuya_sakura__103": {
    title: "Shibuya Sakura Stage Redevelopment",
    subtitle: "A major urban regeneration project completed as part of the Shibuya redevelopment program.",
    location: "Tokyo, Japan"
  },
  "work_takanawa_gatewa_104": {
    title: "Takanawa Gateway City Phase 1",
    subtitle: "A large-scale transit-oriented development surrounding Takanawa Gateway Station.",
    location: "Tokyo, Japan"
  },
  "work_hokkaido_honshu_105": {
    title: "Hokkaido–Honshu HVDC Interconnection Expansion",
    subtitle: "A major national power transmission project designed to strengthen electricity transfer between Hokkaido and Honshu.",
    location: "Hokkaido & Honshu, Japan"
  },
  "work_osaka_ir_integr_106": {
    title: "Osaka IR Integrated Resort Development",
    subtitle: "A landmark mixed-use tourism and entertainment development constructed on Yumeshima Island in Osaka Bay.",
    location: "Osaka, Japan"
  },
  "work_tokyo_metropoli_107": {
    title: "Tokyo Metropolitan Underground Flood Protection Expansion",
    subtitle: "A large-scale urban resilience project expanding underground flood protection and water surge infrastructure across Greater Tokyo.",
    location: "Saitama, Japan"
  },
  "work_hokkaido_offsho_108": {
    title: "Hokkaido Offshore Wind Power Development",
    subtitle: "A large offshore renewable energy project developed to accelerate Japan's transition toward carbon neutrality.",
    location: "Hokkaido, Japan"
  },
  "work_chuo_shinkansen_109": {
    title: "Chuo Shinkansen (Maglev) Southern Alps Tunnel",
    subtitle: "Japan's next-generation high-speed magnetic levitation railway tunnel through the Southern Alps mountain range.",
    location: "Shizuoka, Japan"
  },
  "work_tokyo_metro_net_110": {
    title: "Tokyo Metro Network Expansion Phase 2",
    subtitle: "A major urban subway network expansion project designed to improve rail capacity and connectivity across Tokyo.",
    location: "Tokyo, Japan"
  },
  "work_osaka_metro_ext_111": {
    title: "Osaka Metro Extension Plan",
    subtitle: "A high-capacity metro expansion initiative extending underground lines into developing commercial and waterfront districts in Osaka.",
    location: "Osaka, Japan"
  },
  "work_yokohama_urban__112": {
    title: "Yokohama Municipal Subway Extension",
    subtitle: "A strategic municipal transportation project extending Yokohama's rapid subway transit network.",
    location: "Yokohama, Kanagawa, Japan"
  },
  "work_nagoya_metro_gr_113": {
    title: "Nagoya Municipal Subway Meijo Line Extension",
    subtitle: "A metro rail development project extending rapid transit services along Nagoya's circular Meijo Subway Line.",
    location: "Nagoya, Aichi, Japan"
  },
  "work_fukuoka_metro_n_114": {
    title: "Fukuoka Subway Nanakuma Line Extension",
    subtitle: "A subway extension project enhancing urban transit connectivity between Hakata Station and downtown Fukuoka.",
    location: "Fukuoka, Japan"
  },
  "work_sapporo_metro_f_115": {
    title: "Sapporo Subway Tozai Line Extension",
    subtitle: "A rapid subway transit development project extending east-west line coverage across suburban Sapporo.",
    location: "Sapporo, Hokkaido, Japan"
  },
  "work_kyoto_urban_met_116": {
    title: "Kyoto Subway Tozai Line Extension",
    subtitle: "An underground transit extension project expanding public transit access across Kyoto while preserving historical heritage sites.",
    location: "Kyoto, Japan"
  },
  "work_kobe_metro_exte_117": {
    title: "Kobe Subway Wangan Line Extension",
    subtitle: "An urban waterfront subway project connecting Kobe's port facilities, commercial zones, and residential areas.",
    location: "Kobe, Hyogo, Japan"
  },
  "work_sendai_metro_ex_118": {
    title: "Sendai Subway Tozai Line Extension",
    subtitle: "A metro expansion initiative improving commuter travel times across Sendai's east-west transit corridor.",
    location: "Sendai, Miyagi, Japan"
  },
  "work_hiroshima_metro_119": {
    title: "Hiroshima Rapid Transit Line Extension",
    subtitle: "An elevated and underground urban transit line extension enhancing connectivity throughout Hiroshima.",
    location: "Hiroshima, Japan"
  },
  "work_chiba_metro_cor_120": {
    title: "Chiba Urban Monorail Line Extension",
    subtitle: "A major urban monorail corridor project expanding suspended rail transit between residential suburbs and central Chiba.",
    location: "Chiba, Japan",
    summary: "A major urban monorail corridor project expanding suspended rail transit between residential suburbs and central Chiba. The project includes elevated steel structures, modern station platforms, power substations, and automated transit technology.",
    description: "The Chiba Urban Monorail Line Extension is a major municipal transit project expanding suspended monorail services across Chiba City. Designed to enhance urban mobility, reduce road congestion, and provide direct transit access between residential districts and central business centers, the project features state-of-the-art elevated rail structures and automated train operations.\n\nConstruction involves specialized elevated steel girder erection, column foundations engineered to withstand coastal soil conditions, and modern elevated station platforms. Advanced seismic isolation bearings and sound-dampening track mountings ensure rider comfort and structural resilience.\n\nUpon completion, the monorail extension will deliver faster commute times, reduce urban carbon emissions, and strengthen connectivity across the Chiba metropolitan area."
  },
  "work_kawasaki_metro__121": {
    title: "Kawasaki Rapid Transit Railway Project",
    subtitle: "An urban rail transit project constructing new subway corridors and multimodal hubs across Kawasaki.",
    location: "Kawasaki, Kanagawa, Japan"
  },
  "work_greater_tokyo_o_122": {
    title: "Greater Tokyo Outer Loop Railway Line",
    subtitle: "A high-capacity orbital railway project improving regional travel across the outer Tokyo metropolitan perimeter.",
    location: "Tokyo Metropolitan Area, Japan"
  },
  "work_osaka_smart_met_123": {
    title: "Osaka Smart Metro Modernization & Extension",
    subtitle: "A modern subway renovation and expansion program deploying automated train controls and smart station systems.",
    location: "Osaka, Japan"
  },
  "work_nagoya_metropol_124": {
    title: "Nagoya Metropolitan Subway New Line Project",
    subtitle: "An underground railway development expanding transit service throughout the Nagoya metropolitan region.",
    location: "Nagoya, Aichi, Japan"
  }
};

// Update projects array in worksContent.js
let updatedCount = 0;
projects.forEach((p) => {
  if (japanFixes[p.id]) {
    const fix = japanFixes[p.id];
    p.title = fix.title;
    p.subtitle = fix.subtitle;
    p.location = fix.location;
    if (fix.summary) p.summary = fix.summary;
    if (fix.description) p.description = fix.description;
    
    // Also update detail location label if present
    if (p.details && Array.isArray(p.details)) {
      const locDetail = p.details.find(d => d.label === 'Location');
      if (locDetail) locDetail.value = fix.location;
    }
    updatedCount++;
  }
});

console.log(`Updated ${updatedCount} Japan projects in memory.`);

// Write back to worksContent.js file cleanly
const newWorksContent = `export const workCategories = {
  designBuild: ["All", "Design & Build", "Construction Only"],
  facilityType: ["All", "Offices", "Civil Infra", "Energy", "Education", "Recreation"],
  location: ["All", "Japan", "India"],
  year: ["All", "2025", "2024", "2023", "2022", "Before 2022"]
};

export const projects = ${JSON.stringify(projects, null, 2)};
`;

fs.writeFileSync('./src/data/worksContent.js', newWorksContent);
fs.writeFileSync('./src/data/parsed_projects.json', JSON.stringify(projects, null, 2));

console.log('Successfully written updated projects to worksContent.js and parsed_projects.json!');

// Download proper Japan monorail image for work_chiba_metro_cor_120
const chibaMonorailUrl = 'https://images.unsplash.com/photo-1578637387939-43c525550085?q=80&w=1600&auto=format&fit=crop';
const chibaDest = './public/images/work_chiba_metro_cor_120.jpg';

function download(u, d) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(d);
    https.get(u, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return download(res.headers.location, d).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) return reject(new Error('Status ' + res.statusCode));
      res.pipe(file);
      file.on('finish', () => file.close(() => resolve(true)));
    }).on('error', err => reject(err));
  });
}

download(chibaMonorailUrl, chibaDest).then(() => {
  console.log(`[SUCCESS] Replaced work_chiba_metro_cor_120 image with authentic Japanese transit photo! (${(fs.statSync(chibaDest).size/1024).toFixed(1)} KB)`);
}).catch(err => {
  console.error('Image download failed:', err);
});
