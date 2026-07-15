import React, { useState, useEffect } from 'react';
import { FileText, Calendar, TrendingUp, HelpCircle, ChevronDown, ChevronUp, Download } from 'lucide-react';
import { irFinancialHighlights, irCalendar, stockInformation, irDocumentsList, irFAQs, irLead } from '../data/irContent';

export default function IR() {
  const [activeFAQ, setActiveFAQ] = useState(null);

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

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  return (
    <div className="ir-page fade-in">
      {/* Page Hero */}
      <div className="page-hero-banner" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(/images/jamuna_bridge.png)` }}>
        <div className="container hero-banner-inner">
          <h1 className="hero-banner-title">INVESTOR RELATIONS</h1>
          <p className="hero-banner-subtitle">Transparent financial updates, stock policies, and long-term value metrics</p>
        </div>
      </div>

      {/* Subpage Nav */}
      <div className="subpage-sticky-nav">
        <div className="container sub-nav-container">
          {['financial', 'calendar', 'stock', 'documents', 'faq'].map((section) => (
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
              {section === 'faq' ? 'Investor FAQs' : section.charAt(0).toUpperCase() + section.slice(1)}
            </a>
          ))}
        </div>
      </div>

      <div className="container section-padding">
        <p className="ir-lead-text">{irLead}</p>

        {/* 1. Financial Highlights */}
        <section id="financial" className="ir-section-wrapper">
          <div className="section-header">
            <h2 className="section-title">Financial Highlights</h2>
            <p className="section-subtitle">Key fiscal statistics from the consolidated group balance sheet</p>
          </div>

          <div className="financial-grid">
            {irFinancialHighlights.map((item, idx) => (
              <div key={idx} className="financial-card">
                <span className="financial-card-period">{item.period}</span>
                <h4 className="financial-card-val">{item.value}</h4>
                <p className="financial-card-metric">{item.metric}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 2. IR Calendar */}
        <section id="calendar" className="ir-section-wrapper">
          <div className="section-header">
            <h2 className="section-title">IR Events Calendar</h2>
            <p className="section-subtitle">Schedules of investor releases and general shareholder assemblies</p>
          </div>

          <div className="calendar-table-wrapper">
            <table className="calendar-table">
              <thead>
                <tr>
                  <th>Upcoming Event / Announcement</th>
                  <th>Scheduled Date</th>
                </tr>
              </thead>
              <tbody>
                {irCalendar.map((item, idx) => (
                  <tr key={idx}>
                    <td className="event-name flex-align-center gap-8">
                      <Calendar size={14} className="text-red" />
                      <span>{item.event}</span>
                    </td>
                    <td className="event-date">{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 3. Stock Information */}
        <section id="stock" className="ir-section-wrapper">
          <div className="section-header">
            <h2 className="section-title">Stock & Dividends</h2>
            <p className="section-subtitle">Ticker references, issued volume, and shareholder dividend strategies</p>
          </div>

          <div className="stock-info-card">
            <div className="stock-info-stats">
              <div className="stock-stat">
                <span className="stat-label">Stock Ticker Symbol:</span>
                <span className="stat-val">{stockInformation.ticker}</span>
              </div>
              <div className="stock-stat">
                <span className="stat-label">Shares Outstanding:</span>
                <span className="stat-val">{stockInformation.sharesIssued}</span>
              </div>
              <div className="stock-stat">
                <span className="stat-label">Active Shareholders:</span>
                <span className="stat-val">{stockInformation.shareholdersCount}</span>
              </div>
            </div>
            
            <div className="stock-dividend-policy">
              <h3 className="policy-title">Capital Allocation & Dividend Policy</h3>
              <p className="policy-text">{stockInformation.dividendPolicy}</p>
            </div>
          </div>
        </section>

        {/* 4. IR Documents */}
        <section id="documents" className="ir-section-wrapper">
          <div className="section-header">
            <h2 className="section-title">IR Documents</h2>
            <p className="section-subtitle">Standard corporate filings, integrated reports, and strategy slide decks</p>
          </div>

          <div className="documents-grid">
            {irDocumentsList.map((doc, idx) => (
              <div key={idx} className="document-download-card">
                <div className="doc-card-main">
                  <FileText size={24} className="text-blue" />
                  <div className="doc-card-info">
                    <h4 className="doc-title">{doc.title}</h4>
                    <span className="doc-meta">{doc.type} &bull; {doc.size}</span>
                  </div>
                </div>
                <a href="#" className="doc-download-btn" onClick={(e) => e.preventDefault()} aria-label={`Download ${doc.title}`}>
                  <Download size={16} />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* 5. FAQs */}
        <section id="faq" className="ir-section-wrapper">
          <div className="section-header">
            <h2 className="section-title">Investor FAQs</h2>
            <p className="section-subtitle">Frequently asked questions concerning materials inflation, assets, and plans</p>
          </div>

          <div className="faqs-accordion-list">
            {irFAQs.map((faq, idx) => (
              <div key={idx} className="faq-accordion-item">
                <button onClick={() => toggleFAQ(idx)} className="faq-question-btn">
                  <div className="flex-align-center gap-8">
                    <HelpCircle size={16} className="text-red" />
                    <span>{faq.question}</span>
                  </div>
                  {activeFAQ === idx ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                
                {activeFAQ === idx && (
                  <div className="faq-answer-panel fade-in">
                    <p className="faq-answer-text">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
