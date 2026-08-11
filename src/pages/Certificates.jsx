import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  ChevronRight, 
  Building2, 
  FileCheck2, 
  Sparkles,
  ArrowLeft,
  Download,
  Calendar,
  Lock,
  Globe2,
  FileText
} from 'lucide-react';
import CertificatesShowcase from '../components/CertificatesShowcase';
import { certificates, companyOverview } from '../data/companyContent';

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

      {/* Detailed Certificate Registry Grid */}
      <section className="section-padding light-bg-section">
        <div className="container">
          <div className="section-header text-center">
            <div className="inline-badge">
              <FileCheck2 size={16} />
              <span>OFFICIAL REGISTRY</span>
            </div>
            <h2 className="section-title">CERTIFICATE DIRECTORY & SCOPE OF WORKS</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Full accreditation scope and registry entries authorized by BSI Assurance UK and APAC.
            </p>
          </div>

          <div className="cert-directory-grid">
            {certificates.map((cert, idx) => (
              <motion.div 
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="cert-directory-card"
              >
                <div className="card-top-accent" />
                <div className="directory-card-body">
                  <div className="directory-card-header">
                    <span className="directory-cert-num">{cert.certNumber}</span>
                    <span className="directory-status-badge">
                      <CheckCircle2 size={13} />
                      <span>Active Registration</span>
                    </span>
                  </div>

                  <h3 className="directory-entity">{cert.entity}</h3>
                  <p className="directory-standard">{cert.standard}</p>

                  <div className="directory-scope-box">
                    <span className="scope-tag">SCOPE OF ACCREDITATION</span>
                    <p className="scope-text">{cert.scope}</p>
                  </div>

                  <div className="directory-details-list">
                    <div className="dir-detail-row">
                      <span className="dir-label">Location:</span>
                      <span className="dir-val">{cert.location}</span>
                    </div>
                    <div className="dir-detail-row">
                      <span className="dir-label">Issuing Body:</span>
                      <span className="dir-val">{cert.issuer}</span>
                    </div>
                    <div className="dir-detail-row">
                      <span className="dir-label">Validity Track:</span>
                      <span className="dir-val">{cert.validity}</span>
                    </div>
                  </div>

                  <div className="directory-card-footer">
                    <a 
                      href={cert.image} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn-view-orig"
                    >
                      <span>Open Original Certificate</span>
                      <ChevronRight size={14} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
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
