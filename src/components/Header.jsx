import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, Globe, ChevronDown, ArrowRight } from 'lucide-react';
import SearchOverlay from './SearchOverlay';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const navItems = [
    {
      title: "Business Overview",
      path: "/business",
      subItems: [
        { label: "Domestic Building Construction", path: "/business#building_construction" },
        { label: "Domestic Civil Engineering", path: "/business#civil_engineering" },
        { label: "Overseas Operations", path: "/business#overseas_construction" },
        { label: "Specialty Engineering", path: "/business#engineering" },
        { label: "Real Estate Development", path: "/business#real_estate" },
        { label: "Green Energy Initiatives", path: "/business#green_energy" },
        { label: "New Ventures & Bio-Tech", path: "/business#new_businesses" }
      ]
    },
    {
      title: "Projects",
      path: "/works",
      subItems: [
        { label: "Featured Projects", path: "/works" },
        { label: "Haneda Airport Expansion", path: "/works/work_haneda_airport__100" },
        { label: "Osaka Umeda Twin Towers", path: "/works/work_osaka_umeda_tw_104" },
        { label: "Yokohama Landmark Tower", path: "/works/work_yokohama_landma_102" },
        { label: "Nagoya Station Area Smart Grid", path: "/works/work_nagoya_station__103" }
      ]
    },
    {
      title: "Technologies",
      path: "/solution_technology",
      subItems: [
        { label: "Proprietary Innovations", path: "/solution_technology#proprietary_technologies" },
        { label: "Construction Automation", path: "/solution_technology#construction" },
        { label: "Environmental Development", path: "/solution_technology#development" },
        { label: "Smart BIM Standards", path: "/solution_technology#building_information_modeling" },
        { label: "Industrial Facilities Safety", path: "/solution_technology#industrial_facilities" }
      ]
    },
    {
      title: "Company Profile",
      path: "/company",
      subItems: [
        { label: "President's Message", path: "/company#message" },
        { label: "Corporate Philosophy", path: "/company#philosophy" },
        { label: "Historical Timeline", path: "/company#history" },
        { label: "Group Network & Affiliates", path: "/company#group" },
        { label: "Corporate Governance", path: "/company#governance" }
      ]
    },
    {
      title: "Investor Relations",
      path: "/ir",
      subItems: [
        { label: "Financial Highlights", path: "/ir#financial" },
        { label: "Upcoming Events Calendar", path: "/ir#calendar" },
        { label: "Stock & Dividend Information", path: "/ir#stock" },
        { label: "IR Documentation (PDFs)", path: "/ir#documents" },
        { label: "Investor FAQs", path: "/ir#faq" }
      ]
    },
    {
      title: "Sustainability",
      path: "/sustainability",
      subItems: [
        { label: "Sustainability Vision 2050", path: "/sustainability#vision" },
        { label: "ESG Materiality Indices", path: "/sustainability#esg" },
        { label: "Social Contributions", path: "/sustainability#contributions" },
        { label: "External Evaluations", path: "/sustainability#evaluations" }
      ]
    }
  ];

  return (
    <>
      <header className="global-header">
        <div className="container header-container">
          {/* Logo */}
          <Link to="/" className="logo-link">
            <img src="/logo.png" alt="Obayashi Construction Logo" className="header-logo-img" />
            <div className="logo-text-wrapper">
              <span className="logo-text-main">OBAYASHI</span>
              <span className="logo-text-sub">CONSTRUCTION GROUP</span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="desktop-nav">
            {navItems.map((item, index) => (
              <div
                key={index}
                className="nav-item-wrapper"
                onMouseEnter={() => setActiveDropdown(index)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link to={item.path} className="nav-link">
                  <span>{item.title}</span>
                  <ChevronDown size={14} className={`chevron-icon ${activeDropdown === index ? 'rotated' : ''}`} />
                </Link>

                {/* Dropdown Menu */}
                {activeDropdown === index && (
                  <div className="mega-menu fade-in">
                    <div className="mega-menu-inner">
                      <div className="mega-menu-col-left">
                        <h4 className="col-title">{item.title}</h4>
                        <p className="col-desc">Explore Obayashi's global expertise, solutions, and strategic roadmap in this sector.</p>
                        <Link
                          to={item.path}
                          className="col-learn-more"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <span>Go to overview</span>
                          <ArrowRight size={14} />
                        </Link>
                      </div>
                      <div className="mega-menu-col-right">
                        <ul className="sub-list">
                          {item.subItems.map((sub, sIdx) => (
                            <li key={sIdx} className="sub-list-item">
                              <Link
                                to={sub.path}
                                className="sub-nav-link"
                                onClick={() => {
                                  setActiveDropdown(null);
                                  if (sub.path.includes('#')) {
                                    const id = sub.path.split('#')[1];
                                    setTimeout(() => {
                                      const el = document.getElementById(id);
                                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                                    }, 150);
                                  }
                                }}
                              >
                                {sub.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Action Bar */}
          <div className="header-actions">
            <button onClick={() => setSearchOpen(true)} className="action-btn" aria-label="Open search">
              <Search size={20} />
            </button>
            <Link to="/contact" className="contact-btn">
              Contact Us
            </Link>
            <button className="lang-btn">
              <Globe size={16} />
              <span>EN</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-hamburger"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="mobile-drawer fade-in">
          <div className="drawer-inner">
            <div className="drawer-actions">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSearchOpen(true);
                }}
                className="drawer-search-btn"
              >
                <Search size={18} />
                <span>Search Website</span>
              </button>
            </div>
            <ul className="mobile-list">
              {navItems.map((item, idx) => (
                <li key={idx} className="mobile-list-item">
                  <Link to={item.path} className="mobile-link-main" onClick={() => setMobileMenuOpen(false)}>
                    {item.title}
                  </Link>
                  <ul className="mobile-sub-list">
                    {item.subItems.map((sub, sIdx) => (
                      <li key={sIdx} className="mobile-sub-list-item">
                        <Link
                          to={sub.path}
                          className="mobile-link-sub"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            if (sub.path.includes('#')) {
                              const id = sub.path.split('#')[1];
                              setTimeout(() => {
                                const el = document.getElementById(id);
                                if (el) el.scrollIntoView({ behavior: 'smooth' });
                              }, 150);
                            }
                          }}
                        >
                          {sub.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
              <li style={{ marginTop: '24px' }}>
                <Link to="/contact" className="mobile-contact-btn" onClick={() => setMobileMenuOpen(false)}>
                  Inquire Now
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Global Search Overlay */}
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
