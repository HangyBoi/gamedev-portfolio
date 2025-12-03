import React, { useState, useEffect } from 'react';
import { X, Github, ExternalLink, FileText, ChevronLeft, ChevronRight, Clock, User, Wrench, Calendar } from 'lucide-react';

const ProjectModal = ({ project, onClose, onNext, onPrev }) => {
  // Gallery State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // 1. Lock Body Scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // 2. Auto-advance Gallery (reset when project changes)
  useEffect(() => {
    setCurrentSlide(0); // Reset to first image when opening new project
  }, [project]);

  useEffect(() => {
    if (isPaused || !project.gallery || project.gallery.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % project.gallery.length);
    }, 3000); // 3 seconds per slide

    return () => clearInterval(timer);
  }, [isPaused, project, currentSlide]);

  // If no project is selected, don't render anything
  if (!project) return null;

  return (
    // Backdrop (Clicking here closes modal)
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      
      {/* Previous Project Button (Outside) */}
      <button 
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="hidden md:flex absolute left-8 p-4 rounded-full border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all z-50"
      >
        <ChevronLeft size={32} />
      </button>

      {/* Next Project Button (Outside) */}
      <button 
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="hidden md:flex absolute right-8 p-4 rounded-full border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all z-50"
      >
        <ChevronRight size={32} />
      </button>

      {/* Main Modal Content Card */}
      <div 
        className="w-full md:w-[75%] max-h-[90vh] bg-[#111] border border-white/10 rounded-2xl overflow-y-auto relative shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
      >
        {/* Close Button (Top Right of Card) */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-red-500/80 rounded-full text-white transition-colors backdrop-blur-sm"
        >
          <X size={20} />
        </button>

        {/* --- GALLERY SECTION --- */}
        <div 
          className="relative h-[40vh] md:h-[50vh] w-full bg-black shrink-0 group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Media Display */}
          {project.gallery && project.gallery.length > 0 ? (
            <div className="w-full h-full relative overflow-hidden">
                {/* We render the current slide */}
                {project.gallery[currentSlide].type === 'video' ? (
                   <video 
                     src={project.gallery[currentSlide].url} 
                     className="w-full h-full object-cover"
                     autoPlay muted loop playsInline
                   />
                ) : (
                   <img 
                     src={project.gallery[currentSlide].url} 
                     alt={`Slide ${currentSlide}`} 
                     className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                   />
                )}
                
                {/* Gradient Overlay for Text Visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent"></div>
            </div>
          ) : (
            // Fallback if no gallery
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          )}

          {/* Dots Navigation */}
          {project.gallery && project.gallery.length > 1 && (
             <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
               {project.gallery.map((_, idx) => (
                 <button
                   key={idx}
                   onClick={() => setCurrentSlide(idx)}
                   className={`w-2 h-2 rounded-full transition-all ${idx === currentSlide ? 'bg-[#00f3ff] w-6' : 'bg-white/50 hover:bg-white'}`}
                 />
               ))}
             </div>
          )}
        </div>

        {/* --- INFO SECTION --- */}
        <div className="p-8 md:p-12 space-y-8">
           {/* Header */}
           <div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">{project.title}</h2>
              <div className="flex flex-wrap gap-3 mb-6">
                {project.tags.map(tag => (
                   <span key={tag} className="px-3 py-1 text-xs font-mono border border-white/20 rounded-full text-gray-300">
                     {tag}
                   </span>
                ))}
              </div>
           </div>

           {/* 3-Column Stats Grid */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-y border-white/10 py-6">
              <div className="flex items-start gap-3">
                 <User className="text-[#00f3ff] shrink-0 mt-1" size={20} />
                 <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-1">Role</h4>
                    <p className="text-gray-400 text-sm">{project.details?.role || "Solo Developer"}</p>
                 </div>
              </div>
              <div className="flex items-start gap-3">
                 <Clock className="text-[#ff0055] shrink-0 mt-1" size={20} />
                 <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-1">Timeline</h4>
                    <p className="text-gray-400 text-sm">{project.details?.time || "3 Weeks"}</p>
                 </div>
              </div>
              <div className="flex items-start gap-3">
                 <Wrench className="text-purple-500 shrink-0 mt-1" size={20} />
                 <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-1">Tools</h4>
                    <p className="text-gray-400 text-sm">{project.details?.tools || "Unity, C#, Blender"}</p>
                 </div>
              </div>
           </div>

           {/* Description & Story */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="md:col-span-2 space-y-6">
                 <h3 className="text-xl font-bold text-white">About the Project</h3>
                 <p className="text-gray-300 leading-relaxed">
                   {/* Fallback description if the long one isn't added yet */}
                   {project.longDescription || project.description}
                 </p>
                 
                 <h3 className="text-xl font-bold text-white pt-4">Technical Challenges</h3>
                 <p className="text-gray-300 leading-relaxed">
                    This project pushed the boundaries of {project.tags[0]}. 
                    Key challenges included optimizing the rendering pipeline and ensuring 
                    consistent frame rates across target devices.
                    {/* You can add a specific 'challenges' field to your data later */}
                 </p>
              </div>

              {/* Sidebar / Actions */}
              <div className="space-y-6">
                 <h3 className="text-xl font-bold text-white">Links</h3>
                 <div className="flex flex-col gap-3">
                    {project.links.source && (
                        <a href={project.links.source} target="_blank" className="flex items-center gap-3 px-6 py-4 bg-[#222] hover:bg-white hover:text-black rounded-xl transition-all group font-bold">
                           <Github size={20} /> Source Code
                        </a>
                    )}
                    {project.links.artstation && (
                        <a href={project.links.artstation} target="_blank" className="flex items-center gap-3 px-6 py-4 bg-[#222] hover:bg-[#13aff0] hover:text-white rounded-xl transition-all group font-bold">
                           <ExternalLink size={20} /> ArtStation
                        </a>
                    )}
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;