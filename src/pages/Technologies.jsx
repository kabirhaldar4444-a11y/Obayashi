import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { 
  Cpu, CheckCircle2, Zap, ShieldCheck, ArrowRight, ArrowUpRight, 
  Sparkles, Layers, Award, HardHat, Wind, ChevronUp,
  ChevronLeft, ChevronRight, Play, Pause, MousePointer
} from 'lucide-react';
import { technologiesList, techLead } from '../data/techContent';

// Helper to format Markdown **bold** text into styled <strong> elements
function formatText(text) {
  if (!text) return null;
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} style={{ color: 'var(--dark-main)', fontWeight: 750 }}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

// Directional 3D Circular Roll Variants for Framer Motion
const cardRollVariants = {
  enter: (direction) => ({
    opacity: 0,
    y: direction > 0 ? 80 : -80,
    rotateX: direction > 0 ? -25 : 25,
    scale: 0.94,
  }),
  center: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 180,
      damping: 22,
      mass: 0.9,
    },
  },
  exit: (direction) => ({
    opacity: 0,
    y: direction > 0 ? -80 : 80,
    rotateX: direction > 0 ? 25 : -25,
    scale: 0.94,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 24,
    },
  }),
};

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

const sideNavRollVariant = {
  hidden: { opacity: 0, x: -20 },
  show: { 
    opacity: 1, 
    x: 0, 
    transition: { type: "spring", stiffness: 190, damping: 18 } 
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

export default function Technologies() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [wheelIndex, setWheelIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = next (scroll down), -1 = prev (scroll up)
  const [isAutoRolling, setIsAutoRolling] = useState(false);

  const heroRef = useRef(null);
  const stageRef = useRef(null);
  const lastWheelTime = useRef(0);
  const autoRollTimerRef = useRef(null);

  const wheelIndexRef = useRef(wheelIndex);
  const filteredLengthRef = useRef(technologiesList.length);

  // Top reading progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Parallax transform for hero background
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.4]);

  const filteredTechnologies = technologiesList;

  // Keep refs updated for non-passive event listener
  useEffect(() => {
    wheelIndexRef.current = wheelIndex;
    filteredLengthRef.current = filteredTechnologies.length;
  }, [wheelIndex, filteredTechnologies.length]);

  // SMART WINDOW-LEVEL SCROLL LOCK: Pins card stage in place so cards roll 1-by-1 smoothly & stably!
  useEffect(() => {
    const handleGlobalWheel = (e) => {
      const stageEl = stageRef.current;
      if (!stageEl) return;

      const rect = stageEl.getBoundingClientRect();
      // Active reading zone check: stage is in view
      const isInReadingZone = rect.top > -200 && rect.top < window.innerHeight * 0.7;
      if (!isInReadingZone) return;

      const isDown = e.deltaY > 10;
      const isUp = e.deltaY < -10;
      const curIndex = wheelIndexRef.current;
      const maxIndex = filteredLengthRef.current - 1;

      const canGoNext = isDown && curIndex < maxIndex;
      const canGoPrev = isUp && curIndex > 0;

      if (canGoNext || canGoPrev) {
        // Lock window scroll to keep stage 100% STABLE on screen!
        e.preventDefault();

        // Snap stage position smoothly to top: 95px if drifted
        const desiredTop = 95;
        if (Math.abs(rect.top - desiredTop) > 20) {
          const targetScroll = window.scrollY + (rect.top - desiredTop);
          window.scrollTo({ top: targetScroll, behavior: 'smooth' });
        }

        const now = Date.now();
        if (now - lastWheelTime.current < 450) return;

        if (canGoNext) {
          lastWheelTime.current = now;
          setDirection(1);
          setWheelIndex(curIndex + 1);
        } else if (canGoPrev) {
          lastWheelTime.current = now;
          setDirection(-1);
          setWheelIndex(curIndex - 1);
        }
      }
    };

    window.addEventListener('wheel', handleGlobalWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleGlobalWheel);
  }, []);

  // Keyboard navigation listener (Up/Down / Left/Right arrows)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        if (wheelIndex < filteredTechnologies.length - 1) {
          setDirection(1);
          setWheelIndex(prev => prev + 1);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        if (wheelIndex > 0) {
          setDirection(-1);
          setWheelIndex(prev => prev - 1);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [wheelIndex, filteredTechnologies.length]);

  // Scroll to top tracking button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto Roll Effect
  useEffect(() => {
    if (isAutoRolling) {
      autoRollTimerRef.current = setInterval(() => {
        setDirection(1);
        setWheelIndex(prev => (prev + 1) % filteredTechnologies.length);
      }, 4500);
    } else {
      clearInterval(autoRollTimerRef.current);
    }
    return () => clearInterval(autoRollTimerRef.current);
  }, [isAutoRolling, filteredTechnologies.length]);

  const goToCard = (newIndex) => {
    setDirection(newIndex > wheelIndex ? 1 : -1);
    setWheelIndex(newIndex);
    if (stageRef.current) {
      const rect = stageRef.current.getBoundingClientRect();
      const targetScroll = window.scrollY + (rect.top - 120);
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getTechIcon = (id) => {
    switch (id) {
      case "proprietary_technologies": return <Award size={26} />;
      case "construction": return <HardHat size={26} />;
      case "development": return <Wind size={26} />;
      case "private_finance_initiative": return <LandmarkIcon />;
      case "environment_and_sustainability": return <Sparkles size={26} />;
      case "building_information_modeling": return <Layers size={26} />;
      case "safety": return <ShieldCheck size={26} />;
      case "industrial_facilities": return <Cpu size={26} />;
      default: return <Zap size={26} />;
    }
  };

  const currentTech = filteredTechnologies[wheelIndex] || filteredTechnologies[0];

  return (
    <div className="technologies-page">
      {/* Top Scroll Progress Indicator */}
      <motion.div 
        className="top-progress-bar"
        style={{ scaleX }}
      />

      {/* Hero Banner with Parallax Motion */}
      <div ref={heroRef} className="page-hero-banner tech-hero-container">
        <motion.div 
          className="hero-bg-layer"
          style={{ 
            backgroundImage: `linear-gradient(135deg, rgba(11, 25, 44, 0.85) 0%, rgba(13, 13, 13, 0.90) 100%), url(/images/ones_tower.png)`,
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
            <span>PIONEERING R&D & INNOVATION</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30, rotateX: -15 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="hero-banner-title"
          >
            TECHNOLOGY & SOLUTIONS
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hero-banner-subtitle"
          >
            Pioneering materials research, building automation, and lifecycle BIM modeling.
          </motion.p>

          {/* Quick Metrics Counter Row Rolling One-by-One */}
          <motion.div 
            initial="hidden"
            animate="show"
            variants={containerRollVariants}
            className="hero-metrics-strip"
          >
            <motion.div variants={heroMetricRollVariant} className="metric-chip">
              <span className="metric-val">09</span>
              <span className="metric-lbl">Patented Tech Focus Areas</span>
            </motion.div>
            <div className="metric-divider" />
            <motion.div variants={heroMetricRollVariant} className="metric-chip">
              <span className="metric-val">70%</span>
              <span className="metric-lbl">Low-Carbon Concrete Savings</span>
            </motion.div>
            <div className="metric-divider" />
            <motion.div variants={heroMetricRollVariant} className="metric-chip">
              <span className="metric-val">100%</span>
              <span className="metric-lbl">Smart BIM Compliance</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="container technology-container section-padding">
        <div className="technology-layout">
          {/* Sticky Side Navigation */}
          <aside className="tech-side-nav-wrapper">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="tech-side-nav"
            >
              <div className="side-nav-header">
                <Layers size={18} className="side-nav-header-icon" />
                <h4 className="side-nav-title">Technology Areas</h4>
              </div>

              <motion.ul 
                initial="hidden"
                animate="show"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: { staggerChildren: 0.08, delayChildren: 0.15 }
                  }
                }}
                className="side-nav-list"
              >
                {filteredTechnologies.map((tech, idx) => {
                  const isActive = wheelIndex === idx;
                  return (
                    <motion.li key={tech.id} variants={sideNavRollVariant} className="side-nav-item">
                      <a
                        href={`#${tech.id}`}
                        className={`side-nav-link-anchor ${isActive ? 'active' : ''}`}
                        onClick={(e) => {
                          e.preventDefault();
                          goToCard(idx);
                        }}
                      >
                        {isActive && (
                          <motion.div 
                            layoutId="activeTechNavHighlight"
                            className="active-nav-indicator"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}
                        <span className="nav-item-num">0{idx + 1}</span>
                        <span className="nav-item-text">{tech.title}</span>
                        <ArrowRight size={13} className="bullet-icon" />
                      </a>
                    </motion.li>
                  );
                })}
              </motion.ul>

              {/* Sidebar R&D Consultation Box */}
              <div className="side-nav-footer-box">
                <p className="side-nav-footer-text">Inquire about licensing or custom R&D?</p>
                <Link to="/contact" className="side-nav-cta-btn">
                  Technical Consultation <ArrowUpRight size={14} />
                </Link>
              </div>
            </motion.div>
          </aside>

          {/* Technology Main Content: SMART PINNED 3D ROLLING STAGE */}
          <main className="tech-main-content">
            {/* Tech Lead Banner */}
            <motion.div 
              initial={{ opacity: 0, y: 25, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="tech-lead-card"
            >
              <div className="lead-card-content">
                <p className="tech-lead-text">{techLead}</p>
              </div>
            </motion.div>

            {/* SMART PINNED 3D ROLLING STAGE */}
            <div 
              ref={stageRef} 
              className="circular-wheel-wrapper wheel-scroll-container"
            >
              <div className="circular-wheel-stage-clean">
                <AnimatePresence custom={direction} mode="wait">
                  {currentTech && (
                    <motion.div
                      key={currentTech.id}
                      id={currentTech.id}
                      custom={direction}
                      variants={cardRollVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="circular-wheel-card active-wheel-card"
                    >
                      <div className="tech-section-header">
                        <motion.div 
                          whileHover={{ scale: 1.1, rotate: 6 }}
                          className="segment-icon-box"
                        >
                          {getTechIcon(currentTech.id)}
                        </motion.div>
                        <div>
                          <span className="segment-idx-tag">0{wheelIndex + 1} / SOLUTION TECHNOLOGY</span>
                          <h2 className="tech-section-title">{currentTech.title}</h2>
                          <p className="tech-section-summary">{currentTech.summary}</p>
                        </div>
                      </div>

                      <div className="tech-section-body">
                        <div className="tech-paragraphs-group">
                          {currentTech.description.split('\n\n').map((para, pIdx) => (
                            <p key={pIdx} className="tech-paragraph">{formatText(para)}</p>
                          ))}
                        </div>

                        <div className="tech-features-box">
                          <div className="achievements-box-header">
                            <Award size={18} className="achievements-header-icon" />
                            <h4 className="features-title">Technical Features & Guidelines</h4>
                          </div>
                          <ul className="features-list">
                            {currentTech.features.map((feat, fIdx) => (
                              <li key={fIdx} className="feature-item">
                                <div className="check-icon-badge">
                                  <CheckCircle2 size={16} className="check-icon" />
                                </div>
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="segment-footer-action">
                          <Link to="/works" className="explore-projects-link">
                            <span>See applied projects with this tech</span>
                            <ArrowUpRight size={16} className="link-arrow" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 3D Wheel Controls */}
              <div className="circular-wheel-controls">
                <button 
                  onClick={() => goToCard(Math.max(0, wheelIndex - 1))} 
                  disabled={wheelIndex === 0}
                  className="wheel-nav-btn" 
                  title="Previous Topic"
                >
                  <ChevronLeft size={22} />
                </button>

                <button 
                  onClick={() => setIsAutoRolling(!isAutoRolling)} 
                  className={`wheel-nav-btn auto-roll-btn ${isAutoRolling ? 'active' : ''}`}
                  title={isAutoRolling ? "Pause Auto Roll" : "Start Auto Roll"}
                >
                  {isAutoRolling ? <Pause size={18} /> : <Play size={18} />}
                </button>

                <button 
                  onClick={() => goToCard(Math.min(filteredTechnologies.length - 1, wheelIndex + 1))} 
                  disabled={wheelIndex === filteredTechnologies.length - 1}
                  className="wheel-nav-btn" 
                  title="Next Topic"
                >
                  <ChevronRight size={22} />
                </button>
              </div>

              <div className="wheel-dots-nav">
                {filteredTechnologies.map((t, dotIdx) => (
                  <button
                    key={t.id}
                    className={`wheel-dot ${dotIdx === wheelIndex ? 'active' : ''}`}
                    onClick={() => goToCard(dotIdx)}
                    title={`Go to ${t.title}`}
                  />
                ))}
              </div>
            </div>

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
                <h3 className="cta-title">Interested in Deploying Obayashi Technologies?</h3>
                <p className="cta-desc">
                  Contact our engineering R&D team to discuss proprietary construction automation, BIM integration, or sustainable material specifications.
                </p>
                <div className="cta-buttons-group">
                  <Link to="/contact" className="cta-btn primary">
                    <span>Contact Technical Team</span>
                    <ArrowRight size={16} />
                  </Link>
                  <Link to="/works" className="cta-btn secondary">
                    <span>Explore Completed Works</span>
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
