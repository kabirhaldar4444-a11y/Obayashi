import React, { useState, useMemo, useEffect, startTransition } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, RefreshCw, MapPin, Calendar, ArrowRight, Layers } from 'lucide-react';
import { projects, workCategories } from '../data/worksContent';
import ProjectMapPopup from '../components/ProjectMapPopup';

/* ─────────────────────────────────────────────
   Category colour map for accent pills
───────────────────────────────────────────── */
const CATEGORY_COLORS = {
  "Offices": { bg: "rgba(11,61,107,0.90)", text: "#ffffff" },
  "Civil Infra": { bg: "rgba(16,130,80,0.90)", text: "#ffffff" },
  "Energy": { bg: "rgba(217,119,6,0.90)", text: "#ffffff" },
  "Education": { bg: "rgba(109,40,217,0.90)", text: "#ffffff" },
  "Recreation": { bg: "rgba(220,38,38,0.90)", text: "#ffffff" },
};

/* ─────────────────────────────────────────────
   Premium Project Card
───────────────────────────────────────────── */
const ProjectCardMemo = React.memo(({ project, onOpenPopup, index }) => {
  const cat = CATEGORY_COLORS[project.category] || { bg: "rgba(30,30,30,0.85)", text: "#fff" };

  return (
    <motion.div
      layout
      variants={{
        hidden: { opacity: 0, y: 36, scale: 0.97 },
        show: { opacity: 1, y: 0, scale: 1 }
      }}
      transition={{ type: "spring", stiffness: 200, damping: 24 }}
      onClick={() => onOpenPopup(project)}
      className="group relative flex flex-col overflow-hidden cursor-pointer select-none bg-white"
      style={{
        borderRadius: '14px',
        border: '1px solid rgba(0,0,0,0.07)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
        transition: 'transform 0.4s cubic-bezier(0.25,0.8,0.25,1), box-shadow 0.4s cubic-bezier(0.25,0.8,0.25,1), border-color 0.3s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-9px)';
        e.currentTarget.style.boxShadow = '0 24px 64px rgba(0,0,0,0.14), 0 8px 24px rgba(0,0,0,0.08)';
        e.currentTarget.style.borderColor = 'rgba(0,0,0,0.10)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)';
        e.currentTarget.style.borderColor = 'rgba(0,0,0,0.07)';
      }}
    >
      {/* ── Image ── */}
      <div className="relative overflow-hidden" style={{ height: '218px' }}>
        <img
          src={`/images/${project.id}.jpg`}
          alt={project.title}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
          style={{ transition: 'transform 0.7s cubic-bezier(0.25,0.8,0.25,1)' }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.07)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.45) 100%)' }}
        />
        {/* Category pill */}
        <div className="absolute top-3 left-3 z-10">
          <span
            style={{
              background: cat.bg,
              color: cat.text,
              fontSize: '0.65rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '3px 10px',
              borderRadius: '999px',
              backdropFilter: 'blur(4px)',
              border: '1px solid rgba(255,255,255,0.22)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
            }}
          >
            {project.category}
          </span>
        </div>
        {/* Location if available */}
        {project.location && (
          <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1"
            style={{
              background: 'rgba(0,0,0,0.55)',
              backdropFilter: 'blur(6px)',
              borderRadius: '6px',
              padding: '3px 8px',
              color: 'rgba(255,255,255,0.88)',
              fontSize: '0.67rem',
              fontWeight: 600,
            }}>
            <MapPin size={9} />
            <span className="truncate" style={{ maxWidth: '110px' }}>{project.location?.split(',')[0]}</span>
          </div>
        )}
      </div>

      {/* ── Info strip ── */}
      <div
        className="flex flex-col flex-1"
        style={{ padding: '16px 18px 18px', borderTop: '1px solid rgba(0,0,0,0.05)' }}
      >
        <h3
          style={{
            fontSize: '0.88rem',
            fontWeight: 700,
            color: '#0d0d0d',
            lineHeight: 1.4,
            marginBottom: '10px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            transition: 'color 0.2s ease',
          }}
          className="group-hover:text-[#0B3D6B]"
        >
          {project.title}
        </h3>

        <div className="flex items-center justify-between mt-auto">
          {project.completionYear && (
            <div className="flex items-center gap-1.5" style={{ fontSize: '0.72rem', color: '#909090', fontWeight: 600 }}>
              <Calendar size={11} style={{ color: '#C17F24' }} />
              <span>{project.completionYear}</span>
            </div>
          )}
          <span
            className="flex items-center gap-1 ml-auto"
            style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              color: '#C17F24',
              transition: 'gap 0.25s ease',
            }}
          >
            View Details
            <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </motion.div>
  );
});

