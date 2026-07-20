import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, ExternalLink } from 'lucide-react';

const pickups = [
  {
    id: "expo2027",
    title: "OBAYASHI MORI SORA MIRAI (GREEN×EXPO 2027)",
    summary: "At the Urban GX Village, Obayashi will exhibit interactive programs and bio-diverse systems, outlining the Group's goal for a sustainable future society.",
    image: "/images/expo2027_banner.png",
    link: "https://expo2027yokohama.obayashi.co.jp/en/",
    isExternal: true
  },
  {
    id: "thinking",
    title: "OBAYASHI Thinking Publication",
    summary: "Exploring our construction philosophies—from realities on-site tackling social challenges and core technologies to design concepts behind landmarks.",
    image: "/images/thinking_banner.png",
    link: "/company#publications",
    isExternal: false
  }
];

export default function PickupSlider() {
  const [current, setCurrent] = useState(0);

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + pickups.length) % pickups.length);
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % pickups.length);
  };

  return (
    <section className="pickup-section-home section-padding">
      <div className="container">
        <div className="pickup-section-header">
          <div className="section-header">
            <h2 className="section-title">PICKUP</h2>
            <p className="section-subtitle">Curated highlights and strategic initiatives from the Obayashi Group</p>
          </div>
          
          <div className="pickup-nav-buttons">
            <button onClick={handlePrev} className="pickup-nav-btn" aria-label="Previous slide">
              <ChevronLeft size={20} />
            </button>
            <button onClick={handleNext} className="pickup-nav-btn" aria-label="Next slide">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="pickup-slider-window">
          <div className="pickup-slides-track" style={{ transform: `translateX(-${current * 100}%)`, transition: 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)' }}>
            {pickups.map((item) => (
              <div key={item.id} className="pickup-slide-card">
                <div className="pickup-card-inner">
                  <div className="pickup-card-img-wrapper">
                    <img src={item.image} alt={item.title} className="pickup-card-img" loading="lazy" decoding="async" />
                  </div>
                  <div className="pickup-card-body">
                    <h3 className="pickup-card-title">{item.title}</h3>
                    <p className="pickup-card-summary">{item.summary}</p>
                    
                    {item.isExternal ? (
                      <a href={item.link} className="pickup-card-btn" target="_blank" rel="noopener noreferrer">
                        <span>Explore Official Site</span>
                        <ExternalLink size={16} />
                      </a>
                    ) : (
                      <a href={item.link} className="pickup-card-btn">
                        <span>Read Publication</span>
                        <ArrowRight size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
