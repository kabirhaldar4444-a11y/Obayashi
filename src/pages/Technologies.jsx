import React, { useEffect } from 'react';
import { Cpu, CheckCircle, Zap, Shield, HelpCircle, ArrowRight } from 'lucide-react';
import { technologiesList, techLead } from '../data/techContent';

export default function Technologies() {
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

  return (
    <div className="technologies-page fade-in">
      {/* Page Hero */}
      <div className="page-hero-banner" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(/images/ones_tower.png)` }}>
        <div className="container hero-banner-inner">
          <h1 className="hero-banner-title">TECHNOLOGY & SOLUTIONS</h1>
          <p className="hero-banner-subtitle">Pioneering materials research, building automation, and lifecycle BIM modeling</p>
        </div>
      </div>

      <div className="container technology-container section-padding">
        <div className="technology-layout">
          {/* Side Nav Anchors */}
          <aside className="tech-side-nav-wrapper">
            <div className="tech-side-nav">
              <h4 className="side-nav-title">Technology Areas</h4>
              <ul className="side-nav-list">
                {technologiesList.map((tech) => (
                  <li key={tech.id}>
                    <a
                      href={`#${tech.id}`}
                      className="side-nav-link-anchor"
                      onClick={(e) => {
                        e.preventDefault();
                        const el = document.getElementById(tech.id);
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      <ArrowRight size={12} className="bullet-icon" />
                      <span>{tech.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Technology Main List */}
          <main className="tech-main-content">
            <p className="tech-lead-text">{techLead}</p>

            <div className="tech-cards-list">
              {technologiesList.map((tech) => (
                <section key={tech.id} id={tech.id} className="tech-segment-section">
                  <div className="tech-section-header">
                    <h2 className="tech-section-title">{tech.title}</h2>
                    <p className="tech-section-summary">{tech.summary}</p>
                  </div>
                  
                  <div className="tech-section-body">
                    {tech.description.split('\n\n').map((para, pIdx) => (
                      <p key={pIdx} className="tech-paragraph">{para}</p>
                    ))}
                    
                    <div className="tech-features-box">
                      <h4 className="features-title">Technical Features & Guidelines</h4>
                      <ul className="features-list">
                        {tech.features.map((feat, fIdx) => (
                          <li key={fIdx} className="feature-item">
                            <CheckCircle size={16} className="feature-check-icon" />
                            <span>{feat}</span>
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
