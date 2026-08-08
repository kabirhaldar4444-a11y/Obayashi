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
  "tokyo":     { name: "Tokyo", x: 43.5, y: 55.5 },
  "kanagawa":  { name: "Kanagawa", x: 42.5, y: 57.5 },
  "yokohama":  { name: "Yokohama", x: 42.5, y: 57.5 },
  "osaka":     { name: "Osaka", x: 31.5, y: 65.5 },
  "kobe":      { name: "Kobe", x: 27.5, y: 64.5 },
  "hyogo":     { name: "Hyogo", x: 27.5, y: 64.5 },
  "kyoto":     { name: "Kyoto", x: 30.0, y: 60.5 },
  "nagoya":    { name: "Nagoya", x: 35.5, y: 62.0 },
  "aichi":     { name: "Aichi", x: 35.5, y: 62.0 },
  "sapporo":   { name: "Sapporo", x: 35.0, y: 28.0 },
  "hokkaido":  { name: "Hokkaido", x: 35.0, y: 28.0 },
  "sendai":    { name: "Sendai", x: 43.0, y: 44.0 },
  "miyagi":    { name: "Miyagi", x: 43.0, y: 44.0 },
  "fukuoka":   { name: "Fukuoka", x: 17.5, y: 71.5 },
  "hiroshima": { name: "Hiroshima", x: 23.5, y: 66.5 },
  "shizuoka":  { name: "Shizuoka", x: 38.5, y: 58.5 },
  "chiba":     { name: "Chiba", x: 46.5, y: 56.5 },
  "kawasaki":  { name: "Kawasaki", x: 43.0, y: 56.5 },
  "saitama":   { name: "Saitama", x: 42.0, y: 53.0 },
  "kasukabe":  { name: "Saitama (Kasukabe)", x: 42.0, y: 53.0 },
  "niigata":   { name: "Niigata", x: 38.5, y: 47.0 },
  "akita":     { name: "Akita", x: 38.0, y: 39.0 },
  "aomori":    { name: "Aomori", x: 39.5, y: 34.5 },
  "hakodate":  { name: "Hakodate", x: 36.5, y: 31.5 },
  "ishikari":  { name: "Ishikari", x: 35.0, y: 28.0 },
};

