import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, MapPin, Calendar, Briefcase, DollarSign, 
  Award, Layers, Cpu, ShieldAlert, CheckCircle2, 
  Compass, Activity, ArrowRight, ShieldCheck, Info,
  ExternalLink, Building2, Hammer, Ruler, CheckCircle
} from 'lucide-react';
import { projects } from '../data/worksContent';
import { detailedProjectContent } from '../data/projectDetails';
import MiniJapanMap from '../components/MiniJapanMap';

// Reusable slugifier matching popup card
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

// Traditional Japanese Wave (Seigaiha) pattern component
const WavePattern = () => (
  <div 
    className="absolute inset-0 pointer-events-none opacity-[0.02] z-0"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='30' viewBox='0 0 60 30'%3E%3Cpath d='M15 0a30 30 0 1 1-30 30 30 30 0 0 1 30-30zm0 5a25 25 0 1 1-25 25 25 25 0 0 1 25-25zm0 5a20 20 0 1 1-20 20 20 20 0 0 1 20-20zm0 5a15 15 0 1 1-15 15 15 15 0 0 1 15-15zm0 5a10 10 0 1 1-10 10 10 10 0 0 1 10-10zm0 5a5 5 0 1 1-5 5 5 5 0 0 1 5-5z' fill='%23111827' fill-opacity='0.15' fill-rule='evenodd'/%3E%3C/svg%3E")`,
      backgroundSize: '60px 30px'
    }}
  />
);

// Faint Fuji Silhouette SVG at the bottom of the hero
const FujiSilhouette = () => (
  <svg 
    className="absolute bottom-0 right-[5%] w-[420px] h-[160px] pointer-events-none opacity-[0.03] z-0"
    viewBox="0 0 350 150" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M0 150 L110 90 L160 50 L175 48 L190 50 L240 90 L350 150 Z" 
      fill="#111827" 
    />
    <path 
      d="M160 50 L175 48 L190 50 L200 65 L175 70 L150 65 Z" 
      fill="#FFFFFF" 
    />
  </svg>
);

// Faint rising sun decorative background circle
const RisingSun = () => (
  <div 
    className="absolute top-[12%] left-[8%] w-[200px] h-[200px] rounded-full bg-[#C8102E]/[0.015] border border-[#C8102E]/[0.025] pointer-events-none z-0"
  />
);

