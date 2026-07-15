import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, MapPin, Calendar, Briefcase, DollarSign, 
  Award, Layers, Cpu, ShieldAlert, CheckCircle2, 
  Compass, Activity, ArrowRight, ShieldCheck, ChevronRight 
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

// Advanced features mapping to show real tech specifications for each category
const getTechSpecifications = (category, title) => {
  if (category === "Civil Infra" || title.includes("Metro") || title.includes("Rail")) {
    return {
      safetyLevel: "Class-A Civil Risk Mitigated",
      certifications: ["ISO 9001 (Quality)", "ISO 14001 (Environmental)"],
      coreTech: "Earth Pressure Balance (EPB) Shield TBM, Real-time telemetry monitoring",
      sustainability: "Low-carbon concrete mix, 85% construction waste recycled on site"
    };
  } else if (category === "Offices" || title.includes("Hills") || title.includes("Redevelopment")) {
    return {
      safetyLevel: "Grade-S Seismic Absorption",
      certifications: ["LEED Gold / Platinum Target", "CASBEE Class-S (Japan)"],
      coreTech: "Active Mass Dampers (AMD), High-performance Oil Dampers, BIM Level 2",
      sustainability: "District Heating & Cooling (DHC), Double-skin insulating curtain walls"
    };
  } else if (category === "Energy" || title.includes("Wind") || title.includes("Solar")) {
    return {
      safetyLevel: "Class-S Grid Resilience Rating",
      certifications: ["FIT Standard compliant", "EIA Certified (Japan)"],
      coreTech: "Superconducting transmission grid sync, SEV jack-up system integration",
      sustainability: "100% renewable generation offset, Double bubble acoustic sea curtains"
    };
  }
  return {
    safetyLevel: "High Performance Structural Rating",
    certifications: ["JIS Standard Compliant", "ISO 9001 Certified"],
    coreTech: "3D BIM Lifecycle coordination, prefabricated structural panels",
    sustainability: "High thermal insulation materials, sustainable local logging timber"
  };
};

