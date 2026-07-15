import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Company from './pages/Company';
import Business from './pages/Business';
import Works from './pages/Works';
import ProjectDetail from './pages/ProjectDetail';
import Technologies from './pages/Technologies';
import Sustainability from './pages/Sustainability';
import IR from './pages/IR';
import News from './pages/News';
import Contact from './pages/Contact';
import UtilityPage from './pages/UtilityPage';

function App() {
  return (
    <Router>
      <Header />
      <div className="main-content-area">
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
      </div>
      <Footer />
    </Router>
  );
}

export default App;
