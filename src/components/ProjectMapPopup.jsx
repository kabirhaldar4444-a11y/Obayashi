import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, MapPin, Calendar, Building2, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/* ==================================================================
   City pin coordinates - calibrated pixel-for-pixel from the 1024x1024
   original image when displayed in object-fit: cover inside the
   533px (58% width) x 560px container.
================================================================== */
const cityCoordinates = {
  "tokyo":     { x: 55.8, y: 49.0 },
  "kanagawa":  { x: 55.6, y: 50.5 },
  "yokohama":  { x: 55.6, y: 50.5 },
  "osaka":     { x: 37.2, y: 60.0 },
  "kobe":      { x: 34.4, y: 57.1 },
  "hyogo":     { x: 34.4, y: 57.1 },
  "kyoto":     { x: 35.2, y: 57.0 },
  "nagoya":    { x: 43.2, y: 58.0 },
  "aichi":     { x: 43.2, y: 58.0 },
  "sapporo":   { x: 52.5, y: 20.5 },
  "hokkaido":  { x: 52.5, y: 20.5 },
  "sendai":    { x: 58.5, y: 35.5 },
  "miyagi":    { x: 58.5, y: 35.5 },
  "fukuoka":   { x: 12.2, y: 70.5 },
  "hiroshima": { x: 23.1, y: 63.5 },
  "shizuoka":  { x: 51.2, y: 55.0 },
};

const indiaCoordinates = {
  "mumbai-ahmedabad": { x: 24.0, y: 47.0 },
  "mumbai":           { x: 23.5, y: 51.0 },
  "ahmedabad":        { x: 25.5, y: 42.0 },
  "dholera":          { x: 24.5, y: 43.5 },
  "vadodara":         { x: 26.0, y: 44.0 },
  "gujarat":          { x: 24.5, y: 42.5 },
  "maharashtra":      { x: 33.0, y: 51.5 },
  "bengaluru":        { x: 35.0, y: 65.0 },
  "karnataka":        { x: 35.0, y: 64.0 },
  "chennai":          { x: 41.0, y: 75.0 },
  "tamil nadu":       { x: 40.0, y: 75.5 },
  "andhra pradesh":   { x: 44.0, y: 67.0 },
  "telangana":        { x: 43.0, y: 59.5 },
  "delhi":            { x: 42.5, y: 31.5 },
  "haryana":          { x: 46.0, y: 31.0 },
  "rajasthan":        { x: 38.0, y: 35.0 },
  "uttar pradesh":    { x: 55.0, y: 39.0 },
  "bihar":            { x: 65.0, y: 43.5 },
  "west bengal":      { x: 68.0, y: 51.0 },
  "purulia":          { x: 65.0, y: 47.0 },
  "haldia":           { x: 67.5, y: 50.0 },
  "assam":            { x: 82.0, y: 45.5 },
  "meghalaya":        { x: 81.0, y: 42.5 },
  "mizoram":          { x: 88.0, y: 56.5 },
  "northeast":        { x: 84.0, y: 45.0 },
};

const ALL_STATE_BOUNDARIES = {
  "ladakh":            { name: "Ladakh", x: 55.0, y: 21.0 },
  "jammu":             { name: "Jammu & Kashmir", x: 47.0, y: 21.0 },
  "himachal":          { name: "Himachal Pradesh", x: 50.0, y: 25.0 },
  "punjab":            { name: "Punjab", x: 45.0, y: 27.5 },
  "haryana":           { name: "Haryana", x: 46.0, y: 31.0 },
  "delhi":             { name: "Delhi", x: 42.5, y: 31.5 },
  "uttarakhand":       { name: "Uttarakhand", x: 54.0, y: 30.5 },
  "rajasthan":         { name: "Rajasthan", x: 38.0, y: 35.0 },
  "uttar pradesh":     { name: "Uttar Pradesh", x: 55.0, y: 39.0 },
  "gujarat":           { name: "Gujarat", x: 24.5, y: 42.5 },
  "madhya pradesh":    { name: "Madhya Pradesh", x: 45.0, y: 46.0 },
  "maharashtra":       { name: "Maharashtra", x: 33.0, y: 51.5 },
  "chhattisgarh":      { name: "Chhattisgarh", x: 50.0, y: 52.0 },
  "jharkhand":         { name: "Jharkhand", x: 63.0, y: 47.5 },
  "bihar":             { name: "Bihar", x: 65.0, y: 43.5 },
  "west bengal":       { name: "West Bengal", x: 68.0, y: 51.0 },
  "odisha":            { name: "Odisha", x: 58.0, y: 55.0 },
  "goa":               { name: "Goa", x: 22.5, y: 61.0 },
  "karnataka":         { name: "Karnataka", x: 35.0, y: 64.0 },
  "telangana":          { name: "Telangana", x: 43.0, y: 59.5 },
  "andhra pradesh":    { name: "Andhra Pradesh", x: 44.0, y: 67.0 },
  "kerala":            { name: "Kerala", x: 28.5, y: 73.5 },
  "tamil nadu":        { name: "Tamil Nadu", x: 40.0, y: 75.5 },
  "puducherry":        { name: "Puducherry", x: 44.0, y: 73.0 },
  "sikkim":            { name: "Sikkim", x: 73.0, y: 40.5 },
  "assam":             { name: "Assam", x: 82.0, y: 45.5 },
  "meghalaya":         { name: "Meghalaya", x: 81.0, y: 42.5 },
  "tripura":           { name: "Tripura", x: 77.0, y: 59.0 },
  "mizoram":           { name: "Mizoram", x: 88.0, y: 56.5 },
  "manipur":           { name: "Manipur", x: 91.0, y: 53.0 },
  "nagaland":          { name: "Nagaland", x: 93.0, y: 49.5 },
  "arunachal pradesh": { name: "Arunachal Pradesh", x: 89.0, y: 39.5 },
  "dadra":             { name: "Dadra & Nagar Haveli", x: 24.0, y: 48.0 },
  "purulia":           { name: "West Bengal (Purulia)", x: 65.0, y: 47.0 },
  "haldia":            { name: "West Bengal (Haldia)", x: 67.5, y: 50.0 },
  "chennai":           { name: "Tamil Nadu (Chennai)", x: 41.0, y: 75.0 },
  "bengaluru":         { name: "Karnataka (Bengaluru)", x: 35.0, y: 65.0 },
};

