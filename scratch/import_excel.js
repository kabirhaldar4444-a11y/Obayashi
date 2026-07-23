const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const excelPath = path.join(__dirname, '..', 'INDIA JAPAN.xlsx');
const wb = XLSX.readFile(excelPath);
const sheetName = wb.SheetNames[0];
const rawData = XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);

console.log(`Read ${rawData.length} projects from ${sheetName} in ${excelPath}`);

function mapCategory(sector = '', subSector = '') {
  const s = `${sector} ${subSector}`.toLowerCase();
  if (s.includes('power') || s.includes('thermal') || s.includes('hydropower') || s.includes('pumped storage')) return 'Energy';
  if (s.includes('education') || s.includes('training') || s.includes('school')) return 'Education';
  if (s.includes('industrial') || s.includes('steel') || s.includes('smart city')) return 'Offices';
  return 'Civil Infra';
}

const worksProjects = rawData.map((item, index) => {
  const id = index === 0 ? 'work_mumbai_ahmedabad_rail_200' : `work_india_${(index + 1).toString().padStart(3, '0')}`;
  const cat = mapCategory(item['Sector'], item['Sub-Sector']);
  const title = item['Project Name'] || '';
  const desc = item['Description'] || '';
  const loc = item['Location'] || 'India';
  const budget = item['Budget'] || 'Undisclosed';
  const timeline = item['Timeline'] || 'Ongoing';
  const sector = item['Sector'] || 'Infrastructure';
  const subSector = item['Sub-Sector'] || 'Civil Engineering';

  let compYear = '2025';
  const yearMatch = timeline.match(/20\d\d/g);
  if (yearMatch) {
    compYear = yearMatch[yearMatch.length - 1];
  } else if (timeline.toLowerCase().includes('ongoing')) {
    compYear = '2025';
  } else if (timeline.includes('1990') || timeline.includes('1980') || timeline.includes('2000')) {
    compYear = 'Before 2022';
  }

  return {
    id,
    title,
    subtitle: desc.length > 130 ? desc.substring(0, 127) + '...' : desc,
    category: cat,
    designType: 'Design & Build',
    location: loc,
    locationCategory: 'India',
    completion: timeline,
    completionYear: compYear,
    summary: desc,
    description: desc,
    details: [
      { label: 'Sector', value: sector },
      { label: 'Sub-Sector', value: subSector },
      { label: 'Budget', value: budget },
      { label: 'Location', value: loc }
    ]
  };
});

// Load worksContent.js
const worksContentPath = path.join(__dirname, '..', 'src', 'data', 'worksContent.js');
let worksCode = fs.readFileSync(worksContentPath, 'utf8');

// Extract export const workCategories
const catEnd = worksCode.indexOf('export const projects =');
const categoriesCode = worksCode.substring(0, catEnd);

// Parse existing projects array
const projectsJsonStr = worksCode.substring(catEnd + 'export const projects = '.length).trim().replace(/;$/, '');
let existingProjects = [];
try {
  existingProjects = JSON.parse(projectsJsonStr);
} catch (e) {
  existingProjects = new Function(`return ${projectsJsonStr}`)();
}

const japanProjects = existingProjects.filter(p => p.locationCategory !== 'India');
const allProjects = [...japanProjects, ...worksProjects];

const updatedWorksCode = categoriesCode + 'export const projects = ' + JSON.stringify(allProjects, null, 2) + ';\n';
fs.writeFileSync(worksContentPath, updatedWorksCode);
console.log(`Successfully written ${allProjects.length} total projects (${japanProjects.length} Japan + ${worksProjects.length} India) to worksContent.js`);

// Load projectDetails.js
const projectDetailsPath = path.join(__dirname, '..', 'src', 'data', 'projectDetails.js');
let detailsCode = fs.readFileSync(projectDetailsPath, 'utf8');
const detailsJsonStr = detailsCode.substring('export const detailedProjectContent = '.length).trim().replace(/;$/, '');

let detailsObj = {};
try {
  detailsObj = JSON.parse(detailsJsonStr);
} catch (e) {
  detailsObj = new Function(`return ${detailsJsonStr}`)();
}

rawData.forEach((item, index) => {
  const id = index === 0 ? 'work_mumbai_ahmedabad_rail_200' : `work_india_${(index + 1).toString().padStart(3, '0')}`;
  const title = item['Project Name'] || '';
  const desc = item['Description'] || '';
  const loc = item['Location'] || 'India';
  const budget = item['Budget'] || 'Undisclosed';
  const timeline = item['Timeline'] || 'Ongoing';
  const sector = item['Sector'] || 'Infrastructure';
  const subSector = item['Sub-Sector'] || 'Civil Engineering';

  if (!detailsObj[id]) {
    detailsObj[id] = {
      kanjiName: '日印協力インフラ事業',
      romajiName: 'Nichi-In Kyōryoku Infura Jigyo',
      prefecture: loc,
      city: loc.split(',')[0].split('&')[0].trim(),
      tokyoDistance: 'N/A (India Project)',
      airport: 'Major Regional Airport',
      locationStory: `Strategic infrastructure development located in ${loc}. Implemented under India-Japan bilateral cooperation with JICA ODA support.`,
      coordinates: '20.5937° N, 78.9629° E',
      challenges: [
        `Executing high-capacity ${subSector.toLowerCase()} construction while maintaining strict environmental and safety standards.`,
        'Coordinating multi-state logistics and specialized engineering cooperation under India-Japan development frameworks.'
      ],
      solutions: [
        'Deploying advanced Japanese technology, pre-fabricated modular structural components, and high-efficiency project management.',
        'Implementing real-time digital monitoring and environmental management systems throughout the construction lifecycle.'
      ],
      timeline: [
        { phase: 'Planning & ODA Agreement', date: 'Initial Phase', desc: 'Feasibility studies and bilateral cooperation agreements.' },
        { phase: 'Engineering & Procurement', date: 'Phase 1', desc: 'Detailed design, site preparation, and civil engineering tenders.' },
        { phase: 'Main Construction & Erection', date: 'Phase 2', desc: 'Heavy civil works, structural assembly, and utility integration.' },
        { phase: 'Commissioning & Integration', date: timeline, desc: 'Testing, quality assurance audits, and operational handover.' }
      ],
      specs: {
        'Sector': sector,
        'Sub-Sector': subSector,
        'Budget': budget,
        'Timeline': timeline,
        'Funding/Cooperation': 'Japanese ODA (JICA) / Engineering Cooperation',
        'Country': 'India'
      },
      culturalInsight: {
        title: '絆',
        meaning: 'Symbolizing "Kizuna" (enduring bonds of friendship and strategic partnership) between India and Japan.',
        quote: '「切磋琢磨」',
        quoteTranslation: 'Refining skills through mutual cooperation and joint effort.'
      }
    };
  }
});

const updatedDetailsCode = 'export const detailedProjectContent = ' + JSON.stringify(detailsObj, null, 2) + ';\n';
fs.writeFileSync(projectDetailsPath, updatedDetailsCode);
console.log(`Successfully written detailed entries for all 30 Indian projects to projectDetails.js`);
