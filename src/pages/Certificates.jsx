import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Award, 
  ChevronRight, 
  ArrowLeft,
  Calendar,
  Lock,
  Globe2,
  Trophy,
  Filter,
  CheckCircle2
} from 'lucide-react';
import CertificatesShowcase from '../components/CertificatesShowcase';
import CompanySubNav from '../components/CompanySubNav';
import { awards, certificates } from '../data/companyContent';

export default function Certificates() {
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    'All',
    'Safety & Health',
    'Quality Management',
    'Information Security',
    'Construction Capability'
  ];

  const filteredCertificates = activeCategory === 'All'
    ? certificates
    : certificates.filter(cert => cert.category === activeCategory);

  return (
    <div className="certificates-page fade-in">
      {/* Top SubNav Bar matching input_file_0.png layout */}
      <div className="company-page-top-header">
        <div className="container header-top-flex">
          <div className="header-title-left">
            <span className="section-pre-title">ACCREDITATIONS & RECOGNITION</span>
            <h1 className="company-main-title">Certificates & Awards</h1>
          </div>

          <div className="header-subnav-right">
            <CompanySubNav activeTab="certificates" />
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <div 
        className="page-hero-banner" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(3,8,16,0.7), rgba(3,8,16,0.85)), url(/images/thinking_banner.png)` 
        }}
      >
        <div className="container hero-banner-inner">
          <div className="breadcrumb-nav">
            <Link to="/" className="breadcrumb-link">Home</Link>
            <ChevronRight size={14} />
            <Link to="/company" className="breadcrumb-link">Company Profile</Link>
            <ChevronRight size={14} />
            <span className="breadcrumb-current">Certificates & Awards</span>
          </div>
          <h1 className="hero-banner-title">ACCREDITATIONS & CERTIFICATIONS</h1>
          <p className="hero-banner-subtitle">
            Demonstrating global leadership in Occupational Health & Safety Management (ISO 45001:2018), Quality Management (ISO 9001:2015), Information Security (ISO 27001), and Grade 1 Construction Capabilities.
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
                <span className="stat-num">ISO 45001 & 9001</span>
                <span className="stat-lbl">Quality & Safety Standards</span>
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
                <Trophy size={24} />
              </div>
              <div className="stat-info">
                <span className="stat-num">Grade 1 License</span>
                <span className="stat-lbl">Ministry of Construction</span>
              </div>
            </div>

            <div className="stat-ribbon-item">
              <div className="stat-icon-wrap">
                <Globe2 size={24} />
              </div>
              <div className="stat-info">
                <span className="stat-num">8 Authenticated</span>
                <span className="stat-lbl">Official High-Res Documents</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Category Tabs */}
      <section className="section-padding" style={{ paddingTop: '50px', paddingBottom: '10px' }}>
        <div className="container">
          <div className="cert-category-filter-bar">
            <span className="filter-title"><Filter size={15} /> Filter Certificates:</span>
            <div className="filter-tabs-wrapper">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`cert-category-tab ${activeCategory === cat ? 'active' : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Certificates Interactive Loop Showcase Section */}
      <section className="section-padding" style={{ paddingTop: '20px' }}>
        <div className="container">
          <CertificatesShowcase 
            showHeader={true}
            title="AUTHENTICATED CORPORATE CERTIFICATIONS"
            subtitle={`Explore our ${filteredCertificates.length} verified management certifications in interactive loop mode and full resolution inspection.`}
          />
        </div>
      </section>

      {/* OUR AWARDS & RECOGNITION SECTION */}
      <section className="section-padding light-bg-section">
        <div className="container">
          <div className="section-header text-center">
            <div className="inline-badge">
              <Trophy size={16} />
              <span>HONORS & RECOGNITION</span>
            </div>
            <h2 className="section-title">OUR AWARDS</h2>
            <p className="section-subtitle">
              Prestigious industry citations, safety honors, and environmental excellence awards bestowed upon Obayashi Construction.
            </p>
          </div>

          <div className="awards-grid">
            {awards.map((award, idx) => (
              <motion.div
                key={award.id}
                className="award-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="award-card-header">
                  <div className="award-year-pill">{award.year}</div>
                  <span className="award-category-tag">{award.category}</span>
                </div>

                <div className="award-icon-box">
                  <Trophy size={28} className="award-trophy-icon" />
                </div>

                <h3 className="award-title">{award.title}</h3>
                <span className="award-issuer">Conferred by: {award.issuer}</span>
                <p className="award-desc">{award.description}</p>
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
                <Link to="/company/business-performance" className="btn-secondary-outline">
                  <span>View Business Performance Graph</span>
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
