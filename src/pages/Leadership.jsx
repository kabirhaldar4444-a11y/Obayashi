import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Users, 
  ShieldCheck, 
  Award, 
  ChevronRight, 
  ArrowLeft, 
  Landmark, 
  Globe2, 
  Quote, 
  CheckCircle2, 
  TrendingUp,
  Briefcase
} from 'lucide-react';
import CompanySubNav from '../components/CompanySubNav';
import { boardOfDirectors, executiveLeadershipTeam } from '../data/companyContent';

export default function Leadership() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="leadership-page fade-in">
      {/* Top Header Row matching Company layout */}
      <div className="company-page-top-header">
        <div className="container header-top-flex">
          <div className="header-title-left">
            <span className="section-pre-title">ABOUT US</span>
            <h1 className="company-main-title">Executive Leadership</h1>
          </div>

          <div className="header-subnav-right">
            <CompanySubNav activeTab="leadership" />
          </div>
        </div>
      </div>

      {/* Page Hero Banner */}
      <div 
        className="page-hero-banner" 
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.7)), url(/images/ones_tower.png)` }}
      >
        <div className="container hero-banner-inner">
          <h1 className="hero-banner-title">EXECUTIVE LEADERSHIP</h1>
          <p className="hero-banner-subtitle">
            Visionary governance, global engineering stewardship, and ethical corporate management shaping the world since 1892
          </p>
        </div>
      </div>

      {/* Section 1: Board of Directors & Representative Executive Leadership */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header text-center">
            <div className="inline-badge">
              <Landmark size={16} />
              <span>BOARD OF DIRECTORS</span>
            </div>
            <h2 className="section-title">REPRESENTATIVE EXECUTIVE DIRECTORS</h2>
            <p className="section-subtitle">
              Pioneering corporate strategy, construction engineering technology, and global sustainability targets.
            </p>
          </div>

          <div className="board-grid">
            {boardOfDirectors.map((director, idx) => (
              <motion.div
                key={director.id}
                className="board-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="board-card-header">
                  <div className="board-role-badge">
                    <Award size={14} className="text-[var(--primary-red)]" />
                    <span>{director.shortRole}</span>
                  </div>
                  <span className="board-member-number">0{idx + 1}</span>
                </div>

                <div className="board-card-body">
                  <h3 className="board-member-name">{director.name}</h3>
                  <h4 className="board-member-fullrole">{director.role}</h4>
                  
                  <div className="board-focus-box">
                    <span className="focus-label">Scope of Responsibility:</span>
                    <p className="focus-text">{director.focus}</p>
                  </div>

                  <p className="board-member-bio">{director.bio}</p>

                  <div className="board-quote-box">
                    <Quote size={16} className="quote-icon shrink-0" />
                    <p className="quote-text">"{director.quote}"</p>
                  </div>
                </div>

                <div className="board-card-footer">
                  <span className="board-tenure-text">{director.tenure}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Executive Leadership Team (Faithfully replicating user's screenshot layout & style) */}
      <section className="section-padding light-bg-section">
        <div className="container">
          <div className="executive-team-header-block">
            <h2 className="executive-team-title">Executive Leadership Team</h2>
            <p className="executive-team-desc">
              Functional heads and regional directors driving operational excellence, project execution, and client partnerships worldwide.
            </p>
          </div>

          <div className="executive-cards-grid">
            {executiveLeadershipTeam.map((exec, idx) => (
              <motion.div
                key={exec.id}
                className="executive-member-card"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.07 }}
              >
                <h3 className="exec-name">{exec.name}</h3>
                <p className="exec-role">{exec.role}</p>
                <div className="exec-meta">
                  <span className="exec-dept-badge">{exec.department}</span>
                  <p className="exec-desc">{exec.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Corporate Governance & Fiduciary Commitment */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header">
            <div className="inline-badge">
              <ShieldCheck size={16} />
              <span>CORPORATE GOVERNANCE</span>
            </div>
            <h2 className="section-title">LEADERSHIP GOVERNANCE & ETHICS</h2>
            <p className="section-subtitle">
              Strict compliance controls, fiduciary transparency, and international audit mechanisms
            </p>
          </div>

          <div className="governance-pillars-grid">
            <div className="gov-pillar-card">
              <div className="gov-pillar-icon">
                <ShieldCheck size={24} />
              </div>
              <h3>Independent Oversight</h3>
              <p>
                Separation of supervisory oversight and operational execution ensures unbiased corporate risk mitigation and transparency.
              </p>
              <ul className="gov-check-list">
                <li><CheckCircle2 size={14} /> Audit & Supervisory Board system</li>
                <li><CheckCircle2 size={14} /> Fiduciary reporting to global shareholders</li>
              </ul>
            </div>

            <div className="gov-pillar-card">
              <div className="gov-pillar-icon">
                <Globe2 size={24} />
              </div>
              <h3>Global Compliance Standard</h3>
              <p>
                Adherence to international anti-corruption, antitrust, and fair trade practices across all regional hubs and job sites.
              </p>
              <ul className="gov-check-list">
                <li><CheckCircle2 size={14} /> Zero-tolerance compliance guidelines</li>
                <li><CheckCircle2 size={14} /> Anonymous whistleblower hotline</li>
              </ul>
            </div>

            <div className="gov-pillar-card">
              <div className="gov-pillar-icon">
                <TrendingUp size={24} />
              </div>
              <h3>ESG Stewardship</h3>
              <p>
                Direct executive committee monitoring of carbon footprint metrics, safety milestones, and inclusive hiring mandates.
              </p>
              <ul className="gov-check-list">
                <li><CheckCircle2 size={14} /> Vision 2050 green target reviews</li>
                <li><CheckCircle2 size={14} /> ISO 45001 safety governance</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Cross-Navigation Bottom Banner */}
      <section className="section-padding light-bg-section">
        <div className="container">
          <div className="performance-bottom-banner">
            <div className="bottom-banner-text">
              <h3>Explore Obayashi's Corporate Track Record</h3>
              <p>Discover our 30-year business growth chart or browse our verified international certificates.</p>
            </div>
            <div className="bottom-banner-actions">
              <Link to="/company" className="btn-secondary-outline">
                <ArrowLeft size={16} />
                <span>Company Overview</span>
              </Link>
              <Link to="/company/business-performance" className="btn-primary">
                <span>Business Performance</span>
                <ChevronRight size={16} />
              </Link>
              <Link to="/company/certificates" className="btn-secondary-link">
                <span>Certificates</span>
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
