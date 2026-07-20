import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import {
  ArrowLeft, MapPin, Calendar, Briefcase, DollarSign,
  Layers, Activity, ArrowRight, ShieldCheck, Info,
  X, Building2, Hammer, Ruler, CheckCircle, ChevronRight,
  Maximize2, Globe, TrendingUp, Zap, ArrowUpRight, Play
} from 'lucide-react';
import { projects } from '../data/worksContent';
import { detailedProjectContent } from '../data/projectDetails';
import MiniJapanMap from '../components/MiniJapanMap';

/* ─── Slugifier ──────────────────────────────────────── */
const slugify = (t) => t.toString().toLowerCase().replace(/\s+/g,'-').replace(/[^\w-]+/g,'').replace(/--+/g,'-').replace(/^-+/,'').replace(/-+$/,'');

/* ─── Category tokens ────────────────────────────────── */
const catTokens = {
  'Civil Infra': { pill: 'bg-sky-400/15 text-sky-300 border-sky-400/30', accent: '#38bdf8' },
  'Offices':     { pill: 'bg-amber-400/15 text-amber-300 border-amber-400/30', accent: '#fbbf24' },
  'Energy':      { pill: 'bg-emerald-400/15 text-emerald-300 border-emerald-400/30', accent: '#34d399' },
  'Education':   { pill: 'bg-violet-400/15 text-violet-300 border-violet-400/30', accent: '#a78bfa' },
  'Recreation':  { pill: 'bg-rose-400/15 text-rose-300 border-rose-400/30', accent: '#fb7185' },
};

const fallbackImg = {
  'Civil Infra': '/images/category_civil.png', 'Offices': '/images/category_offices.png',
  'Energy': '/images/category_energy.png', 'Education': '/images/category_education.png',
  'Recreation': '/images/category_recreation.png',
};

/* ─── Scroll-triggered reveal ────────────────────────── */
function Reveal({ children, delay = 0, direction = 'up', className = '' }) {
  const ref = useRef(null);
  const visible = useInView(ref, { once: true, margin: '-60px' });
  const variants = {
    up:    { hidden: { opacity: 0, y: 48 }, visible: { opacity: 1, y: 0 } },
    left:  { hidden: { opacity: 0, x: -48 }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 48 },  visible: { opacity: 1, x: 0 } },
    scale: { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } },
  };
  return (
    <motion.div ref={ref}
      variants={variants[direction]}
      initial="hidden"
      animate={visible ? 'visible' : 'hidden'}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Stagger grid ───────────────────────────────────── */
function StaggerGrid({ children, className = '' }) {
  const ref = useRef(null);
  const visible = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div ref={ref}
      initial="hidden"
      animate={visible ? 'visible' : 'hidden'}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
const StaggerItem = ({ children, className = '' }) => (
  <motion.div
    variants={{ hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22,1,0.36,1] } } }}
    className={className}
  >
    {children}
  </motion.div>
);

