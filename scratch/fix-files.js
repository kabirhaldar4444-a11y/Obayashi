const fs = require('fs');
const path = require('path');

const miniMapContent = `import React from 'react';
import { motion } from 'framer-motion';

// Pixel-perfect coordinate mapping relative to the cropped 145% width map image of Japan
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

// Coordinate mapping relative to the generated India map
const indiaCoordinates = {
  "mumbai": { x: 31.5, y: 61.5 },
  "ahmedabad": { x: 29.5, y: 48.0 },
  "mumbai-ahmedabad": { x: 30.5, y: 55.0 },
  "maharashtra": { x: 36.0, y: 63.0 },
  "gujarat": { x: 28.0, y: 49.0 },
};

export default function MiniJapanMap({ location = "Tokyo", locationCategory }) {
  const isIndia = 
    locationCategory?.toLowerCase() === 'india' ||
    location.toLowerCase().includes('india') ||
    location.toLowerCase().includes('mumbai') ||
    location.toLowerCase().includes('ahmedabad') ||
    location.toLowerCase().includes('gujarat') ||
    location.toLowerCase().includes('maharashtra');

  const getCoordinates = (locString) => {
    const clean = locString.toLowerCase();
    
    if (isIndia) {
      for (const city of Object.keys(indiaCoordinates)) {
        if (clean.includes(city) || (city === "mumbai-ahmedabad" && (clean.includes("mumbai\\u2013ahmedabad") || clean.includes("mumbai-ahmedabad")))) {
          return indiaCoordinates[city];
        }
      }
      return indiaCoordinates["mumbai-ahmedabad"]; // Fallback for India
    }

    for (const city of Object.keys(cityCoordinates)) {
      if (clean.includes(city)) {
        return cityCoordinates[city];
      }
    }
    return cityCoordinates["tokyo"]; // Default fallback for Japan
  };

  const coords = getCoordinates(location);

  return (
    // Outer container - white bg like Japan flag, or deep dark blue/black for India cyberpunk map
    <div 
      className={\`relative w-full h-full rounded-xl overflow-hidden shadow-inner flex items-center justify-center border \${
        isIndia ? 'bg-[#0b0f19] border-emerald-950/40' : 'bg-white border-red-100'
      }\`}
    >
      
      {/* Aspect Ratio Wrapper 1:1 */}
      <div 
        style={{
          position: 'relative',
          height: '100%',
          maxHeight: '100%',
          maxWidth: '100%',
          width: 'auto',
          aspectRatio: '1 / 1',
          overflow: 'hidden',
        }}
      >
        {/* 1. Map image */}
        <img 
          src={isIndia ? "/images/india_3d_map.png" : "/images/japan_3d_map.png"} 
          alt={isIndia ? "3D Map of India" : "3D Map of Japan"} 
          className="absolute inset-y-0 left-0 h-full w-full object-fill select-none pointer-events-none"
          style={isIndia ? { opacity: 0.85 } : { filter: 'grayscale(1) invert(0.92) brightness(1.04) contrast(1.06)' }}
        />

        {/* Hide pre-printed sidebar card on the right - ONLY for Japan map */}
        {!isIndia && (
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            width: '35%',
            background: '#ffffff',
            zIndex: 3,
            pointerEvents: 'none',
          }} />
        )}

        {/* Hide pre-printed title at the top - ONLY for Japan map */}
        {!isIndia && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '20%',
            background: 'linear-gradient(180deg, #ffffff 0%, #ffffff 50%, rgba(255,255,255,0) 100%)',
            zIndex: 3,
            pointerEvents: 'none',
          }} />
        )}

        {/* 2. Color wash overlay - multiply blend tints map lines */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{ 
            backgroundColor: isIndia ? 'rgba(16, 185, 129, 0.08)' : 'rgba(190, 20, 20, 0.22)', 
            mixBlendMode: 'multiply', 
            zIndex: 4 
          }}
        />

        {/* 3. Subtle grid */}
        <div 
          className="absolute inset-0 opacity-[0.04] bg-[size:20px_20px] pointer-events-none"
          style={{ 
            zIndex: 5,
            backgroundImage: isIndia 
              ? 'linear-gradient(to right, #10b981 1px, transparent 1px), linear-gradient(to bottom, #10b981 1px, transparent 1px)' 
              : 'linear-gradient(to right, #7f1d1d 1px, transparent 1px), linear-gradient(to bottom, #7f1d1d 1px, transparent 1px)'
          }}
        />

        {/* 4. Interactive Marker Layer */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 9 }}>
          
          {/* Ripple ring */}
          <motion.div 
            style={{ left: \`\${coords.x}%\`, top: \`\${coords.y}%\` }}
            animate={{
              scale: [1, 2.8, 1],
              opacity: [0.6, 0, 0.6]
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className={\`absolute w-8 h-8 -ml-4 -mt-4 border-2 rounded-full \${
              isIndia ? 'border-emerald-400' : 'border-red-600'
            }\`}
          />

          {/* Inner pulsing core */}
          <motion.div 
            style={{ left: \`\${coords.x}%\`, top: \`\${coords.y}%\` }}
            animate={{
              scale: [1, 1.35, 1],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className={\`absolute w-3 h-3 -ml-1.5 -mt-1.5 rounded-full \${
              isIndia 
                ? 'bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.7)]' 
                : 'bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.7)]'
            }\`}
          />

          {/* Floating city indicator */}
          <div 
            style={{ left: \`\${coords.x}%\`, top: \`\${coords.y - 4}%\` }}
            className={\`absolute -translate-x-1/2 -translate-y-full text-white font-mono text-[9px] font-extrabold px-2 py-0.5 rounded shadow-md uppercase tracking-wider \${
              isIndia ? 'bg-emerald-600' : 'bg-red-600'
            }\`}
          >
            {location.split(',')[0]}
          </div>

        </div>
      </div>
    </div>
  );
}
\`;

const mapPopupContent = \`import React, { useEffect, useState } from 'react';
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
  "mumbai": { x: 31.5, y: 61.5 },
  "ahmedabad": { x: 29.5, y: 48.0 },
  "mumbai-ahmedabad": { x: 30.5, y: 55.0 },
  "maharashtra": { x: 36.0, y: 63.0 },
  "gujarat": { x: 28.0, y: 49.0 },
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
    .replace(/\\s+/g, '-').replace(/[^\\w-]+/g, '')
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
    project.locationCategory?.toLowerCase() === 'india' ||
    project.location?.toLowerCase().includes('india') ||
    project.location?.toLowerCase().includes('mumbai') ||
    project.location?.toLowerCase().includes('ahmedabad') ||
    project.location?.toLowerCase().includes('gujarat') ||
    project.location?.toLowerCase().includes('maharashtra');

  const getCoords = (locStr) => {
    const clean = (locStr || '').toLowerCase();
    if (isIndia) {
      for (const [city, coord] of Object.entries(indiaCoordinates)) {
        if (clean.includes(city) || (city === "mumbai-ahmedabad" && (clean.includes("mumbai\\u2013ahmedabad") || clean.includes("mumbai-ahmedabad")))) return coord;
      }
      return indiaCoordinates["mumbai-ahmedabad"];
    }
    for (const [city, coord] of Object.entries(cityCoordinates)) {
      if (clean.includes(city)) return coord;
    }
    return cityCoordinates.tokyo;
  };

  const coords = getCoords(project.location);
  const projectSlug = slugify(project.title);
  const catColor = CATEGORY_COLORS[project.category] || '#374151';

  const handleExplore = () => {
    onClose();
    navigate(\`/projects/\${projectSlug}\`);
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


            {/* --- Animated location pin --- */}
            {imgLoaded && (
              <div
                style={{
                  position: 'absolute',
                  left: \`\s{coords.x}%\`,
                  top: \`\s{coords.y}%\`,
                  transform: 'translate(-50%, -50%)',
                  zIndex: 9,
                  pointerEvents: 'none',
                }}
              >
                {/* Ripple rings */}
                <motion.div
                  animate={{ scale: [1, 3.5, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    position: 'absolute',
                    width: '36px', height: '36px',
                    top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)',
                    border: isIndia ? '2px solid rgba(16,185,129,0.8)' : '2px solid rgba(239,68,68,0.8)',
                    borderRadius: '50%',
                  }}
                />
                <motion.div
                  animate={{ scale: [1, 2.2, 1], opacity: [0.45, 0, 0.45] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  style={{
                    position: 'absolute',
                    width: '36px', height: '36px',
                    top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)',
                    border: isIndia ? '1.5px solid rgba(16,185,129,0.5)' : '1.5px solid rgba(239,68,68,0.5)',
                    borderRadius: '50%',
                  }}
                />
                {/* Core dot */}
                <motion.div
                  animate={{ scale: [1, 1.25, 1] }}
                  transition={{ duration: 2.0, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    width: '14px', height: '14px',
                    borderRadius: '50%',
                    background: isIndia 
                      ? 'radial-gradient(circle at 35% 35%, #34d399, #059669)'
                      : 'radial-gradient(circle at 35% 35%, #ff4d4d, #dc2626)',
                    border: '2.5px solid #ffffff',
                    boxShadow: isIndia
                      ? '0 0 0 2px rgba(16,185,129,0.3), 0 2px 12px rgba(16,185,129,0.6)'
                      : '0 0 0 2px rgba(239,68,68,0.3), 0 2px 12px rgba(239,68,68,0.6)',
                  }}
                />
              </div>
            )}
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
              src={\`/images/\\\${project.id}.jpg\`}
              alt={project.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => {
                const fallbacks = {
                  "Offices":    "/images/category_offices.png",
                  "Civil Infra":"/images/category_civil.png",
                  "Energy":     "/images/category_energy.png",
                  "Education":  "/images/category_education.png",
                  "Recreation": "/images/category_recreation.png",
                };
                e.target.src = fallbacks[project.category] || "/images/category_civil.png";
                e.target.onerror = null;
              }}
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
\`;

fs.writeFileSync(path.join(__dirname, '../src/components/MiniJapanMap.jsx'), miniMapContent, 'utf8');
fs.writeFileSync(path.join(__dirname, '../src/components/ProjectMapPopup.jsx'), mapPopupContent, 'utf8');
console.log('Successfully wrote MiniJapanMap.jsx and ProjectMapPopup.jsx');
