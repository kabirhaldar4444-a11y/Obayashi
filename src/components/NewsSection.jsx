import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, ExternalLink } from 'lucide-react';
import { newsArticles, newsCategories } from '../data/newsContent';

export default function NewsSection() {
  const [activeCategory, setActiveCategory] = useState("ALL");

  const filteredNews = activeCategory === "ALL"
    ? newsArticles
    : newsArticles.filter(n => n.category === activeCategory);

  // Take top 6 news items for the dashboard preview
  const displayNews = filteredNews.slice(0, 6);

  return (
    <section className="news-section-home section-padding light-bg-section">
      <div className="container">
        <div className="news-section-header">
          <div className="section-header">
            <h2 className="section-title">NEWS</h2>
            <p className="section-subtitle">The latest developments and press releases from Obayashi Group</p>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="news-tabs-container">
          <ul className="news-tabs-list">
            {newsCategories.map((cat, idx) => (
              <li key={idx}>
                <button
                  onClick={() => setActiveCategory(cat)}
                  className={`news-tab-btn ${activeCategory === cat ? 'active' : ''}`}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* News List */}
        <div className="news-list-container">
          {displayNews.length > 0 ? (
            <ul className="news-list">
              {displayNews.map((item) => (
                <li key={item.id} className="news-item fade-in">
                  <div className="news-item-meta">
                    <time className="news-item-date" dateTime={item.date}>{item.dateStr}</time>
                    <span className={`news-category-badge badge-${item.category.toLowerCase().replace(/\s+/g, '-')}`}>
                      {item.category}
                    </span>
                  </div>
                  <div className="news-item-content">
                    {item.isExternal ? (
                      <a href={item.link} className="news-item-link" target="_blank" rel="noopener noreferrer">
                        <span className="news-item-title">{item.title}</span>
                        <div className="news-pdf-indicator">
                          <FileText size={14} />
                          <span>{item.fileSize || 'PDF'}</span>
                          <ExternalLink size={12} />
                        </div>
                      </a>
                    ) : (
                      <Link to={`/news#${item.id}`} className="news-item-link">
                        <span className="news-item-title">{item.title}</span>
                        <ArrowRight size={14} className="news-arrow" />
                      </Link>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="news-empty-state">
              <p>No news items found under this category.</p>
            </div>
          )}
        </div>

        {/* Archive link */}
        <div className="news-archive-link-container">
          <Link to="/news" className="btn-primary">
            <span>View All News</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
