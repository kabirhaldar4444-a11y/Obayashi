import { projects } from '../src/data/worksContent.js';

console.log('Total projects in worksContent.js:', projects.length);
projects.slice(0, 15).forEach((p, i) => {
  console.log(`[${i}] id: "${p.id}" -> title: "${p.title}"`);
});
