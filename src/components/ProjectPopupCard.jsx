import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Calendar, Award, DollarSign, UserCheck, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ProjectPopupCard({ project, onClose }) {
  const navigate = useNavigate();

  if (!project) return null;

  // Resolve dynamic high-tech stack tags based on building category
  const getTechnologyTags = (category) => {
    const tagsMap = {
      "Civil Infra": ["BIM", "Seismic Dampers", "Precast Concrete", "Carbon-Reduced Cement"],
      "Offices": ["Smart HVAC", "LEED Platinum", "IoT Sensors", "Structural Optimization"],
      "Energy": ["Smart Grid Integration", "Wind Mitigation", "Solar Glass", "BESS Storage"],
      "Education": ["Acoustic Engineering", "Flexible Partitioning", "High-Efficiency Airflow", "Daylight Harvesting"],
      "Recreation": ["Retractable Roof", "Advanced Truss Systems", "Dynamic Lighting", "Mass Timber Structure"]
    };
    return tagsMap[category] || ["Sustainable Building", "BIM Modeling", "Modern Architecture"];
  };

  const techTags = getTechnologyTags(project.category);

  // Helper to extract values from details array
  const getDetailValue = (labelName, fallback) => {
    const found = project.details?.find(d => d.label.toLowerCase() === labelName.toLowerCase());
    return found ? found.value : fallback;
  };

  const client = getDetailValue("Client", "Government / Private Developer");
  const budget = getDetailValue("Budget", "Undisclosed");
  const subSector = getDetailValue("Sub-Sector", "Infrastructure");

  // Slugify title to support routing to /projects/:slug
  const slugify = (text) => {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  };

  const projectSlug = slugify(project.title);

  return (
    <div className="fixed inset-0 z-[4000] flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Glassmorphic card container with spring motion entry */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20, filter: 'blur(12px)' }}
        animate={{ scale: 1, opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ scale: 0.9, opacity: 0, y: 20, filter: 'blur(12px)' }}
        transition={{ 
          type: "spring", 
          stiffness: 280, 
          damping: 24,
          duration: 0.5 
        }}
        className="relative w-full max-w-lg bg-slate-900/80 dark:bg-slate-950/85 border border-emerald-500/30 rounded-2xl p-6 backdrop-blur-2xl shadow-2xl z-10 overflow-hidden text-slate-100"
      >
        
        {/* Glow decoration */}
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl"></div>

        {/* Header close btn */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/60 hover:bg-slate-700/80 border border-slate-700/50 hover:border-emerald-500/40 transition-all duration-200 cursor-pointer text-slate-400 hover:text-white"
        >
          <X size={16} />
        </button>

        {/* Category Tag */}
        <span className="inline-block px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 rounded-md mb-4">
          {project.category}
        </span>

        {/* Project Name */}
        <h3 className="text-xl font-extrabold text-white leading-tight mb-2 tracking-tight">
          {project.title}
        </h3>

        {/* Location & Meta info grid */}
        <div className="grid grid-cols-2 gap-4 mb-4 mt-3 bg-slate-950/40 border border-slate-800/50 rounded-xl p-3 text-xs">
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-emerald-400 flex-shrink-0" />
            <div>
              <span className="block text-[10px] uppercase tracking-wider text-slate-500">Location</span>
              <span className="font-semibold text-slate-200">{project.location}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-emerald-400 flex-shrink-0" />
            <div>
              <span className="block text-[10px] uppercase tracking-wider text-slate-500">Completion</span>
              <span className="font-semibold text-slate-200">{project.completion}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <UserCheck size={14} className="text-emerald-400 flex-shrink-0" />
            <div>
              <span className="block text-[10px] uppercase tracking-wider text-slate-500">Client</span>
              <span className="font-semibold text-slate-200 truncate max-w-[140px]">{client}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign size={14} className="text-emerald-400 flex-shrink-0" />
            <div>
              <span className="block text-[10px] uppercase tracking-wider text-slate-500">Budget</span>
              <span className="font-semibold text-slate-200">{budget}</span>
            </div>
          </div>
        </div>

        {/* Brief description */}
        <div className="mb-4">
          <h4 className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">Brief Description</h4>
          <p className="text-sm leading-relaxed text-slate-300 line-clamp-3">
            {project.summary}
          </p>
        </div>

        {/* Technology tags */}
        <div className="mb-6">
          <h4 className="text-[10px] uppercase tracking-wider text-slate-500 mb-2">Technology Stack</h4>
          <div className="flex flex-wrap gap-1.5">
            {techTags.map((tag, idx) => (
              <span 
                key={idx} 
                className="px-2 py-0.5 text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700/60 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Action Row */}
        <div className="flex gap-3">
          <button 
            onClick={() => {
              onClose();
              navigate(`/projects/${projectSlug}`);
            }}
            className="flex-grow flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-white border-0 rounded-xl cursor-pointer shadow-lg shadow-emerald-500/10 hover:shadow-white/10 transition-all duration-300 transform active:scale-95"
          >
            <span>View Case Study</span>
            <ChevronRight size={14} />
          </button>
        </div>

      </motion.div>
    </div>
  );
}