/* ─────────────────────────────────────────────
   Shimmer Skeleton
───────────────────────────────────────────── */
const SkeletonCard = () => (
  <div
    className="animate-pulse overflow-hidden"
    style={{ borderRadius: '14px', border: '1px solid rgba(0,0,0,0.06)', background: '#f5f5f7' }}
  >
    <div style={{ height: '218px', background: '#e8e8e8', position: 'relative', overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
          animation: 'shimmer 1.6s infinite',
        }}
      />
    </div>
    <div style={{ padding: '16px 18px 18px' }}>
      <div style={{ height: '14px', background: '#ddd', borderRadius: '6px', marginBottom: '8px', width: '85%' }} />
      <div style={{ height: '12px', background: '#e4e4e4', borderRadius: '6px', width: '55%' }} />
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   Premium Select Component
───────────────────────────────────────────── */
const FilterSelect = ({ label, value, onChange, options }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
    <label style={{
      fontSize: '0.68rem',
      fontWeight: 800,
      color: '#909090',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
    }}>
      {label}
    </label>
    <div style={{ position: 'relative' }}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '100%',
          background: '#ffffff',
          border: '1.5px solid #e8e8e8',
          borderRadius: '10px',
          padding: '10px 36px 10px 14px',
          fontSize: '0.82rem',
          color: '#1a1a1a',
          fontWeight: 600,
          fontFamily: 'inherit',
          appearance: 'none',
          cursor: 'pointer',
          outline: 'none',
          transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
          boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
        }}
        onFocus={e => {
          e.target.style.borderColor = '#C17F24';
          e.target.style.boxShadow = '0 0 0 3px rgba(193,127,36,0.12)';
        }}
        onBlur={e => {
          e.target.style.borderColor = '#e8e8e8';
          e.target.style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)';
        }}
      >
        {options.map((item, idx) => (
          <option key={idx} value={item}>{item}</option>
        ))}
      </select>
      {/* Chevron icon */}
      <svg
        style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#909090' }}
        width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   Main Page
