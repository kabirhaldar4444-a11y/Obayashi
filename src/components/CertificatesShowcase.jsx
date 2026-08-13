import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  X, 
  Download,
  Award
} from 'lucide-react';
import { certificates } from '../data/companyContent';

export default function CertificatesShowcase({ 
  showHeader = true, 
  title = "ACCREDITATIONS & CERTIFICATES", 
  subtitle = "International ISO standards and safety compliance certifications verified by BSI Assurance." 
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  const activeCert = certificates[currentIndex];

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

  const handleModalPrev = (e) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + certificates.length) % certificates.length);
    setZoomLevel(1);
  };

  const handleModalNext = (e) => {
    if (e) e.stopPropagation();
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
              onClick={openLightbox} 
              className="cert-zoom-pill"
              title="View Fullscreen High-Resolution"
            >
              <Maximize2 size={15} />
              <span>Fullscreen View</span>
            </button>
          </div>
        </div>

        {/* 1. Main Large Certificate Image Display */}
        <div className="cert-main-stage">
          {/* Main Stage Navigation Left Arrow (<) */}
          <button 
            onClick={handlePrev} 
            className="stage-nav-arrow left"
            aria-label="Previous Certificate"
            title="Previous Certificate"
          >
            <ChevronLeft size={32} strokeWidth={2.5} />
          </button>

          {/* Certificate Document Display */}
          <div className="stage-image-container" onClick={openLightbox}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCert.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
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
                    <span>Click to Inspect Fullscreen</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Main Stage Navigation Right Arrow (>) */}
          <button 
            onClick={handleNext} 
            className="stage-nav-arrow right"
            aria-label="Next Certificate"
            title="Next Certificate"
          >
            <ChevronRight size={32} strokeWidth={2.5} />
          </button>
        </div>

        {/* 2. Bottom Thumbnail Strip */}
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

          {/* Counter Footer */}
          <div className="cert-strip-footer">
            <span className="cert-loop-counter">
              Showing <strong>{currentIndex + 1}</strong> of <strong>{certificates.length}</strong> certificates • {activeCert.scope}
            </span>
          </div>
        </div>
      </div>

      {/* 3. Fullscreen Lightbox Modal (Enlarged & Prominent < > Navigation) */}
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
              className="cert-modal-container full-immersive"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Bar */}
              <div className="cert-modal-header">
                <div className="modal-header-info">
                  <div className="modal-title-row">
                    <span className="modal-badge">{activeCert.certNumber}</span>
                    <h3 className="modal-title">{activeCert.entity}</h3>
                    <span className="modal-counter-tag">{currentIndex + 1} / {certificates.length}</span>
                  </div>
                  <p className="modal-subtitle">{activeCert.standard} • {activeCert.scope}</p>
                </div>

                <div className="modal-header-actions">
                  <button 
                    onClick={() => setZoomLevel(prev => Math.min(prev + 0.3, 3))} 
                    className="modal-tool-btn" 
                    title="Zoom In"
                  >
                    <ZoomIn size={18} />
                  </button>
                  <button 
                    onClick={() => setZoomLevel(prev => Math.max(prev - 0.3, 0.7))} 
                    className="modal-tool-btn" 
                    title="Zoom Out"
                  >
                    <ZoomOut size={18} />
                  </button>
                  <button 
                    onClick={() => setZoomLevel(1)} 
                    className="modal-tool-btn" 
                    title="Reset Size"
                  >
                    <RotateCcw size={18} />
                  </button>
                  <a 
                    href={activeCert.image} 
                    download={`Obayashi_Certificate_${activeCert.certNumber}.jpg`} 
                    className="modal-tool-btn" 
                    title="Download Original High-Res"
                  >
                    <Download size={18} />
                  </a>
                  <button 
                    onClick={() => setModalOpen(false)} 
                    className="modal-close-btn" 
                    title="Close (Esc)"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              {/* Modal Body with Large Big Certificate and Prominent < > Navigation Arrows */}
              <div className="cert-modal-body">
                {/* Previous Navigation Arrow Button (<) */}
                <button 
                  onClick={handleModalPrev} 
                  className="modal-nav-arrow left"
                  title="Previous Certificate (<)"
                  aria-label="Previous Certificate"
                >
                  <ChevronLeft size={38} strokeWidth={2.5} />
                </button>

                {/* Big Image Viewer Container */}
                <div className="modal-image-stage" style={{ transform: `scale(${zoomLevel})` }}>
                  <img 
                    src={activeCert.image} 
                    alt={`${activeCert.entity} - ${activeCert.standard}`} 
                    className="modal-cert-image"
                  />
                </div>

                {/* Next Navigation Arrow Button (>) */}
                <button 
                  onClick={handleModalNext} 
                  className="modal-nav-arrow right"
                  title="Next Certificate (>)"
                  aria-label="Next Certificate"
                >
                  <ChevronRight size={38} strokeWidth={2.5} />
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
                      title={cert.entity}
                    >
                      <img src={cert.image} alt={cert.entity} className="modal-thumb-img" />
                    </button>
                  ))}
                </div>
                <div className="modal-footer-status">
                  <ShieldCheck size={16} className="text-emerald-400" />
                  <span>Authenticated Certificate • High Resolution Preview</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
