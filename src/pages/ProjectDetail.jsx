import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Calendar, Building2, Ruler, 
  CheckCircle, Compass, DollarSign,
  ArrowRight, Award, ShieldAlert, Cpu
} from 'lucide-react';
import { projects } from '../data/worksContent';
import { detailedProjectContent } from '../data/projectDetails';
import MiniJapanMap from '../components/MiniJapanMap';

const slugify = (t) => t.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-').replace(/^-+/, '').replace(/-+$/, '');

export default function ProjectDetail() {
  const params = useParams();
  const paramVal = params.slug || params.id;
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [paramVal]);

  const project = projects.find(p => slugify(p.title) === paramVal || p.id === paramVal);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex flex-col items-center justify-center text-zinc-600 p-12">
        <span className="text-5xl mb-4">🏗</span>
        <h1 className="text-xl font-bold text-zinc-900 uppercase tracking-wider">Project Not Found</h1>
        <p className="text-sm text-zinc-500 mt-2 text-center max-w-xs">
          The requested project documentation could not be retrieved.
        </p>
        <button 
          onClick={() => navigate('/works')} 
          className="mt-6 px-6 py-2.5 bg-zinc-900 text-white hover:bg-zinc-800 rounded-lg text-xs uppercase tracking-widest font-bold transition-all"
        >
          ← Directory
        </button>
      </div>
    );
  }

  // Load detailed project specifications with dynamic default fallbacks
  const details = detailedProjectContent[project.id] || {
    kanjiName: 'プロジェクト詳細情報', 
    romajiName: 'Purojekuto Shōsai Jōhō',
    prefecture: 'Japan', 
    city: 'Regional Development', 
    tokyoDistance: 'N/A',
    airport: 'International Hub',
    locationStory: 'Strategically located to support urban density improvements and build infrastructure trust.',
    coordinates: '35.6762° N, 139.6503° E',
    challenges: [
      'Integrating modern structural frameworks within high-density zones.', 
      'Ensuring compliance with strict local seismic safety guidelines.'
    ],
    solutions: [
      'Leveraged Building Information Modeling (BIM) for precise coordination.', 
      'Implemented low-carbon precast concrete modules.'
    ],
    specs: {
      'Structure': 'Composite Steel Frame', 
      'Foundation': 'Concrete bored pile columns',
      'Steel Used': 'Thermo-mechanical control steel', 
      'Concrete Grade': 'High strength 38 N/mm²',
      'Building Height': 'Undisclosed', 
      'Site Area': '12,000 m²',
      'Seismic Resistance': 'Grade 1 (Excellent)', 
      'Energy Rating': 'BELS 5-Star',
      'Green Certification': 'CASBEE A-Class'
    }
  };

  const budget = project.details?.find(d => d.label.toLowerCase() === 'budget')?.value || 'N/A';
  const client = project.details?.find(d => d.label.toLowerCase() === 'client')?.value || 'N/A';
  const imgSrc = `/images/${project.id}.jpg`;

  // Grab the next project in sequence for transition portal link
  const currentIndex = projects.findIndex(p => p.id === project.id);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  // Visual categorization badge styling
  const categoryPills = {
    'Civil Infra': 'bg-sky-50 border-sky-100 text-sky-700',
    'Offices': 'bg-amber-50 border-amber-100 text-amber-800',
    'Energy': 'bg-emerald-50 border-emerald-100 text-emerald-800',
    'Education': 'bg-violet-50 border-violet-100 text-violet-800',
    'Recreation': 'bg-rose-50 border-rose-100 text-rose-800',
  };
  const pillStyle = categoryPills[project.category] || 'bg-zinc-50 border-zinc-100 text-zinc-800';

  // Deduplicate summary and description overlap
  const cleanDescription = project.description || '';
  const cleanSummary = project.summary || '';
  const isDuplicate = cleanSummary && (cleanDescription.includes(cleanSummary) || cleanSummary.includes(cleanDescription));
  const paragraphs = cleanDescription.split('\n\n').map(p => p.trim()).filter(Boolean);

  const allCards = [...paragraphs];
  const hasSummaryCard = !isDuplicate && cleanSummary;
  if (hasSummaryCard) {
    allCards.push(cleanSummary);
  }

  const [activePara, setActivePara] = React.useState(0);
  const scrollContainerRef = React.useRef(null);

  React.useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current) return;
      const rect = scrollContainerRef.current.getBoundingClientRect();
      const startOffset = 120;
      const scrolled = startOffset - rect.top;
      const totalScrollable = rect.height - window.innerHeight + startOffset;
      
      if (scrolled >= 0 && totalScrollable > 0) {
        const percentage = scrolled / totalScrollable;
        const index = Math.floor(percentage * allCards.length);
        const safeIndex = Math.max(0, Math.min(allCards.length - 1, index));
        setActivePara(safeIndex);
      } else if (scrolled < 0) {
        setActivePara(0);
      } else {
        setActivePara(allCards.length - 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [allCards.length]);

  const fallbackImg = {
    'Civil Infra': '/images/category_civil.png',
    'Offices': '/images/category_offices.png',
    'Energy': '/images/category_energy.png',
    'Education': '/images/category_education.png',
    'Recreation': '/images/category_recreation.png',
  };

  return (
    <div className="bg-[#f8f9fa] text-zinc-800 min-h-screen antialiased select-none font-sans pb-32">
      
      {/* ─── HEADER / BREADCRUMBS ─── */}
      <div 
        style={{
          maxWidth: '1200px',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: '24px',
          paddingRight: '24px',
          paddingTop: '48px',
          paddingBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'between',
          borderBottom: '1px solid rgba(228, 228, 231, 0.6)'
        }}
        className="justify-between"
      >
        <Link 
          to="/works" 
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '13px',
            fontWeight: '700',
            color: '#71717a',
            textDecoration: 'none',
            transition: 'color 0.2s ease'
          }}
          className="hover:text-zinc-900"
        >
          <ArrowLeft size={15} />
          <span>Works Directory</span>
        </Link>
        <nav 
          style={{
            fontSize: '11px',
            fontFamily: 'monospace',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: '#a1a1aa',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
          className="hidden sm:flex"
        >
          <span>Works</span>
          <span>/</span>
          <span>{project.category}</span>
          <span>/</span>
          <span style={{ color: '#52525b', fontWeight: 'bold' }}>{project.title}</span>
        </nav>
      </div>

      <div style={{ maxWidth: '1200px', marginLeft: 'auto', marginRight: 'auto', paddingLeft: '24px', paddingRight: '24px' }}>
        
        {/* ─── HEADER TITLE BLOCK ─── */}
        <div style={{ marginTop: '48px', marginBottom: '40px' }}>
          <span 
            className={pillStyle}
            style={{
              display: 'inline-block',
              padding: '6px 14px',
              fontSize: '10px',
              fontWeight: '800',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              borderRadius: '999px',
              border: '1px solid rgba(228, 228, 231, 0.8)'
            }}
          >
            {project.category}
          </span>
          
          <h1 
            style={{
              fontSize: 'clamp(28px, 5vw, 48px)',
              fontWeight: '900',
              color: '#09090b',
              letterSpacing: '-0.02em',
              lineHeight: '1.25',
              marginTop: '20px',
              marginBottom: '10px'
            }}
          >
            {project.title}
          </h1>
          
          <div 
            style={{
              fontSize: '15px',
              color: '#71717a',
              fontFamily: 'Georgia, serif',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '12px',
              marginTop: '12px'
            }}
          >
            <span style={{ fontWeight: 'bold', color: '#3f3f46' }}>{details.kanjiName}</span>
            <span style={{ fontSize: '12px', fontFamily: 'monospace', color: '#a1a1aa' }}>({details.romajiName})</span>
          </div>
        </div>

        {/* ─── PRIMARY VISUAL HERO FRAME ─── */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: '100%',
            aspectRatio: '16 / 7',
            borderRadius: '24px',
            overflow: 'hidden',
            border: '1px solid #e4e4e7',
            boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
            marginBottom: '64px',
            backgroundColor: '#f4f4f5'
          }}
          className="relative group"
        >
          <img 
            src={imgSrc} 
            alt={project.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 4s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            className="group-hover:scale-102"
            onError={(e) => {
              e.target.src = fallbackImg[project.category] || '/images/category_civil.png';
              e.target.onerror = null;
            }}
          />
        </motion.div>

        {/* ─── TWO-COLUMN CONTENT GRID ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start" style={{ marginBottom: '64px' }}>
          
          {/* Metadata Ledger Card (Left Column) */}
          <div className="lg:col-span-4 w-full">
            <div 
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e4e4e7',
                borderRadius: '24px',
                padding: '32px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
              }}
            >
              <h3 
                style={{
                  fontSize: '11px',
                  fontWeight: '800',
                  textTransform: 'uppercase',
                  letterSpacing: '0.2em',
                  color: '#09090b',
                  marginBottom: '28px',
                  paddingBottom: '16px',
                  borderBottom: '1px solid #f4f4f5',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Award size={15} style={{ color: '#71717a' }} />
                <span>Project Facts</span>
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {[
                  { label: 'Client / Sponsor', value: client },
                  { label: 'Completion Date', value: project.completion },
                  { label: 'Budget Allocation', value: budget },
                  { label: 'Contract Type', value: project.designType },
                  { label: 'Site Location', value: project.location }
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <span style={{ fontSize: '9px', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#a1a1aa', fontWeight: 'bold' }}>
                      {item.label}
                    </span>
                    <span style={{ fontSize: '14px', color: '#18181b', fontWeight: '800', lineHeight: '1.4' }}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Detailed Editorial Narrative (Right Column) ─── */}
          <div className="lg:col-span-8 flex flex-col justify-start">
            <span style={{ fontSize: '10px', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#a1a1aa', display: 'block', marginBottom: '24px', fontWeight: 'bold' }}>
              Project Narrative
            </span>
            
            {/* Scrollable Track Container */}
            <div 
              ref={scrollContainerRef}
              style={{ 
                position: 'relative', 
                height: `${allCards.length * 60}vh`, 
                width: '100%' 
              }}
            >
              {/* Pinned Sticky Space */}
              <div 
                style={{ 
                  position: 'sticky', 
                  top: '120px', 
                  width: '100%', 
                  minHeight: '360px', 
                  perspective: '2000px', 
                  transformStyle: 'preserve-3d' 
                }}
              >
                {allCards.map((p, i) => {
                  const isActive = i === activePara;
                  const isPast = i < activePara;
                  const isSummary = hasSummaryCard && i === allCards.length - 1;

                  // Dynamic 3D transform metrics
                  let rotateX = 0;
                  let opacity = 0;
                  let scale = 1;
                  let y = 0;
                  let zIndex = 1;

                  if (isActive) {
                    rotateX = 0;
                    opacity = 1;
                    scale = 1;
                    y = 0;
                    zIndex = 10;
                  } else if (isPast) {
                    rotateX = -90; // Flip completely flat upwards
                    opacity = 0;
                    scale = 0.95;
                    y = -60;
                    zIndex = 1;
                  } else {
                    rotateX = 90; // Folded flat downwards
                    opacity = 0;
                    scale = 0.95;
                    y = 60;
                    zIndex = 1;
                  }

                  return (
                    <motion.div
                      key={i}
                      animate={{ 
                        rotateX, 
                        opacity, 
                        scale, 
                        y,
                        zIndex
                      }}
                      transition={{ 
                        duration: 0.65, 
                        ease: [0.16, 1, 0.3, 1] 
                      }}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        transformOrigin: isPast ? 'top center' : 'bottom center',
                        backgroundColor: isSummary ? '#f8fafc' : '#ffffff',
                        border: isSummary ? '1px dashed #cbd5e1' : '1px solid #e4e4e7',
                        borderRadius: '24px',
                        padding: '48px 56px',
                        boxShadow: '0 20px 40px rgba(9, 9, 11, 0.03), 0 1px 3px rgba(9, 9, 11, 0.01)',
                        transformStyle: 'preserve-3d',
                        backfaceVisibility: 'hidden',
                        minHeight: '280px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                      }}
                      className="hover:shadow-lg transition-shadow duration-300"
                    >
                      {/* Spiral binder rings overlay (only for standard narrative cards) */}
                      {!isSummary && (
                        <div style={{ position: 'absolute', top: '-1px', left: '10%', right: '10%', height: '3px', display: 'flex', justifyContent: 'space-between', zIndex: 20 }}>
                          {[...Array(6)].map((_, rIdx) => (
                            <div 
                              key={rIdx} 
                              style={{
                                width: '12px',
                                height: '24px',
                                backgroundColor: '#e4e4e7',
                                border: '1px solid #cbd5e1',
                                borderRadius: '4px',
                                marginTop: '-12px',
                                boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)'
                              }}
                            />
                          ))}
                        </div>
                      )}

                      {isSummary && (
                        <span style={{ fontSize: '9px', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#64748b', fontWeight: 'bold', display: 'block', marginBottom: '14px', borderBottom: '1px dashed #cbd5e1', paddingBottom: '8px' }}>
                          Executive Summary
                        </span>
                      )}

                      <p 
                        style={{
                          fontSize: '16px',
                          color: isSummary ? '#64748b' : '#3f3f46',
                          lineHeight: '2.0',
                          fontWeight: '300',
                          textAlign: 'justify',
                          margin: 0
                        }}
                      >
                        {p}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>

        {/* ─── CHALLENGES & APPLIED SOLUTIONS ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" style={{ marginBottom: '64px' }}>
          
          {/* Engineering Challenges Card */}
          <div 
            style={{
              backgroundColor: '#ffffff',
              borderLeft: '4px solid #f59e0b',
              borderTop: '1px solid #e4e4e7',
              borderRight: '1px solid #e4e4e7',
              borderBottom: '1px solid #e4e4e7',
              borderRadius: '0 24px 24px 0',
              padding: '36px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
              <ShieldAlert size={16} style={{ color: '#d97706' }} />
              <h4 style={{ fontSize: '11px', fontWeight: '950', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#b45309' }}>
                Engineering Challenges
              </h4>
            </div>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {details.challenges.map((c, i) => (
                <li key={i} style={{ fontSize: '14px', color: '#4b5563', lineHeight: '1.7', display: 'flex', alignItems: 'start', gap: '12px' }}>
                  <span style={{ color: '#f59e0b', fontWeight: 'bold', fontSize: '14px', selectNone: 'true', marginTop: '1px' }}>•</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Engineering Solutions Card */}
          <div 
            style={{
              backgroundColor: '#ffffff',
              borderLeft: '4px solid #10b981',
              borderTop: '1px solid #e4e4e7',
              borderRight: '1px solid #e4e4e7',
              borderBottom: '1px solid #e4e4e7',
              borderRadius: '0 24px 24px 0',
              padding: '36px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
              <CheckCircle size={16} style={{ color: '#059669' }} />
              <h4 style={{ fontSize: '11px', fontWeight: '950', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#047857' }}>
                Applied Solutions
              </h4>
            </div>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {details.solutions.map((s, i) => (
                <li key={i} style={{ fontSize: '14px', color: '#4b5563', lineHeight: '1.7', display: 'flex', alignItems: 'start', gap: '12px' }}>
                  <span style={{ color: '#10b981', fontWeight: 'bold', fontSize: '14px', selectNone: 'true', marginTop: '1px' }}>•</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* ─── GEOGRAPHY & JAPAN MAP INTERACTION ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center" style={{ marginBottom: '80px' }}>
          
          {/* Geographic Narrative */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div>
              <span style={{ fontSize: '10px', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.25em', color: '#a1a1aa', display: 'block', marginBottom: '8px' }}>
                Geographic Context
              </span>
              <h3 style={{ fontSize: '24px', fontWeight: '900', color: '#09090b' }}>
                Regional Development
              </h3>
            </div>
            <p style={{ fontSize: '15px', color: '#4b5563', lineHeight: '1.85', fontWeight: '300' }}>
              {details.locationStory}
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', borderTop: '1px solid rgba(228, 228, 231, 0.8)', paddingTop: '24px', marginTop: '8px' }}>
              <div>
                <span style={{ fontSize: '9px', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#a1a1aa', display: 'block' }}>
                  Site Coordinates
                </span>
                <span style={{ fontSize: '14px', fontWeight: '800', color: '#27272a', display: 'block', marginTop: '6px' }}>
                  {details.coordinates}
                </span>
              </div>
              {details.tokyoDistance !== 'N/A' && (
                <div>
                  <span style={{ fontSize: '9px', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#a1a1aa', display: 'block' }}>
                    Tokyo Distance
                  </span>
                  <span style={{ fontSize: '14px', fontWeight: '800', color: '#27272a', display: 'block', marginTop: '6px' }}>
                    {details.tokyoDistance}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Interactive Mini Japan Map frame */}
          <div className="lg:col-span-6 flex justify-center">
            <div 
              style={{
                aspectRatio: '1 / 1',
                height: '320px',
                width: '100%',
                maxWidth: '320px',
                borderRadius: '24px',
                border: '1px solid #e4e4e7',
                overflow: 'hidden',
                backgroundColor: '#ffffff',
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                position: 'relative'
              }}
            >
              <MiniJapanMap location={project.location} />
            </div>
          </div>

        </div>

        {/* ─── TECHNICAL SPECIFICATIONS TABLE ─── */}
        <div style={{ marginBottom: '80px' }}>
          <div style={{ marginBottom: '24px' }}>
            <span style={{ fontSize: '10px', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.25em', color: '#a1a1aa', display: 'block', marginBottom: '8px' }}>
              Detailed Reference
            </span>
            <h3 style={{ fontSize: '24px', fontWeight: '900', color: '#09090b', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Cpu size={18} style={{ color: '#71717a' }} />
              <span>Engineering Specifications</span>
            </h3>
          </div>

          <div 
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e4e4e7',
              borderRadius: '24px',
              padding: '40px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-2">
              {Object.entries(details.specs).map(([key, val], idx) => (
                <div 
                  key={idx} 
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '24px',
                    paddingTop: '18px',
                    paddingBottom: '18px',
                    borderBottom: '1px solid #f4f4f5'
                  }}
                >
                  <span style={{ fontSize: '13px', color: '#71717a', fontWeight: '600' }}>{key}</span>
                  <span style={{ fontSize: '13px', color: '#18181b', fontWeight: '800', textAlign: 'right', lineHeight: '1.4' }}>{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── DIRECT NEXT PROJECT TRANSITION BUTTON ─── */}
        <div style={{ marginTop: '96px', paddingTop: '32px', borderTop: '1px solid rgba(228, 228, 231, 0.8)' }}>
          <span style={{ fontSize: '10px', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#a1a1aa', display: 'block', marginBottom: '16px', textAlign: 'center' }}>
            Browse Next Work
          </span>
          <Link
            to={`/works/${nextProject.id}`}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#09090b',
              color: '#ffffff',
              borderRadius: '24px',
              padding: '40px',
              transition: 'all 0.3s ease',
              textDecoration: 'none',
              boxShadow: '0 8px 30px rgba(0,0,0,0.1)'
            }}
            className="group hover:scale-[1.01]"
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxWidth: '80%' }}>
              <span style={{ fontSize: '8px', fontFamily: 'monospace', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
                NEXT DOSSIER
              </span>
              <span style={{ fontSize: '18px', fontWeight: '800', transition: 'color 0.2s' }} className="group-hover:text-white truncate">
                {nextProject.title}
              </span>
            </div>
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: '#27272a',
                border: '1px solid #3f3f46',
                transition: 'all 0.3s'
              }}
              className="group-hover:bg-zinc-800 flex-shrink-0"
            >
              <ArrowRight size={16} />
            </div>
          </Link>
        </div>

      </div>

    </div>
  );
}
