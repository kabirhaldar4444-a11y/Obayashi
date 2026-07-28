import { detailedProjectContent } from '../src/data/projectDetails.js';

console.log('--- ALL 55 PROJECTS IN PROJECT DETAILS ---');
Object.entries(detailedProjectContent).forEach(([id, det], i) => {
  console.log(`${i + 1}. [${id}]`);
  console.log(`   Kanji: ${det.kanjiName}`);
  console.log(`   Romaji: ${det.romajiName}`);
  console.log(`   Location: ${det.city}, ${det.prefecture}`);
});
