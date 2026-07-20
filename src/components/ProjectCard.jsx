import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';

export default function ProjectCard({ project }) {
  return (
    <div className="project-card fade-in">
      <Link to={`/works/${project.id}`} className="project-card-link">
        <div className="project-card-img-wrapper">
          <img
            src={`/images/${project.id}.jpg`}
            alt={project.title}
            className="project-card-img"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              // Map categories to custom fallback images
              const fallbacks = {
                "Offices": "/images/category_offices.png",
                "Civil Infra": "/images/category_civil.png",
                "Energy": "/images/category_energy.png",
                "Education": "/images/category_education.png",
                "Recreation": "/images/category_recreation.png"
              };
              e.target.src = fallbacks[project.category] || "/images/category_civil.png";
              // Disable onError loop if fallback also fails
              e.target.onerror = null;
            }}
          />
          <div className="project-card-overlay">
            <span className="project-card-category">{project.category}</span>
          </div>
        </div>
        
        <div className="project-card-body">
          <div className="project-card-meta">
            <div className="project-meta-item">
              <MapPin size={12} className="meta-icon" />
              <span>{project.location}</span>
            </div>
            <div className="project-meta-item">
              <Calendar size={12} className="meta-icon" />
              <span>{project.completion}</span>
            </div>
          </div>
          
          <h3 className="project-card-title">{project.title}</h3>
          <p className="project-card-summary">{project.summary}</p>
          
          <div className="project-card-action">
            <span>Read Case Study</span>
            <ArrowRight size={14} className="action-arrow" />
          </div>
        </div>
      </Link>
    </div>
  );
}
