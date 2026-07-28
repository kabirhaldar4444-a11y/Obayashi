import React from 'react';
import { motion } from 'framer-motion';

// Pixel-perfect coordinate mapping relative to the cropped 145% width map image of Japan
const cityCoordinates = {
  "tokyo":     { name: "Tokyo", x: 56.5, y: 49.0 },
  "kanagawa":  { name: "Kanagawa", x: 56.0, y: 50.8 },
  "yokohama":  { name: "Yokohama", x: 56.0, y: 50.8 },
  "osaka":     { name: "Osaka", x: 41.2, y: 59.0 },
  "kobe":      { name: "Kobe", x: 39.5, y: 58.5 },
  "hyogo":     { name: "Hyogo", x: 39.5, y: 58.5 },
  "kyoto":     { name: "Kyoto", x: 42.5, y: 56.2 },
  "nagoya":    { name: "Nagoya", x: 47.5, y: 55.5 },
  "aichi":     { name: "Aichi", x: 47.5, y: 55.5 },
  "sapporo":   { name: "Sapporo", x: 62.5, y: 14.5 },
  "hokkaido":  { name: "Hokkaido", x: 62.5, y: 14.5 },
  "sendai":    { name: "Sendai", x: 60.5, y: 34.5 },
  "miyagi":    { name: "Miyagi", x: 60.5, y: 34.5 },
  "fukuoka":   { name: "Fukuoka", x: 22.0, y: 68.0 },
  "hiroshima": { name: "Hiroshima", x: 31.8, y: 63.2 },
  "shizuoka":  { name: "Shizuoka", x: 51.5, y: 52.5 },
  "chiba":     { name: "Chiba", x: 59.5, y: 49.5 },
  "kawasaki":  { name: "Kawasaki", x: 56.2, y: 50.0 },
  "saitama":   { name: "Saitama", x: 56.0, y: 46.5 },
  "kasukabe":  { name: "Saitama (Kasukabe)", x: 56.0, y: 46.5 },
  "niigata":   { name: "Niigata", x: 53.5, y: 41.5 },
  "akita":     { name: "Akita", x: 57.5, y: 31.0 },
  "aomori":    { name: "Aomori", x: 59.0, y: 24.5 },
  "hakodate":  { name: "Hakodate", x: 57.5, y: 20.5 },
  "ishikari":  { name: "Ishikari", x: 61.5, y: 13.5 },
};

// Coordinate mapping relative to the generated India map
const indiaCoordinates = {
  "mumbai-ahmedabad": { x: 28.5, y: 48.0 },
  "mumbai":           { x: 30.0, y: 54.0 },
  "ahmedabad":        { x: 27.0, y: 43.0 },
  "dholera":          { x: 26.5, y: 45.5 },
  "vadodara":         { x: 29.0, y: 45.0 },
  "gujarat":          { x: 27.0, y: 43.0 },
  "maharashtra":      { x: 35.0, y: 54.0 },
  "bengaluru":        { x: 39.0, y: 69.0 },
  "karnataka":        { x: 37.0, y: 67.0 },
  "chennai":          { x: 46.2, y: 71.0 },
  "tamil nadu":       { x: 43.0, y: 75.0 },
  "andhra pradesh":   { x: 46.0, y: 63.0 },
  "telangana":        { x: 44.0, y: 57.0 },
  "delhi":            { x: 42.0, y: 30.0 },
  "haryana":          { x: 40.0, y: 29.0 },
  "rajasthan":        { x: 34.0, y: 34.0 },
  "uttar pradesh":    { x: 50.0, y: 34.0 },
  "bihar":            { x: 64.0, y: 39.0 },
  "west bengal":      { x: 67.0, y: 47.0 },
  "purulia":          { x: 64.0, y: 46.0 },
  "haldia":           { x: 69.0, y: 52.0 },
  "assam":            { x: 79.0, y: 39.0 },
  "meghalaya":        { x: 78.5, y: 41.5 },
  "mizoram":          { x: 82.0, y: 47.0 },
  "northeast":        { x: 80.0, y: 40.0 },
};

