import React, { useEffect } from 'react';
import { ShieldCheck, HardHat, Building, Wind, Zap, Globe, Compass, Cpu, HelpCircle, ArrowRight } from 'lucide-react';
import { businessSegments, businessLead } from '../data/businessContent';

export default function Business() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);

  const getSegmentIcon = (id) => {
    switch (id) {
      case "building_construction": return <Building size={28} />;
      case "civil_engineering": return <HardHat size={28} />;
      case "overseas_construction": return <Globe size={28} />;
      case "engineering": return <Cpu size={28} />;
      case "real_estate": return <LandmarkIcon />;
      case "green_energy": return <Wind size={28} />;
      default: return <Zap size={28} />;
    }
  };

  return (
    <div className="business-page fade-in">
      {/* Page Hero */}
      <div className="page-hero-banner" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(/images/jamuna_bridge.png)` }}>
        <div className="container hero-banner-inner">
          <h1 className="hero-banner-title">BUSINESS OVERVIEW</h1>
          <p className="hero-banner-subtitle">Erecting structures, optimizing utilities, and investing in green power systems globally</p>
        </div>
      </div>

      <div className="container business-container section-padding">
        <div className="business-layout">
          {/* Sticky Side Index */}
          <aside className="business-side-nav-wrapper">
            <div className="business-side-nav">
              <h4 className="side-nav-title">Business Segments</h4>
              <ul className="side-nav-list">
                {businessSegments.map((seg) => (
                  <li key={seg.id}>
                    <a
                      href={`#${seg.id}`}
                      className="side-nav-link-anchor"
                      onClick={(e) => {
                        e.preventDefault();
                        const el = document.getElementById(seg.id);
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      <ArrowRight size={12} className="bullet-icon" />
                      <span>{seg.shortTitle}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Business Content Lists */}
          <main className="business-main-content">
            <p className="business-lead-text">{businessLead}</p>

            <div className="business-segments-list">
              {businessSegments.map((seg) => (
                <section key={seg.id} id={seg.id} className="business-segment-section">
                  <div className="segment-card-header">
                    <div className="segment-icon-box">
                      {getSegmentIcon(seg.id)}
                    </div>
                    <h2 className="segment-title">{seg.title}</h2>
                  </div>
                  
                  <div className="segment-card-body">
                    <p className="segment-lead">{seg.lead}</p>
                    <p className="segment-desc">{seg.description}</p>
                    
                    <div className="segment-achievements-box">
                      <h4 className="achievements-title">Core Operations & Achievements</h4>
                      <ul className="achievements-list">
                        {seg.achievements.map((ach, index) => (
                          <li key={index} className="achievement-item">
                            <ShieldCheck size={16} className="check-icon" />
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

// Local helper icon for Landmark (since Lucide Landmark isn't directly matching simple styles)
function LandmarkIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="21" x2="21" y2="21"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
      <path d="M12 2L2 10h20L12 2z"></path>
      <line x1="5" y1="10" x2="5" y2="21"></line>
      <line x1="9" y1="10" x2="9" y2="21"></line>
      <line x1="13" y1="10" x2="13" y2="21"></line>
      <line x1="17" y1="10" x2="17" y2="21"></line>
    </svg>
  );
}
