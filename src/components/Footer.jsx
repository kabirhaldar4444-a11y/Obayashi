import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronUp, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHashClick = (path) => {
    if (path.includes('#')) {
      const id = path.split('#')[1];
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <footer className="global-footer">
      {/* Scroll to top bar */}
      <div className="footer-top-bar" onClick={scrollToTop}>
        <div className="container scroll-top-container">
          <span>Go to Pagetop</span>
          <ChevronUp size={16} className="scroll-top-icon" />
        </div>
      </div>

      <div className="container footer-content">
        <div className="footer-logo-row">
          <Link to="/" className="footer-logo-link" title="Obayashi India Corporation">
            <img src="/Newlogo.png" alt="Obayashi India Corporation Logo" className="footer-logo-img" />
          </Link>
          <div className="footer-hq-info">
            <div className="footer-hq-block">
              <span className="footer-hq-title">
                <MapPin size={12} className="inline-block mr-1 text-[var(--primary-red)] align-text-bottom" />
                Corporate HQ (Japan)
              </span>
              <p className="footer-hq-address">Umeda Sky Building, 1-1-88 Oyodonaka, Kita-ku, Osaka 531-0076, Japan</p>
            </div>
            <div className="footer-hq-block">
              <span className="footer-hq-title">
                <MapPin size={12} className="inline-block mr-1 text-[var(--primary-red)] align-text-bottom" />
                Asia HQ (India)
              </span>
              <p className="footer-hq-address">The Ruby, 9th Floor, 29, Senapati Bapat Marg, Dadar West, Mumbai, Maharashtra 400028, India</p>
              <div className="footer-hq-contact mt-2 flex flex-col md:items-end gap-1 text-xs text-[#a0a0a0]">
                <div className="flex items-center gap-1.5">
                  <Phone size={11} className="text-[var(--primary-red)]" />
                  <span>
                    Tel: <a href="tel:02241504282" className="hover:text-white transition-colors">022-41504282</a> / <a href="tel:02241504283" className="hover:text-white transition-colors">41504283</a>
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Mail size={11} className="text-[var(--primary-red)]" />
                  <a href="mailto:hrd@obayashi.in" className="hover:text-white transition-colors">hrd@obayashi.in</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-grid">
          {/* Column 1: Core Divisions */}
          <div className="footer-col">
            <h4 className="footer-col-title">Core Divisions</h4>
            <ul className="footer-link-list">
              <li><Link to="/business" className="footer-link bold">Business Overview</Link></li>
              <li><Link to="/works" className="footer-link bold">Projects & Works</Link></li>
              <li><Link to="/solution_technology" className="footer-link bold">Technologies</Link></li>
            </ul>
          </div>

          {/* Column 2: About Us / Company */}
          <div className="footer-col">
            <h4 className="footer-col-title"><Link to="/company" className="footer-link-main">About Us</Link></h4>
            <ul className="footer-link-list">
              <li><Link to="/company" className="footer-link bold">Company Overview</Link></li>
              <li><Link to="/company/business-performance" className="footer-link bold-accent">Business Performance Chart</Link></li>
              <li><Link to="/company/certificates" className="footer-link bold-accent">Certificates & Awards</Link></li>
              <li><Link to="/company#message" onClick={() => handleHashClick('/company#message')} className="footer-link">President's Message</Link></li>
              <li><Link to="/company#philosophy" onClick={() => handleHashClick('/company#philosophy')} className="footer-link">Obayashi Principles</Link></li>
              <li><Link to="/company#history" onClick={() => handleHashClick('/company#history')} className="footer-link">Historical Timeline</Link></li>
              <li><Link to="/company#group" onClick={() => handleHashClick('/company#group')} className="footer-link">Global Group Network</Link></li>
            </ul>
          </div>

          {/* Column 3: Sustainability */}
          <div className="footer-col">
            <h4 className="footer-col-title"><Link to="/sustainability" className="footer-link-main">Sustainability</Link></h4>
            <ul className="footer-link-list">
              <li><Link to="/sustainability#vision" onClick={() => handleHashClick('/sustainability#vision')} className="footer-link">Vision 2050 Targets</Link></li>
              <li><Link to="/sustainability#esg" onClick={() => handleHashClick('/sustainability#esg')} className="footer-link">ESG Materiality</Link></li>
              <li><Link to="/sustainability#contributions" onClick={() => handleHashClick('/sustainability#contributions')} className="footer-link">Social Contributions</Link></li>
              <li><Link to="/sustainability#evaluations" onClick={() => handleHashClick('/sustainability#evaluations')} className="footer-link">External Appraisals</Link></li>
            </ul>
          </div>

          {/* Column 4: Press & Media */}
          <div className="footer-col">
            <h4 className="footer-col-title">Press & Media</h4>
            <ul className="footer-link-list">
              <li><Link to="/news" className="footer-link bold">News Archive</Link></li>
              <li><Link to="/contact" className="footer-link bold">Contact Inquiry</Link></li>
            </ul>
            <div className="footer-col-contact mt-3 pt-3 border-t border-white/10">
              <span className="text-[11px] font-bold text-white/50 uppercase tracking-wider block mb-1.5">Direct Contact</span>
              <ul className="footer-link-list text-xs text-[#a0a0a0] space-y-1">
                <li className="flex items-center gap-1.5">
                  <Phone size={11} className="text-[var(--primary-red)] shrink-0" />
                  <a href="tel:02241504282" className="footer-link">022-41504282</a> / <a href="tel:02241504283" className="footer-link">41504283</a>
                </li>
                <li className="flex items-center gap-1.5">
                  <Mail size={11} className="text-[var(--primary-red)] shrink-0" />
                  <a href="mailto:hrd@obayashi.in" className="footer-link">hrd@obayashi.in</a>
                </li>
              </ul>
            </div>
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
            Copyright &copy; {new Date().getFullYear()}, OBAYASHI CORPORATION. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

