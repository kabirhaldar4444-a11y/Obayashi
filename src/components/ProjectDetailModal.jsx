import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, MapPin, Calendar, HardHat, FileText, Award, DollarSign } from 'lucide-react';
import './ProjectDetailModal.css';

export default function ProjectDetailModal({ project, onClose }) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 50);
    return () => clearTimeout(timer);
  }, []);

  if (!project) return null;

  return createPortal(
    <div className={`detail-modal-overlay ${animate ? 'active' : ''}`} onClick={onClose}>
      <div 
        className={`detail-modal-container ${animate ? 'in' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button className="detail-modal-close" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {/* Scrollable Container Wrapper */}
        <div className="detail-modal-scroll-wrapper">
          
          {/* 1. Project Hero Banner */}
          <div 
            className="detail-modal-hero"
            style={{ 
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(2, 6, 4, 1) 95%), url(/images/${project.id}.jpg)` 
            }}
          >
            {/* Fallback image handler in CSS or using error boundary */}
            <div className="detail-modal-hero-content">
              <span className="detail-modal-badge">{project.category.toUpperCase()}</span>
              <h2 className="detail-modal-title">{project.title}</h2>
              <p className="detail-modal-subtitle">{project.subtitle}</p>
            </div>
          </div>

          {/* 2. Main Content Grid */}
          <div className="detail-modal-content-container">
            <div className="detail-modal-columns">
              
              {/* Left Column: Extensive Written Case Study */}
              <div className="detail-modal-main-info">
                <h3 className="detail-modal-section-heading">Project Overview & Highlights</h3>
                <div className="detail-modal-description-paragraphs">
                  {project.description.split('\n\n').map((para, idx) => (
                    <p key={idx} className="detail-modal-paragraph">{para}</p>
                  ))}
                </div>
              </div>

              {/* Right Column: Spec Summary Box */}
              <div className="detail-modal-spec-sidebar">
                <div className="detail-modal-spec-card">
                  <div className="spec-card-header">
                    <FileText size={18} className="spec-icon" />
                    <h4>Project Specifications</h4>
                  </div>
                  <ul className="spec-card-list">
                    <li>
                      <span className="spec-label">Location:</span>
                      <span className="spec-value flex-align-center gap-4">
                        <MapPin size={12} className="icon-emerald" />
                        <span>{project.location}</span>
                      </span>
                    </li>
                    <li>
                      <span className="spec-label">Completed:</span>
                      <span className="spec-value flex-align-center gap-4">
                        <Calendar size={12} className="icon-emerald" />
                        <span>{project.completion}</span>
                      </span>
                    </li>
                    <li>
                      <span className="spec-label">Contract Type:</span>
                      <span className="spec-value">{project.designType}</span>
                    </li>
                    {project.details?.map((detail, dIdx) => (
                      <li key={dIdx}>
                        <span className="spec-label">{detail.label}:</span>
                        <span className="spec-value">{detail.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          </div>

          {/* 3. Footer Action */}
          <div className="detail-modal-footer">
            <button className="detail-modal-back-btn" onClick={onClose}>
              <span>Close Dossier</span>
            </button>
          </div>

        </div>

      </div>
    </div>,
    document.body
  );
}
