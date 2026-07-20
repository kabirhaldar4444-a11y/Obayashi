import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Calendar, FileText, HardHat, DollarSign, Globe, Layers } from 'lucide-react';
import './ProjectDetailModal.css';

const catColors = {
  'Civil Infra': { accent: '#0284c7', pill: 'bg-sky-50 text-sky-600 border-sky-200/60' },
  'Offices':     { accent: '#d97706', pill: 'bg-amber-50 text-amber-700 border-amber-200/60' },
  'Energy':      { accent: '#059669', pill: 'bg-emerald-50 text-emerald-700 border-emerald-200/60' },
  'Education':   { accent: '#7c3aed', pill: 'bg-violet-50 text-violet-700 border-violet-200/60' },
  'Recreation':  { accent: '#e11d48', pill: 'bg-rose-50 text-rose-700 border-rose-200/60' },
};

export default function ProjectDetailModal({ project, onClose }) {
  if (!project) return null;

  const cat = catColors[project.category] || catColors['Civil Infra'];

  return createPortal(
    <AnimatePresence>
      <div className="detail-modal-root select-none font-sans">
        {/* Overlay backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="detail-modal-overlay bg-slate-950/40 backdrop-blur-md" 
          onClick={onClose}
        />

        {/* Modal Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ type: 'spring', stiffness: 280, damping: 26 }}
          className="detail-modal-container bg-white border border-slate-200/80 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button className="detail-modal-close border border-slate-200 bg-white/95 text-slate-500 hover:text-slate-800 shadow-sm" onClick={onClose} aria-label="Close modal">
            <X size={16} />
          </button>

          <div className="detail-modal-scroll-wrapper">
            {/* 1. Hero Cover */}
            <div 
              className="detail-modal-hero relative flex flex-col justify-end min-h-[300px] md:min-h-[360px]"
              style={{ 
                backgroundImage: `linear-gradient(rgba(8, 12, 20, 0.15) 20%, rgba(8, 12, 20, 0.5) 70%, #ffffff 98%), url(/images/${project.id}.jpg)` 
              }}
            >
              <div 
                className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                style={{ 
                  backgroundImage: 'linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
                }} 
              />
              <div className="detail-modal-hero-content z-10 p-6 md:p-10">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-widest border backdrop-blur-sm ${cat.pill}`}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: cat.accent }} />
                  {project.category}
                </span>
                <h2 className="detail-modal-title mt-4 text-3xl md:text-4xl font-black tracking-tight text-white leading-tight drop-shadow-sm">
                  {project.title}
                </h2>
                <p className="detail-modal-subtitle mt-2 text-white/70 text-xs md:text-sm font-light leading-relaxed max-w-xl">
                  {project.subtitle}
                </p>
              </div>
            </div>

            {/* 2. Content Sections */}
            <div className="detail-modal-content-container p-6 md:p-10 pt-0">
              <div className="detail-modal-columns grid grid-cols-1 lg:grid-cols-12 gap-10">
                
                {/* Left side case study */}
                <div className="detail-modal-main-info lg:col-span-7">
                  <span className="block text-[8px] font-extrabold uppercase tracking-[0.3em] mb-3" style={{ color: cat.accent }}>
                    Project Dossier
                  </span>
                  <h3 className="detail-modal-section-heading text-lg font-black text-slate-800 mb-5">
                    Overview & Engineering Highlights
                  </h3>
                  <div className="detail-modal-description-paragraphs space-y-4">
                    {project.description.split('\n\n').map((para, idx) => (
                      <p key={idx} className="detail-modal-paragraph text-sm leading-relaxed text-slate-500 font-light">
                        {para}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Right side specifications sidebar */}
                <div className="detail-modal-spec-sidebar lg:col-span-5">
                  <div className="detail-modal-spec-card rounded-xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                    <div className="spec-card-header flex items-center gap-2.5 mb-5 pb-4 border-b border-slate-200">
                      <FileText size={16} style={{ color: cat.accent }} />
                      <h4 className="text-xs font-black uppercase tracking-widest text-slate-700">Specifications Summary</h4>
                    </div>
                    <ul className="spec-card-list space-y-3.5">
                      <li className="flex items-center justify-between text-xs py-1 border-b border-slate-100 last:border-b-0">
                        <span className="text-slate-400 font-semibold">Location:</span>
                        <span className="spec-value text-slate-700 font-bold flex items-center gap-1.5">
                          <MapPin size={11} style={{ color: cat.accent }} />
                          <span>{project.location}</span>
                        </span>
                      </li>
                      <li className="flex items-center justify-between text-xs py-1 border-b border-slate-100 last:border-b-0">
                        <span className="text-slate-400 font-semibold">Completed:</span>
                        <span className="spec-value text-slate-700 font-bold flex items-center gap-1.5">
                          <Calendar size={11} style={{ color: cat.accent }} />
                          <span>{project.completion}</span>
                        </span>
                      </li>
                      <li className="flex items-center justify-between text-xs py-1 border-b border-slate-100 last:border-b-0">
                        <span className="text-slate-400 font-semibold">Contract Type:</span>
                        <span className="spec-value text-slate-700 font-bold">{project.designType}</span>
                      </li>
                      {project.details?.map((detail, dIdx) => (
                        <li key={dIdx} className="flex items-center justify-between text-xs py-1 border-b border-slate-100 last:border-b-0">
                          <span className="text-slate-400 font-semibold">{detail.label}:</span>
                          <span className="spec-value text-slate-700 font-bold">{detail.value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>
            </div>

            {/* 3. Footer controls */}
            <div className="detail-modal-footer p-6 md:p-10 pt-0 flex justify-end">
              <button 
                className="detail-modal-back-btn px-6 py-2.5 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 text-[10px] font-bold uppercase tracking-widest text-slate-700 transition-all duration-300 cursor-pointer"
                onClick={onClose}
              >
                Close Dossier
              </button>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
}
