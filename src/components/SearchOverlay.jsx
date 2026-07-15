import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, FileText } from 'lucide-react';
import { newsArticles } from '../data/newsContent';
import { projects } from '../data/worksContent';
import { businessSegments } from '../data/businessContent';
import { technologiesList } from '../data/techContent';

export default function SearchOverlay({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setResults([]);
      return;
    }
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSearch = (e) => {
    const val = e.target.value;
    setQuery(val);

    if (val.trim().length < 2) {
      setResults([]);
      return;
    }

    const lowerVal = val.toLowerCase();
    const tempResults = [];

    // Search News
    newsArticles.forEach(item => {
      if (item.title.toLowerCase().includes(lowerVal) || item.summary.toLowerCase().includes(lowerVal)) {
        tempResults.push({
          type: 'News',
          title: item.title,
          url: `/news#${item.id}`,
          snippet: item.summary
        });
      }
    });

    // Search Projects (Works)
    projects.forEach(item => {
      if (item.title.toLowerCase().includes(lowerVal) || item.summary.toLowerCase().includes(lowerVal) || item.description.toLowerCase().includes(lowerVal)) {
        tempResults.push({
          type: 'Project',
          title: item.title,
          url: `/works/${item.id}`,
          snippet: item.summary
        });
      }
    });

    // Search Business Segments
    businessSegments.forEach(item => {
      if (item.title.toLowerCase().includes(lowerVal) || item.description.toLowerCase().includes(lowerVal)) {
        tempResults.push({
          type: 'Business Overview',
          title: item.title,
          url: `/business#${item.id}`,
          snippet: item.lead
        });
      }
    });

    // Search Technologies
    technologiesList.forEach(item => {
      if (item.title.toLowerCase().includes(lowerVal) || item.description.toLowerCase().includes(lowerVal)) {
        tempResults.push({
          type: 'Technology',
          title: item.title,
          url: `/solution_technology#${item.id}`,
          snippet: item.summary
        });
      }
    });

    setResults(tempResults.slice(0, 10)); // Limit to top 10 matches
  };

  if (!isOpen) return null;

  return (
    <div style={styles.overlay} className="fade-in">
      <div style={styles.header}>
        <div className="container" style={styles.headerContainer}>
          <div style={styles.searchBox}>
            <Search size={22} color="var(--text-secondary)" />
            <input
              type="text"
              placeholder="Search by keywords (e.g. wood, energy, bridge)..."
              value={query}
              onChange={handleSearch}
              autoFocus
              style={styles.input}
            />
          </div>
          <button onClick={onClose} style={styles.closeBtn} aria-label="Close search">
            <X size={24} />
          </button>
        </div>
      </div>

      <div style={styles.contentBody}>
        <div className="container">
          {query.trim().length === 0 ? (
            <div style={styles.emptyState}>
              <p style={styles.emptyTitle}>What are you looking for?</p>
              <p style={styles.emptySub}>Type a query to search news updates, green technologies, projects, and corporate documents.</p>
              <div style={styles.suggested}>
                <span style={styles.suggestLabel}>Suggestions:</span>
                {['Timber', 'Hydrogen', 'Bridge', 'Sustainability', 'Takanawa'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => handleSearch({ target: { value: tag } })}
                    style={styles.tagBtn}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length > 0 ? (
            <div style={styles.resultsWrapper}>
              <h3 style={styles.resultsCount}>Search Results ({results.length})</h3>
              <div style={styles.resultsList}>
                {results.map((res, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      navigate(res.url.split('#')[0]);
                      setTimeout(() => {
                        if (res.url.includes('#')) {
                          const id = res.url.split('#')[1];
                          const el = document.getElementById(id);
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }
                      }, 100);
                      onClose();
                    }}
                    style={styles.resultItem}
                    className="result-item-card"
                  >
                    <div style={styles.itemMeta}>
                      <span style={styles.itemBadge(res.type)}>{res.type}</span>
                    </div>
                    <h4 style={styles.itemTitle}>{res.title}</h4>
                    <p style={styles.itemSnippet}>{res.snippet}</p>
                    <div style={styles.itemAction}>
                      <span>Navigate to page</span>
                      <ArrowRight size={14} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={styles.emptyState}>
              <p style={styles.emptyTitle}>No matches found</p>
              <p style={styles.emptySub}>We couldn't find anything matching "{query}". Please check your spelling or search terms.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#ffffff',
    zIndex: 9999,
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto'
  },
  header: {
    borderBottom: '1px solid var(--border-light)',
    padding: '20px 0',
    backgroundColor: '#ffffff',
    position: 'sticky',
    top: 0,
    zIndex: 10
  },
  headerContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    justifyContent: 'space-between'
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flex: 1,
    backgroundColor: '#f1f3f5',
    padding: '12px 20px',
    borderRadius: '8px'
  },
  input: {
    border: 'none',
    background: 'transparent',
    fontSize: '1.1rem',
    width: '100%',
    outline: 'none',
    color: 'var(--text-primary)',
    fontWeight: '400'
  },
  closeBtn: {
    padding: '8px',
    borderRadius: '50%',
    backgroundColor: 'var(--light-bg)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'var(--transition-fast)'
  },
  contentBody: {
    padding: '48px 0',
    flex: 1
  },
  emptyState: {
    textAlign: 'center',
    maxWidth: '600px',
    margin: '60px auto 0',
    padding: '0 16px'
  },
  emptyTitle: {
    fontSize: '1.75rem',
    fontWeight: '700',
    color: 'var(--dark-main)',
    marginBottom: '12px'
  },
  emptySub: {
    color: 'var(--text-secondary)',
    fontSize: '1.05rem',
    marginBottom: '32px',
    lineHeight: '1.5'
  },
  suggested: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    flexWrap: 'wrap'
  },
  suggestLabel: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: 'var(--dark-main)',
    marginRight: '6px'
  },
  tagBtn: {
    padding: '6px 14px',
    backgroundColor: 'var(--light-bg)',
    borderRadius: '20px',
    fontSize: '0.9rem',
    color: 'var(--text-primary)',
    border: '1px solid var(--border-light)',
    transition: 'var(--transition-fast)'
  },
  resultsWrapper: {
    maxWidth: '800px',
    margin: '0 auto'
  },
  resultsCount: {
    fontSize: '1.25rem',
    fontWeight: '700',
    marginBottom: '24px',
    color: 'var(--dark-main)',
    borderBottom: '2px solid var(--dark-main)',
    paddingBottom: '8px'
  },
  resultsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  resultItem: {
    padding: '24px',
    borderRadius: '8px',
    border: '1px solid var(--border-light)',
    cursor: 'pointer',
    backgroundColor: '#ffffff',
    transition: 'var(--transition-smooth)',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  itemMeta: {
    display: 'flex',
    gap: '8px'
  },
  itemBadge: (type) => {
    let color = 'var(--text-secondary)';
    let bg = 'var(--light-bg)';
    if (type === 'News') { color = 'var(--primary-red)'; bg = '#ffe3e6'; }
    else if (type === 'Project') { color = 'var(--primary-blue)'; bg = '#e2efff'; }
    else if (type === 'Technology') { color = '#2d6a4f'; bg = '#d8f3dc'; }
    return {
      fontSize: '0.75rem',
      fontWeight: '700',
      textTransform: 'uppercase',
      color,
      backgroundColor: bg,
      padding: '2px 8px',
      borderRadius: '4px',
      letterSpacing: '0.05em'
    };
  },
  itemTitle: {
    fontSize: '1.15rem',
    fontWeight: '700',
    color: 'var(--dark-main)'
  },
  itemSnippet: {
    color: 'var(--text-secondary)',
    fontSize: '0.95rem',
    lineHeight: '1.5',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  },
  itemAction: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '0.85rem',
    fontWeight: '600',
    color: 'var(--primary-red)',
    marginTop: '4px',
    alignSelf: 'flex-start'
  }
};