/* Category colour tokens */
const CATEGORY_COLORS = {
  "Offices":    "#0B3D6B",
  "Civil Infra": "#146b3a",
  "Energy":     "#b45309",
  "Education":  "#6d28d9",
  "Recreation": "#dc2626",
};

const slugify = (text) =>
  text.toString().toLowerCase()
    .replace(/\s+/g, '-').replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-').replace(/^-+/, '').replace(/-+$/, '');

export default function ProjectMapPopup({ project, onClose }) {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 40);
    return () => clearTimeout(t);
  }, []);

  if (!project) return null;

  const isIndia = 
    (project.locationCategory && project.locationCategory.toLowerCase() === 'india') ||
    (project.location && project.location.toLowerCase().includes('india')) ||
    (project.location && project.location.toLowerCase().includes('mumbai')) ||
    (project.location && project.location.toLowerCase().includes('ahmedabad')) ||
    (project.location && project.location.toLowerCase().includes('gujarat')) ||
    (project.location && project.location.toLowerCase().includes('maharashtra'));

  const getCoords = (locStr) => {
    const clean = (locStr || '').toLowerCase();
    if (isIndia) {
      for (const [city, coord] of Object.entries(indiaCoordinates)) {
        if (clean.includes(city)) return coord;
      }
      return indiaCoordinates["maharashtra"];
    }
    for (const [city, coord] of Object.entries(cityCoordinates)) {
      if (clean.includes(city)) return coord;
    }
    return cityCoordinates.tokyo;
  };

  const coords = getCoords(project.location);

  // Parse all included states for India projects with 100% exact geographical positioning
  const getIncludedStates = (locStr) => {
    const clean = (locStr || '').toLowerCase();
    const matched = [];
    const addedKeys = new Set();

    const addMatch = (key) => {
      if (ALL_STATE_BOUNDARIES[key] && !addedKeys.has(key)) {
        addedKeys.add(key);
        matched.push(ALL_STATE_BOUNDARIES[key]);
      }
    };

    // 1. Multi-state Corridor Projects
    if (clean.includes('freight corridor')) {
      ['uttar pradesh', 'haryana', 'rajasthan', 'gujarat', 'maharashtra'].forEach(addMatch);
    } else if (clean.includes('mumbai') && clean.includes('ahmedabad')) {
      ['maharashtra', 'gujarat', 'dadra'].forEach(addMatch);
    } else if (clean.includes('delhi') && clean.includes('mumbai') && clean.includes('industrial corridor')) {
      ['delhi', 'haryana', 'rajasthan', 'madhya pradesh', 'gujarat', 'maharashtra'].forEach(addMatch);
    } else if (clean.includes('chennai') && clean.includes('bengaluru')) {
      ['tamil nadu', 'andhra pradesh', 'karnataka'].forEach(addMatch);
    } else if (clean.includes('yamuna action plan') && !clean.includes('phase iii')) {
      ['delhi', 'uttar pradesh', 'haryana'].forEach(addMatch);
    } else if (clean.includes('northeast india') || clean.includes('north east road')) {
      ['mizoram', 'meghalaya', 'assam'].forEach(addMatch);
    } else {
      // 2. Exact City-Specific Placement
      if (clean.includes('mumbai')) addMatch('mumbai');
      else if (clean.includes('bengaluru')) addMatch('bengaluru');
      else if (clean.includes('chennai')) addMatch('chennai');
      else if (clean.includes('vadodara')) addMatch('vadodara');
      else if (clean.includes('dholera')) addMatch('dholera');
      else if (clean.includes('purulia')) addMatch('purulia');
      else if (clean.includes('haldia')) addMatch('haldia');
      else if (clean.includes('burnpur')) addMatch('burnpur');
      else if (clean.includes('birbhum')) addMatch('birbhum');

      // 3. State-Level Matching if no specific city matched
      if (matched.length === 0) {
        for (const [key, stateObj] of Object.entries(ALL_STATE_BOUNDARIES)) {
          if (clean.includes(key)) addMatch(key);
        }
      }
    }

    if (matched.length === 0 && isIndia) {
      matched.push({ name: (locStr || 'Project Location').split(',')[0], x: coords.x, y: coords.y });
    }
    return matched;
  };

  const includedStates = isIndia ? getIncludedStates(project.location) : [];
  const projectSlug = slugify(project.title);
  const catColor = CATEGORY_COLORS[project.category] || '#374151';

  const handleExplore = () => {
    onClose();
    navigate('/projects/' + projectSlug);
  };

  return createPortal(
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 4000,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px',
        background: 'rgba(8,12,24,0.70)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        opacity: ready ? 1 : 0,
        transition: 'opacity 0.25s ease',
      }}
      onClick={onClose}
    >
      {/* --- Modal shell --- */}
      <motion.div
        initial={{ scale: 0.93, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.93, opacity: 0, y: 24 }}
        transition={{ type: 'spring', stiffness: 240, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '920px',
          height: 'min(76vh, 560px)',
          borderRadius: '20px',
          overflow: 'hidden',
          display: 'flex',
          boxShadow: '0 40px 120px rgba(0,0,0,0.60), 0 0 0 1px rgba(255,255,255,0.08)',
          background: '#ffffff',
        }}
      >
        {/* ====================================
            LEFT PANEL - Full Japan or India Map
            ==================================== */}
        <div
          style={{
            position: 'relative',
            width: '58%',
            flexShrink: 0,
            background: '#0b0f19',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {/* Subtle grid texture */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: 0,
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }} />

          {/* Map Wrapper with fixed 1:1 aspect ratio */}
          <div
            style={{
              position: 'relative',
              height: '100%',
              maxHeight: '100%',
              maxWidth: '100%',
              width: 'auto',
              aspectRatio: '1 / 1',
              margin: 'auto',
              overflow: 'hidden',
            }}
          >
            {/* --- Map image --- */}
            <img
              src={isIndia ? "/images/india_3d_map.png" : "/images/japan_3d_map.png"}
              alt={isIndia ? "India Map" : "Japan Map"}
              onLoad={() => setImgLoaded(true)}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'fill',
                pointerEvents: 'none',
                userSelect: 'none',
                filter: isIndia ? 'none' : 'sepia(0.05) contrast(1.05) brightness(0.95)',
                opacity: imgLoaded ? 1 : 0,
                transition: 'opacity 0.4s ease',
                zIndex: 1,
              }}
            />

            {/* Dark overlay covering the pre-printed sidebar card on the right 35% - ONLY for Japan map */}
            {!isIndia && (
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                width: '35%',
                background: '#0b0f19',
                zIndex: 3,
                pointerEvents: 'none',
              }} />
            )}

            {/* Dark gradient to cover the pre-printed title at the top - ONLY for Japan map */}
            {!isIndia && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '22%',
                background: 'linear-gradient(180deg, #0b0f19 0%, #0b0f19 50%, rgba(11,15,25,0) 100%)',
                zIndex: 3,
                pointerEvents: 'none',
              }} />
            )}

            {/* Cool tint wash */}
            <div style={{
              position: 'absolute', inset: 0, zIndex: 4,
              backgroundColor: isIndia ? 'rgba(16, 185, 129, 0.04)' : 'rgba(8,12,24,0.12)',
              mixBlendMode: 'multiply',
              pointerEvents: 'none',
            }} />

            {/* --- Compact Sleek Red Map Pins for Included Locations --- */}
            {imgLoaded && includedStates.map((st, idx) => (
              <motion.div
                key={'dancing-gmap-pin-' + st.name + idx}
                initial={{ y: 0 }}
                animate={{
                  y: [0, -6, 0, -3, 0],
                  scale: [1, 1.08, 1, 1.04, 1],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: idx * 0.15,
                }}
                style={{
                  position: 'absolute',
                  left: `${st.x}%`,
                  top: `${st.y}%`,
                  transform: 'translate(-50%, -100%)',
                  zIndex: 10,
                  pointerEvents: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                {/* Compact 12px x 16px Sleek Red Google Map Teardrop Pin */}
                <svg width="13" height="17" viewBox="0 0 16 22" fill="none" style={{ filter: 'drop-shadow(0 0 6px rgba(239,68,68,0.9))' }}>
                  <path
                    d="M8 0C3.58 0 0 3.58 0 8C0 14 8 22 8 22C8 22 16 14 16 8C16 3.58 12.42 0 8 0Z"
                    fill="url(#redGMapPinGrad)"
                    stroke="#ffffff"
                    strokeWidth="1.2"
                  />
                  <circle cx="8" cy="7.5" r="2.8" fill="#ffffff" />
                  <defs>
                    <linearGradient id="redGMapPinGrad" x1="0" y1="0" x2="0" y2="22" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#ff4d4d" />
                      <stop offset="1" stopColor="#dc2626" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Ground Glow Shadow under Compact Pin */}
                <motion.div
                  animate={{ scale: [1, 0.5, 1], opacity: [0.6, 0.2, 0.6] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.15 }}
                  style={{
                    width: '8px',
                    height: '2.5px',
                    borderRadius: '50%',
                    background: 'rgba(239, 68, 68, 0.8)',
                    marginTop: '-1px',
                    boxShadow: '0 0 6px rgba(239, 68, 68, 0.9)',
                  }}
                />
              </motion.div>
            ))}
          </div>

          {/* --- Premium Dark Gradient Header --- */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10,
            padding: '24px 28px',
            pointerEvents: 'none',
          }}>
            <p style={{ fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.14em', color: isIndia ? '#34d399' : '#C17F24', textTransform: 'uppercase', marginBottom: '2px' }}>
              Interactive Project Map
            </p>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              {isIndia ? 'OUR INDIA IMPRINT' : 'OUR NATIONAL IMPRINT'}
            </h2>
          </div>
        </div>

        {/* ====================================
            RIGHT PANEL - Project Info
            ==================================== */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          background: '#ffffff',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: '14px', right: '14px', zIndex: 20,
              width: '28px', height: '28px',
              borderRadius: '50%',
              background: 'rgba(0,0,0,0.06)',
              border: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#666',
              transition: 'background 0.2s ease, color 0.2s ease',
              fontFamily: 'inherit',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.12)'; e.currentTarget.style.color = '#000'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.06)'; e.currentTarget.style.color = '#666'; }}
          >
            <X size={14} />
          </button>

          {/* Project thumbnail */}
          <div style={{ position: 'relative', height: '180px', flexShrink: 0, overflow: 'hidden' }}>
            <img
              src={'/images/' + project.id + '.jpg?v=no_obama_2026'}
              alt={project.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {/* Bottom gradient */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.38) 100%)',
            }} />
            {/* Category pill */}
            <span style={{
              position: 'absolute', top: '12px', left: '12px',
              background: catColor,
              color: '#ffffff',
              fontSize: '0.6rem', fontWeight: 800,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              padding: '3px 10px', borderRadius: '999px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
            }}>
              {project.category}
            </span>
          </div>

          {/* Info body */}
          <div style={{ padding: '20px 22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <h3 style={{
              fontSize: '1rem',
              fontWeight: 800,
              color: '#0d0d0d',
              lineHeight: 1.3,
              marginBottom: '14px',
              letterSpacing: '-0.01em',
            }}>
              {project.title}
            </h3>

            {/* Meta details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
              {project.location && (
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '7px' }}>
                  <MapPin size={12} style={{ color: '#dc2626', flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: '0.8rem', color: '#555', fontWeight: 500, lineHeight: 1.4 }}>
                    {project.location}
                  </span>
                </div>
              )}
              {(project.completion || project.completionYear) && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                  <Calendar size={12} style={{ color: '#dc2626', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.8rem', color: '#555', fontWeight: 500 }}>
                    {project.completion || project.completionYear}
                  </span>
                </div>
              )}
              {project.designType && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                  <Building2 size={12} style={{ color: '#dc2626', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.8rem', color: '#555', fontWeight: 500 }}>
                    {project.designType}
                  </span>
                </div>
              )}
            </div>

            {/* CTA button */}
            <button
              onClick={handleExplore}
              style={{
                marginTop: 'auto',
                width: '100%',
                padding: '12px 16px',
                background: 'linear-gradient(135deg, #0B3D6B, #1a5fa8)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '12px',
                fontSize: '0.8rem',
                fontWeight: 800,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '7px',
                fontFamily: 'inherit',
                transition: 'all 0.25s ease',
                boxShadow: '0 4px 16px rgba(11,61,107,0.28)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(11,61,107,0.36)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(11,61,107,0.28)';
              }}
            >
              <span>Explore Project</span>
              <ArrowUpRight size={13} />
            </button>
          </div>
        </div>
      </motion.div>
    </div>,
    document.body
  );
}