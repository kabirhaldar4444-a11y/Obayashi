import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';

export default function ProjectCard({ project }) {
  return (
    <div className="project-card fade-in">
      <Link to={`/works/${project.id}`} className="project-card-link">
        <div className="project-card-img-wrapper">
          <img
            src={`/images/${project.id}.jpg?v=no_obama_2026`}
            alt={project.title}
            className="project-card-img"
            loading="lazy"
            decoding="async"
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
