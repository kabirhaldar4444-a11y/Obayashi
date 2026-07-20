import React from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProjectDetail from '../src/pages/ProjectDetail.jsx';
import { projects } from '../src/data/worksContent.js';

const slugify = (t) => t.toString().toLowerCase().replace(/\s+/g,'-').replace(/[^\w-]+/g,'').replace(/--+/g,'-').replace(/^-+/,'').replace(/-+$/,'');

async function testAll() {
  console.log('Starting render tests for all projects...');
  
  for (const project of projects) {
    const slug = slugify(project.title);
    const id = project.id;
    
    // Test slug route
    try {
      const html = renderToString(
        <MemoryRouter initialEntries={[`/projects/${slug}`]}>
          <Routes>
            <Route path="/projects/:slug" element={<ProjectDetail />} />
          </Routes>
        </MemoryRouter>
      );
      console.log(`✅ Success rendering slug: /projects/${slug} (${project.id})`);
    } catch (err) {
      console.error(`❌ Error rendering slug: /projects/${slug} (${project.id})`);
      console.error(err);
      process.exit(1);
    }

    // Test id route
    try {
      const html = renderToString(
        <MemoryRouter initialEntries={[`/works/${id}`]}>
          <Routes>
            <Route path="/works/:id" element={<ProjectDetail />} />
          </Routes>
        </MemoryRouter>
      );
      console.log(`✅ Success rendering id: /works/${id}`);
    } catch (err) {
      console.error(`❌ Error rendering id: /works/${id}`);
      console.error(err);
      process.exit(1);
    }
  }
  
  console.log('All render tests passed successfully!');
}

testAll();
