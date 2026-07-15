import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const slides = [
  {
    id: "rokka",
    title: "Rokka no Mori Art Pavilions",
    subtitle: "Merging modern structure with local wildlife in Hokkaido.",
    image: "/images/rokka_mori.png",
    link: "/works/work_haneda_airport__100"
  },
  {
    id: "jamuna",
    title: "Jamuna Railway Bridge Project",
    subtitle: "A massive steel civil infrastructure network connecting Bangladesh.",
    image: "/images/jamuna_bridge.png",
    link: "/works/work_yokohama_landma_102"
  },
  {
    id: "ones",
    title: "O-NES TOWER Sustainable Hub",
    subtitle: "Seismic resilience and smart cooling systems in Bangkok.",
    image: "/images/ones_tower.png",
    link: "/works/work_osaka_umeda_tw_104"
  },
  {
    id: "kubota",
    title: "Kubota Global Institute Campus",
    subtitle: "Designing research ecosystems like micro-cities to inspire collaboration.",
    image: "/images/kubota_inst.png",
    link: "/works/work_nagoya_station__103"
  }
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
  };

  useEffect(() => {
    if (isPlaying) {
      startTimer();
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, current]);

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="hero-slider-section">
      <div className="hero-slides-container">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`hero-slide ${index === current ? 'active' : ''}`}
            style={{ backgroundImage: `linear-gradient(165deg, rgba(11,61,107,0.55) 0%, rgba(0,0,0,0.20) 40%, rgba(0,0,0,0.65) 100%), url(${slide.image})` }}
          >
            {index === current && (
              <div className="container hero-slide-content fade-in">
                <h2 className="hero-slide-title">{slide.title}</h2>
                <p className="hero-slide-subtitle">{slide.subtitle}</p>
                <Link to={slide.link} className="hero-slide-btn">
                  <span>View Details</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Controls Overlay */}
      <div className="hero-slider-controls">
        <div className="container controls-inner">
          {/* Number Counter */}
          <div className="slide-counter">
            <span className="current-num">{String(current + 1).padStart(2, '0')}</span>
            <span className="counter-divider">/</span>
            <span className="total-num">{String(slides.length).padStart(2, '0')}</span>
          </div>

          {/* Action Buttons */}
          <div className="controls-buttons-group">
            <button onClick={handlePrev} className="slide-nav-btn" aria-label="Previous slide">
              <ChevronLeft size={18} />
            </button>
            <button onClick={handleNext} className="slide-nav-btn" aria-label="Next slide">
              <ChevronRight size={18} />
            </button>
            <button onClick={togglePlay} className="slide-play-pause" aria-label={isPlaying ? "Pause autoplay" : "Start autoplay"}>
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            </button>
          </div>
        </div>
      </div>

      {/* Progress Bars */}
      <div className="hero-progress-indicators">
        {slides.map((_, idx) => (
          <div
            key={idx}
            className={`progress-indicator-dot ${idx === current ? 'active' : ''}`}
            onClick={() => setCurrent(idx)}
          />
        ))}
      </div>
    </section>
  );
}
