import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, HardHat, Building, Wind, Zap, Briefcase, ChevronRight, Compass } from 'lucide-react';
import HeroSlider from '../components/HeroSlider';
import PickupSlider from '../components/PickupSlider';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/worksContent';

export default function Home() {
  // Take first 3 projects for the home page featured grid
  const featuredProjects = projects.slice(0, 3);


  const homeBusinesses = [
    { id: "building_construction", title: "Building Construction", icon: <Building size={24} />, desc: "High-performance office towers, smart industrial facilities, and sustainable mass timber spaces." },
    { id: "civil_engineering", title: "Civil Engineering", icon: <HardHat size={24} />, desc: "Connecting cities through transit tunnel-boring, deepwater bridges, and emergency flood controls." },
    { id: "overseas_construction", title: "Global Operations", icon: <Compass size={24} />, desc: "Managing international joint ventures and large-scale building works in America, Europe, and Oceania." },
    { id: "green_energy", title: "Green Energy", icon: <Wind size={24} />, desc: "Investing in renewable onshore wind, geothermal heat, biomass plants, and clean hydrogen networks." }
  ];

  return (
    <div className="home-page fade-in">
      {/* 1. Hero Automated Slider */}
      <HeroSlider />

      {/* 2. Important Security Notice Banner */}
      <div className="security-alert-banner">
        <div className="container security-alert-inner">
          <span className="security-alert-badge">ALERT</span>
          <Link to="/news#news20260514" className="security-alert-link">
            <span>Notice regarding unauthorized phishing emails impersonating Obayashi Executive Officers</span>
            <ChevronRight size={14} />
          </Link>
        </div>
      </div>

      {/* 4. Pickup Recommendation Section */}
      <PickupSlider />

      {/* 5. Core Business Segments Preview */}
      <section className="home-business-section section-padding light-bg-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">BUSINESS SEGMENTS</h2>
            <p className="section-subtitle">Pioneering engineering solutions across commercial building, civil works, and green energy grids</p>
          </div>

          <div className="home-business-grid">
            {homeBusinesses.map((item) => (
              <div key={item.id} className="home-business-card">
                <div className="business-card-icon-wrapper">
                  {item.icon}
                </div>
                <h3 className="business-card-title">{item.title}</h3>
                <p className="business-card-desc">{item.desc}</p>
                <Link to={`/business#${item.id}`} className="business-card-link-btn">
                  <span>Learn more</span>
                  <ChevronRight size={14} />
                </Link>
              </div>
            ))}
          </div>

          <div className="section-footer-action">
            <Link to="/business" className="btn-primary">
              <span>View Business Overview</span>
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Featured Projects Grid */}
      <section className="home-projects-section section-padding">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">FEATURED PROJECTS</h2>
            <p className="section-subtitle">Explore some of Obayashi's high-profile building achievements worldwide</p>
          </div>

          <div className="projects-grid">
            {featuredProjects.map((proj) => (
              <ProjectCard key={proj.id} project={proj} />
            ))}
          </div>

          <div className="section-footer-action">
            <Link to="/works" className="btn-primary">
              <span>View All Projects</span>
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Visual Link Portals */}
      <section className="home-portals-section">
        <div className="portal-block portal-company" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.65)), url(/images/ones_tower.png)` }}>
          <div className="portal-block-content">
            <h3 className="portal-block-title">Company Profile</h3>
            <p className="portal-block-text">Discover our 130-year legacy of engineering integrity, leadership values, and global networks.</p>
            <Link to="/company" className="portal-block-btn">
              <span>View Company Profile</span>
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>

        <div className="portal-split-row">
          <div className="portal-block portal-ir" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.65)), url(/images/jamuna_bridge.png)` }}>
            <div className="portal-block-content">
              <h3 className="portal-block-title">Investor Relations</h3>
              <p className="portal-block-text">Financial updates, stock configurations, dividend charts, and corporate report downloads.</p>
              <Link to="/ir" className="portal-block-btn">
                <span>Investor Resources</span>
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>

          <div className="portal-block portal-sustainability" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.65)), url(/images/rokka_mori.png)` }}>
            <div className="portal-block-content">
              <h3 className="portal-block-title">Sustainability</h3>
              <p className="portal-block-text">Learn about ESG materiality matrix items, zero-emission timelines, and community updates.</p>
              <Link to="/sustainability" className="portal-block-btn">
                <span>View Sustainability Focus</span>
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Special Corporate Microsites */}
      <section className="home-specials-section section-padding light-bg-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">SPECIAL CONTENTS</h2>
            <p className="section-subtitle">Dedicated features exploring our civil engineering innovations and team cultures</p>
          </div>

          <div className="specials-grid">
            {[
              { title: "Obayashi Dam World", desc: "Discover the architectural engineering behind massive water reservoirs." },
              { title: "Obayashi Tunnel World", desc: "Inside our advanced shield tunneling machines and safety technologies." },
              { title: "Obayashi Quarterly", desc: "Our corporate journal investigating art, structure, and history." },
              { title: "Diversity & Inclusion", desc: "Fostering corporate environments where diverse team members excel." }
            ].map((special, index) => (
              <div key={index} className="special-grid-card">
                <h4 className="special-card-title">{special.title}</h4>
                <p className="special-card-text">{special.desc}</p>
                <span className="special-card-action">
                  <span>Visit Showcase</span>
                  <ChevronRight size={12} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
