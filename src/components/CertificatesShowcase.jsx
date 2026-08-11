import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Maximize2, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  X, 
  Download,
  CheckCircle2,
  Award
} from 'lucide-react';
import { certificates } from '../data/companyContent';

export default function CertificatesShowcase({ 
  showHeader = true, 
  title = "ACCREDITATIONS & CERTIFICATES", 
  subtitle = "International ISO standards and safety compliance certifications verified by BSI Assurance." 
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const timerRef = useRef(null);

  const activeCert = certificates[currentIndex];

  // Auto-play loop logic (continuous cycling)
  useEffect(() => {
    if (isPlaying && !modalOpen) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % certificates.length);
      }, 4500);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, modalOpen, currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + certificates.length) % certificates.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % certificates.length);
  };

  const openLightbox = () => {
    setZoomLevel(1);
    setModalOpen(true);
  };

  const handleModalPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + certificates.length) % certificates.length);
    setZoomLevel(1);
  };

  const handleModalNext = () => {
    setCurrentIndex((prev) => (prev + 1) % certificates.length);
    setZoomLevel(1);
  };

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!modalOpen) return;
      if (e.key === 'Escape') setModalOpen(false);
      if (e.key === 'ArrowRight') handleModalNext();
      if (e.key === 'ArrowLeft') handleModalPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalOpen]);

  return (
    <div className="certificate-gallery-section">
      {showHeader && (
        <div className="section-header text-center">
          <div className="inline-badge">
            <ShieldCheck size={16} />
            <span>AUTHENTICATED ACCREDITATIONS</span>
          </div>
          <h2 className="section-title">{title}</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>{subtitle}</p>
        </div>
      )}

      {/* Main Certificate Showcase Container */}
      <div className="cert-viewer-card">
        {/* Certificate Meta Bar */}
        <div className="cert-viewer-topbar">
          <div className="cert-meta-left">
            <span className="cert-badge-tag">
              <Award size={15} />
              <span>{activeCert.standard}</span>
            </span>
            <span className="cert-num-pill">{activeCert.certNumber}</span>
          </div>

          <div className="cert-meta-center">
            <h3 className="cert-current-entity">{activeCert.entity}</h3>
          </div>

          <div className="cert-meta-right">
            <button 
              onClick={() => setIsPlaying(!isPlaying)} 
              className={`cert-control-pill ${isPlaying ? 'playing' : ''}`}
              title={isPlaying ? "Pause Auto-Loop" : "Resume Auto-Loop"}
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
              <span>{isPlaying ? 'Auto-Loop On' : 'Paused'}</span>
            </button>
            <button 
              onClick={openLightbox} 
              className="cert-zoom-pill"
              title="View Fullscreen High-Resolution"
            >
              <Maximize2 size={14} />
              <span>Fullscreen</span>
            </button>
          </div>
        </div>

        {/* 1. Main Large Certificate Image Display */}
        <div className="cert-main-stage">
          {/* Loop Navigation Left Arrow */}
          <button 
            onClick={handlePrev} 
            className="stage-nav-arrow left"
            aria-label="Previous Certificate"
            title="Previous Certificate"
          >
            <ChevronLeft size={28} />
          </button>

          {/* Certificate Document Display */}
          <div className="stage-image-container" onClick={openLightbox}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCert.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="stage-image-wrapper"
              >
                <img 
                  src={activeCert.image} 
                  alt={`${activeCert.entity} - ${activeCert.standard}`} 
                  className="cert-main-document-image"
                />
                
                {/* Floating Hover Zoom Hint */}
                <div className="stage-hover-overlay">
                  <div className="hover-zoom-badge">
                    <Maximize2 size={16} />
                    <span>Click to Inspect High-Resolution</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Loop Navigation Right Arrow */}
          <button 
            onClick={handleNext} 
            className="stage-nav-arrow right"
            aria-label="Next Certificate"
            title="Next Certificate"
          >
            <ChevronRight size={28} />
          </button>
        </div>

        {/* 2. Bottom Thumbnail Loop Strip (Exact Match to User 2nd Screenshot) */}
        <div className="cert-thumbnails-strip-container">
          <div className="cert-thumbnails-strip">
            {certificates.map((cert, index) => {
              const isActive = currentIndex === index;
              return (
                <button
                  key={cert.id}
                  onClick={() => setCurrentIndex(index)}
                  className={`cert-thumb-box ${isActive ? 'active-green-border' : 'dimmed'}`}
                  title={`${cert.entity} (${cert.certNumber})`}
                  aria-label={`Select ${cert.entity}`}
                >
                  <div className="thumb-image-holder">
                    <img 
                      src={cert.image} 
                      alt={cert.entity} 
                      className="thumb-document-img"
                    />
                  </div>
                  {isActive && <div className="active-thumb-glow" />}
                </button>
              );
            })}
          </div>

          {/* Loop Progress & Counter */}
          <div className="cert-strip-footer">
            <span className="cert-loop-counter">
              Showing <strong>{currentIndex + 1}</strong> of <strong>{certificates.length}</strong> certificates • {activeCert.scope}
            </span>
          </div>
        </div>
      </div>

      {/* 3. Fullscreen Lightbox Modal with Loop Controls */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div 
            className="cert-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalOpen(false)}
          >
            <motion.div 
              className="cert-modal-container"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="cert-modal-header">
                <div className="modal-header-info">
                  <div className="modal-title-row">
                    <span className="modal-badge">{activeCert.certNumber}</span>
                    <h3 className="modal-title">{activeCert.entity}</h3>
                  </div>
                  <p className="modal-subtitle">{activeCert.standard} • {activeCert.scope}</p>
                </div>

                <div className="modal-header-actions">
                  <button 
                    onClick={() => setZoomLevel(prev => Math.min(prev + 0.25, 2.5))} 
                    className="modal-tool-btn" 
                    title="Zoom In"
                  >
                    <ZoomIn size={18} />
                  </button>
                  <button 
                    onClick={() => setZoomLevel(prev => Math.max(prev - 0.25, 0.75))} 
                    className="modal-tool-btn" 
                    title="Zoom Out"
                  >
                    <ZoomOut size={18} />
                  </button>
                  <button 
                    onClick={() => setZoomLevel(1)} 
                    className="modal-tool-btn" 
                    title="Reset Zoom"
                  >
                    <RotateCcw size={18} />
                  </button>
                  <a 
                    href={activeCert.image} 
                    download={`Obayashi_Certificate_${activeCert.certNumber}.png`} 
                    className="modal-tool-btn" 
                    title="Download Original"
                  >
                    <Download size={18} />
                  </a>
                  <button 
                    onClick={() => setModalOpen(false)} 
                    className="modal-close-btn" 
                    title="Close (Esc)"
                  >
                    <X size={22} />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="cert-modal-body">
                <button 
                  onClick={handleModalPrev} 
                  className="modal-nav-arrow left"
                  title="Previous Certificate"
                >
                  <ChevronLeft size={28} />
                </button>

                <div className="modal-image-stage">
                  <img 
                    src={activeCert.image} 
                    alt={activeCert.title} 
                    className="modal-cert-image"
                    style={{ transform: `scale(${zoomLevel})` }}
                  />
                </div>

                <button 
                  onClick={handleModalNext} 
                  className="modal-nav-arrow right"
                  title="Next Certificate"
                >
                  <ChevronRight size={28} />
                </button>
              </div>

              {/* Modal Bottom Thumbnail Strip */}
              <div className="cert-modal-footer">
                <div className="modal-footer-nav">
                  {certificates.map((cert, idx) => (
                    <button
                      key={cert.id}
                      onClick={() => {
                        setCurrentIndex(idx);
                        setZoomLevel(1);
                      }}
                      className={`modal-thumb-box ${currentIndex === idx ? 'active-green-border' : 'dimmed'}`}
                    >
                      <img src={cert.image} alt={cert.entity} className="modal-thumb-img" />
                    </button>
                  ))}
                </div>
                <div className="modal-footer-status">
                  <ShieldCheck size={16} className="text-emerald-500" />
                  <span>Authenticated Certificate • Issued by BSI Assurance</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
