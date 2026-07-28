const fs = require('fs');

const worksContent = fs.readFileSync('./src/data/worksContent.js', 'utf8');

const blocks = worksContent.split('"id":');
const projects = [];

for (let i = 1; i < blocks.length; i++) {
  const block = blocks[i];
  const idMatch = /^\s*"([^"]+)"/.exec(block);
  if (!idMatch) continue;
  const id = idMatch[1];
  
  const titleMatch = /"title":\s*"([^"]+)"/.exec(block);
  const title = titleMatch ? titleMatch[1] : "";

  const locationMatch = /"location":\s*"([^"]+)"/.exec(block);
  const location = locationMatch ? locationMatch[1] : "";

  const locCatMatch = /"locationCategory":\s*"([^"]+)"/.exec(block);
  const locationCategory = locCatMatch ? locCatMatch[1] : "";

  projects.push({ id, title, location, locationCategory });
}

// City coordinates from MiniJapanMap / ProjectMapPopup
const cityCoordinates = {
  "tokyo":     { name: "Tokyo", x: 56.5, y: 49.0 },
  "kanagawa":  { name: "Kanagawa", x: 56.0, y: 50.8 },
  "yokohama":  { name: "Yokohama", x: 56.0, y: 50.8 },
  "osaka":     { name: "Osaka", x: 41.2, y: 59.0 },
  "kobe":      { name: "Kobe", x: 39.5, y: 58.5 },
  "hyogo":     { name: "Hyogo", x: 39.5, y: 58.5 },
  "kyoto":     { name: "Kyoto", x: 42.5, y: 56.2 },
  "nagoya":    { name: "Nagoya", x: 47.5, y: 55.5 },
  "aichi":     { name: "Aichi", x: 47.5, y: 55.5 },
  "sapporo":   { name: "Sapporo", x: 62.5, y: 14.5 },
  "hokkaido":  { name: "Hokkaido", x: 62.5, y: 14.5 },
  "sendai":    { name: "Sendai", x: 60.5, y: 34.5 },
  "miyagi":    { name: "Miyagi", x: 60.5, y: 34.5 },
  "fukuoka":   { name: "Fukuoka", x: 22.0, y: 68.0 },
  "hiroshima": { name: "Hiroshima", x: 31.8, y: 63.2 },
  "shizuoka":  { name: "Shizuoka", x: 51.5, y: 52.5 },
  "chiba":     { name: "Chiba", x: 59.5, y: 49.5 },
  "kawasaki":  { name: "Kawasaki", x: 56.2, y: 50.0 },
  "saitama":   { name: "Saitama", x: 56.0, y: 46.5 },
  "kasukabe":  { name: "Saitama (Kasukabe)", x: 56.0, y: 46.5 },
  "niigata":   { name: "Niigata", x: 53.5, y: 41.5 },
  "akita":     { name: "Akita", x: 57.5, y: 31.0 },
  "aomori":    { name: "Aomori", x: 59.0, y: 24.5 },
  "hakodate":  { name: "Hakodate", x: 57.5, y: 20.5 },
  "ishikari":  { name: "Ishikari", x: 61.5, y: 13.5 },
};

const ALL_STATE_BOUNDARIES = {
  "ladakh":            { name: "Ladakh", x: 45.0, y: 16.0 },
  "jammu":             { name: "Jammu & Kashmir", x: 37.0, y: 18.0 },
  "himachal":          { name: "Himachal Pradesh", x: 42.0, y: 23.0 },
  "punjab":            { name: "Punjab", x: 37.0, y: 25.0 },
  "haryana":           { name: "Haryana", x: 40.0, y: 29.0 },
  "delhi":             { name: "Delhi", x: 42.0, y: 30.0 },
  "uttarakhand":       { name: "Uttarakhand", x: 47.0, y: 26.0 },
  "rajasthan":         { name: "Rajasthan", x: 34.0, y: 34.0 },
  "uttar pradesh":     { name: "Uttar Pradesh", x: 50.0, y: 34.0 },
  "gujarat":           { name: "Gujarat", x: 27.0, y: 43.0 },
  "madhya pradesh":    { name: "Madhya Pradesh", x: 43.0, y: 44.0 },
  "maharashtra":       { name: "Maharashtra", x: 35.0, y: 54.0 },
  "mumbai":            { name: "Mumbai", x: 30.0, y: 54.0 },
  "chhattisgarh":      { name: "Chhattisgarh", x: 52.0, y: 48.0 },
  "jharkhand":         { name: "Jharkhand", x: 63.0, y: 45.0 },
  "bihar":             { name: "Bihar", x: 64.0, y: 39.0 },
  "west bengal":       { name: "West Bengal", x: 67.0, y: 47.0 },
  "odisha":            { name: "Odisha", x: 58.0, y: 52.0 },
  "goa":               { name: "Goa", x: 31.0, y: 66.0 },
  "karnataka":         { name: "Karnataka", x: 37.0, y: 67.0 },
  "telangana":          { name: "Telangana", x: 44.0, y: 57.0 },
  "andhra pradesh":    { name: "Andhra Pradesh", x: 46.0, y: 63.0 },
  "kerala":            { name: "Kerala", x: 36.0, y: 76.0 },
  "tamil nadu":        { name: "Tamil Nadu", x: 43.0, y: 75.0 },
  "puducherry":        { name: "Puducherry", x: 46.5, y: 73.0 },
  "sikkim":            { name: "Sikkim", x: 71.0, y: 36.0 },
  "assam":             { name: "Assam", x: 79.0, y: 39.0 },
  "meghalaya":         { name: "Meghalaya", x: 78.5, y: 41.5 },
  "tripura":           { name: "Tripura", x: 79.0, y: 46.0 },
  "mizoram":           { name: "Mizoram", x: 82.0, y: 47.0 },
  "manipur":           { name: "Manipur", x: 83.5, y: 44.0 },
  "nagaland":          { name: "Nagaland", x: 85.0, y: 41.0 },
  "arunachal pradesh": { name: "Arunachal Pradesh", x: 85.0, y: 32.0 },
  "dadra":             { name: "Dadra & Nagar Haveli", x: 28.0, y: 49.0 },
  "purulia":           { name: "West Bengal (Purulia)", x: 64.0, y: 46.0 },
  "haldia":            { name: "West Bengal (Haldia)", x: 69.0, y: 52.0 },
  "burnpur":           { name: "West Bengal (Burnpur)", x: 64.5, y: 45.0 },
  "birbhum":           { name: "West Bengal (Birbhum)", x: 66.0, y: 44.0 },
  "chennai":           { name: "Tamil Nadu (Chennai)", x: 46.2, y: 71.0 },
  "bengaluru":         { name: "Karnataka (Bengaluru)", x: 39.0, y: 69.0 },
  "vadodara":          { name: "Gujarat (Vadodara)", x: 29.0, y: 45.0 },
  "dholera":           { name: "Gujarat (Dholera)", x: 26.5, y: 45.5 },
};