// Hanko red stamp component (Takumi style)
const HankoStamp = ({ char = "匠" }) => (
  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border-2 border-dashed border-[#C8102E] text-[#C8102E] font-serif font-black text-lg select-none rotate-6 shadow-sm shadow-[#C8102E]/10 bg-white">
    <div className="w-10 h-10 rounded-full border border-solid border-[#C8102E] flex items-center justify-center">
      {char}
    </div>
  </div>
);

// Divider styled after traditional Japanese screens
const TraditionalDivider = () => (
  <div className="flex items-center justify-center gap-4 my-16 opacity-30 select-none">
    <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-[#111827]"></div>
    <div className="w-2 h-2 rotate-45 border border-[#111827] bg-white"></div>
    <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-[#111827]"></div>
  </div>
);

export default function ProjectDetail() {
  const params = useParams();
  const paramVal = params.slug || params.id;
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(null);

  // Scroll to top on mount / project change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [paramVal]);

  // Find project by slug or ID
  const project = projects.find(p => slugify(p.title) === paramVal || p.id === paramVal);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#F7F8FA] flex flex-col items-center justify-center text-slate-800 p-4">
        <h2 className="text-xl font-bold mb-4 font-sans tracking-tight">Project Case Study Not Found</h2>
        <p className="text-slate-500 mb-6 text-sm">The requested project details could not be retrieved.</p>
        <button 
          onClick={() => navigate('/works')} 
          className="px-5 py-2.5 bg-[#111827] hover:bg-[#C8102E] text-white rounded-md font-bold cursor-pointer transition-colors shadow-md text-xs uppercase tracking-widest"
        >
          Back to Directory
        </button>
      </div>
    );
  }

  // Load detailed unique data mapping
  const detailsData = detailedProjectContent[project.id] || {
    kanjiName: "プロジェクト詳細情報",
    romajiName: "Purojekuto Shōsai Jōhō",
    prefecture: "Japan",
    city: "Regional Development",
    tokyoDistance: "N/A",
    airport: "International Hub",
    locationStory: "Strategically located to support urban density improvements and build infrastructure trust.",
    coordinates: "35.6762° N, 139.6503° E",
    challenges: [
      "Integrating modern structural frameworks within high-density zones without disrupting active operations.",
      "Ensuring strict compliance with local seismic guidelines and sustainable material acquisition under strict timelines."
    ],
    solutions: [
      "Leveraged Building Information Modeling (BIM) for precise load-path mapping and interference checks.",
      "Implemented low-carbon precast concrete and optimized steel connections to streamline logistics and on-site assembly."
    ],
    timeline: [
      { phase: "Planning & Feasibility", date: "Q1 " + (parseInt(project.completionYear) - 2), desc: "Comprehensive structural and geological evaluations." },
      { phase: "Excavation & Foundations", date: "Q3 " + (parseInt(project.completionYear) - 2), desc: "Deep foundation work with seismic pile driving." },
      { phase: "Superstructure Assembly", date: "Q2 " + (parseInt(project.completionYear) - 1), desc: "Hoisting of high-strength structural steel columns." },
      { phase: "Interior Fitting & Commissioning", date: "Q3 " + project.completionYear, desc: "Installation of HVAC systems, smart sensors, and LEED certification audits." },
      { phase: "Handover & Integration", date: project.completion, desc: "Final testing and keys transferred to the client." }
    ],
    specs: {
      "Structure": "Composite Steel Frame Structure",
      "Foundation": "Concrete bored pile shoring columns",
      "Steel Used": "Thermo-mechanical control steel",
      "Concrete Grade": "High strength concrete (38 N/mm²)",
      "Building Height": "Height details undisclosed",
      "Site Area": "12,000 m²",
      "Parking Capacity": "Vehicles capacity not specified",
      "Seismic Resistance": "Grade 1 (Excellent)",
      "Energy Rating": "BELS 5-Star Compliant",
      "Green Certification": "CASBEE A-Class",
      "Construction Method": "Standard Prefabricated Modules"
    },
    culturalInsight: {
      title: "匠",
      meaning: "Embodying precision civil engineering values built on the legacy of classical carpentry tools.",
      quote: "「継続は力なり」",
      quoteTranslation: "Persistence becomes strength."
    }
  };

  const client = project.details?.find(d => d.label.toLowerCase() === "client")?.value || "Private Developer";
  const budget = project.details?.find(d => d.label.toLowerCase() === "budget")?.value || "Undisclosed";
  const sector = project.details?.find(d => d.label.toLowerCase() === "sector")?.value || "Infrastructure";
  const subSector = project.details?.find(d => d.label.toLowerCase() === "sub-sector")?.value || "Construction";

  const relatedProjects = projects.filter(p => p.id !== project.id).slice(0, 3);

  // Compile quick specs grid items dynamically
  const quickInfoItems = [
    { label: "Project Status", value: "Completed", icon: <CheckCircle size={15} /> },
    { label: "Location", value: project.location, icon: <MapPin size={15} /> },
    { label: "Completion Year", value: project.completionYear, icon: <Calendar size={15} /> },
    { label: "Client", value: client, icon: <Briefcase size={15} /> },
    { label: "Site Area", value: detailsData.specs["Site Area"] || "Undisclosed", icon: <Ruler size={15} /> },
    { label: "Project Budget", value: budget, icon: <DollarSign size={15} /> },
    { label: "Construction Type", value: project.designType, icon: <Hammer size={15} /> },
    { label: "Building Height", value: detailsData.specs["Building Height"] || "Undisclosed", icon: <Building2 size={15} /> }
  ].filter(item => item.value && item.value !== "Undisclosed" && item.value !== "N/A");

  // Related Blueprint Images array for gallery masonry mock
  const blueprints = [
    { src: `/images/${project.id}.jpg`, caption: "Superstructure Outer Facade Elevation" },
    { src: `/images/category_${project.category === "Civil Infra" ? "civil" : project.category.toLowerCase().replace(/\s+/g, '_')}.png`, caption: "Site Plan and Subsurface Excavation Cross-Section" },
    { src: "/images/rokka_mori.png", caption: "Materials Logistics and Environmental Green Roof Design" }
  ];

  // Engineering Highlights Mapping
  const engineeringHighlights = [
    { title: "Earthquake Resilient", desc: `Equipped with advanced ${detailsData.specs["Seismic Resistance"] || "seismic dampers"} ensuring structural protection against earthquakes.`, icon: <Activity size={18} /> },
    { title: "Carbon Neutral Focus", desc: `Utilizes ${detailsData.specs["Concrete Grade"] || "eco-certified"} composite foundations to lower net emissions.`, icon: <Cpu size={18} /> },
    { title: "Smart Lifecycle BIM", desc: "Designed, tested, and assembled using Building Information Modeling tools to optimize maintenance.", icon: <Layers size={18} /> },
    { title: "Disaster Preparedness", desc: "Reinforced structural foundations engineered to secure operations during local water and wind hazards.", icon: <ShieldCheck size={18} /> }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-white text-[#111827] font-sans antialiased selection:bg-[#C8102E]/10"
    >
      
      {/* ── 1. HERO SECTION ── */}
      <section className="relative w-full min-h-[550px] max-h-[700px] py-20 bg-white border-b border-[#E6E8EC] overflow-hidden flex items-center">
        {/* Traditional Japanese motifs background layout */}
        <WavePattern />
        <RisingSun />
        <FujiSilhouette />

        {/* Back Button Floating */}
        <div className="absolute top-8 left-6 md:left-12 z-20">
          <button 
            onClick={() => navigate('/works')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white hover:bg-[#C8102E] hover:text-white border border-[#E6E8EC] hover:border-[#C8102E] text-[#111827] font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-sm cursor-pointer group"
          >
            <ArrowLeft size={13} className="transform group-hover:-translate-x-1 transition-transform" />
            <span>Back to Directory</span>
          </button>
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Typography Details */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Category Badge */}
              <span className="inline-flex items-center text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#C8102E] border-b border-[#C8102E]/40 pb-1">
                {project.category}
              </span>

              {/* Title Block */}
              <div className="space-y-2">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#111827] leading-none">
                  {project.title}
                </h1>
                
                {/* Kanji Name & Romaji Pronunciation */}
                <div className="flex flex-wrap items-center gap-2.5 pt-1.5 border-t border-slate-100 mt-2">
                  <span className="text-base font-medium text-slate-800 tracking-wider font-sans">
                    {detailsData.kanjiName}
                  </span>
                  <span className="text-xs font-mono italic text-slate-500 font-normal">
                    ({detailsData.romajiName})
                  </span>
                </div>
              </div>

              {/* Specific Project Narrative Paragraph */}
              <p className="text-[#6B7280] leading-relaxed text-base font-light font-sans max-w-xl">
                {project.summary}
              </p>
            </div>

            {/* Right Column: Floating Luxury Image Card */}
            <div className="lg:col-span-5 flex justify-center">
              <motion.div 
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="w-full max-w-[420px] aspect-[4/3] rounded-[24px] overflow-hidden shadow-2xl bg-[#F7F8FA] border border-[#E6E8EC]"
              >
                <img 
                  src={`/images/${project.id}.jpg`} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const fallbacks = {
                      "Offices": "/images/category_offices.png",
                      "Civil Infra": "/images/category_civil.png",
                      "Energy": "/images/category_energy.png",
                      "Education": "/images/category_education.png",
                      "Recreation": "/images/category_recreation.png"
                    };
                    e.target.src = fallbacks[project.category] || "/images/category_civil.png";
                    e.target.onerror = null;
                  }}
                />
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 2. PROJECT QUICK INFORMATION CARD GRID ── */}
      <section className="bg-[#F7F8FA] py-16 border-b border-[#E6E8EC]">
        <div className="container mx-auto px-6 md:px-12">
          
          <div className="text-center md:text-left mb-10">
            <h2 className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#6B7280]">Project Parameters</h2>
            <p className="text-2xl font-black text-[#111827] mt-1">Core Specifications</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickInfoItems.map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="bg-white border border-[#E6E8EC] rounded-2xl p-6 shadow-sm transition-shadow hover:shadow-md flex items-start gap-4"
              >
                <div className="p-3 bg-[#F7F8FA] rounded-xl text-[#1E3A8A] border border-[#E6E8EC] flex-shrink-0">
                  {item.icon}
                </div>
                <div className="space-y-1">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
                    {item.label}
                  </span>
                  <span className="block text-sm font-extrabold text-[#111827]">
                    {item.value}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 3. PROJECT LOCATION SECTION ── */}
      <section className="py-20 bg-white border-b border-[#E6E8EC]">
        <div className="container mx-auto px-6 md:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Left panel: Japan interactive coordinate map */}
            <div className="lg:col-span-7 bg-[#F7F8FA] border border-[#E6E8EC] rounded-3xl p-8 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#C8102E] block mb-2">GIS Tracking Map</span>
                <h3 className="text-xl font-bold text-[#111827] mb-6">Geographical Footprint</h3>
              </div>

              {/* Map frame */}
              <div className="h-64 w-full relative rounded-2xl overflow-hidden border border-[#E6E8EC] bg-white">
                <MiniJapanMap location={project.location} />
              </div>

              {/* Map parameters table */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-[#E6E8EC] font-mono text-[11px] text-[#6B7280]">
                <div>
                  <span className="block text-[9px] uppercase tracking-wider text-slate-400">Prefecture</span>
                  <span className="font-bold text-[#111827]">{detailsData.prefecture}</span>
                </div>
                <div>
                  <span className="block text-[9px] uppercase tracking-wider text-slate-400">City / District</span>
                  <span className="font-bold text-[#111827] truncate block">{detailsData.city}</span>
                </div>
                <div>
                  <span className="block text-[9px] uppercase tracking-wider text-slate-400">GPS Pin</span>
                  <span className="font-bold text-[#1E3A8A] block truncate">{detailsData.coordinates}</span>
                </div>
                <div>
                  <span className="block text-[9px] uppercase tracking-wider text-slate-400">Nearest Hub</span>
                  <span className="font-bold text-[#111827] block truncate">{detailsData.airport}</span>
                </div>
              </div>
            </div>

            {/* Right panel: Strategic Location Story */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
              <span className="inline-flex items-center text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#C8102E] border-b border-[#C8102E]/30 pb-1 self-start">
                Location Strategy
              </span>
              <h3 className="text-3xl font-extrabold text-[#111827] tracking-tight leading-tight">
                Regional Significance & Connectivity
              </h3>
              <p className="text-[#6B7280] leading-relaxed text-sm font-light">
                {detailsData.locationStory}
              </p>
              <div className="bg-[#F7F8FA] border border-[#E6E8EC] rounded-2xl p-5 text-xs text-[#6B7280] flex items-center gap-3">
                <Info size={16} className="text-[#1E3A8A] flex-shrink-0" />
                <span>Active site coordinate pin resides approximately <strong>{detailsData.tokyoDistance}</strong> from Central Tokyo base.</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── 4. PROJECT OVERVIEW & 850PX READING LAYOUT ── */}
      <section className="py-20 bg-[#F7F8FA] border-b border-[#E6E8EC]">
        <div className="container mx-auto px-6 md:px-12">
          
          <article className="max-w-[850px] mx-auto space-y-12">
            
            {/* Title header */}
            <div className="text-center space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#C8102E]">Detailed Analysis</span>
              <h2 className="text-3xl font-black text-[#111827] tracking-tight">Engineering Overview & Highlights</h2>
              <div className="w-12 h-[2px] bg-[#C8102E] mx-auto mt-4"></div>
            </div>

            {/* Core Text sections */}
            <div className="bg-white border border-[#E6E8EC] rounded-3xl p-8 md:p-12 shadow-sm space-y-10">
              
              <div className="space-y-4">
                <h3 className="text-lg font-extrabold text-[#111827] flex items-center gap-2.5">
                  <span className="w-1 h-4 bg-[#C8102E] inline-block"></span>
                  Overview & Objective
                </h3>
                <p className="text-sm text-[#6B7280] leading-relaxed font-light">
                  {project.description}
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-extrabold text-[#111827] flex items-center gap-2.5">
                  <span className="w-1 h-4 bg-[#C8102E] inline-block"></span>
                  Engineering Challenges
                </h3>
                <ul className="space-y-4">
                  {detailsData.challenges.map((challenge, idx) => (
                    <li key={idx} className="text-sm text-[#6B7280] leading-relaxed flex items-start gap-3">
                      <span className="font-bold text-[#C8102E] pt-0.5">•</span>
                      <span className="font-light">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-extrabold text-[#111827] flex items-center gap-2.5">
                  <span className="w-1 h-4 bg-[#C8102E] inline-block"></span>
                  Innovative Solutions
                </h3>
                <ul className="space-y-4">
                  {detailsData.solutions.map((sol, idx) => (
                    <li key={idx} className="text-sm text-[#6B7280] leading-relaxed flex items-start gap-3">
                      <span className="font-bold text-[#1E3A8A] pt-0.5">•</span>
                      <span className="font-light">{sol}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </article>

        </div>
      </section>

      {/* ── 5. PROJECT TIMELINE SECTION ── */}
      <section className="py-20 bg-white border-b border-[#E6E8EC]">
        <div className="container mx-auto px-6 md:px-12">
          
          <div className="text-center mb-16">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#C8102E]">Project Lifecycle</span>
            <h2 className="text-3xl font-black text-[#111827] tracking-tight mt-1">Development Milestones</h2>
          </div>

          <div className="max-w-3xl mx-auto relative border-l-2 border-[#E6E8EC] ml-6 pl-8 space-y-12 py-2">
            {detailsData.timeline.map((event, idx) => (
              <div key={idx} className="relative group">
                
                {/* Timeline node circle */}
                <div className="absolute -left-[41px] top-1.5 w-6 h-6 rounded-full bg-white border-2 border-[#E6E8EC] group-hover:border-[#C8102E] flex items-center justify-center transition-colors duration-300 shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-[#E6E8EC] group-hover:bg-[#C8102E] transition-colors duration-300"></div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-[9px] font-mono font-bold text-[#6B7280] bg-[#F7F8FA] border border-[#E6E8EC] px-2 py-0.5 rounded">
                      PHASE 0{idx + 1}
                    </span>
                    <h4 className="font-extrabold text-[#111827] text-base group-hover:text-[#C8102E] transition-colors">
                      {event.phase}
                    </h4>
                  </div>
                  <span className="text-[10px] font-bold text-[#C8102E] font-mono bg-[#C8102E]/5 border border-[#C8102E]/15 px-2.5 py-1 rounded">
                    {event.date}
                  </span>
                </div>
                <p className="text-xs text-[#6B7280] leading-relaxed font-light">
                  {event.desc}
                </p>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 6. PROJECT GALLERY MASONRY ── */}
      <section className="py-20 bg-[#F7F8FA] border-b border-[#E6E8EC]">
        <div className="container mx-auto px-6 md:px-12">
          
          <div className="text-center mb-12">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#C8102E]">Visual Showcase</span>
            <h2 className="text-3xl font-black text-[#111827] tracking-tight mt-1">Image & Blueprint Gallery</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blueprints.map((img, idx) => (
              <div 
                key={idx}
                onClick={() => setActiveImage(img)}
                className="group relative cursor-pointer overflow-hidden rounded-[24px] border border-[#E6E8EC] bg-white shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="aspect-[4/3] w-full overflow-hidden relative">
                  <img 
                    src={img.src} 
                    alt={img.caption}
                    className="w-full h-full object-cover transform group-hover:scale-103 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = "/images/category_civil.png";
                      e.target.onerror = null;
                    }}
                  />
                  <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="px-3.5 py-2 bg-white text-xs font-bold text-[#111827] rounded shadow-md border border-[#E6E8EC] uppercase tracking-wider">
                      Zoom Diagram
                    </span>
                  </div>
                </div>
                <div className="p-4 border-t border-[#E6E8EC]">
                  <p className="text-xs text-[#6B7280] font-medium font-sans flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#C8102E] rounded-full"></span>
                    {img.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Lightbox Portal Overlay */}
      <AnimatePresence>
        {activeImage && (
          <div 
            onClick={() => setActiveImage(null)}
            className="fixed inset-0 z-[5000] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-6"
          >
            <div className="max-w-3xl w-full bg-white border border-[#E6E8EC] rounded-[24px] overflow-hidden shadow-2xl relative" onClick={e => e.stopPropagation()}>
              <button 
                onClick={() => setActiveImage(null)}
                className="absolute top-4 right-4 p-2 bg-[#F7F8FA] border border-[#E6E8EC] rounded-full text-slate-600 hover:text-black cursor-pointer transition-colors"
              >
                <X size={16} />
              </button>
              <img src={activeImage.src} alt={activeImage.caption} className="w-full max-h-[500px] object-contain bg-[#F7F8FA]" />
              <div className="p-4 bg-white border-t border-[#E6E8EC]">
                <p className="text-xs font-bold text-[#111827]">{activeImage.caption}</p>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* ── 7. PROJECT SPECIFICATIONS TABLE (Apple Documentation style) ── */}
      <section className="py-20 bg-white border-b border-[#E6E8EC]">
        <div className="container mx-auto px-6 md:px-12">
          
          <div className="max-w-3xl mx-auto">
            
            <div className="text-center md:text-left mb-10">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#C8102E]">Technical parameters</span>
              <h2 className="text-2xl font-black text-[#111827] mt-1">Detailed Specifications Sheet</h2>
            </div>

            <div className="bg-white border border-[#E6E8EC] rounded-3xl overflow-hidden shadow-sm">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-[#F7F8FA] border-b border-[#E6E8EC] text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
                    <th className="p-4 pl-6">Technical Field</th>
                    <th className="p-4 pr-6">Design Integration Value</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(detailsData.specs).map(([key, val], idx) => (
                    <tr 
                      key={idx}
                      className="border-b border-[#E6E8EC] last:border-0 hover:bg-[#F7F8FA]/60 transition-colors"
                    >
                      <td className="p-4 pl-6 font-bold text-[#1E3A8A] text-xs">{key}</td>
                      <td className="p-4 pr-6 text-[#6B7280] font-light text-xs">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>

        </div>
      </section>

      {/* ── 8. JAPANESE CULTURAL SECTION ── */}
      <section className="py-24 bg-[#F7F8FA] border-b border-[#E6E8EC] relative">
        {/* Faint wave backdrop layout */}
        <WavePattern />
        
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            
            {/* Hanko stamp circular indicator */}
            <HankoStamp char={detailsData.culturalInsight.title} />

            <div className="space-y-4">
              <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-[#C8102E]">
                Traditional Craftsmanship Insights
              </span>
              
              <h3 className="text-3xl font-extrabold text-[#111827] tracking-tight">
                {detailsData.culturalInsight.quote}
              </h3>
              
              <p className="text-xs font-mono text-slate-500 italic">
                {detailsData.culturalInsight.quoteTranslation}
              </p>
            </div>

            <div className="max-w-lg mx-auto bg-white border border-[#E6E8EC] rounded-2xl p-6 shadow-sm">
              <p className="text-xs text-[#6B7280] leading-relaxed font-light font-sans">
                {detailsData.culturalInsight.meaning}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── 9. ENGINEERING HIGHLIGHTS ── */}
      <section className="py-20 bg-white border-b border-[#E6E8EC]">
        <div className="container mx-auto px-6 md:px-12">
          
          <div className="text-center mb-16">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#C8102E]">Technical Materiality</span>
            <h2 className="text-3xl font-black text-[#111827] tracking-tight mt-1">Core Structural Merits</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {engineeringHighlights.map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -4 }}
                className="bg-white border border-[#E6E8EC] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-[#F7F8FA] border border-[#E6E8EC] text-[#C8102E] flex items-center justify-center mb-5">
                  {item.icon}
                </div>
                <h4 className="font-extrabold text-[#111827] text-sm mb-2">{item.title}</h4>
                <p className="text-xs text-[#6B7280] leading-relaxed font-light">{item.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 10. RELATED PROJECTS ── */}
      <section className="py-20 bg-[#F7F8FA] border-b border-[#E6E8EC]">
        <div className="container mx-auto px-6 md:px-12">
          
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#C8102E]">Related Portfolios</span>
              <h2 className="text-3xl font-black text-[#111827] tracking-tight mt-1">Similar Structural Case Studies</h2>
            </div>
            <Link to="/works" className="hidden md:flex items-center gap-1.5 text-xs font-bold text-[#C8102E] hover:text-[#C8102E]/80 transition-colors uppercase tracking-widest">
              Explore Directory <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProjects.map((p) => (
              <Link 
                key={p.id}
                to={`/projects/${slugify(p.title)}`}
                className="bg-white border border-[#E6E8EC] hover:border-[#C8102E]/30 hover:shadow-xl rounded-2xl overflow-hidden group hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
              >
                <div className="h-44 w-full overflow-hidden relative">
                  <img 
                    src={`/images/${p.id}.jpg`} 
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    onError={(e) => {
                      const fallbacks = {
                        "Offices": "/images/category_offices.png",
                        "Civil Infra": "/images/category_civil.png",
                        "Energy": "/images/category_energy.png",
                        "Education": "/images/category_education.png",
                        "Recreation": "/images/category_recreation.png"
                      };
                      e.target.src = fallbacks[p.category] || "/images/category_civil.png";
                      e.target.onerror = null;
                    }}
                  />
                  <div className="absolute top-4 left-4 px-2.5 py-0.5 text-[8px] font-extrabold tracking-widest uppercase bg-white text-[#C8102E] rounded border border-[#E6E8EC]">
                    {p.category}
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h4 className="font-extrabold text-[#111827] group-hover:text-[#C8102E] line-clamp-1 transition-colors text-sm mb-3">
                    {p.title}
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs text-[#6B7280] mt-auto pt-4 border-t border-[#E6E8EC]">
                    <MapPin size={11} className="text-[#C8102E]" />
                    <span>{p.location}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* ── 11. CTA SECTION ── */}
      <section className="py-24 bg-white border-b border-[#E6E8EC] relative">
        <WavePattern />
        
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center space-y-6">
          <h2 className="text-3xl font-black text-[#111827] tracking-tight">
            Interested in Similar Projects?
          </h2>
          <p className="text-sm text-[#6B7280] leading-relaxed max-w-md mx-auto font-light">
            Obayashi handles complex structural builds and green utility grids globally. Connect with our engineering directors.
          </p>

          <div className="flex items-center justify-center gap-4 pt-4">
            <Link 
              to="/works" 
              className="px-6 py-3 bg-[#111827] hover:bg-[#C8102E] text-white rounded-md text-xs font-bold uppercase tracking-widest transition-colors shadow-md flex items-center gap-2"
            >
              <span>Explore Works</span>
              <ArrowRight size={13} />
            </Link>
            <Link 
              to="/contact" 
              className="px-6 py-3 bg-white hover:bg-[#F7F8FA] text-[#111827] rounded-md text-xs font-bold uppercase tracking-widest border border-[#E6E8EC] transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Traditional screen screen divider line */}
        <TraditionalDivider />
      </section>

      {/* ── 12. PAGE FOOTER DECORATION ── */}
      <footer className="py-12 bg-white relative">
        {/* Subtle geometric red accent line */}
        <div className="w-12 h-[3px] bg-[#C8102E] mx-auto mb-4 rounded-full"></div>
        <p className="text-[10px] font-mono text-[#6B7280] text-center tracking-widest uppercase">
          Precision • Trust • Craftsmanship
        </p>
      </footer>

    </motion.div>
  );
}
