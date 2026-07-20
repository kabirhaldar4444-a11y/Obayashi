import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, MapPin, Calendar, ChevronLeft, ChevronRight, Layers, Volume2 } from "lucide-react";

/* ─── Ongoing Japan Projects Only ─── */
const PROJECTS = [
  {
    id: "takanawa",
    index: "01",
    kanji: "高輪",
    japaneseName: "高輪ゲートウェイシティ",
    japaneseRomaji: "Takanawa Gētowei Shiti",
    title: "Takanawa Gateway City",
    subtitle: "Smart City Development",
    desc: "A next-generation transit-oriented smart city rising around Takanawa Gateway Station — blending mass timber architecture with AI-powered infrastructure.",
    image: "/images/work_takanawa_gatewa_104.jpg",
    link: "/works/work_takanawa_gatewa_104",
    location: "Tokyo, Japan",
    year: "2025★",
    type: "Transport Hub · Ongoing",
    palette: { accent: "#a855f7", glow: "rgba(168,85,247,0.6)", dim: "rgba(168,85,247,0.2)", text: "#d8b4fe" },
  },
  {
    id: "osaka-ir",
    index: "02",
    kanji: "夢洲",
    japaneseName: "大阪IR統合型リゾート",
    japaneseRomaji: "Ōsaka Ai-āru Rizōto",
    title: "Osaka IR Resort",
    subtitle: "Integrated Resort",
    desc: "A landmark waterfront entertainment district on Yumeshima Island — luxury hotels, convention halls, and exhibition venues redefining Osaka's skyline.",
    image: "/images/work_osaka_ir_integr_106.jpg",
    link: "/works/work_osaka_ir_integr_106",
    location: "Osaka, Japan",
    year: "2030",
    type: "Mixed-Use Resort · Ongoing",
    palette: { accent: "#f59e0b", glow: "rgba(245,158,11,0.6)", dim: "rgba(245,158,11,0.2)", text: "#fde68a" },
  },
  {
    id: "hokkaido-hvdc",
    index: "03",
    kanji: "連系",
    japaneseName: "北海道・本州間HVDC送電連携",
    japaneseRomaji: "Hokkaidō Honshū-kan HVDC Sōden Renkei",
    title: "Hokkaido–Honshu HVDC Link",
    subtitle: "Power Transmission",
    desc: "Japan's largest HVDC interconnection project — channeling clean wind energy across the Tsugaru Strait to power Honshu's industrial heartland.",
    image: "/images/work_hokkaido_honshu_105.jpg",
    link: "/works/work_hokkaido_honshu_105",
    location: "Hokkaido & Honshu, Japan",
    year: "2032",
    type: "Energy Infrastructure · Ongoing",
    palette: { accent: "#22d3ee", glow: "rgba(34,211,238,0.6)", dim: "rgba(34,211,238,0.2)", text: "#a5f3fc" },
  },
  {
    id: "tokyo-flood",
    index: "04",
    kanji: "防水",
    japaneseName: "首都圏外郭放水路施設増強",
    japaneseRomaji: "Shutoken Gaikaku Hōsuiro Setsubi Zōkyō",
    title: "Tokyo Flood Shield",
    subtitle: "Urban Resilience",
    desc: "A monumental underground flood-protection system — massive silos and 12-metre tunnels bored beneath Tokyo to guard millions from catastrophic flood events.",
    image: "/images/work_tokyo_metropoli_107.jpg",
    link: "/works/work_tokyo_metropoli_107",
    location: "Saitama, Japan",
    year: "2033",
    type: "Civil Engineering · Ongoing",
    palette: { accent: "#10b981", glow: "rgba(16,185,129,0.6)", dim: "rgba(16,185,129,0.2)", text: "#6ee7b7" },
  },
  {
    id: "chuo-maglev",
    index: "05",
    kanji: "磁浮",
    japaneseName: "中央新幹線南アルプストンネル",
    japaneseRomaji: "Chūō Shinkansen Minami Arupusu Tonneru",
    title: "Chuo Maglev Tunnel",
    subtitle: "Maglev Railway",
    desc: "The world's most ambitious railway tunnel — 25 km bored through the Southern Alps to carry Japan's 500 km/h superconducting Maglev between Tokyo and Nagoya.",
    image: "/images/work_chuo_shinkansen_109.jpg",
    link: "/works/work_chuo_shinkansen_109",
    location: "Shizuoka, Japan",
    year: "2037",
    type: "Maglev Infrastructure · Ongoing",
    palette: { accent: "#3b82f6", glow: "rgba(59,130,246,0.6)", dim: "rgba(59,130,246,0.2)", text: "#93c5fd" },
  },
];

