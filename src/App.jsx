import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';

// Lazy-load all non-home pages to reduce initial bundle size
const Company      = lazy(() => import('./pages/Company'));
const Business     = lazy(() => import('./pages/Business'));
const Works        = lazy(() => import('./pages/Works'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const Technologies = lazy(() => import('./pages/Technologies'));
const Sustainability = lazy(() => import('./pages/Sustainability'));
const IR           = lazy(() => import('./pages/IR'));
const News         = lazy(() => import('./pages/News'));
const Contact      = lazy(() => import('./pages/Contact'));
const UtilityPage  = lazy(() => import('./pages/UtilityPage'));

function App() {
  return (
    <Router>
      <Header />
      <div className="main-content-area">
        <Suspense fallback={<div style={{ minHeight: '60vh' }} />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/company" element={<Company />} />
            <Route path="/business" element={<Business />} />
            <Route path="/works" element={<Works />} />
            <Route path="/works/:id" element={<ProjectDetail />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/solution_technology" element={<Technologies />} />
            <Route path="/sustainability" element={<Sustainability />} />
            <Route path="/ir" element={<IR />} />
            <Route path="/news" element={<News />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/:policyId" element={<UtilityPage />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