console.log("=== PROJECT PIN MATCHING ANALYSIS ===");
projects.forEach((proj, idx) => {
  const isIndia = (proj.locationCategory && proj.locationCategory.toLowerCase() === 'india') ||
                  (proj.id && proj.id.startsWith('work_india_'));

  const clean = (proj.location || '').toLowerCase();
  const matchedPins = [];

  if (isIndia) {
    if (clean.includes('freight corridor')) {
      ['uttar pradesh', 'haryana', 'rajasthan', 'gujarat', 'maharashtra'].forEach(k => matchedPins.push(ALL_STATE_BOUNDARIES[k]));
    } else if (clean.includes('mumbai') && clean.includes('ahmedabad')) {
      ['maharashtra', 'gujarat', 'dadra'].forEach(k => matchedPins.push(ALL_STATE_BOUNDARIES[k]));
    } else if (clean.includes('delhi') && clean.includes('mumbai') && clean.includes('industrial corridor')) {
      ['delhi', 'haryana', 'rajasthan', 'madhya pradesh', 'gujarat', 'maharashtra'].forEach(k => matchedPins.push(ALL_STATE_BOUNDARIES[k]));
    } else if (clean.includes('chennai') && clean.includes('bengaluru')) {
      ['tamil nadu', 'andhra pradesh', 'karnataka'].forEach(k => matchedPins.push(ALL_STATE_BOUNDARIES[k]));
    } else if (clean.includes('yamuna action plan') && !clean.includes('phase iii')) {
      ['delhi', 'uttar pradesh', 'haryana'].forEach(k => matchedPins.push(ALL_STATE_BOUNDARIES[k]));
    } else if (clean.includes('northeast india') || clean.includes('north east road')) {
      ['mizoram', 'meghalaya', 'assam'].forEach(k => matchedPins.push(ALL_STATE_BOUNDARIES[k]));
    } else {
      if (clean.includes('mumbai')) matchedPins.push(ALL_STATE_BOUNDARIES['mumbai']);
      else if (clean.includes('bengaluru')) matchedPins.push(ALL_STATE_BOUNDARIES['bengaluru']);
      else if (clean.includes('chennai')) matchedPins.push(ALL_STATE_BOUNDARIES['chennai']);
      else if (clean.includes('vadodara')) matchedPins.push(ALL_STATE_BOUNDARIES['vadodara']);
      else if (clean.includes('dholera')) matchedPins.push(ALL_STATE_BOUNDARIES['dholera']);
      else if (clean.includes('purulia')) matchedPins.push(ALL_STATE_BOUNDARIES['purulia']);
      else if (clean.includes('haldia')) matchedPins.push(ALL_STATE_BOUNDARIES['haldia']);
      else if (clean.includes('burnpur')) matchedPins.push(ALL_STATE_BOUNDARIES['burnpur']);
      else if (clean.includes('birbhum')) matchedPins.push(ALL_STATE_BOUNDARIES['birbhum']);

      if (matchedPins.length === 0) {
        for (const [key, stateObj] of Object.entries(ALL_STATE_BOUNDARIES)) {
          if (clean.includes(key)) {
            matchedPins.push(stateObj);
          }
        }
      }
    }
  } else {
    for (const [key, cityObj] of Object.entries(cityCoordinates)) {
      if (clean.includes(key)) {
        matchedPins.push(cityObj);
      }
    }
  }

  const pinNames = matchedPins.filter(Boolean).map(p => `${p.name} (x:${p.x}, y:${p.y})`).join(', ');
  console.log(`[${idx+1}] ID: ${proj.id} | Country: ${isIndia ? 'INDIA' : 'JAPAN'}`);
  console.log(`    Title: "${proj.title}"`);
  console.log(`    Location Text: "${proj.location}"`);
  console.log(`    Matched Pins: ${pinNames || '!!! NO MATCHING PIN FOUND (FALLBACK USED) !!!'}`);
  console.log("--------------------------------------------------");
});