const TOTAL = PROJECTS.length;
const AUTOPLAY_MS = 4500;

/* Smooth easing — expo-out feels natural and premium */
const CARD_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
const CARD_DURATION = "0.72s";

function mod(n, m) { return ((n % m) + m) % m; }

function slotOf(cardIdx, activeIdx) {
  const raw = cardIdx - activeIdx;
  const half = Math.floor(TOTAL / 2);
  let d = raw;
  if (d > half) d -= TOTAL;
  if (d < -half) d += TOTAL;
  return d;
}

/* Returns a single composite CSS transform string + opacity + zIndex.
   Using one transform = one GPU compositor operation = buttery smooth. */
function cardStyle(slot) {
  const map = {
    "-2": { tx: -680, tz: -260, ry: 46,  scale: 0.56, opacity: 0.22, zi: 1 },
    "-1": { tx: -330, tz: -110, ry: 26,  scale: 0.77, opacity: 0.70, zi: 2 },
     "0": { tx:    0, tz:    0, ry:  0,  scale: 1.00, opacity: 1.00, zi: 4 },
     "1": { tx:  330, tz: -110, ry: -26, scale: 0.77, opacity: 0.70, zi: 2 },
     "2": { tx:  680, tz: -260, ry: -46, scale: 0.56, opacity: 0.22, zi: 1 },
  };
  const c = map[String(slot)] || { tx: 0, tz: -800, ry: 0, scale: 0.25, opacity: 0, zi: 0 };
  return {
    transform: `translateX(${c.tx}px) translateZ(${c.tz}px) rotateY(${c.ry}deg) scale(${c.scale})`,
    opacity: c.opacity,
    zIndex: c.zi,
    /* Single-property transition = compositor-thread only, zero jank */
    transition: `transform ${CARD_DURATION} ${CARD_EASE}, opacity 0.5s ease`,
    willChange: "transform, opacity",
  };
}

const PARTICLES = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  x: (i * 9.5 + Math.sin(i * 1.3) * 18 + 5),
  y: (i * 9.0 + Math.cos(i * 0.9) * 22 + 5),
  size: (i % 3) * 0.9 + 0.6,
  dur: 12 + (i % 5) * 2.5,
  delay: (i % 4) * 2.0,
  drift: (i % 2 === 0 ? 1 : -1) * (15 + (i % 4) * 8),
}));

/* Prefers-reduced-motion check */
const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ─── Japanese TTS helper ─── */
function speakJapanese(text) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "ja-JP";
  utter.rate = 0.85;
  utter.pitch = 1.0;
  const voices = window.speechSynthesis.getVoices();
  const jaVoice = voices.find(v => v.lang.startsWith("ja"));
  if (jaVoice) utter.voice = jaVoice;
  window.speechSynthesis.speak(utter);
}