───────────────────────────────────────────── */
export default function Works() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [designBuild, setDesignBuild] = useState("All");
  const [facilityType, setFacilityType] = useState("All");
  const [location, setLocation] = useState("All");
  const [year, setYear] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleReset = () => {
    startTransition(() => {
      setDesignBuild("All");
      setFacilityType("All");
      setLocation("All");
      setYear("All");
    });
  };

  const filteredProjects = useMemo(() => {
    return projects.filter((proj) => {
      const matchDB = designBuild === "All" || proj.designType === designBuild;
      const matchType = facilityType === "All" || proj.category === facilityType;
      const matchLoc = location === "All" || proj.locationCategory === location;

      let matchYear = false;
      if (year === "All") {
        matchYear = true;
      } else if (year === "Before 2022") {
        const yrVal = parseInt(proj.completionYear);
        matchYear = isNaN(yrVal) || yrVal < 2022;
      } else {
        matchYear = proj.completionYear === year;
      }

      return matchDB && matchType && matchLoc && matchYear;
    });
  }, [designBuild, facilityType, location, year]);

  const hasActiveFilters = designBuild !== "All" || facilityType !== "All" || location !== "All" || year !== "All";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{ minHeight: '100vh', background: '#f5f5f7', color: '#1a1a1a', position: 'relative' }}
    >
      {/* Shimmer keyframe */}
      <style>{`
        @keyframes shimmer { 0%{transform:translateX(-100%)} 100%{transform:translateX(100%)} }
      `}</style>

      {/* ════════════════════════════════════════
          CINEMATIC HERO BANNER
      ════════════════════════════════════════ */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '42vh',
          minHeight: '300px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Background image */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(/images/rokka_mori.png)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 40%',
            transform: 'scale(1.04)',
            transition: 'transform 6s ease',
          }}
        />
        {/* Layered gradient overlays */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(11,61,107,0.72) 0%, rgba(0,0,0,0.30) 60%, rgba(0,0,0,0.05) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(245,245,247,1) 0%, rgba(245,245,247,0) 28%)' }} />

        {/* Content */}
        <div
          className="container mx-auto relative z-10"
          style={{ padding: '0 32px', textAlign: 'center' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ marginBottom: '14px' }}
          >
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '7px',
              padding: '5px 16px',
              background: 'rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.30)',
              borderRadius: '999px',
              color: 'rgba(255,255,255,0.92)',
              fontSize: '0.68rem',
              fontWeight: 800,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              backdropFilter: 'blur(8px)',
            }}>
              <Layers size={11} />
              Obayashi Project Hub
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
              fontWeight: 900,
              color: '#ffffff',
              lineHeight: 1.12,
              letterSpacing: '-0.03em',
              marginBottom: '14px',
              textShadow: '0 2px 24px rgba(0,0,0,0.3)',
            }}
          >
            PROJECT DIRECTORY
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26 }}
            style={{
              fontSize: '0.95rem',
              color: 'rgba(255,255,255,0.80)',
              fontWeight: 400,
              lineHeight: 1.6,
              maxWidth: '520px',
              margin: '0 auto',
            }}
          >
            A premium geographic catalog of architectural and engineering achievements across Japan. Select pins to inspect specifications.
          </motion.p>
        </div>
      </div>

      {/* ════════════════════════════════════════
          MAIN CONTENT
      ════════════════════════════════════════ */}
      <div
        className="container mx-auto"
        style={{ padding: '0 24px 80px', maxWidth: '1280px', position: 'relative', zIndex: 20 }}
      >

        {/* ── Filter Console ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.34, type: 'spring', stiffness: 180, damping: 22 }}
          style={{
            background: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(0,0,0,0.07)',
            borderRadius: '18px',
            padding: '24px 28px',
            boxShadow: '0 8px 40px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)',
            marginBottom: '32px',
            marginTop: '-24px',
          }}
        >
          {/* Header row */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            paddingBottom: '16px',
            borderBottom: '1px solid rgba(0,0,0,0.06)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '9px',
                background: 'rgba(193,127,36,0.12)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <SlidersHorizontal size={15} style={{ color: '#C17F24' }} />
              </div>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0d0d0d', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Search Parameters
              </span>
            </div>

            <button
              onClick={handleReset}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: hasActiveFilters ? '#C17F24' : '#909090',
                background: hasActiveFilters ? 'rgba(193,127,36,0.08)' : '#f5f5f7',
                border: `1px solid ${hasActiveFilters ? 'rgba(193,127,36,0.25)' : '#e8e8e8'}`,
                borderRadius: '9px',
                padding: '7px 14px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontFamily: 'inherit',
              }}
            >
              <RefreshCw size={11} />
              Reset Filters
            </button>
          </div>

          {/* Selects grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '16px',
          }}>
            <FilterSelect label="Contract Type" value={designBuild} onChange={setDesignBuild} options={workCategories.designBuild} />
            <FilterSelect label="Building Category" value={facilityType} onChange={setFacilityType} options={workCategories.facilityType} />
            <FilterSelect label="Project Site" value={location} onChange={setLocation} options={workCategories.location} />
            <FilterSelect label="Completion Date" value={year} onChange={setYear} options={workCategories.year} />
          </div>
        </motion.div>

        {/* ── Results counter ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
          <p style={{ fontSize: '0.78rem', color: '#909090', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Showing <strong style={{ color: '#C17F24', fontSize: '0.9rem' }}>{loading ? '—' : filteredProjects.length}</strong> Matching Developments
          </p>
          {hasActiveFilters && (
            <span style={{
              fontSize: '0.68rem', fontWeight: 800,
              background: 'rgba(193,127,36,0.12)', color: '#C17F24',
              padding: '2px 9px', borderRadius: '999px', letterSpacing: '0.05em',
            }}>
              FILTERED
            </span>
          )}
        </div>

        {/* ── Grid ── */}
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
            {Array.from({ length: 6 }).map((_, idx) => <SkeletonCard key={idx} />)}
          </div>
        ) : filteredProjects.length > 0 ? (
          <motion.div
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } }}
            initial="hidden"
            animate="show"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}
          >
            {filteredProjects.map((proj, idx) => (
              <ProjectCardMemo
                key={proj.id}
                project={proj}
                index={idx}
                onOpenPopup={setSelectedProject}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              background: '#ffffff',
              border: '1px solid rgba(0,0,0,0.07)',
              borderRadius: '18px',
              padding: '72px 24px',
              textAlign: 'center',
              maxWidth: '480px',
              margin: '0 auto',
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
            }}
          >
            <div style={{
              width: '56px', height: '56px', borderRadius: '14px',
              background: 'rgba(193,127,36,0.10)', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px', color: '#C17F24',
            }}>
              <SlidersHorizontal size={24} />
            </div>
            <h4 style={{ fontWeight: 800, fontSize: '1.05rem', color: '#0d0d0d', marginBottom: '8px' }}>No Matching Projects</h4>
            <p style={{ fontSize: '0.85rem', color: '#909090', marginBottom: '24px', lineHeight: 1.6 }}>
              Adjust your search parameters or reset filters to explore the full project directory.
            </p>
            <button
              onClick={handleReset}
              style={{
                padding: '11px 28px',
                background: 'linear-gradient(135deg, #C17F24, #a56918)',
                color: '#ffffff',
                borderRadius: '10px',
                fontWeight: 700,
                fontSize: '0.85rem',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'inherit',
                boxShadow: '0 4px 16px rgba(193,127,36,0.25)',
              }}
            >
              Reset Search Parameters
            </button>
          </motion.div>
        )}
      </div>

      {/* ── Project map popup modal ── */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectMapPopup
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