const ALL_STATE_BOUNDARIES = {
  "ladakh":            { name: "Ladakh", x: 45.0, y: 16.0 },
  "jammu":             { name: "Jammu & Kashmir", x: 37.0, y: 18.0 },
  "himachal":          { name: "Himachal Pradesh", x: 42.0, y: 23.0 },
  "punjab":            { name: "Punjab", x: 37.0, y: 25.0 },
  "haryana":           { name: "Haryana", x: 40.0, y: 29.0 },
  "delhi":             { name: "Delhi", x: 42.0, y: 30.0 },
  "uttarakhand":       { name: "Uttarakhand", x: 47.0, y: 26.0 },
  "rajasthan":         { name: "Rajasthan", x: 34.0, y: 34.0 },
  "uttar pradesh":     { name: "Uttar Pradesh", x: 50.0, y: 34.0 },
  "gujarat":           { name: "Gujarat", x: 27.0, y: 43.0 },
  "madhya pradesh":    { name: "Madhya Pradesh", x: 43.0, y: 44.0 },
  "maharashtra":       { name: "Maharashtra", x: 35.0, y: 54.0 },
  "mumbai":            { name: "Mumbai", x: 30.0, y: 54.0 },
  "chhattisgarh":      { name: "Chhattisgarh", x: 52.0, y: 48.0 },
  "jharkhand":         { name: "Jharkhand", x: 63.0, y: 45.0 },
  "bihar":             { name: "Bihar", x: 64.0, y: 39.0 },
  "west bengal":       { name: "West Bengal", x: 67.0, y: 47.0 },
  "odisha":            { name: "Odisha", x: 58.0, y: 52.0 },
  "goa":               { name: "Goa", x: 31.0, y: 66.0 },
  "karnataka":         { name: "Karnataka", x: 37.0, y: 67.0 },
  "telangana":          { name: "Telangana", x: 44.0, y: 57.0 },
  "andhra pradesh":    { name: "Andhra Pradesh", x: 46.0, y: 63.0 },
  "kerala":            { name: "Kerala", x: 36.0, y: 76.0 },
  "tamil nadu":        { name: "Tamil Nadu", x: 43.0, y: 75.0 },
  "puducherry":        { name: "Puducherry", x: 46.5, y: 73.0 },
  "sikkim":            { name: "Sikkim", x: 71.0, y: 36.0 },
  "assam":             { name: "Assam", x: 79.0, y: 39.0 },
  "meghalaya":         { name: "Meghalaya", x: 78.5, y: 41.5 },
  "tripura":           { name: "Tripura", x: 79.0, y: 46.0 },
  "mizoram":           { name: "Mizoram", x: 82.0, y: 47.0 },
  "manipur":           { name: "Manipur", x: 83.5, y: 44.0 },
  "nagaland":          { name: "Nagaland", x: 85.0, y: 41.0 },
  "arunachal pradesh": { name: "Arunachal Pradesh", x: 85.0, y: 32.0 },
  "dadra":             { name: "Dadra & Nagar Haveli", x: 28.0, y: 49.0 },
  "purulia":           { name: "West Bengal (Purulia)", x: 64.0, y: 46.0 },
  "haldia":            { name: "West Bengal (Haldia)", x: 69.0, y: 52.0 },
  "burnpur":           { name: "West Bengal (Burnpur)", x: 64.5, y: 45.0 },
  "birbhum":           { name: "West Bengal (Birbhum)", x: 66.0, y: 44.0 },
  "chennai":           { name: "Tamil Nadu (Chennai)", x: 46.2, y: 71.0 },
  "bengaluru":         { name: "Karnataka (Bengaluru)", x: 39.0, y: 69.0 },
  "vadodara":          { name: "Gujarat (Vadodara)", x: 29.0, y: 45.0 },
  "dholera":           { name: "Gujarat (Dholera)", x: 26.5, y: 45.5 },
};