export default function WorkDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Find project by ID or slug
  const project = projects.find(p => p.id === id || slugify(p.title) === id);

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-100 p-4">
        <h2 className="text-2xl font-bold mb-4">Project Case Study Not Found</h2>
        <p className="text-slate-400 mb-6">The requested project details could not be retrieved.</p>
        <button 
          onClick={() => navigate('/works')} 
          className="px-6 py-3 bg-amber-650 hover:bg-amber-550 text-white rounded-xl font-bold cursor-pointer transition-colors shadow-lg"
        >
          Back to Projects List
        </button>
      </div>
    );
  }

  // Load detailed unique data
  const detailsData = detailedProjectContent[project.id] || {
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
    ]
  };

  const client = project.details?.find(d => d.label.toLowerCase() === "client")?.value || "Private Developer";
  const budget = project.details?.find(d => d.label.toLowerCase() === "budget")?.value || "Undisclosed";
  const sector = project.details?.find(d => d.label.toLowerCase() === "sector")?.value || "Infrastructure";
  const subSector = project.details?.find(d => d.label.toLowerCase() === "sub-sector")?.value || "Construction";

  const techSpecs = getTechSpecifications(project.category, project.title);

  // Stagger Container variant
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  // Card slide-up variant
  const cardSlideUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 18 } }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden font-sans"
    >
      {/* ── BACKGROUND DESIGN ── */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-[0.25] pointer-events-none z-0" />
      
      {/* Luxury Ambient light blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-amber-500/[0.04] rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute top-[40%] right-[-10%] w-[50vw] h-[50vw] bg-emerald-500/[0.03] rounded-full blur-[160px] pointer-events-none z-0" />

      {/* Breadcrumb Row */}
      <div className="bg-slate-950 border-b border-white/[0.08] py-3.5 relative z-10">
        <div className="container mx-auto px-6 md:px-12 flex items-center gap-2 text-xs text-slate-400 font-medium">
          <Link to="/" className="hover:text-amber-500 transition-colors">Home</Link>
          <ChevronRight size={12} className="text-slate-600" />
          <Link to="/works" className="hover:text-amber-500 transition-colors">Projects</Link>
          <ChevronRight size={12} className="text-slate-600" />
          <span className="text-slate-200 font-bold truncate">{project.title}</span>
        </div>
      </div>

      {/* 1. HERO SECTION */}
      <header className="relative w-full h-[55vh] min-h-[400px] max-h-[600px] overflow-hidden flex items-end z-10">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src={`/images/${project.id}.jpg`} 
            alt={project.title}
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.32) contrast(1.08)' }}
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
          <div className="absolute inset-0 bg-gradient-to-t from-slate-955 via-slate-950/60 to-transparent" />
        </div>

        {/* Hero Title & Primary Stats */}
        <div className="container mx-auto px-6 md:px-12 pb-16 relative z-10">
          <div className="max-w-4xl">
            {/* Category badge */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center px-3.5 py-1.5 text-[10px] font-extrabold tracking-widest uppercase bg-amber-600/90 text-white border border-amber-500/30 rounded-md mb-5 shadow-lg backdrop-blur-sm"
            >
              {project.category}
            </motion.div>

            {/* Title */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight mb-6"
              style={{ textShadow: '0 4px 24px rgba(0,0,0,0.6)' }}
            >
              {project.title}
            </motion.h1>

            {/* Metadata Tags Row */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-slate-300 border-t border-white/[0.08] pt-6"
            >
              <div className="flex items-center gap-2.5">
                <MapPin size={15} className="text-amber-500" />
                <span className="font-semibold">{project.location}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Calendar size={15} className="text-amber-500" />
                <span className="font-semibold">Completed {project.completion}</span>
              </div>
              {detailsData.coordinates && (
                <div className="flex items-center gap-2 font-mono text-[11px] text-slate-350 bg-slate-900/60 px-3 py-1 rounded border border-white/[0.05] shadow-inner">
                  <Compass size={12} className="text-amber-500" />
                  <span>{detailsData.coordinates}</span>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </header>

      {/* 2. METRICS HUB (Key Statistics Grid) */}
      <section className="relative z-20 max-w-7xl mx-auto px-6 -mt-10">
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, type: "spring", stiffness: 100 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4 p-5 bg-slate-900/40 backdrop-blur-2xl border border-white/[0.08] rounded-3xl shadow-2xl"
        >
          {[
            { label: "Client", val: client, icon: <Briefcase size={13} /> },
            { label: "Project Budget", val: budget, icon: <DollarSign size={13} /> },
            { label: "Sector", val: sector, icon: <Layers size={13} /> },
            { label: "Sub-Sector", val: subSector, icon: <Cpu size={13} /> },
            { label: "Contract", val: project.designType, icon: <Award size={13} /> }
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="flex flex-col p-4 border-r border-white/[0.04] last:border-0 md:border-r"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
                <span className="text-amber-500">{item.icon}</span>
                {item.label}
              </span>
              <span className="text-sm font-extrabold text-white truncate">{item.val}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* 3. MAIN PAGE CONTENT BODY */}
      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-10"
        >
          
          {/* LEFT 2/3 COLUMN */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Project Overview Card */}
            <motion.section 
              variants={cardSlideUp}
              className="bg-slate-900/30 border border-white/[0.06] backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-lg"
            >
              <h2 className="text-xl font-extrabold mb-6 text-white flex items-center gap-2.5 pb-4 border-b border-white/[0.06]">
                <span className="w-1.5 h-5 bg-amber-500 rounded-full inline-block"></span>
                Project Overview & Scope
              </h2>
              <p className="text-slate-355 leading-relaxed text-base md:text-[17px] font-light">
                {project.description}
              </p>
            </motion.section>

            {/* Technical Challenges & Solutions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Challenges Card */}
              <motion.div 
                variants={cardSlideUp}
                whileHover={{ y: -5, borderColor: 'rgba(239, 68, 68, 0.35)' }}
                className="bg-slate-900/30 border-l-4 border-l-rose-500 border-t border-r border-b border-white/[0.06] backdrop-blur-xl rounded-3xl p-8 shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-6 text-rose-500">
                  <div className="p-3 bg-rose-500/10 rounded-2xl border border-rose-500/20">
                    <ShieldAlert size={20} />
                  </div>
                  <h3 className="text-lg font-extrabold text-white">Engineering Challenges</h3>
                </div>
                <ul className="space-y-4">
                  {detailsData.challenges.map((c, i) => (
                    <li key={i} className="flex gap-3 text-[13px] text-slate-300 leading-relaxed">
                      <span className="text-rose-500 font-mono font-bold text-base select-none">0{i+1}.</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Solutions Card */}
              <motion.div 
                variants={cardSlideUp}
                whileHover={{ y: -5, borderColor: 'rgba(16, 185, 129, 0.35)' }}
                className="bg-slate-900/30 border-l-4 border-l-emerald-500 border-t border-r border-b border-white/[0.06] backdrop-blur-xl rounded-3xl p-8 shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-6 text-emerald-500">
                  <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                    <CheckCircle2 size={20} />
                  </div>
                  <h3 className="text-lg font-extrabold text-white">Innovative Solutions</h3>
                </div>
                <ul className="space-y-4">
                  {detailsData.solutions.map((s, i) => (
                    <li key={i} className="flex gap-3 text-[13px] text-slate-300 leading-relaxed">
                      <span className="text-emerald-500 font-mono font-bold text-base select-none">0{i+1}.</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Development Timeline (Revamped vertical tracking line) */}
            <motion.section 
              variants={cardSlideUp}
              className="bg-slate-900/30 border border-white/[0.06] backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-lg"
            >
              <h2 className="text-xl font-extrabold mb-10 text-white flex items-center gap-2.5 pb-4 border-b border-white/[0.06]">
                <span className="w-1.5 h-5 bg-amber-50 rounded-full inline-block"></span>
                Milestone Development Timeline
              </h2>
              
              <div className="relative border-l border-white/[0.1] ml-4 md:ml-6 space-y-12 py-3">
                {detailsData.timeline.map((event, idx) => (
                  <div key={idx} className="relative pl-8 md:pl-10">
                    
                    {/* Glowing outer marker dot */}
                    <div className="absolute -left-[6px] top-1.5 w-3 h-3 rounded-full bg-slate-950 border border-amber-500 flex items-center justify-center shadow-lg">
                      <div className="w-1 h-1 rounded-full bg-amber-500"></div>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-[9px] font-mono font-extrabold text-amber-500 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
                          PHASE 0{idx + 1}
                        </span>
                        <h4 className="font-extrabold text-white text-base">{event.phase}</h4>
                      </div>
                      <span className="self-start md:self-center text-[10px] font-bold text-amber-400 font-mono bg-slate-900/60 border border-white/[0.06] px-2.5 py-1 rounded-md">
                        {event.date}
                      </span>
                    </div>
                    <p className="text-[13px] text-slate-400 leading-relaxed font-light">{event.desc}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Return Link bottom */}
            <div style={{ marginTop: '40px' }}>
              <Link to="/works" className="inline-flex items-center gap-2 font-bold text-slate-400 hover:text-amber-500 transition-colors uppercase tracking-widest text-xs">
                <ArrowLeft size={14} />
                <span>Return to Projects Directory</span>
              </Link>
            </div>

          </div>

          {/* RIGHT 1/3 COLUMN */}
          <div className="space-y-8">
            
            {/* Geographical HUD Card */}
            <motion.div 
              variants={cardSlideUp}
              className="bg-slate-950 border border-white/[0.06] rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle,white_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.08] relative z-10">
                <div className="flex items-center gap-2">
                  <Compass size={16} className="text-amber-500 animate-spin-slow" />
                  <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-100">GIS Coordinates</h3>
                </div>
                <span className="text-[9px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-900/30 flex items-center gap-1.5">
                  <Activity size={9} /> ACTIVE FEED
                </span>
              </div>
              
              <div className="h-64 w-full relative mb-5 z-10 rounded-2xl overflow-hidden border border-white/[0.05]">
                <MiniJapanMap location={project.location} />
              </div>

              <div className="bg-slate-900/40 rounded-2xl p-4 border border-white/[0.04] font-mono text-[11px] text-slate-300 space-y-2 z-10 relative">
                <div className="flex justify-between">
                  <span className="text-slate-500">SITE LOCATION:</span>
                  <span className="text-slate-100 font-bold">{project.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">COORDINATES:</span>
                  <span className="text-amber-400 font-extrabold">{detailsData.coordinates || "35.6762° N, 139.6503° E"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">PREFECTURE:</span>
                  <span className="text-slate-100 font-bold">{detailsData.coordinatesLabel || project.location.split(',')[0]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">STATUS:</span>
                  <span className="text-emerald-400 font-bold">COMPLETED</span>
                </div>
              </div>
            </motion.div>

            {/* Tech Stack & Sustainability specifications */}
            <motion.div 
              variants={cardSlideUp}
              className="bg-slate-900/30 border border-white/[0.06] backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-md"
            >
              <h3 className="text-base font-extrabold mb-6 text-white border-b border-white/[0.06] pb-4 flex items-center gap-2">
                <ShieldCheck size={16} className="text-amber-500" />
                Technical & Green Specs
              </h3>
              
              <ul className="space-y-6">
                <li className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Structural Safety</span>
                  <p className="text-[13px] font-bold text-slate-200">{techSpecs.safetyLevel}</p>
                </li>
                
                <li className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Core Technologies Deployed</span>
                  <p className="text-[13px] text-slate-300 leading-relaxed font-light">{techSpecs.coreTech}</p>
                </li>
                
                <li className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Environmental Strategy</span>
                  <p className="text-[13px] text-slate-300 leading-relaxed font-light">{techSpecs.sustainability}</p>
                </li>

                <li className="space-y-2 border-t border-white/[0.06] pt-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Project Quality Badges</span>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {techSpecs.certifications.map((badge, idx) => (
                      <span key={idx} className="px-2.5 py-1 text-[9px] font-extrabold text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded">
                        {badge}
                      </span>
                    ))}
                  </div>
                </li>
              </ul>
            </motion.div>

          </div>

        </motion.div>
      </div>
    </motion.div>
  );
}
