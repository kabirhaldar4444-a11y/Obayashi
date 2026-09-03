const fs = require('fs');
const path = require('path');
const { usaProjects } = require('./usa_projects_data.cjs');

console.log(`Loaded ${usaProjects.length} USA projects`);

// 1. Copy generated map and project images
const brainDir = path.resolve('C:/Users/Dell/.gemini/antigravity-ide/brain/0019c042-9a11-4761-b128-25d123d964ad');
const imgDir = path.resolve('public/images');

// Copy map
const mapSrc = path.join(brainDir, 'usa_3d_map_1788442888717.jpg');
const mapDst = path.join(imgDir, 'usa_3d_map.png');
if (fs.existsSync(mapSrc)) {
  fs.copyFileSync(mapSrc, mapDst);
  console.log('Copied usa_3d_map.png to public/images/');
}

// Copy project 1 & 2
const p1Src = path.join(brainDir, 'work_usa_001_1788443061179.jpg');
const p1Dst = path.join(imgDir, 'work_usa_001.jpg');
if (fs.existsSync(p1Src)) {
  fs.copyFileSync(p1Src, p1Dst);
  console.log('Copied work_usa_001.jpg');
}

const p2Src = path.join(brainDir, 'work_usa_002_1788443101115.jpg');
const p2Dst = path.join(imgDir, 'work_usa_002.jpg');
if (fs.existsSync(p2Src)) {
  fs.copyFileSync(p2Src, p2Dst);
  console.log('Copied work_usa_002.jpg');
}

// Ensure remaining images 3-10
const allImgFiles = fs.readdirSync(imgDir).filter(f => {
  if (!f.endsWith('.jpg') && !f.endsWith('.png')) return false;
  if (f.startsWith('japan_') || f.startsWith('india_3d') || f.startsWith('usa_3d')) return false;
  const stat = fs.statSync(path.join(imgDir, f));
  return stat.size > 100000;
});

for (let i = 3; i <= 10; i++) {
  const numStr = String(i).padStart(3, '0');
  const targetName = `work_usa_${numStr}.jpg`;
  const targetPath = path.join(imgDir, targetName);
  if (!fs.existsSync(targetPath) || fs.statSync(targetPath).size < 10000) {
    const srcIndex = (i * 7 + 13) % allImgFiles.length;
    fs.copyFileSync(path.join(imgDir, allImgFiles[srcIndex]), targetPath);
    console.log(`Copied fallback ${allImgFiles[srcIndex]} -> ${targetName}`);
  }
}

// 2. Read existing worksContent.js
const currentWorks = fs.readFileSync('src/data/worksContent.js', 'utf8');
const projectsMatch = currentWorks.match(/export const projects = (\[[\s\S]*?\]);/);
let existingProjects = eval(projectsMatch[1]);

// Remove any prior work_usa_ items to avoid duplicates
existingProjects = existingProjects.filter(p => !p.id.startsWith('work_usa_'));

// Prepare new USA items for worksContent
const newUsaItems = usaProjects.map(p => ({
  id: p.id,
  title: p.title,
  subtitle: p.subtitle,
  category: p.category,
  designType: p.designType,
  location: p.location,
  locationCategory: "United States",
  completion: `${p.completionYear} Completion`,
  completionYear: p.completionYear,
  image: `/images/${p.id}.jpg`,
  summary: p.summary,
  description: `${p.p1}\n\n${p.p2}\n\n${p.p3}\n\n${p.p4}`,
  details: p.detailsList
}));

const combinedProjects = [...existingProjects, ...newUsaItems];
console.log(`Total projects in worksContent.js will be: ${combinedProjects.length}`);

// Prepare categories with "United States"
const updatedWorksCode = `// Works content and project definitions
export const workCategories = {
  designBuild: ["All", "Design & Build", "General Contracting"],
  facilityType: [
    "All",
    "Commercial Infrastructure",
    "Industrial Infrastructure",
    "Port Infrastructure",
    "Railways",
    "Renewable Energy",
    "Solar Energy",
    "Roads and Highways",
    "Urban Infrastructure",
    "Urban Transportation",
    "Aviation",
    "Transportation",
    "Education",
    "Research",
    "Healthcare",
    "Hospitality",
    "Residential",
    "Urban Redevelopment",
    "Cultural",
    "Sports",
    "Government",
    "Civil Infra",
    "Offices"
  ],
  location: ["All", "Japan", "India", "United States"],
  year: ["All", "2037", "2036", "2035", "2034", "2033", "2032", "2031", "2030", "2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015", "2014", "2013", "2012", "2011", "2010"]
};

export const projects = ${JSON.stringify(combinedProjects, null, 2)};
`;

fs.writeFileSync('src/data/worksContent.js', updatedWorksCode, 'utf8');
console.log('Successfully updated src/data/worksContent.js');

// 3. Update projectDetails.js
const currentDetails = fs.readFileSync('src/data/projectDetails.js', 'utf8');
const detailsMatch = currentDetails.match(/export const detailedProjectContent = ({[\s\S]*?});/);
let existingDetails = eval(`(${detailsMatch[1]})`);

// Remove prior work_usa_ items
for (const k of Object.keys(existingDetails)) {
  if (k.startsWith('work_usa_')) delete existingDetails[k];
}

// Add new USA details
usaProjects.forEach(p => {
  existingDetails[p.id] = {
    kanjiName: p.kanjiName,
    romajiName: p.romajiName,
    prefecture: p.prefecture,
    city: p.city,
    tokyoDistance: `${p.airportName} (Nearest Transit Hub)`,
    airport: p.airportName,
    locationStory: p.locationStory,
    coordinates: p.coordinates,
    challenges: p.challenges,
    solutions: p.solutions,
    timeline: p.timeline,
    specs: p.specs,
    culturalInsight: p.culturalInsight
  };
});

console.log(`Total keys in projectDetails.js will be: ${Object.keys(existingDetails).length}`);

const updatedDetailsCode = `// Detailed Project Data for Works Detail View and Interactive Maps
export const detailedProjectContent = ${JSON.stringify(existingDetails, null, 2)};
`;

fs.writeFileSync('src/data/projectDetails.js', updatedDetailsCode, 'utf8');
console.log('Successfully updated src/data/projectDetails.js');
