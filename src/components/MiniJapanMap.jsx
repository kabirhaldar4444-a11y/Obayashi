import React from 'react';
import { motion } from 'framer-motion';

// Pixel-perfect coordinate mapping relative to the cropped 145% width map image
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

export default function MiniJapanMap({ location = "Tokyo" }) {
  const getCoordinates = (locString) => {
    const clean = locString.toLowerCase();
    for (const city of Object.keys(cityCoordinates)) {
      if (clean.includes(city)) {
        return cityCoordinates[city];
      }
    }
    return cityCoordinates["tokyo"]; // Default fallback
  };

  const coords = getCoordinates(location);

  return (
    // Outer container — white bg like Japan flag
    <div className="relative w-full h-full rounded-xl overflow-hidden border border-red-100 bg-white shadow-inner flex items-center justify-center">
      
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
        {/* 1. Japan map image — grayscale → inverted → crimson tinted via overlay */}
        <img 
          src="/images/japan_3d_map.png" 
          alt="3D Map of Japan" 
          className="absolute inset-y-0 left-0 h-full w-full object-fill select-none pointer-events-none"
          style={{ filter: 'grayscale(1) invert(0.92) brightness(1.04) contrast(1.06)' }}
        />

        {/* Hide pre-printed sidebar card on the right */}
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

        {/* Hide pre-printed title at the top */}
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

        {/* 2. Japan-flag crimson color wash — multiply blend tints dark map lines red */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundColor: 'rgba(190, 20, 20, 0.22)', mixBlendMode: 'multiply', zIndex: 4 }}
        />

        {/* 3. Subtle grid */}
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#7f1d1d_1px,transparent_1px),linear-gradient(to_bottom,#7f1d1d_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" style={{ zIndex: 5 }}></div>

        {/* 4. Interactive Marker Layer */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 9 }}>
          
          {/* Ripple ring — crimson */}
          <motion.div 
            style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
            animate={{
              scale: [1, 2.8, 1],
              opacity: [0.6, 0, 0.6]
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute w-8 h-8 -ml-4 -mt-4 border-2 border-red-600 rounded-full"
          />

          {/* Inner pulsing crimson core */}
          <motion.div 
            style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
            animate={{
              scale: [1, 1.35, 1],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute w-3 h-3 -ml-1.5 -mt-1.5 rounded-full bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.7)]"
          />

          {/* Floating city indicator — Japan red */}
          <div 
            style={{ left: `${coords.x}%`, top: `${coords.y - 4}%` }}
            className="absolute -translate-x-1/2 -translate-y-full bg-red-600 text-white font-mono text-[9px] font-extrabold px-2 py-0.5 rounded shadow-md uppercase tracking-wider"
          >
            {location.split(',')[0]}
          </div>

        </div>
      </div>
    </div>
  );
}
