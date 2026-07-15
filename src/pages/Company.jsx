import React, { useEffect } from 'react';
import { Shield, Users, Landmark, FileText, ChevronRight, Award } from 'lucide-react';
import { companyOverview, ceoMessage, philosophy, historyMilestones, groupNetwork, publications } from '../data/companyContent';

export default function Company() {
  // Handle hash scrolling on mount
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
    <div className="company-page fade-in">
      {/* Page Hero */}
      <div className="page-hero-banner" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(/images/ones_tower.png)` }}>
        <div className="container hero-banner-inner">
          <h1 className="hero-banner-title">COMPANY PROFILE</h1>
          <p className="hero-banner-subtitle">Crafting modern infrastructure with safety, ethics, and innovation since 1892</p>
        </div>
      </div>

      {/* Subpage Navigation Bar */}
      <div className="subpage-sticky-nav">
        <div className="container sub-nav-container">
          {['message', 'philosophy', 'history', 'group', 'publications'].map((section) => (
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
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </a>
          ))}
        </div>
      </div>

      {/* 1. President's Message */}
      <section id="message" className="section-padding">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">PRESIDENT'S MESSAGE</h2>
            <p className="section-subtitle">A letter from our executive leadership on driving sustainable progress</p>
          </div>
          
          <div className="message-content-wrapper">
            <div className="message-text-block">
              <h3 className="message-headline">"{ceoMessage.headline}"</h3>
              {ceoMessage.body.map((para, idx) => (
                <p key={idx} className="message-paragraph">{para}</p>
              ))}
              <div className="message-signature">
                <p className="sig-name">{ceoMessage.author}</p>
                <p className="sig-title">{ceoMessage.title}</p>
              </div>
            </div>
            <div className="message-visual-card">
              <div className="overview-card-header">
                <Landmark size={20} className="overview-icon" />
                <h4>Obayashi At A Glance</h4>
              </div>
              <ul className="overview-details-list">
                <li>
                  <span className="overview-label">Established:</span>
                  <span className="overview-value">{companyOverview.founded}</span>
                </li>
                <li>
                  <span className="overview-label">Capital Reserves:</span>
                  <span className="overview-value">{companyOverview.capital}</span>
                </li>
                <li>
                  <span className="overview-label">Active Force:</span>
                  <span className="overview-value">{companyOverview.employees}</span>
                </li>
                <li>
                  <span className="overview-label">Headquarters:</span>
                  <span className="overview-value">{companyOverview.headquarters}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Corporate Philosophy */}
      <section id="philosophy" className="section-padding light-bg-section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">{philosophy.principlesTitle}</h2>
            <p className="section-subtitle">{philosophy.lead}</p>
          </div>

          <div className="philosophy-grid">
            {philosophy.values.map((val, idx) => (
              <div key={idx} className="philosophy-card">
                <div className="phil-icon-wrapper">
                  {idx === 0 ? <Award size={24} /> : idx === 1 ? <Shield size={24} /> : idx === 2 ? <Landmark size={24} /> : <Users size={24} />}
                </div>
                <h3 className="phil-title">{val.title}</h3>
                <p className="phil-text">{val.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Historical Timeline */}
      <section id="history" className="section-padding">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">HISTORICAL TIMELINE</h2>
            <p className="section-subtitle">Chronology of engineering milestones shaping global cityscapes</p>
          </div>

          <div className="timeline-container">
            {historyMilestones.map((milestone, idx) => (
              <div key={idx} className="timeline-item">
                <div className="timeline-marker">
                  <span className="timeline-year">{milestone.year}</span>
                </div>
                <div className="timeline-content">
                  <h3 className="timeline-title">{milestone.title}</h3>
                  <p className="timeline-desc">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Global Group Network */}
      <section id="group" className="section-padding light-bg-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">GLOBAL NETWORK</h2>
            <p className="section-subtitle">{groupNetwork.lead}</p>
          </div>

          <div className="network-grid">
            {/* Domestic */}
            <div className="network-card">
              <h3 className="network-card-header">Domestic Key Affiliates</h3>
              <ul className="network-list">
                {groupNetwork.domestic.map((item, idx) => (
                  <li key={idx} className="network-list-item">
                    <span className="net-name">{item.name}</span>
                    <span className="net-type">{item.type}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Overseas */}
            <div className="network-card">
              <h3 className="network-card-header">International Offices & Subsidiaries</h3>
              <ul className="network-list">
                {groupNetwork.overseas.map((item, idx) => (
                  <li key={idx} className="network-list-item">
                    <div>
                      <span className="net-name block">{item.name}</span>
                      <span className="net-region">{item.region}</span>
                    </div>
                    <span className="net-type">{item.type}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Corporate Publications */}
      <section id="publications" className="section-padding">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">PUBLICATIONS</h2>
            <p className="section-subtitle">Downloadable reports and journals detailing financial updates and structural designs</p>
          </div>

          <div className="publications-grid">
            {publications.map((pub, idx) => (
              <div key={idx} className="publication-card">
                <div className="pub-card-icon">
                  <FileText size={32} />
                </div>
                <div className="pub-card-details">
                  <h3 className="pub-title">{pub.title}</h3>
                  <p className="pub-desc">{pub.description}</p>
                  <a href={pub.link} className="pub-action-btn">
                    <span>Access Resource</span>
                    <ChevronRight size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Corporate Governance Statement */}
      <section id="governance" className="section-padding light-bg-section">
        <div className="container">
          <div className="governance-banner">
            <h3 className="gov-title">Corporate Governance Standards</h3>
            <p className="gov-text">Obayashi is committed to structural transparency and audit controls. We follow ethical principles, securing risk supervision and equal rights compliance across all project sites.</p>
            <Link to="/ir#management" className="btn-primary">
              <span>View Corporate Governance Details</span>
              <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