/* ─── Stat Counter ───────────────────────────────────── */
function StatNumber({ value, label, accent }) {
  const ref = useRef(null);
  const visible = useInView(ref, { once: true });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}
      className="flex flex-col gap-1"
    >
      <span className="text-5xl md:text-6xl font-black leading-none tracking-tight text-white"
        style={{ fontFeatureSettings: '"tnum"' }}>
        {value}
      </span>
      <span className="text-xs uppercase tracking-[0.2em] font-bold mt-1" style={{ color: accent + 'bb' }}>
        {label}
      </span>
      <div className="w-8 h-[2px] rounded-full mt-2" style={{ background: accent }} />
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════ */
export default function WorkDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lightbox, setLightbox] = useState(null);
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroY = useTransform(scrollY, [0, 500], [0, 120]);

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [id]);

  const project = projects.find(p => p.id === id || slugify(p.title) === id);

  if (!project) return (
    <div className="min-h-screen bg-[#080c14] flex flex-col items-center justify-center text-white gap-6 p-8">
      <span className="text-6xl">🏗</span>
      <h1 className="text-2xl font-black tracking-tight">Project Not Found</h1>
      <button onClick={() => navigate('/works')} className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full text-xs uppercase tracking-widest font-bold cursor-pointer transition-all">
        ← Back to Works
      </button>
    </div>
  );

  const details = detailedProjectContent[project.id] || {
    kanjiName: 'プロジェクト詳細情報', romajiName: 'Purojekuto Shōsai Jōhō',
    prefecture: 'Japan', city: 'Regional Development', tokyoDistance: 'N/A',
    airport: 'International Hub',
    locationStory: 'Strategically located to support urban density improvements and build infrastructure trust.',
    coordinates: '35.6762° N, 139.6503° E',
    challenges: ['Integrating modern structural frameworks within high-density zones.', 'Ensuring strict compliance with local seismic guidelines.'],
    solutions: ['Leveraged Building Information Modeling (BIM) for precise coordination.', 'Implemented low-carbon precast concrete solutions.'],
    timeline: [
      { phase: 'Planning & Feasibility', date: 'Q1 ' + (parseInt(project.completionYear)-2), desc: 'Comprehensive structural and geological evaluations.' },
      { phase: 'Excavation & Foundations', date: 'Q3 ' + (parseInt(project.completionYear)-2), desc: 'Deep foundation work with seismic pile driving.' },
      { phase: 'Superstructure Assembly', date: 'Q2 ' + (parseInt(project.completionYear)-1), desc: 'Hoisting of high-strength structural steel columns.' },
      { phase: 'Interior Fitting & Commissioning', date: 'Q3 ' + project.completionYear, desc: 'HVAC systems, smart sensors, and LEED certification.' },
      { phase: 'Handover & Integration', date: project.completion, desc: 'Final testing and transfer to client.' },
    ],
    specs: {
      'Structure': 'Composite Steel Frame', 'Foundation': 'Concrete bored pile columns',
      'Steel Used': 'Thermo-mechanical control steel', 'Concrete Grade': 'High strength 38 N/mm²',
      'Building Height': 'Undisclosed', 'Site Area': '12,000 m²',
      'Seismic Resistance': 'Grade 1 (Excellent)', 'Energy Rating': 'BELS 5-Star',
      'Green Certification': 'CASBEE A-Class', 'Construction Method': 'Prefabricated Modules'
    },
    culturalInsight: { title: '匠', meaning: 'Precision civil engineering built on the legacy of classical craftsmanship.', quote: '「継続は力なり」', quoteTranslation: 'Persistence becomes strength.' }
  };

  const cat = catTokens[project.category] || catTokens['Civil Infra'];
  const budget = project.details?.find(d => d.label.toLowerCase() === 'budget')?.value || null;
  const client = project.details?.find(d => d.label.toLowerCase() === 'client')?.value || null;
  const imgSrc = `/images/${project.id}.jpg`;
  const fallback = fallbackImg[project.category] || '/images/category_civil.png';

  const heroStats = [
    budget && { value: budget, label: 'Project Value' },
    details.specs['Building Height'] && details.specs['Building Height'] !== 'Undisclosed' && { value: details.specs['Building Height'], label: 'Structure Height' },
    details.specs['Site Area'] && { value: details.specs['Site Area'], label: 'Total Site Area' },
    { value: project.completionYear, label: 'Year Completed' },
  ].filter(Boolean).slice(0, 4);

  const relatedProjects = projects.filter(p => p.id !== project.id && p.category === project.category).slice(0,3);
  if (relatedProjects.length < 3) relatedProjects.push(...projects.filter(p => p.id !== project.id && !relatedProjects.find(r => r.id === p.id)).slice(0, 3 - relatedProjects.length));

  return (
    <div className="bg-[#080c14] text-white min-h-screen antialiased">

      {/* ══════════════════════════════════════════════════
          HERO — Full bleed cinematic
      ══════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative w-full min-h-screen flex flex-col justify-end overflow-hidden">

        {/* Full bleed background image with parallax */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <img src={imgSrc} alt={project.title}
            className="w-full h-full object-cover scale-110"
            onError={e => { e.target.src = fallback; e.target.onerror = null; }}
          />
          {/* Multi-layer overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080c14] via-[#080c14]/70 to-[#080c14]/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080c14]/60 via-transparent to-transparent" />
        </motion.div>

        {/* Back button */}
        <div className="absolute top-8 left-8 z-30">
          <motion.button onClick={() => navigate('/works')}
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ x: -4 }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white/80 hover:text-white text-[11px] uppercase tracking-widest font-bold cursor-pointer transition-all duration-300"
          >
            <ArrowLeft size={12} /> Back to Works
          </motion.button>
        </div>

        {/* Hero content */}
        <motion.div style={{ opacity: heroOpacity }} className="relative z-20 px-8 md:px-16 pb-16 pt-32 max-w-7xl mx-auto w-full">

          {/* Category + year */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap items-center gap-3 mb-6">
            <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-[0.2em] border backdrop-blur-sm ${cat.pill}`}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: cat.accent }} />
              {project.category}
            </span>
            <span className="text-white/40 text-xs font-mono">
              {project.designType} · {project.completionYear}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3, ease: [0.22,1,0.36,1] }}
            className="text-5xl md:text-7xl xl:text-8xl font-black tracking-[-0.03em] leading-[0.95] text-white max-w-5xl mb-4"
          >
            {project.title}
          </motion.h1>

          {/* Kanji subtitle */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            className="flex items-baseline gap-3 mb-10">
            <span className="text-lg font-medium text-white/50">{details.kanjiName}</span>
            <span className="text-xs font-mono italic text-white/30">({details.romajiName})</span>
          </motion.div>

          {/* Stats bar */}
          {heroStats.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.7 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-10 pt-10 border-t border-white/10"
            >
              {heroStats.map((s, i) => (
                <StatNumber key={i} value={s.value} label={s.label} accent={cat.accent} />
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          className="absolute bottom-8 right-8 z-20 flex flex-col items-center gap-2">
          <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
          <span className="text-[9px] text-white/30 uppercase tracking-[0.3em] font-bold rotate-90 mt-4 origin-center">Scroll</span>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════
          PROJECT OVERVIEW — Dark editorial
      ══════════════════════════════════════════════════ */}
      <section className="py-32 px-8 md:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          <Reveal direction="left" className="lg:col-span-4">
            <span className="block text-[10px] font-extrabold uppercase tracking-[0.4em] mb-4" style={{ color: cat.accent }}>
              Project Overview
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.05] text-white mb-8">
              About This<br />Development
            </h2>
            <div className="w-12 h-[2px] rounded-full mb-8" style={{ background: cat.accent }} />

            {/* Meta list */}
            <div className="space-y-5">
              {[
                { icon: <MapPin size={14} />, label: 'Location', value: project.location },
                { icon: <Calendar size={14} />, label: 'Completion', value: project.completion },
                { icon: <Hammer size={14} />, label: 'Type', value: project.designType },
                client && { icon: <Briefcase size={14} />, label: 'Client', value: client },
              ].filter(Boolean).map((item, i) => (
                <div key={i} className="flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border border-white/10 bg-white/5 text-white/40 group-hover:border-white/20 group-hover:text-white/70 transition-all duration-200">
                    {item.icon}
                  </div>
                  <div>
                    <span className="block text-[9px] text-white/30 font-bold uppercase tracking-widest">{item.label}</span>
                    <span className="block text-sm text-white/80 font-semibold">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal direction="right" delay={0.15} className="lg:col-span-8">
            <p className="text-xl md:text-2xl text-white/60 leading-relaxed font-light mb-10">
              {project.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Challenges */}
              <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-7 h-7 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center">
                    <TrendingUp size={13} className="text-amber-400" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-white/50">Challenges</span>
                </div>
                <ul className="space-y-3">
                  {details.challenges.map((c, i) => (
                    <li key={i} className="flex gap-3 text-sm text-white/50 leading-relaxed">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full border border-amber-400/30 bg-amber-400/5 flex items-center justify-center text-[9px] font-black text-amber-400 mt-0.5">{i+1}</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Solutions */}
              <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center">
                    <CheckCircle size={13} className="text-emerald-400" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-white/50">Solutions</span>
                </div>
                <ul className="space-y-3">
                  {details.solutions.map((s, i) => (
                    <li key={i} className="flex gap-3 text-sm text-white/50 leading-relaxed">
                      <CheckCircle size={14} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          TIMELINE — Horizontal scroll feel
      ══════════════════════════════════════════════════ */}
      <section className="py-24 border-y border-white/8 bg-white/[0.015]">
        <div className="px-8 md:px-16 max-w-7xl mx-auto">
          <Reveal>
            <span className="block text-[10px] font-extrabold uppercase tracking-[0.4em] mb-3" style={{ color: cat.accent }}>
              Project Lifecycle
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-16">
              Development Timeline
            </h2>
          </Reveal>

          <div className="relative">
            {/* Spine line */}
            <div className="absolute left-5 top-6 bottom-6 w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent hidden md:block" />

            <div className="space-y-0">
              {details.timeline.map((event, idx) => {
                const isLast = idx === details.timeline.length - 1;
                return (
                  <Reveal key={idx} delay={idx * 0.07}>
                    <div className="flex gap-8 group md:pl-0">
                      {/* Timeline node */}
                      <div className="flex-shrink-0 flex flex-col items-center relative hidden md:flex" style={{ width: '40px' }}>
                        <motion.div
                          whileHover={{ scale: 1.4 }}
                          className="w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 z-10 bg-[#080c14]"
                          style={{ borderColor: 'rgba(255,255,255,0.15)' }}
                          onMouseEnter={e => e.currentTarget.style.borderColor = cat.accent}
                          onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'}
                        >
                          <div className="w-3 h-3 rounded-full bg-white/20 transition-all duration-300 group-hover:scale-125"
                            style={{ }} />
                        </motion.div>
                      </div>

                      {/* Content card */}
                      <div className={`flex-1 ${isLast ? 'pb-0' : 'pb-6'}`}>
                        <motion.div
                          whileHover={{ x: 4 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                          className="rounded-2xl border border-white/8 bg-white/[0.03] hover:bg-white/[0.05] hover:border-white/15 p-6 transition-all duration-300 cursor-default"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                            <div className="flex items-center gap-3">
                              <span className="text-[9px] font-mono font-bold bg-white/5 border border-white/10 px-2 py-1 rounded text-white/30">
                                {String(idx + 1).padStart(2, '0')}
                              </span>
                              <h4 className="font-black text-white text-sm md:text-base group-hover:text-white transition-colors">
                                {event.phase}
                              </h4>
                            </div>
                            <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full border text-xs"
                              style={{ color: cat.accent, borderColor: cat.accent + '33', background: cat.accent + '10' }}>
                              {event.date}
                            </span>
                          </div>
                          <p className="text-sm text-white/40 leading-relaxed">{event.desc}</p>
                        </motion.div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SPECS — Full width dark table
      ══════════════════════════════════════════════════ */}
      <section className="py-32 px-8 md:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <Reveal direction="left" className="lg:col-span-4">
            <span className="block text-[10px] font-extrabold uppercase tracking-[0.4em] mb-3" style={{ color: cat.accent }}>
              Technical Data
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-6">
              Specifications
            </h2>
            <div className="w-12 h-[2px] rounded-full mb-8" style={{ background: cat.accent }} />
            <p className="text-white/40 text-sm leading-relaxed">
              Detailed engineering parameters and material specifications for this project.
            </p>

            {/* Engineering highlights */}
            <div className="mt-10 grid grid-cols-2 gap-3">
              {[
                { icon: <Activity size={16} />, label: 'Seismic Grade', value: details.specs['Seismic Resistance'] || 'Grade 1', color: 'from-red-500/10 to-orange-500/10', border: 'border-red-500/20', text: 'text-red-400' },
                { icon: <Zap size={16} />,      label: 'Energy Rating', value: details.specs['Energy Rating'] || 'BELS 5-Star', color: 'from-emerald-500/10 to-teal-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400' },
                { icon: <ShieldCheck size={16} />, label: 'Certification', value: details.specs['Green Certification'] || 'CASBEE A', color: 'from-blue-500/10 to-indigo-500/10', border: 'border-blue-500/20', text: 'text-blue-400' },
                { icon: <Layers size={16} />,   label: 'Build Method', value: details.specs['Construction Method'] || 'Modular', color: 'from-purple-500/10 to-violet-500/10', border: 'border-purple-500/20', text: 'text-purple-400' },
              ].map((card, i) => (
                <Reveal key={i} delay={i * 0.05} scale>
                  <div className={`rounded-xl border p-4 bg-gradient-to-br ${card.color} ${card.border} flex flex-col gap-2`}>
                    <div className={`${card.text}`}>{card.icon}</div>
                    <span className="text-[9px] text-white/30 uppercase tracking-widest font-bold">{card.label}</span>
                    <span className="text-xs text-white/70 font-bold leading-tight">{card.value}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>

          <Reveal direction="right" delay={0.1} className="lg:col-span-8">
            <div className="rounded-2xl overflow-hidden border border-white/10">
              <div className="px-6 py-4 border-b border-white/10"
                style={{ background: `linear-gradient(135deg, ${cat.accent}18, transparent)` }}>
                <div className="grid grid-cols-2 text-[9px] font-bold uppercase tracking-[0.25em] text-white/30">
                  <span>Parameter</span>
                  <span>Specification</span>
                </div>
              </div>
              <div className="divide-y divide-white/5">
                {Object.entries(details.specs).map(([key, val], idx) => (
                  <motion.div key={idx}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.03, duration: 0.45 }}
                    whileHover={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
                    className="grid grid-cols-2 gap-4 px-6 py-4 transition-colors duration-200 cursor-default"
                  >
                    <span className="text-sm font-bold text-white/40">{key}</span>
                    <span className="text-sm text-white/70">{val}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          GALLERY — Immersive image showcase
      ══════════════════════════════════════════════════ */}
      <section className="py-24 border-t border-white/8">
        <div className="px-8 md:px-16 max-w-7xl mx-auto mb-12">
          <Reveal>
            <span className="block text-[10px] font-extrabold uppercase tracking-[0.4em] mb-3" style={{ color: cat.accent }}>
              Visual Documentation
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white">
              Site Gallery
            </h2>
          </Reveal>
        </div>

        <StaggerGrid className="px-8 md:px-16 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { src: imgSrc, caption: 'Facade Elevation & Exterior', label: '01' },
            { src: fallbackImg[project.category] || fallback, caption: 'Site Overview & Infrastructure', label: '02' },
            { src: '/images/rokka_mori.png', caption: 'Environmental Integration', label: '03' },
          ].map((img, idx) => (
            <StaggerItem key={idx}>
              <motion.div onClick={() => setLightbox(img)}
                whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 250, damping: 22 }}
                className="group relative cursor-pointer rounded-2xl overflow-hidden border border-white/10 aspect-[4/3]"
              >
                <img src={img.src} alt={img.caption} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  onError={e => { e.target.src = fallback; e.target.onerror = null; }} />

                {/* Dark overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080c14]/80 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-400" />

                {/* Label */}
                <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <span className="text-[10px] font-black text-white">{img.label}</span>
                </div>

                {/* Expand icon */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/0 group-hover:bg-white/10 border border-white/0 group-hover:border-white/20 flex items-center justify-center transition-all duration-300">
                  <Maximize2 size={13} className="text-white/0 group-hover:text-white transition-colors duration-300" />
                </div>

                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-xs text-white font-bold">{img.caption}</p>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[9000] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-12"
          >
            <motion.div initial={{ scale: 0.88, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }} transition={{ type: 'spring', stiffness: 250, damping: 28 }}
              className="relative max-w-5xl w-full rounded-2xl overflow-hidden border border-white/10"
              onClick={e => e.stopPropagation()}
            >
              <button onClick={() => setLightbox(null)}
                className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full flex items-center justify-center cursor-pointer transition-all">
                <X size={14} className="text-white" />
              </button>
              <img src={lightbox.src} alt={lightbox.caption} className="w-full max-h-[78vh] object-contain bg-[#0d1220]" />
              <div className="p-5 bg-[#0d1220] border-t border-white/10">
                <p className="text-sm font-bold text-white">{lightbox.caption}</p>
                <p className="text-xs text-white/30 mt-0.5">Click backdrop to close</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════
          LOCATION — Dark map section
      ══════════════════════════════════════════════════ */}
      <section className="py-32 border-t border-white/8 bg-white/[0.015]">
        <div className="px-8 md:px-16 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-stretch">

            <Reveal direction="left" className="lg:col-span-5 flex flex-col gap-8 justify-center">
              <div>
                <span className="block text-[10px] font-extrabold uppercase tracking-[0.4em] mb-3" style={{ color: cat.accent }}>
                  Site Location
                </span>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
                  Regional<br />Footprint
                </h2>
                <div className="w-12 h-[2px] rounded-full mb-6" style={{ background: cat.accent }} />
              </div>

              <p className="text-white/50 text-base leading-relaxed">{details.locationStory}</p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Prefecture', value: details.prefecture },
                  { label: 'City / District', value: details.city },
                  { label: 'Coordinates', value: details.coordinates },
                  { label: 'Nearest Hub', value: details.airport },
                ].map((item, i) => (
                  <div key={i} className="rounded-xl border border-white/8 bg-white/[0.03] p-4">
                    <span className="block text-[9px] text-white/25 font-bold uppercase tracking-widest mb-1">{item.label}</span>
                    <span className="block text-sm text-white/70 font-bold truncate">{item.value}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl border border-white/8 bg-white/[0.03]">
                <div className="w-8 h-8 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center flex-shrink-0">
                  <Globe size={15} className="text-white/40" />
                </div>
                <div>
                  <span className="block text-[9px] text-white/25 font-bold uppercase tracking-widest">Base Distance</span>
                  <span className="text-sm text-white/70 font-bold">{details.tokyoDistance} from Central Tokyo</span>
                </div>
                <span className="ml-auto text-[9px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-0.5 rounded-full">
                  Active Site
                </span>
              </div>
            </Reveal>

            <Reveal direction="right" delay={0.1} className="lg:col-span-7">
              <div className="rounded-2xl overflow-hidden border border-white/10 h-full min-h-[400px] relative">
                <MiniJapanMap location={project.location} />
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md border border-white/15 rounded-xl px-4 py-2.5">
                  <span className="block text-[9px] text-white/40 font-bold uppercase tracking-widest">Location</span>
                  <span className="block text-sm text-white font-black">{project.location}</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          ZEN CULTURAL SECTION — Immersive dark quote
      ══════════════════════════════════════════════════ */}
      <section className="py-40 relative overflow-hidden border-t border-white/8">
        {/* Radial glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="w-[600px] h-[600px] rounded-full blur-[120px]"
            style={{ background: `radial-gradient(circle, ${cat.accent}20, transparent)` }}
          />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center px-8">
          <Reveal>
            {/* Hanko stamp */}
            <motion.div
              whileHover={{ rotate: [0, 8, -4, 6, 0], scale: 1.05 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center justify-center w-24 h-24 rounded-full border-[2.5px] border-dashed font-serif font-black text-4xl select-none mb-10"
              style={{ borderColor: cat.accent, color: cat.accent }}
            >
              <div className="w-20 h-20 rounded-full border flex items-center justify-center"
                style={{ borderColor: cat.accent + '60' }}>
                {details.culturalInsight.title}
              </div>
            </motion.div>
          </Reveal>

          <Reveal delay={0.1}>
            <span className="block text-[10px] font-extrabold uppercase tracking-[0.4em] mb-8" style={{ color: cat.accent }}>
              Craftsmanship Philosophy
            </span>
          </Reveal>

          <Reveal delay={0.2}>
            <blockquote className="text-5xl md:text-6xl font-black text-white tracking-tight font-serif leading-tight mb-4">
              {details.culturalInsight.quote}
            </blockquote>
            <p className="text-sm font-mono italic text-white/30 mb-12">
              — {details.culturalInsight.quoteTranslation}
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm">
              <p className="text-base text-white/50 leading-relaxed">{details.culturalInsight.meaning}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          RELATED PROJECTS
      ══════════════════════════════════════════════════ */}
      <section className="py-24 border-t border-white/8 bg-white/[0.015]">
        <div className="px-8 md:px-16 max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <Reveal>
              <span className="block text-[10px] font-extrabold uppercase tracking-[0.4em] mb-3" style={{ color: cat.accent }}>
                More Works
              </span>
              <h2 className="text-4xl font-black tracking-tight text-white">Related Projects</h2>
            </Reveal>
            <Reveal direction="right">
              <Link to="/works" className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors">
                View All <ArrowRight size={12} />
              </Link>
            </Reveal>
          </div>

          <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {relatedProjects.map((p) => {
              const pc = catTokens[p.category] || catTokens['Civil Infra'];
              return (
                <StaggerItem key={p.id}>
                  <Link to={`/works/${p.id}`}
                    className="group relative flex flex-col rounded-2xl overflow-hidden border border-white/8 hover:border-white/20 transition-all duration-400 bg-white/[0.02] hover:bg-white/[0.04]"
                  >
                    <div className="relative h-52 overflow-hidden">
                      <img src={`/images/${p.id}.jpg`} alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        onError={e => { e.target.src = fallbackImg[p.category] || fallback; e.target.onerror = null; }} />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#080c14]/80 to-transparent" />
                      <span className={`absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-widest border backdrop-blur-sm ${pc.pill}`}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: pc.accent }} />
                        {p.category}
                      </span>
                    </div>
                    <div className="p-5 flex flex-col gap-3 flex-grow">
                      <h4 className="font-black text-white/80 group-hover:text-white text-sm leading-snug line-clamp-2 transition-colors">{p.title}</h4>
                      <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/8">
                        <span className="flex items-center gap-1.5 text-xs text-white/30">
                          <MapPin size={10} style={{ color: pc.accent }} /> {p.location}
                        </span>
                        <ArrowUpRight size={14} className="text-white/20 group-hover:text-white/50 transition-colors" />
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerGrid>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          CTA FOOTER
      ══════════════════════════════════════════════════ */}
      <section className="py-40 relative overflow-hidden border-t border-white/8">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto text-center px-8">
          <Reveal>
            <span className="block text-[10px] font-extrabold uppercase tracking-[0.4em] mb-4" style={{ color: cat.accent }}>
              Start a Project
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.05] mb-6">
              Build Something<br />Extraordinary
            </h2>
            <p className="text-white/40 text-base leading-relaxed mb-10">
              Obayashi Corporation handles complex structural builds and green utility infrastructure globally.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/works"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest text-[#080c14] transition-all duration-300 hover:scale-105"
                style={{ background: cat.accent }}
              >
                Explore All Works <ArrowRight size={14} />
              </Link>
              <Link to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest text-white border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Bottom wordmark */}
        <div className="mt-28 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-white/20" />
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: cat.accent }} />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-white/20" />
          </div>
          <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.4em]">
            Precision · Trust · Craftsmanship
          </p>
        </div>
      </section>

    </div>
  );
}
