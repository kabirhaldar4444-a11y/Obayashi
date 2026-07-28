const fs = require('fs');
const content = fs.readFileSync('./src/data/worksContent.js', 'utf8');

const blocks = content.split('"id":');
const indiaProjects = [];

for (let i = 1; i < blocks.length; i++) {
  const block = blocks[i];
  const idMatch = /^\s*"([^"]+)"/.exec(block);
  if (!idMatch) continue;
  const id = idMatch[1];
  
  if (id.startsWith('work_india_')) {
    const titleMatch = /"title":\s*"([^"]+)"/.exec(block);
    const title = titleMatch ? titleMatch[1] : "Unknown";
    
    const locationMatch = /"location":\s*"([^"]+)"/.exec(block);
    const location = locationMatch ? locationMatch[1] : "Unknown";

    const categoryMatch = /"category":\s*"([^"]+)"/.exec(block);
    const category = categoryMatch ? categoryMatch[1] : "Unknown";

    indiaProjects.push({ id, title, location, category });
  }
}

console.log("India projects found:");
indiaProjects.forEach(p => {
  console.log(`${p.id}: **${p.title}** — *${p.location}* (${p.category})`);
});
