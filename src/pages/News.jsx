import React, { useState, useEffect } from 'react';
import { FileText, ChevronRight, X, ArrowLeft, ExternalLink, Calendar } from 'lucide-react';
import { newsArticles, newsCategories } from '../data/newsContent';

export default function News() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace('#', '');
      setActiveCategory("ALL");
      setExpandedId(id);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, []);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredNews = activeCategory === "ALL"
    ? newsArticles
    : newsArticles.filter(n => n.category === activeCategory);

  return (
    <div className="news-page fade-in">
      {/* Page Hero */}
      <div className="page-hero-banner" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(/images/rokka_mori.png)` }}>
        <div className="container hero-banner-inner">
          <h1 className="hero-banner-title">NEWS CENTER</h1>
          <p className="hero-banner-subtitle">Official press releases, security alerts, index listings, and achievements</p>
        </div>
      </div>

      <div className="container section-padding">
        {/* Category tabs */}
        <div className="news-tabs-container" style={{ marginBottom: '40px' }}>
          <ul className="news-tabs-list">
            {newsCategories.map((cat, idx) => (
              <li key={idx}>
                <button
                  onClick={() => {
                    setActiveCategory(cat);
                    setExpandedId(null);
                  }}
                  className={`news-tab-btn ${activeCategory === cat ? 'active' : ''}`}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Directory List */}
        <div className="news-directory-wrapper">
          {filteredNews.length > 0 ? (
            <ul className="news-directory-list">
              {filteredNews.map((item) => (
                <li key={item.id} id={item.id} className="news-directory-item">
                  <div className="news-dir-header">
                    <div className="news-dir-meta">
                      <time className="news-dir-date">
                        <Calendar size={12} style={{ marginRight: '6px', display: 'inline-block', verticalAlign: 'middle' }} />
                        <span>{item.dateStr}</span>
                      </time>
                      <span className={`news-category-badge badge-${item.category.toLowerCase().replace(/\s+/g, '-')}`}>
                        {item.category}
                      </span>
                    </div>
                    
                    <div className="news-dir-main">
                      {item.isExternal ? (
                        <a href={item.link} className="news-dir-link" target="_blank" rel="noopener noreferrer">
                          <h3 className="news-dir-title">{item.title}</h3>
                          <div className="news-pdf-indicator">
                            <FileText size={14} />
                            <span>{item.fileSize || 'PDF'}</span>
                            <ExternalLink size={12} />
                          </div>
                        </a>
                      ) : (
                        <button onClick={() => toggleExpand(item.id)} className="news-dir-expand-btn">
                          <h3 className="news-dir-title text-left">{item.title}</h3>
                          <ChevronRight size={18} className={`news-dir-chevron ${expandedId === item.id ? 'rotated' : ''}`} />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Expanded Body Drawer */}
                  {expandedId === item.id && !item.isExternal && (
                    <div className="news-dir-body-drawer fade-in">
                      <p className="news-body-summary"><strong>Summary:</strong> {item.summary}</p>
                      <div className="news-body-content">
                        {item.content.split('\n\n').map((para, pIdx) => (
                          <p key={pIdx} className="news-body-paragraph">{para}</p>
                        ))}
                      </div>
                      <button onClick={() => setExpandedId(null)} className="news-body-close-btn">
                        <span>Close Article</span>
                        <X size={14} />
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <div className="news-empty-state">
              <p>No news items match your category selection.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
