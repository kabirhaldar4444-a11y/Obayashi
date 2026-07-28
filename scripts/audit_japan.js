import { projects } from '../src/data/worksContent.js';
import { detailedProjectContent } from '../src/data/projectDetails.js';

console.log('--- JAPAN PROJECTS (1-25) ---');
projects.slice(0, 25).forEach((p, i) => {
  const det = detailedProjectContent[p.id];
  console.log(`${i + 1}. [${p.id}]`);
  console.log(`   worksContent Title: "${p.title}"`);
  console.log(`   worksContent Subtitle: "${p.subtitle}"`);
  console.log(`   worksContent Loc: "${p.location}"`);
  console.log(`   worksContent Cat: "${p.category}"`);
  if (det) {
    console.log(`   Details Romaji: "${det.romajiName}"`);
    console.log(`   Details Kanji: "${det.kanjiName}"`);
    console.log(`   Details City/Pref: "${det.city}, ${det.prefecture}"`);
  }
  console.log('----------------------------------------------------');
});
