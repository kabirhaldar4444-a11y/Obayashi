import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sun, ShieldCheck, Heart, Users, FileText, CheckCircle2, Award, ArrowUpRight } from 'lucide-react';
import { sustainabilityVision, esgMateriality, socialContributions, externalEvaluations, esgDataHighlights } from '../data/sustainabilityContent';

export default function Sustainability() {
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
    <div className="sustainability-page fade-in">
      {/* Page Hero */}
      <div className="page-hero-banner" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(/images/rokka_mori.png)` }}>
        <div className="container hero-banner-inner">
          <h1 className="hero-banner-title">SUSTAINABILITY Focus</h1>
          <p className="hero-banner-subtitle">Advancing eco-friendly engineering and circular material loops for a resilient tomorrow</p>
        </div>
      </div>

      {/* Subpage Nav */}
      <div className="subpage-sticky-nav">
        <div className="container sub-nav-container">
          {['vision', 'esg', 'contributions', 'evaluations', 'metrics'].map((section) => (
            <a
              key={section}
              href={`#${section}`}
              className="subpage-nav-link"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(section);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {section === 'esg' ? 'ESG Materiality' : section.charAt(0).toUpperCase() + section.slice(1)}
            </a>
          ))}
        </div>
      </div>

      {/* 1. Sustainability Vision 2050 */}
      <section id="vision" className="section-padding">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">{sustainabilityVision.title}</h2>
            <p className="section-subtitle">{sustainabilityVision.lead}</p>
          </div>

          <div className="vision-cards-grid">
            {sustainabilityVision.goals.map((goal, idx) => (
              <div key={idx} className="vision-goal-card">
                <div className="goal-card-header">
                  <div className="goal-num">0{idx + 1}</div>
                  <h3 className="goal-title">{goal.title}</h3>
                </div>
                <p className="goal-desc">{goal.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. ESG Materiality */}
      <section id="esg" className="section-padding light-bg-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">ESG MATERIALITY</h2>
            <p className="section-subtitle">{esgMateriality.lead}</p>
          </div>

          <div className="esg-grid">
            {esgMateriality.categories.map((cat, idx) => (
              <div key={cat.id} id={cat.id} className="esg-card">
                <div className="esg-card-icon-box">
                  {idx === 0 ? <Sun size={20} /> : idx === 1 ? <ShieldCheck size={20} /> : idx === 2 ? <Heart size={20} /> : idx === 3 ? <Users size={20} /> : idx === 4 ? <CheckCircle2 size={20} /> : <FileText size={20} />}
                </div>
                <h3 className="esg-card-title">{cat.title}</h3>
                <p className="esg-card-text">{cat.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Social Contributions */}
      <section id="contributions" className="section-padding">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">SOCIAL CONTRIBUTION</h2>
            <p className="section-subtitle">Investing in disaster recovery, environmental preservation, and structural scholarships</p>
          </div>

          <div className="social-contributions-grid">
            {socialContributions.map((contrib, idx) => (
              <div key={idx} className="contrib-card">
                <h3 className="contrib-title">{contrib.title}</h3>
                <p className="contrib-desc">{contrib.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. External Evaluations */}
      <section id="evaluations" className="section-padding light-bg-section">
        <div className="container">
          <div className="eval-network-grid">
            <div className="eval-card">
              <h3 className="eval-card-header">External Appraisals & Index Listings</h3>
              <ul className="eval-list">
                {externalEvaluations.map((evalItem, idx) => (
                  <li key={idx} className="eval-list-item">
                    <span className="eval-index">{evalItem.index}</span>
                    <span className="eval-status">{evalItem.status}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="eval-cta-card">
              <h3 className="eval-cta-title">Integrated Reporting</h3>
              <p className="eval-cta-text">Read our latest ESG reports and Integrated Annual Review for comprehensive stats.</p>
              <Link to="/company#publications" className="btn-primary">
                <span>Integrated Corporate Reports</span>
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Key Metrics */}
      <section id="metrics" className="section-padding">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">ESG DATA BOOK HIGHLIGHTS</h2>
            <p className="section-subtitle">Operational parameters tracking our environmental and societal footprint</p>
          </div>

          <div className="metrics-table-wrapper">
            <table className="metrics-table">
              <thead>
                <tr>
                  <th>Performance Index / Parameter</th>
                  <th>Recorded Values (Fiscal Year 2025)</th>
                </tr>
              </thead>
              <tbody>
                {esgDataHighlights.map((hl, idx) => (
                  <tr key={idx}>
                    <td className="metric-param-name">{hl.parameter}</td>
                    <td className="metric-param-val">{hl.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