const indiaCoordinates = {
  "mumbai-ahmedabad": { x: 28.0, y: 48.0 },
  "mumbai":           { x: 29.5, y: 54.0 },
  "pune":             { x: 34.0, y: 55.5 },
  "ahmedabad":        { x: 26.5, y: 43.0 },
  "dholera":          { x: 26.0, y: 45.5 },
  "vadodara":         { x: 28.5, y: 45.0 },
  "rajkot":           { x: 25.0, y: 46.0 },
  "kandla":           { x: 23.5, y: 44.0 },
  "khavda":           { x: 23.0, y: 41.0 },
  "gujarat":          { x: 26.5, y: 43.0 },
  "aurangabad":       { x: 36.0, y: 52.0 },
  "sambhajinagar":    { x: 36.0, y: 52.0 },
  "shendra":          { x: 36.0, y: 52.0 },
  "thane":            { x: 30.5, y: 53.8 },
  "kalyan":           { x: 31.0, y: 54.0 },
  "navi mumbai":      { x: 30.5, y: 54.5 },
  "maharashtra":      { x: 35.0, y: 54.0 },
  "bengaluru":        { x: 38.0, y: 69.0 },
  "karnataka":        { x: 37.0, y: 67.0 },
  "chennai":          { x: 45.0, y: 71.0 },
  "enayam":           { x: 41.5, y: 81.0 },
  "colachel":         { x: 41.5, y: 81.5 },
  "kanyakumari":      { x: 41.5, y: 81.5 },
  "tamil nadu":       { x: 43.0, y: 75.0 },
  "visakhapatnam":    { x: 53.0, y: 56.0 },
  "andhra pradesh":   { x: 44.0, y: 58.0 },
  "hyderabad":        { x: 43.0, y: 57.0 },
  "mucherla":         { x: 43.0, y: 57.5 },
  "telangana":        { x: 43.0, y: 57.0 },
  "paradip":          { x: 61.0, y: 50.5 },
  "bhubaneswar":      { x: 59.0, y: 51.5 },
  "odisha":           { x: 58.0, y: 52.0 },
  "rishikesh":        { x: 46.5, y: 26.5 },
  "karanprayag":      { x: 47.5, y: 26.0 },
  "chardham":         { x: 47.0, y: 25.5 },
  "uttarakhand":      { x: 47.0, y: 26.0 },
  "singrauli":        { x: 52.0, y: 43.0 },
  "rewa":             { x: 50.0, y: 42.0 },
  "indore":           { x: 37.0, y: 46.5 },
  "bhopal":           { x: 42.5, y: 45.5 },
  "madhya pradesh":   { x: 43.0, y: 44.0 },
  "ludhiana":         { x: 38.0, y: 25.5 },
  "amritsar":         { x: 36.0, y: 24.0 },
  "chandigarh":       { x: 39.5, y: 26.0 },
  "punjab":           { x: 37.0, y: 25.0 },
  "jaipur":           { x: 35.0, y: 34.5 },
  "bikaner":          { x: 30.5, y: 31.5 },
  "bhadla":           { x: 28.5, y: 32.5 },
  "phalodi":          { x: 28.5, y: 32.5 },
  "sambhar":          { x: 34.0, y: 34.0 },
  "rajasthan":        { x: 34.0, y: 34.0 },
  "raipur":           { x: 52.0, y: 49.0 },
  "bhilai":           { x: 50.5, y: 50.0 },
  "durg":             { x: 50.5, y: 50.0 },
  "chhattisgarh":     { x: 52.0, y: 48.0 },
  "varanasi":         { x: 54.0, y: 38.5 },
  "lucknow":          { x: 48.5, y: 35.0 },
  "kanpur":           { x: 47.5, y: 36.5 },
  "jhansi":           { x: 45.0, y: 39.0 },
  "jalaun":           { x: 46.0, y: 38.0 },
  "bundelkhand":      { x: 45.5, y: 39.0 },
  "uttar pradesh":    { x: 49.0, y: 34.0 },
  "delhi":            { x: 42.0, y: 28.0 },
  "patna":            { x: 59.0, y: 37.5 },
  "bihar":            { x: 62.0, y: 38.0 },
  "kolkata":          { x: 66.0, y: 47.0 },
  "howrah":           { x: 65.5, y: 47.2 },
  "siliguri":         { x: 68.5, y: 35.5 },
  "west bengal":      { x: 66.0, y: 47.0 },
  "purulia":          { x: 64.0, y: 46.0 },
  "haldia":           { x: 68.0, y: 50.0 },
  "assam":            { x: 78.0, y: 38.0 },
  "meghalaya":        { x: 77.5, y: 40.5 },
  "mizoram":          { x: 81.0, y: 46.0 },
  "northeast":        { x: 79.0, y: 40.0 },
};