export default function MiniJapanMap({ location = "Tokyo", locationCategory }) {
  const isIndia = 
    (locationCategory && locationCategory.toLowerCase() === 'india') ||
    location.toLowerCase().includes('india') ||
    location.toLowerCase().includes('mumbai') ||
    location.toLowerCase().includes('ahmedabad') ||
    location.toLowerCase().includes('gujarat') ||
    location.toLowerCase().includes('maharashtra');

  const getCoordinates = (locString) => {
    const clean = locString.toLowerCase();
    
    if (isIndia) {
      for (const city of Object.keys(indiaCoordinates)) {
        if (clean.includes(city)) {
          return indiaCoordinates[city];
        }
      }
      return indiaCoordinates["maharashtra"]; // Fallback for India
    }

    for (const city of Object.keys(cityCoordinates)) {
      if (clean.includes(city)) {
        return cityCoordinates[city];
      }
    }
    return cityCoordinates["tokyo"]; // Default fallback for Japan
  };

  const coords = getCoordinates(location);

  const getJapanLocations = (locStr) => {
    const clean = (locStr || '').toLowerCase();
    const matched = [];
    const addedKeys = new Set();

    const addMatch = (key) => {
      if (cityCoordinates[key] && !addedKeys.has(key)) {
        addedKeys.add(key);
        matched.push(cityCoordinates[key]);
      }
    };

    if (clean.includes('tokyo–nagoya–osaka') || clean.includes('tokyo-nagoya-osaka') || clean.includes('chuo shinkansen')) {
      ['tokyo', 'nagoya', 'osaka'].forEach(addMatch);
    } else if (clean.includes('hokkaido & honshu') || clean.includes('hokkaido–honshu')) {
      ['hokkaido', 'aomori'].forEach(addMatch);
    } else {
      for (const [key] of Object.entries(cityCoordinates)) {
        if (clean.includes(key)) addMatch(key);
      }
    }

    if (matched.length === 0) {
      matched.push({ name: (locStr || 'Tokyo').split(',')[0], x: 55.8, y: 49.0 });
    }
    return matched;
  };

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

  const includedStates = isIndia ? getIncludedStates(location) : getJapanLocations(location);

  return (
    // Outer container - white bg like Japan flag, or deep dark blue/black for India cyberpunk map
    <div 
      className={"relative w-full h-full rounded-xl overflow-hidden shadow-inner flex items-center justify-center border " + 
        (isIndia ? "bg-[#0b0f19] border-emerald-950/40" : "bg-white border-red-100")
      }
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

        {/* --- Compact Sleek Red Map Pins for Included Locations --- */}
        {includedStates.map((st, idx) => (
          <motion.div
            key={'mini-dancing-pin-' + st.name + idx}
            initial={{ y: 0 }}
            animate={{
              y: [0, -5, 0, -2.5, 0],
              scale: [1, 1.08, 1, 1.04, 1],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: idx * 0.15,
            }}
            className="absolute -translate-x-1/2 -translate-y-full flex flex-col items-center pointer-events-none"
            style={{
              left: `${st.x}%`,
              top: `${st.y}%`,
              zIndex: 10,
            }}
          >
            {/* Compact 12px x 16px Red Google Map Teardrop Pin */}
            <svg width="12" height="16" viewBox="0 0 16 22" fill="none" style={{ filter: 'drop-shadow(0 0 5px rgba(239, 68, 68, 0.9))' }}>
              <path
                d="M8 0C3.58 0 0 3.58 0 8C0 14 8 22 8 22C8 22 16 14 16 8C16 3.58 12.42 0 8 0Z"
                fill="url(#miniRedPinGrad)"
                stroke="#ffffff"
                strokeWidth="1.2"
              />
              <circle cx="8" cy="7.5" r="2.8" fill="#ffffff" />
              <defs>
                <linearGradient id="miniRedPinGrad" x1="0" y1="0" x2="0" y2="22" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#ff4d4d" />
                  <stop offset="1" stopColor="#dc2626" />
                </linearGradient>
              </defs>
            </svg>

            {/* Pin Ground Shadow */}
            <motion.div
              animate={{ scale: [1, 0.5, 1], opacity: [0.6, 0.2, 0.6] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.15 }}
              className="w-2 h-0.5 rounded-full bg-red-500/80 -mt-0.5 shadow-[0_0_4px_rgba(239,68,68,0.9)]"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}