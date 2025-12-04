import React, { useState, useEffect, useRef } from 'react';
import { X, Github, ExternalLink, FileText, ChevronLeft, ChevronRight, Clock, User, Wrench, ArrowDown } from 'lucide-react';

const ProjectModal = ({ project, onClose, onNext, onPrev }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const contentRef = useRef(null);

  // 1. Lock Body Scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  // 2. Reset State on Project Change
  useEffect(() => {
    setCurrentSlide(0);
    setShowScrollIndicator(true); // Reset arrow
    if (contentRef.current) contentRef.current.scrollTop = 0; // Scroll to top
  }, [project]);

  // 3. Auto-advance Gallery
  useEffect(() => {
    if (isPaused || !project.gallery || project.gallery.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % project.gallery.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isPaused, project, currentSlide]);

  // 4. Handle Scroll Indicator Logic
  const handleScroll = () => {
    if (contentRef.current) {
      // If user scrolled down more than 50px, hide the arrow
      setShowScrollIndicator(contentRef.current.scrollTop < 50);
    }
  };

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >

      {/* Navigation Buttons */}
      <button onClick={(e) => { e.stopPropagation(); onPrev(); }} className="hidden md:flex absolute left-8 p-4 rounded-full border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all z-50">
        <ChevronLeft size={32} />
      </button>

      <button onClick={(e) => { e.stopPropagation(); onNext(); }} className="hidden md:flex absolute right-8 p-4 rounded-full border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all z-50">
        <ChevronRight size={32} />
      </button>

      {/* Main Card */}
      <div
        className="w-full md:w-[75%] max-h-[90vh] bg-[#111] border border-white/10 rounded-2xl relative shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-red-500/80 rounded-full text-white transition-colors backdrop-blur-sm">
          <X size={20} />
        </button>

        {/* Scrollable Container (Scrollbar Hidden) */}
        <div
          ref={contentRef}
          onScroll={handleScroll}
          className="overflow-y-auto scrollbar-hide h-full"
        >
          {/* --- GALLERY SECTION --- */}
          {/* UPDATED: Increased height to 50vh (mobile) and 60vh (desktop) */}
          <div
            className="relative h-[50vh] md:h-[60vh] w-full bg-black shrink-0 group"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {project.gallery && project.gallery.length > 0 ? (
              <div className="w-full h-full relative overflow-hidden">
                {project.gallery[currentSlide].type === 'video' ? (
                  <video
                    src={project.gallery[currentSlide].url}
                    // CHANGE 1: Added 'object-top' here
                    className="w-full h-full object-cover object-top"
                    autoPlay muted loop playsInline
                  />
                ) : (
                  <img
                    src={project.gallery[currentSlide].url}
                    alt={`Slide ${currentSlide}`}
                    // CHANGE 2: Added 'object-top' here
                    className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
                  />
                )}
                {/* Subtle shading maintained */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent"></div>
              </div>
            ) : (
              // CHANGE 3: Added 'object-top' here for the fallback image as well
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover object-top"
              />
            )}

            {/* Dots */}
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

          {/* --- SCROLL PROMPT (RELOCATED) --- */}
          {/* Now sits physically between Gallery and Info. No overlap issues. */}
          <div className={`w-full flex flex-col items-center justify-center py-6 bg-[#111] transition-opacity duration-500 ${showScrollIndicator ? 'opacity-100' : 'opacity-0'}`}>
            <span className="text-[10px] uppercase tracking-widest text-white/50 mb-2">Scroll for Details</span>
            <ArrowDown className="animate-bounce text-white/50" size={16} />
          </div>

          {/* --- INFO SECTION --- */}
          {/* Removed top padding adjustment since Scroll Prompt is external now */}
          <div className="px-8 md:px-12 pb-12 space-y-8 bg-[#111]">

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

            {/* Stats */}
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="md:col-span-2 space-y-8">
                {/* Description */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">About the Project</h3>
                  <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                    {project.longDescription || project.description}
                  </p>
                </div>

                {/* Responsibilities Section */}
                {project.responsibilities && (
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">My Responsibilities</h3>
                    <ul className="space-y-3">
                      {project.responsibilities.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-300 text-sm md:text-base">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#00f3ff] mt-2 shrink-0"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* HIGH CONVERSION WIKI CARD */}
                {project.links.wiki && project.links.wiki !== "#" && (
                  <a
                    href={project.links.wiki}
                    target="_blank"
                    rel="noreferrer"
                    className="block p-6 rounded-xl border border-[#00f3ff]/30 bg-[#00f3ff]/5 hover:bg-[#00f3ff]/10 hover:border-[#00f3ff] transition-all group cursor-pointer relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <FileText size={100} />
                    </div>
                    <div className="relative z-10">
                      <h4 className="text-[#00f3ff] font-bold text-lg mb-2 flex items-center gap-2">
                        <FileText size={20} /> Read Technical Deep Dive
                      </h4>
                      <p className="text-gray-400 text-sm max-w-md">
                        Detailed breakdown of the architecture, algorithms, and performance challenges solved during development.
                      </p>
                    </div>
                  </a>
                )}
              </div>

              {/* Sidebar Links */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-white">Project Links</h3>
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
    </div>
  );
};

export default ProjectModal;