export default function HeroSlider() {
  const [active, setActive]   = useState(0);
  const [speaking, setSpeaking] = useState(null);
  const timerRef = useRef(null);

  const go = useCallback((delta) => {
    setActive(prev => mod(prev + delta, TOTAL));
  }, []);

  const goTo = useCallback((idx) => setActive(idx), []);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    timerRef.current = setInterval(() => go(1), AUTOPLAY_MS);
    return () => clearInterval(timerRef.current);
  }, [go]);

  const resetTimer = useCallback((fn) => {
    clearInterval(timerRef.current);
    fn();
    if (!prefersReducedMotion()) {
      timerRef.current = setInterval(() => go(1), AUTOPLAY_MS);
    }
  }, [go]);

  useEffect(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
    }
  }, []);

  const handleSpeak = useCallback((e, proj) => {
    e.stopPropagation();
    setSpeaking(proj.id);
    speakJapanese(proj.japaneseName);
    setTimeout(() => setSpeaking(null), 3000);
  }, []);

  const ap = PROJECTS[active];

  return (
    <section className="hs-root" aria-label="Featured Projects Hero">

      {/* Cinematic Background */}
      <div className="hs-backdrop">
        <AnimatePresence>
          <motion.div
            key={ap.id + "-bg"}
            className="hs-bg-img"
            style={{ backgroundImage: "url(" + ap.image + ")" }}
            initial={{ opacity: 0, scale: 1.07 }}
            animate={{ opacity: 1,  scale: 1.0  }}
            exit={   { opacity: 0,  scale: 0.96 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          />
        </AnimatePresence>
        <div className="hs-vignette" />
        <motion.div
          className="hs-color-wash"
          animate={{ background: `radial-gradient(ellipse 70% 60% at 15% 85%, ${ap.palette.dim} 0%, transparent 70%)` }}
          transition={{ duration: 1.2 }}
        />
      </div>

      {/* Particle Field */}
      <div className="hs-particles" aria-hidden="true">
        {PARTICLES.map(p => (
          <span
            key={p.id}
            className="hs-particle"
            style={{
              left: p.x + "%",
              top:  p.y + "%",
              width:  p.size + "px",
              height: p.size + "px",
              animationDuration: p.dur + "s",
              animationDelay:    p.delay + "s",
              "--drift": p.drift + "px",
            }}
          />
        ))}
      </div>

      {/* Ambient Grid Lines */}
      <div className="hs-grid-lines" aria-hidden="true">
        {[20, 40, 60, 80].map(v => (
          <div key={v} className="hs-vline" style={{ left: v + "%" }} />
        ))}
      </div>

      {/* Top Bar */}
      <div className="hs-topbar">
        <span className="hs-topbar-brand">株式会社大林組 · OBAYASHI CORPORATION</span>
        <AnimatePresence mode="wait">
          <motion.span
            key={ap.id + "-type"}
            className="hs-topbar-type"
            style={{ color: ap.palette.text, borderColor: ap.palette.accent + "55" }}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y:  0 }}
            exit={   { opacity: 0, y:  6 }}
            transition={{ duration: 0.35 }}
          >
            {ap.type}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* 3D CARD STAGE — plain divs + CSS transitions for max smoothness */}
      <div className="hs-stage" aria-label="Project cards carousel">
        <div className="hs-perspective">
          {PROJECTS.map((proj, idx) => {
            const slot    = slotOf(idx, active);
            if (Math.abs(slot) > 2) return null;
            const isAct   = slot === 0;
            const isSpeaking = speaking === proj.id;
            const cs      = cardStyle(slot);

            return (
              <div
                key={proj.id}
                className={"hs-card" + (isAct ? " hs-card--active" : "")}
                style={cs}
                onClick={() => !isAct && resetTimer(() => goTo(idx))}
              >
                <div
                  className="hs-card-img"
                  style={{ backgroundImage: `url(${proj.image})` }}
                />
                <div className="hs-card-overlay" />

                {/* Glow ring — only visible on active */}
                <div
                  className="hs-card-glow-ring"
                  style={{
                    opacity: isAct ? 1 : 0,
                    boxShadow: isAct
                      ? `0 0 0 1.5px ${proj.palette.accent}88, 0 0 70px ${proj.palette.glow}, inset 0 0 30px ${proj.palette.dim}`
                      : "none",
                    transition: "opacity 0.5s ease, box-shadow 0.5s ease",
                  }}
                />

                {/* 🔊 Sound Button */}
                <button
                  className={"hs-card-sound-btn" + (isSpeaking ? " hs-card-sound-btn--active" : "")}
                  style={{
                    "--accent": proj.palette.accent,
                    "--glow":   proj.palette.glow,
                    "--text":   proj.palette.text,
                  }}
                  onClick={(e) => handleSpeak(e, proj)}
                  aria-label={"Hear Japanese name: " + proj.japaneseName}
                  title={proj.japaneseName + " (" + proj.japaneseRomaji + ")"}
                >
                  <Volume2 size={13} />
                </button>

                <div className="hs-card-body">
                  <span className="hs-card-index">{proj.index}</span>
                  <span className="hs-card-kanji" style={{ color: proj.palette.text }}>{proj.kanji}</span>
                  <div className="hs-card-info">
                    <p className="hs-card-subtitle">{proj.subtitle}</p>
                    <h3 className="hs-card-title">{proj.title}</h3>
                  </div>
                  <div className="hs-card-meta">
                    <span className="hs-card-meta-item">
                      <MapPin size={10} />
                      {proj.location}
                    </span>
                    <span className="hs-card-meta-sep" />
                    <span className="hs-card-meta-item">
                      <Calendar size={10} />
                      {proj.year}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Left Copy Panel */}
      <div className="hs-copy-panel">
        <AnimatePresence mode="wait">
          <motion.div
            key={ap.id + "-copy"}
            className="hs-copy-inner"
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1,  x:   0 }}
            exit={   { opacity: 0,  x:  18 }}
            transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="hs-copy-pill" style={{ background: ap.palette.dim, borderColor: ap.palette.accent + "44" }}>
              <span className="hs-copy-pill-dot" style={{ background: ap.palette.accent }} />
              <span style={{ color: ap.palette.text }}>ONGOING PROJECT</span>
            </div>
            <div className="hs-copy-kanji-bg" aria-hidden="true">{ap.kanji}</div>
            <p className="hs-copy-type">{ap.type}</p>
            <h1 className="hs-copy-title">{ap.title}</h1>
            <p className="hs-copy-desc">{ap.desc}</p>
            <div className="hs-copy-meta-strip">
              <div className="hs-meta-block">
                <MapPin size={13} style={{ color: ap.palette.text }} />
                <div>
                  <span className="hs-meta-label">Location</span>
                  <span className="hs-meta-val">{ap.location}</span>
                </div>
              </div>
              <div className="hs-meta-divider" />
              <div className="hs-meta-block">
                <Calendar size={13} style={{ color: ap.palette.text }} />
                <div>
                  <span className="hs-meta-label">Completion</span>
                  <span className="hs-meta-val">{ap.year}</span>
                </div>
              </div>
              <div className="hs-meta-divider" />
              <div className="hs-meta-block">
                <Layers size={13} style={{ color: ap.palette.text }} />
                <div>
                  <span className="hs-meta-label">Category</span>
                  <span className="hs-meta-val">{ap.subtitle}</span>
                </div>
              </div>
            </div>
            <div className="hs-copy-ctas">
              <Link
                to={ap.link}
                className="hs-cta-primary"
                style={{ "--accent": ap.palette.accent, "--glow": ap.palette.glow }}
              >
                <span>VIEW PROJECT</span>
                <ArrowUpRight size={15} />
              </Link>
              <Link to="/works" className="hs-cta-ghost">
                ALL PROJECTS
                <ChevronRight size={14} />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <button className="hs-nav hs-nav--prev" onClick={() => resetTimer(() => go(-1))} aria-label="Previous project">
        <ChevronLeft size={22} />
      </button>
      <button className="hs-nav hs-nav--next" onClick={() => resetTimer(() => go(1))} aria-label="Next project">
        <ChevronRight size={22} />
      </button>

      {/* Bottom HUD */}
      <div className="hs-hud">
        <div className="hs-dots">
          {PROJECTS.map((p, i) => (
            <button
              key={p.id}
              className={"hs-dot" + (i === active ? " hs-dot--active" : "")}
              style={i === active ? { background: ap.palette.accent, boxShadow: "0 0 12px " + ap.palette.glow } : {}}
              onClick={() => resetTimer(() => goTo(i))}
              aria-label={"Go to " + p.title}
            />
          ))}
        </div>
        <div className="hs-progress-track">
          <motion.div
            className="hs-progress-fill"
            style={{ background: ap.palette.accent }}
            key={active + "-progress"}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
          />
        </div>
        <div className="hs-counter">
          <AnimatePresence mode="wait">
            <motion.span
              key={active}
              className="hs-counter-num"
              style={{ color: ap.palette.text }}
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0,  opacity: 1 }}
              exit={   { y:-14, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {ap.index}
            </motion.span>
          </AnimatePresence>
          <span className="hs-counter-sep">/</span>
          <span className="hs-counter-total">{String(TOTAL).padStart(2, "0")}</span>
        </div>
      </div>

    </section>
  );
}
