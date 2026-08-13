import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Building2, 
  TrendingUp, 
  Layers, 
  Award, 
  ChevronRight, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowLeft,
  Briefcase,
  Globe2
} from 'lucide-react';
import CompanySubNav from '../components/CompanySubNav';
import BusinessPerformanceChart from '../components/BusinessPerformanceChart';
import { businessPerformanceData } from '../data/companyContent';

export default function BusinessPerformance() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="business-performance-page fade-in">
      {/* Top Header Row matching input_file_0.png layout */}
      <div className="company-page-top-header">
        <div className="container header-top-flex">
          <div className="header-title-left">
            <span className="section-pre-title">OUR BUSINESS CHART</span>
            <h1 className="company-main-title">Business Performance</h1>
          </div>

          <div className="header-subnav-right">
            <CompanySubNav activeTab="business_performance" />
          </div>
        </div>
      </div>

      {/* Main Flow Chart Section */}
      <section className="section-padding chart-main-section" style={{ paddingTop: '20px' }}>
        <div className="container">
          <BusinessPerformanceChart />
        </div>
      </section>

      {/* Key Metrics Grid Section */}
      <section className="section-padding light-bg-section">
        <div className="container">
          <div className="section-header text-center">
            <div className="inline-badge">
              <TrendingUp size={16} />
              <span>PERFORMANCE HIGHLIGHTS</span>
            </div>
            <h2 className="section-title">30 YEARS OF STRUCTURAL EXCELLENCE</h2>
            <p className="section-subtitle">
              Cumulative construction floor area expansion across commercial, industrial, and civil infrastructure domains worldwide.
            </p>
          </div>

          <div className="performance-stats-grid">
            {businessPerformanceData.statsSummary.map((stat, idx) => (
              <motion.div
                key={idx}
                className="perf-stat-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="stat-card-top">
                  <div className="stat-icon-circle">
                    {idx === 0 ? <Building2 size={24} /> : idx === 1 ? <Briefcase size={24} /> : idx === 2 ? <TrendingUp size={24} /> : <ShieldCheck size={24} />}
                  </div>
                  <span className="stat-main-number">{stat.num}</span>
                </div>
                <h3 className="stat-card-label">{stat.label}</h3>
                <p className="stat-card-detail">{stat.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Construction Sector Floor Area Breakdown */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">DIVISIONAL FLOOR AREA BREAKDOWN</h2>
            <p className="section-subtitle">Distribution of total 3,467,136 m² completed floor space across core operational divisions</p>
          </div>

          <div className="divisional-cards-grid">
            {/* Building Construction Card */}
            <div className="divisional-card">
              <div className="div-card-badge">55% Share</div>
              <h3 className="div-card-title">Commercial & High-Rise Buildings</h3>
              <div className="div-card-number">1,906,924 m²</div>
              <p className="div-card-desc">
                Grade-A office towers, luxury hospitality hubs, mixed-use commercial centers, and smart urban skyscrapers.
              </p>
              <ul className="div-card-features">
                <li><CheckCircle2 size={15} /> Tokyo Skytree & Urban Skyscraper Projects</li>
                <li><CheckCircle2 size={15} /> Advanced BIM & Automated Construction Systems</li>
              </ul>
            </div>

            {/* Industrial & High-Tech Facilities */}
            <div className="divisional-card">
              <div className="div-card-badge">28% Share</div>
              <h3 className="div-card-title">Industrial & High-Tech Factories</h3>
              <div className="div-card-number">970,798 m²</div>
              <p className="div-card-desc">
                Semiconductor cleanrooms, pharmaceutical manufacturing units, precision logistics centers, and green energy plants.
              </p>
              <ul className="div-card-features">
                <li><CheckCircle2 size={15} /> ISO 9001:2015 Quality Verified Construction</li>
                <li><CheckCircle2 size={15} /> Ultra-precision environmental cleanroom standards</li>
              </ul>
            </div>

            {/* Civil & Overseas Infrastructure */}
            <div className="divisional-card">
              <div className="div-card-badge">17% Share</div>
              <h3 className="div-card-title">Civil & Global Infrastructure</h3>
              <div className="div-card-number">589,414 m²</div>
              <p className="div-card-desc">
                Transportation terminals, airport expansions, bridges, tunnels, and renewable energy facility developments.
              </p>
              <ul className="div-card-features">
                <li><CheckCircle2 size={15} /> Haneda Airport & Jamuna Bridge Milestones</li>
                <li><CheckCircle2 size={15} /> ISO 45001 Certified Safety Governance</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Navigation Bar */}
      <section className="section-padding light-bg-section">
        <div className="container">
          <div className="performance-bottom-banner">
            <div className="bottom-banner-text">
              <h3>Explore Our Authenticated Corporate Certificates</h3>
              <p>Discover our ISO 9001, ISO 45001, and Grade 1 construction practice certifications.</p>
            </div>
            <div className="bottom-banner-actions">
              <Link to="/company" className="btn-secondary-outline">
                <ArrowLeft size={16} />
                <span>Return to Company Profile</span>
              </Link>
              <Link to="/company/certificates" className="btn-primary">
                <span>View Certificates Hub</span>
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
