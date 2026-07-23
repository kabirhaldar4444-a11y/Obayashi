import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, HardHat, Building, Wind, Zap, Globe, Cpu, ArrowRight, 
  ArrowUpRight, Sparkles, CheckCircle2, Layers, Award, 
  ChevronUp, Filter
} from 'lucide-react';
import { businessSegments, businessLead } from '../data/businessContent';

// Rolling Motion Variants for Staggered Rolling Entrance
const containerRollVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.05
    }
  }
};

const cardRollVariant = {
  hidden: { 
    opacity: 0, 
    y: 70, 
    rotateX: -20,
    scale: 0.94
  },
  show: { 
    opacity: 1, 
    y: 0, 
    rotateX: 0, 
    scale: 1,
    transition: { 
      type: "spring", 
      stiffness: 140, 
      damping: 18, 
      mass: 0.9 
    } 
  }
};

const achievementRollVariant = {
  hidden: { 
    opacity: 0, 
    y: 20, 
    rotateX: -20,
    scale: 0.96 
  },
  show: { 
    opacity: 1, 
    y: 0, 
    rotateX: 0,
    scale: 1,
    transition: { 
      type: "spring", 
      stiffness: 220, 
      damping: 20 
    } 
  }
};

const sideNavRollVariant = {
  hidden: { opacity: 0, x: -20, rotateX: -15 },
  show: { 
    opacity: 1, 
    x: 0, 
    rotateX: 0, 
    transition: { type: "spring", stiffness: 200, damping: 20 } 
  }
};

const heroMetricRollVariant = {
  hidden: { opacity: 0, y: 30, rotateX: -30, scale: 0.9 },
  show: { 
    opacity: 1, 
    y: 0, 
    rotateX: 0, 
    scale: 1, 
    transition: { type: "spring", stiffness: 180, damping: 16 } 
  }
};

