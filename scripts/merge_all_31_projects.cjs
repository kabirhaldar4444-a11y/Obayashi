const fs = require('fs');
const path = require('path');
const { sgProjects } = require('./international_part2.cjs');
const { thProjects } = require('./international_part2.cjs');
const { remainingProjects } = require('./international_part3.cjs');

const all31 = [...sgProjects, ...thProjects, ...remainingProjects];
console.log(`Total 31 projects loaded: ${all31.length}`);

// 1. Verify images exist in public/images
const imgDir = path.resolve('public/images');
all31.forEach(p => {
  const imgPath = path.join(imgDir, `${p.id}.jpg`);
  if (!fs.existsSync(imgPath)) {
    console.warn(`WARNING: Missing image for ${p.id} at ${imgPath}`);
  } else {
    const sz = fs.statSync(imgPath).size;
    console.log(`Verified image for ${p.id}: ${sz} bytes`);
  }
});

// 2. Read existing worksContent.js
const currentWorks = fs.readFileSync('src/data/worksContent.js', 'utf8');
const projectsMatch = currentWorks.match(/export const projects = (\[[\s\S]*?\]);/);
let existingProjects = eval(projectsMatch[1]);

// Remove any prior 31 items if present
const newIds = new Set(all31.map(p => p.id));
existingProjects = existingProjects.filter(p => !newIds.has(p.id));

// Prepare 31 items formatted for worksContent
const newFormattedItems = all31.map(p => ({
  id: p.id,
  title: p.title,
  subtitle: p.subtitle,
  category: p.category,
  designType: p.designType,
  location: p.location,
  locationCategory: p.locationCategory,
  completion: `${p.completionYear} Completion`,
  completionYear: p.completionYear,
  image: `/images/${p.id}.jpg`,
  summary: p.summary,
  description: p.description,
  details: p.detailsList
}));

const totalCombined = [...existingProjects, ...newFormattedItems];
console.log(`Total projects in worksContent.js will be: ${totalCombined.length}`);

// Updated locations list
const updatedLocations = [
  "All",
  "Japan",
  "India",
  "United States",
  "Singapore",
  "Thailand",
  "Canada",
  "Taiwan",
  "Vietnam",
  "United Arab Emirates",
  "Australia",
  "Indonesia",
  "Cambodia",
  "Bangladesh"
];

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
  location: ${JSON.stringify(updatedLocations, null, 2)},
  year: ["All", "2037", "2036", "2035", "2034", "2033", "2032", "2031", "2030", "2026", "2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015", "2014", "2013", "2012", "2011", "2010", "2007", "2006", "2002", "1999"]
};

export const projects = ${JSON.stringify(totalCombined, null, 2)};
`;

fs.writeFileSync('src/data/worksContent.js', updatedWorksCode, 'utf8');
console.log('Successfully updated src/data/worksContent.js!');

// 3. Update projectDetails.js
const currentDetails = fs.readFileSync('src/data/projectDetails.js', 'utf8');
const detailsMatch = currentDetails.match(/export const detailedProjectContent = ({[\s\S]*?});/);
let existingDetails = eval(`(${detailsMatch[1]})`);

// Remove prior 31 keys if present
for (const id of newIds) {
  delete existingDetails[id];
}

// Add all 31 detailed items
all31.forEach(p => {
  existingDetails[p.id] = {
    kanjiName: p.kanjiName,
    romajiName: p.romajiName,
    prefecture: p.locationCategory,
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
console.log('Successfully updated src/data/projectDetails.js!');
