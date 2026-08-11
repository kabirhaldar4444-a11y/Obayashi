import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Award, 
  ChevronRight, 
  ArrowLeft,
  Calendar,
  Lock,
  Globe2
} from 'lucide-react';
import CertificatesShowcase from '../components/CertificatesShowcase';

export default function Certificates() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="certificates-page fade-in">
      {/* Hero Banner */}
      <div 
        className="page-hero-banner" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(3,8,16,0.65), rgba(3,8,16,0.85)), url(/images/thinking_banner.png)` 
        }}
      >
        <div className="container hero-banner-inner">
          <div className="breadcrumb-nav">
            <Link to="/" className="breadcrumb-link">Home</Link>
            <ChevronRight size={14} />
            <Link to="/company" className="breadcrumb-link">Company Profile</Link>
            <ChevronRight size={14} />
            <span className="breadcrumb-current">Certificates & Accreditations</span>
          </div>
          <h1 className="hero-banner-title">ACCREDITATIONS & CERTIFICATIONS</h1>
          <p className="hero-banner-subtitle">
            Demonstrating global leadership in Occupational Health & Safety Management Systems (ISO 45001:2018 & OHSAS 18001) accredited by BSI Assurance.
          </p>
        </div>
      </div>

      {/* Quality Stats Bar */}
      <div className="cert-stats-ribbon">
        <div className="container">
          <div className="stats-ribbon-grid">
            <div className="stat-ribbon-item">
              <div className="stat-icon-wrap">
                <ShieldCheck size={24} />
              </div>
              <div className="stat-info">
                <span className="stat-num">ISO 45001:2018</span>
                <span className="stat-lbl">Occupational Safety Standard</span>
              </div>
            </div>

            <div className="stat-ribbon-item">
              <div className="stat-icon-wrap">
                <Award size={24} />
              </div>
              <div className="stat-info">
                <span className="stat-num">BSI Certified</span>
                <span className="stat-lbl">British Standards Institution</span>
              </div>
            </div>

            <div className="stat-ribbon-item">
              <div className="stat-icon-wrap">
                <Calendar size={24} />
              </div>
              <div className="stat-info">
                <span className="stat-num">Since 2013</span>
                <span className="stat-lbl">Over a Decade of Safety Excellence</span>
              </div>
            </div>

            <div className="stat-ribbon-item">
              <div className="stat-icon-wrap">
                <Globe2 size={24} />
              </div>
              <div className="stat-info">
                <span className="stat-num">Global Network</span>
                <span className="stat-lbl">Standardized Site Governance</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Looping Showcase Section */}
      <section className="section-padding" style={{ paddingTop: '60px' }}>
        <div className="container">
          <CertificatesShowcase 
            showHeader={true}
            title="AUTHENTICATED CORPORATE CERTIFICATIONS"
            subtitle="Explore our verified management certifications in interactive loop mode and full resolution inspection."
          />
        </div>
      </section>

      {/* Safety & Quality Policy Commitment */}
      <section className="section-padding">
        <div className="container">
          <div className="safety-commitment-card">
            <div className="commitment-text">
              <div className="commitment-badge">
                <Lock size={16} />
                <span>SAFETY FIRST COMMITMENT</span>
              </div>
              <h3 className="commitment-title">Our Zero-Accident & Safety Management Standard</h3>
              <p className="commitment-desc">
                At Obayashi Corporation, we treat safety and quality assurance as fundamental prerequisites for every construction site. By maintaining international ISO 45001:2018 certifications across our global subsidiaries and branches, we ensure rigorous risk management, ergonomic site protocols, and continuous occupational health training for every team member.
              </p>
              <div className="commitment-btn-group">
                <Link to="/company" className="btn-primary">
                  <ArrowLeft size={16} />
                  <span>Return to Company Profile</span>
                </Link>
                <Link to="/sustainability#esg" className="btn-secondary-outline">
                  <span>Explore ESG & Sustainability</span>
                  <ChevronRight size={14} />
                </Link>
              </div>
            </div>

            <div className="commitment-visual">
              <div className="iso-badge-box">
                <ShieldCheck size={48} className="iso-shield-icon" />
                <span className="iso-badge-title">ISO 45001:2018</span>
                <span className="iso-badge-sub">Occupational Health & Safety Certified</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