export default function Business() {
  const [activeId, setActiveId] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const heroRef = useRef(null);

  // Top reading progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Parallax transform for hero background
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.4]);

  // Scroll spy effect to highlight sidebar active section
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }

      const sections = businessSegments.map(seg => document.getElementById(seg.id)).filter(Boolean);
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveId(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    // Hash navigation handler on page load
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          const offsetTop = el.offsetTop - 110;
          window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }, 150);
      }
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offsetTop = el.offsetTop - 110;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getSegmentIcon = (id) => {
    switch (id) {
      case "building_construction": return <Building size={26} />;
      case "civil_engineering": return <HardHat size={26} />;
      case "overseas_construction": return <Globe size={26} />;
      case "engineering": return <Cpu size={26} />;
      case "real_estate": return <LandmarkIcon />;
      case "green_energy": return <Wind size={26} />;
      default: return <Zap size={26} />;
    }
  };

  const categories = [
    { id: 'all', label: 'All Segments' },
    { id: 'construction', label: 'Construction & Civil' },
    { id: 'tech_energy', label: 'Tech & Green Energy' },
  ];

  const filteredSegments = businessSegments.filter(seg => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'construction') {
      return ['building_construction', 'civil_engineering', 'overseas_construction'].includes(seg.id);
    }
    if (activeCategory === 'tech_energy') {
      return ['engineering', 'real_estate', 'green_energy', 'new_businesses'].includes(seg.id);
    }
    return true;
  });

  return (
    <div className="business-page">
      {/* Top Scroll Progress Indicator */}
      <motion.div 
        className="top-progress-bar"
        style={{ scaleX }}
      />

      {/* Hero Banner with Parallax Motion */}
      <div ref={heroRef} className="page-hero-banner business-hero-container">
        <motion.div 
          className="hero-bg-layer"
          style={{ 
            backgroundImage: `linear-gradient(135deg, rgba(11, 25, 44, 0.85) 0%, rgba(13, 13, 13, 0.90) 100%), url(/images/jamuna_bridge.png)`,
            y: heroY,
            opacity: heroOpacity
          }}
        />
        <div className="container hero-banner-inner">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="hero-badge-pill"
          >
            <Sparkles size={14} className="hero-sparkle-icon" />
            <span>CORE OPERATIONS & DIVISIONS</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30, rotateX: -15 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="hero-banner-title"
          >
            BUSINESS OVERVIEW
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hero-banner-subtitle"
          >
            Erecting landmark structures, optimizing infrastructure, and driving green power innovations worldwide.
          </motion.p>

          {/* Quick Metrics Counter Row Rolling One-by-One */}
          <motion.div 
            initial="hidden"
            animate="show"
            variants={containerRollVariants}
            className="hero-metrics-strip"
          >
            <motion.div variants={heroMetricRollVariant} className="metric-chip">
              <span className="metric-val">07</span>
              <span className="metric-lbl">Core Business Divisions</span>
            </motion.div>
            <div className="metric-divider" />
            <motion.div variants={heroMetricRollVariant} className="metric-chip">
              <span className="metric-val">50+</span>
              <span className="metric-lbl">Global Operational Regions</span>
            </motion.div>
            <div className="metric-divider" />
            <motion.div variants={heroMetricRollVariant} className="metric-chip">
              <span className="metric-val">100%</span>
              <span className="metric-lbl">Green Tech Commitment</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="container business-container section-padding">
        <div className="business-layout">
          {/* Sticky Side Navigation with Rolling Items */}
          <aside className="business-side-nav-wrapper">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="business-side-nav"
            >
              <div className="side-nav-header">
                <Layers size={18} className="side-nav-header-icon" />
                <h4 className="side-nav-title">Business Segments</h4>
              </div>

              <motion.ul 
                initial="hidden"
                animate="show"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: { staggerChildren: 0.08, delayChildren: 0.2 }
                  }
                }}
                className="side-nav-list"
              >
                {businessSegments.map((seg, idx) => {
                  const isActive = activeId === seg.id;
                  return (
                    <motion.li key={seg.id} variants={sideNavRollVariant} className="side-nav-item">
                      <a
                        href={`#${seg.id}`}
                        className={`side-nav-link-anchor ${isActive ? 'active' : ''}`}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToSection(seg.id);
                        }}
                      >
                        {isActive && (
                          <motion.div 
                            layoutId="activeNavHighlight"
                            className="active-nav-indicator"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}
                        <span className="nav-item-num">0{idx + 1}</span>
                        <span className="nav-item-text">{seg.shortTitle}</span>
                        <ArrowRight size={13} className="bullet-icon" />
                      </a>
                    </motion.li>
                  );
                })}
              </motion.ul>

              {/* Sidebar Quick Consultation Link */}
              <div className="side-nav-footer-box">
                <p className="side-nav-footer-text">Need custom engineering consultation?</p>
                <Link to="/contact" className="side-nav-cta-btn">
                  Contact Us <ArrowUpRight size={14} />
                </Link>
              </div>
            </motion.div>
          </aside>

          {/* Business Content Lists */}
          <main className="business-main-content">
            {/* Business Lead Banner */}
            <motion.div 
              initial={{ opacity: 0, y: 25, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="business-lead-card"
            >
              <div className="lead-card-content">
                <p className="business-lead-text">{businessLead}</p>
              </div>
            </motion.div>

            {/* Quick Segment Filter Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="segment-filter-bar"
            >
              <span className="filter-label"><Filter size={14} /> Filter:</span>
              <div className="filter-chips-group">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    className={`filter-chip-btn ${activeCategory === cat.id ? 'active' : ''}`}
                    onClick={() => setActiveCategory(cat.id)}
                  >
                    {activeCategory === cat.id && (
                      <motion.div 
                        layoutId="activeFilterBg" 
                        className="active-filter-bg"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                    <span className="chip-text">{cat.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Business Segments Cards Rolling In One-By-One */}
            <motion.div 
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={containerRollVariants}
              className="business-segments-list"
            >
              <AnimatePresence mode="popLayout">
                {filteredSegments.map((seg, index) => (
                  <motion.section 
                    key={seg.id} 
                    id={seg.id} 
                    layout
                    variants={cardRollVariant}
                    className="business-segment-section card-hover-effect"
                  >
                    <div className="segment-card-header">
                      <motion.div 
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300, damping: 18 }}
                        className="segment-icon-box"
                      >
                        {getSegmentIcon(seg.id)}
                      </motion.div>
                      <div>
                        <span className="segment-idx-tag">0{index + 1} / BUSINESS DIVISION</span>
                        <h2 className="segment-title">{seg.title}</h2>
                      </div>
                    </div>
                    
                    <div className="segment-card-body">
                      <p className="segment-lead">{seg.lead}</p>
                      <p className="segment-desc">{seg.description}</p>
                      
                      <div className="segment-achievements-box">
                        <div className="achievements-box-header">
                          <Award size={18} className="achievements-header-icon" />
                          <h4 className="achievements-title">Core Operations & Key Achievements</h4>
                        </div>
                        
                        <motion.ul 
                          initial="hidden"
                          whileInView="show"
                          viewport={{ once: true }}
                          variants={containerRollVariants}
                          className="achievements-list"
                        >
                          {seg.achievements.map((ach, achIndex) => (
                            <motion.li 
                              key={achIndex} 
                              variants={achievementRollVariant}
                              whileHover={{ x: 6, backgroundColor: "rgba(193, 127, 36, 0.08)" }}
                              transition={{ duration: 0.2 }}
                              className="achievement-item"
                            >
                              <div className="check-icon-badge">
                                <CheckCircle2 size={16} className="check-icon" />
                              </div>
                              <span>{ach}</span>
                            </motion.li>
                          ))}
                        </motion.ul>
                      </div>

                      {/* Explore Related Projects Button */}
                      <div className="segment-footer-action">
                        <Link to="/works" className="explore-projects-link">
                          <span>Explore projects in this segment</span>
                          <ArrowUpRight size={16} className="link-arrow" />
                        </Link>
                      </div>
                    </div>
                  </motion.section>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Bottom Call To Action Banner */}
            <motion.div 
              initial={{ opacity: 0, y: 30, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="business-cta-banner"
            >
              <div className="cta-banner-glow" />
              <div className="cta-banner-content">
                <h3 className="cta-title">Ready to Collaborate on Next-Gen Infrastructure?</h3>
                <p className="cta-desc">
                  Discover how Obayashi's engineering capabilities and green technology solutions can add value to your upcoming project.
                </p>
                <div className="cta-buttons-group">
                  <Link to="/contact" className="cta-btn primary">
                    <span>Inquire Now</span>
                    <ArrowRight size={16} />
                  </Link>
                  <Link to="/works" className="cta-btn secondary">
                    <span>View Project Portfolio</span>
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </main>
        </div>
      </div>

      {/* Floating Scroll-to-Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="scroll-to-top-btn"
            title="Scroll to top"
          >
            <ChevronUp size={22} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

// Local helper icon for Landmark
function LandmarkIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="21" x2="21" y2="21"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
      <path d="M12 2L2 10h20L12 2z"></path>
      <line x1="5" y1="10" x2="5" y2="21"></line>
      <line x1="9" y1="10" x2="9" y2="21"></line>
      <line x1="13" y1="10" x2="13" y2="21"></line>
      <line x1="17" y1="10" x2="17" y2="21"></line>
    </svg>
  );
}
