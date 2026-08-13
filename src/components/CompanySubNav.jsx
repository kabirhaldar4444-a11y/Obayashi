import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function CompanySubNav({ activeTab = 'overview' }) {
  const location = useLocation();
  const currentPath = location.pathname;

  const tabs = [
    { key: 'overview', label: 'OVERVIEW', path: '/company' },
    { key: 'management', label: 'MANAGEMENT STRUCTURE', path: '/company#message' },
    { key: 'business_performance', label: 'BUSINESS PERFORMANCE', path: '/company/business-performance' },
    { key: 'certificates', label: 'CERTIFICATES', path: '/company/certificates' },
  ];

  return (
    <div className="company-info-subnav">
      <span className="subnav-category-title">COMPANY INFORMATION</span>
      <nav className="subnav-items-list" aria-label="Company Sub Navigation">
        {tabs.map((tab) => {
          let isActive = activeTab === tab.key;
          if (!activeTab) {
            if (tab.key === 'business_performance' && currentPath.includes('business-performance')) isActive = true;
            else if (tab.key === 'certificates' && currentPath.includes('certificates')) isActive = true;
            else if (tab.key === 'overview' && (currentPath === '/company' || currentPath === '/about-us')) isActive = true;
          }

          return (
            <Link
              key={tab.key}
              to={tab.path}
              className={`company-subnav-link ${isActive ? 'active' : ''}`}
            >
              {isActive && <span className="subnav-active-square" aria-hidden="true">■ </span>}
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
