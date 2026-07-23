import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="global-footer">
      {/* Scroll to top bar */}
      <div className="footer-top-bar" onClick={scrollToTop}>
        <div className="container scroll-top-container">
          <span>Go to Pagetop</span>
          <ChevronUp size={18} />
        </div>
      </div>

      <div className="container footer-content">
        <div className="footer-logo-row">
          <Link to="/" className="footer-logo-link">
            <img src="/logo.png" alt="Obayashi Construction Logo" className="footer-logo-img" />
            <div className="logo-text-wrapper">
              <span className="logo-text-main">OBAYASHI</span>
              <span className="logo-text-sub">CONSTRUCTION GROUP</span>
            </div>
          </Link>
        </div>

        <div className="footer-grid">
          {/* Column 1: Core Portals */}
          <div className="footer-col">
            <h4 className="footer-col-title">Core Divisions</h4>
            <ul className="footer-link-list">
              <li><Link to="/business" className="footer-link bold">Business Overview</Link></li>
              <li><Link to="/works" className="footer-link bold">Projects & Works</Link></li>
              <li><Link to="/solution_technology" className="footer-link bold">Technologies</Link></li>
            </ul>
          </div>

          {/* Column 2: Company Profile */}
          <div className="footer-col">
            <h4 className="footer-col-title"><Link to="/company" className="footer-link-main">Company Profile</Link></h4>
            <ul className="footer-link-list">
              <li><Link to="/company#message" className="footer-link">President's Message</Link></li>
              <li><Link to="/company#philosophy" className="footer-link">Obayashi Principles</Link></li>
              <li><Link to="/company#mid-term" className="footer-link">Medium-Term Strategy</Link></li>
              <li><Link to="/company#overview" className="footer-link">Corporate Overview</Link></li>
              <li><Link to="/company#history" className="footer-link">Historical Timeline</Link></li>
              <li><Link to="/company#group" className="footer-link">Global Group Network</Link></li>
              <li><Link to="/company#publications" className="footer-link">Corporate Publications</Link></li>
            </ul>
          </div>

          {/* Column 3: Investor Relations */}
          <div className="footer-col">
            <h4 className="footer-col-title"><Link to="/ir" className="footer-link-main">Investor Relations</Link></h4>
            <ul className="footer-link-list">
              <li><Link to="/ir#financial" className="footer-link">Financial Highlights</Link></li>
              <li><Link to="/ir#management" className="footer-link">Management Philosophy</Link></li>
              <li><Link to="/ir#calendar" className="footer-link">Upcoming IR Events</Link></li>
              <li><Link to="/ir#stock" className="footer-link">Stock & Dividends</Link></li>
              <li><Link to="/ir#documents" className="footer-link">IR Documents (PDF)</Link></li>
              <li><Link to="/ir#faq" className="footer-link">Investor FAQs</Link></li>
            </ul>
          </div>

          {/* Column 4: Sustainability */}
          <div className="footer-col">
            <h4 className="footer-col-title"><Link to="/sustainability" className="footer-link-main">Sustainability</Link></h4>
            <ul className="footer-link-list">
              <li><Link to="/sustainability#vision" className="footer-link">Vision 2050 Targets</Link></li>
              <li><Link to="/sustainability#esg" className="footer-link">ESG Materiality</Link></li>
              <li><Link to="/sustainability#environment" className="footer-link">Environment Policy</Link></li>
              <li><Link to="/sustainability#safety" className="footer-link">Health & Safety</Link></li>
              <li><Link to="/sustainability#contributions" className="footer-link">Social Contributions</Link></li>
              <li><Link to="/sustainability#evaluations" className="footer-link">External Appraisals</Link></li>
            </ul>
          </div>

          {/* Column 5: Press & Updates */}
          <div className="footer-col">
            <h4 className="footer-col-title">Press & Media</h4>
            <ul className="footer-link-list">
              <li><Link to="/news" className="footer-link bold">News Archive</Link></li>
              <li><Link to="/contact" className="footer-link bold">Contact Inquiry</Link></li>
            </ul>
          </div>
        </div>

        {/* Footer bottom utilities */}
        <div className="footer-bottom">
          <ul className="footer-utility-links">
            <li><Link to="/privacy-policy" className="footer-util-link">Privacy Policy</Link></li>
            <li><Link to="/terms-of-use" className="footer-util-link">Terms of Use</Link></li>
            <li><Link to="/social-media-policy" className="footer-util-link">Social Media Policy</Link></li>
            <li><Link to="/accessibility" className="footer-util-link">Web Accessibility</Link></li>
          </ul>
          <p className="footer-copyright">
            Copyright &copy; {new Date().getFullYear()}, OBAYASHI CORPORATION. All rights reserved. (Plagiarism-Free Demonstration Clone)
          </p>
        </div>
      </div>
    </footer>
  );
}