const ALL_STATE_BOUNDARIES = {
  "ladakh":            { name: "Ladakh", x: 45.0, y: 16.0 },
  "jammu":             { name: "Jammu & Kashmir", x: 37.0, y: 18.0 },
  "himachal":          { name: "Himachal Pradesh", x: 42.0, y: 23.0 },
  "punjab":            { name: "Punjab", x: 37.0, y: 25.0 },
  "ludhiana":          { name: "Punjab (Ludhiana)", x: 38.0, y: 25.5 },
  "amritsar":          { name: "Punjab (Amritsar)", x: 36.0, y: 24.0 },
  "chandigarh":        { name: "Chandigarh", x: 39.5, y: 26.0 },
  "haryana":           { name: "Haryana", x: 40.0, y: 29.0 },
  "delhi":             { name: "Delhi", x: 42.0, y: 28.0 },
  "uttarakhand":       { name: "Uttarakhand", x: 47.0, y: 26.0 },
  "rishikesh":         { name: "Uttarakhand (Rishikesh)", x: 46.5, y: 26.5 },
  "rajasthan":         { name: "Rajasthan", x: 34.0, y: 34.0 },
  "jaipur":            { name: "Rajasthan (Jaipur)", x: 35.0, y: 34.5 },
  "bikaner":           { name: "Rajasthan (Bikaner)", x: 30.5, y: 31.5 },
  "bhadla":            { name: "Rajasthan (Bhadla)", x: 28.5, y: 32.5 },
  "sambhar":           { name: "Rajasthan (Sambhar)", x: 34.0, y: 34.0 },
  "uttar pradesh":     { name: "Uttar Pradesh", x: 49.0, y: 34.0 },
  "lucknow":           { name: "Uttar Pradesh (Lucknow)", x: 48.5, y: 35.0 },
  "kanpur":            { name: "Uttar Pradesh (Kanpur)", x: 47.5, y: 36.5 },
  "varanasi":          { name: "Uttar Pradesh (Varanasi)", x: 54.0, y: 38.5 },
  "bundelkhand":       { name: "Uttar Pradesh (Bundelkhand)", x: 45.5, y: 39.0 },
  "gujarat":           { name: "Gujarat", x: 26.5, y: 43.0 },
  "kandla":            { name: "Gujarat (Kandla)", x: 23.5, y: 44.0 },
  "khavda":            { name: "Gujarat (Khavda)", x: 23.0, y: 41.0 },
  "rajkot":            { name: "Gujarat (Rajkot)", x: 25.0, y: 46.0 },
  "ahmedabad":         { name: "Gujarat (Ahmedabad)", x: 26.5, y: 43.0 },
  "madhya pradesh":    { name: "Madhya Pradesh", x: 43.0, y: 44.0 },
  "indore":            { name: "Madhya Pradesh (Indore)", x: 37.0, y: 46.5 },
  "bhopal":            { name: "Madhya Pradesh (Bhopal)", x: 42.5, y: 45.5 },
  "rewa":              { name: "Madhya Pradesh (Rewa)", x: 50.0, y: 42.0 },
  "singrauli":         { name: "Madhya Pradesh (Singrauli)", x: 52.0, y: 43.0 },
  "maharashtra":       { name: "Maharashtra", x: 35.0, y: 54.0 },
  "mumbai":            { name: "Maharashtra (Mumbai)", x: 29.5, y: 54.0 },
  "pune":              { name: "Maharashtra (Pune)", x: 34.0, y: 55.5 },
  "shendra":           { name: "Maharashtra (AURIC)", x: 36.0, y: 52.0 },
  "aurangabad":        { name: "Maharashtra (Chhatrapati Sambhajinagar)", x: 36.0, y: 52.0 },
  "thane":             { name: "Maharashtra (Thane)", x: 30.5, y: 53.8 },
  "navi mumbai":       { name: "Maharashtra (Navi Mumbai)", x: 30.5, y: 54.5 },
  "chhattisgarh":      { name: "Chhattisgarh", x: 52.0, y: 48.0 },
  "raipur":            { name: "Chhattisgarh (Raipur)", x: 52.0, y: 49.0 },
  "bhilai":            { name: "Chhattisgarh (Bhilai)", x: 50.5, y: 50.0 },
  "jharkhand":         { name: "Jharkhand", x: 63.0, y: 45.0 },
  "bihar":             { name: "Bihar", x: 62.0, y: 38.0 },
  "patna":             { name: "Bihar (Patna)", x: 59.0, y: 37.5 },
  "west bengal":       { name: "West Bengal", x: 66.0, y: 47.0 },
  "kolkata":           { name: "West Bengal (Kolkata)", x: 66.0, y: 47.0 },
  "howrah":            { name: "West Bengal (Howrah)", x: 65.5, y: 47.2 },
  "siliguri":          { name: "West Bengal (Siliguri)", x: 68.5, y: 35.5 },
  "odisha":            { name: "Odisha", x: 58.0, y: 52.0 },
  "paradip":           { name: "Odisha (Paradip)", x: 61.0, y: 50.5 },
  "goa":               { name: "Goa", x: 30.5, y: 64.0 },
  "karnataka":         { name: "Karnataka", x: 37.0, y: 67.0 },
  "bengaluru":         { name: "Karnataka (Bengaluru)", x: 38.0, y: 69.0 },
  "telangana":         { name: "Telangana", x: 43.0, y: 57.0 },
  "hyderabad":         { name: "Telangana (Hyderabad)", x: 43.0, y: 57.0 },
  "andhra pradesh":    { name: "Andhra Pradesh", x: 44.0, y: 58.0 },
  "visakhapatnam":     { name: "Andhra Pradesh (Visakhapatnam)", x: 53.0, y: 56.0 },
  "kerala":            { name: "Kerala", x: 36.0, y: 76.0 },
  "tamil nadu":        { name: "Tamil Nadu", x: 43.0, y: 75.0 },
  "chennai":           { name: "Tamil Nadu (Chennai)", x: 45.0, y: 71.0 },
  "enayam":            { name: "Tamil Nadu (Enayam)", x: 41.5, y: 81.0 },
  "colachel":          { name: "Tamil Nadu (Colachel)", x: 41.5, y: 81.5 },
  "puducherry":        { name: "Puducherry", x: 45.0, y: 73.0 },
  "sikkim":            { name: "Sikkim", x: 71.0, y: 36.0 },
  "assam":             { name: "Assam", x: 78.0, y: 38.0 },
  "meghalaya":         { name: "Meghalaya", x: 77.5, y: 40.5 },
  "tripura":           { name: "Tripura", x: 78.5, y: 45.0 },
  "mizoram":           { name: "Mizoram", x: 81.0, y: 46.0 },
  "manipur":           { name: "Manipur", x: 82.5, y: 44.0 },
  "nagaland":          { name: "Nagaland", x: 83.5, y: 41.0 },
  "arunachal pradesh": { name: "Arunachal Pradesh", x: 84.0, y: 32.0 },
  "dadra":             { name: "Dadra & Nagar Haveli", x: 27.5, y: 49.0 },
  "purulia":           { name: "West Bengal (Purulia)", x: 64.0, y: 46.0 },
  "haldia":            { name: "West Bengal (Haldia)", x: 68.0, y: 50.0 },
  "burnpur":           { name: "West Bengal (Burnpur)", x: 65.0, y: 44.0 },
  "birbhum":           { name: "West Bengal (Birbhum)", x: 65.0, y: 44.0 },
  "vadodara":          { name: "Gujarat (Vadodara)", x: 28.5, y: 45.0 },
  "dholera":           { name: "Gujarat (Dholera)", x: 26.0, y: 45.5 },
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

  // Parse all included states for Japan projects
  const getJapanLocations = (locStr) => {
    const clean = (locStr || '').toLowerCase();
    const matched = [];
    const addedCoords = [];

    const addMatch = (key) => {
      const coord = cityCoordinates[key];
      if (!coord) return;
      const isDuplicate = addedCoords.some(
        c => Math.abs(c.x - coord.x) < 1.0 && Math.abs(c.y - coord.y) < 1.0
      );
      if (!isDuplicate) {
        addedCoords.push(coord);
        matched.push(coord);
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
      matched.push({ name: (locStr || 'Tokyo').split(',')[0], x: 43.5, y: 55.5 });
    }
    return matched;
  };

  // Parse all included states for India projects with 100% exact geographical positioning
  const getIncludedStates = (locStr) => {
    const clean = (locStr || '').toLowerCase();
    const matched = [];
    const addedCoords = [];

    const addMatch = (key) => {
      const coord = ALL_STATE_BOUNDARIES[key];
      if (!coord) return;
      const isDuplicate = addedCoords.some(
        c => Math.abs(c.x - coord.x) < 1.0 && Math.abs(c.y - coord.y) < 1.0
      );
      if (!isDuplicate) {
        addedCoords.push(coord);
        matched.push(coord);
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
        for (const [key] of Object.entries(ALL_STATE_BOUNDARIES)) {
          if (clean.includes(key)) addMatch(key);
        }
      }
    }

    if (matched.length === 0 && isIndia) {
      matched.push({ name: (locStr || 'Project Location').split(',')[0], x: coords.x, y: coords.y });
    }
    return matched;
  };

  const includedStates = isIndia ? getIncludedStates(project.location) : getJapanLocations(project.location);
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

            {/* Soft gradient overlay covering the right edge - ONLY for Japan map */}
            {!isIndia && (
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                width: '24%',
                background: 'linear-gradient(90deg, transparent 0%, #0b0f19 50%, #0b0f19 100%)',
                zIndex: 3,
                pointerEvents: 'none',
              }} />
            )}

            {/* Dark gradient restricted to top-left header zone - ONLY for Japan map */}
            {!isIndia && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '50%',
                height: '18%',
                background: 'linear-gradient(180deg, #0b0f19 0%, rgba(11,15,25,0.7) 60%, rgba(11,15,25,0) 100%)',
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
              src={'/images/' + project.id + '.jpg?v=obayashi_real_2026_v37'}
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