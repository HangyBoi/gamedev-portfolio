import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, Github, ExternalLink, FileText, ChevronLeft, ChevronRight, Clock, User, Wrench, ArrowDown, Gamepad2, Play, Volume2 } from 'lucide-react';

const ProjectModal = ({ project, onClose, onNext, onPrev }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const contentRef = useRef(null);

  // Helper to safely navigate slides
  const handleNextSlide = useCallback(() => {
    if (!project.gallery) return;
    setCurrentSlide((prev) => (prev + 1) % project.gallery.length);
  }, [project.gallery]);

  const handlePrevSlide = useCallback(() => {
    if (!project.gallery) return;
    setCurrentSlide((prev) => (prev - 1 + project.gallery.length) % project.gallery.length);
  }, [project.gallery]);

  // 1. Lock Body Scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  // 2. Reset State on Project Change
  useEffect(() => {
    setCurrentSlide(0);
    setShowScrollIndicator(true);
    if (contentRef.current) contentRef.current.scrollTop = 0;
  }, [project]);

  // 3. KEYBOARD NAVIGATION (A / D)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'KeyD' || e.code === 'ArrowRight') {
        handleNextSlide();
      } else if (e.code === 'KeyA' || e.code === 'ArrowLeft') {
        handlePrevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNextSlide, handlePrevSlide]);

  // 4. AUTO-ADVANCE LOGIC (Content Aware)
  useEffect(() => {
    if (!project.gallery || project.gallery.length <= 1) return;

    const currentMedia = project.gallery[currentSlide];

    // IF IMAGE: Set a timer to advance
    if (currentMedia.type !== 'video') {
      const timer = setTimeout(() => {
        handleNextSlide();
      }, 4000); // 4 seconds for images
      return () => clearTimeout(timer);
    }

    // IF VIDEO: Do nothing here. The <video> tag's onEnded event handles it.
  }, [currentSlide, project.gallery, handleNextSlide]);

  // 5. Handle Scroll Indicator Logic
  const handleScroll = () => {
    if (contentRef.current) {
      setShowScrollIndicator(contentRef.current.scrollTop < 50);
    }
  };

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >

      {/* Project Navigation Buttons (Left/Right Arrows) - kept for changing Projects */}
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

        {/* Scrollable Container */}
        <div
          ref={contentRef}
          onScroll={handleScroll}
          className="overflow-y-auto scrollbar-hide h-full"
        >
          {/* --- GALLERY SECTION --- */}
          <div className="relative h-[50vh] md:h-[60vh] w-full bg-black shrink-0">

            {project.gallery && project.gallery.length > 0 ? (
              <div className="w-full h-full relative overflow-hidden">
                {(() => {
                  const slide = project.gallery[currentSlide];

                  // Determine alignment
                  const alignmentClass = slide.align === 'top' ? 'object-top' :
                    slide.align === 'bottom' ? 'object-bottom' :
                      'object-center';

                  if (slide.type === 'video') {
                    // Default to true. Only false if explicitly set to false.
                    const isMuted = slide.muted !== false;

                    return (
                      <VideoSlide
                        key={`video-${currentSlide}`} // Key is crucial for resetting state on slide change
                        url={slide.url}
                        className={`w-full h-full object-cover ${alignmentClass}`}
                        isMuted={isMuted}
                        onEnded={handleNextSlide}
                      />
                    );
                  } else {
                    return (
                      <img
                        key={`img-${currentSlide}`}
                        src={slide.url}
                        alt={`Slide ${currentSlide}`}
                        className={`w-full h-full object-cover ${alignmentClass} transition-transform duration-700 hover:scale-105`}
                      />
                    );
                  }
                })()}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent pointer-events-none"></div>
              </div>
            ) : (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover object-top"
              />
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

          {/* --- SCROLL PROMPT --- */}
          <div className={`w-full flex flex-col items-center justify-center py-6 bg-[#111] transition-opacity duration-500 ${showScrollIndicator ? 'opacity-100' : 'opacity-0'}`}>
            <span className="text-[10px] uppercase tracking-widest text-white/50 mb-2">Scroll for Details</span>
            <ArrowDown className="animate-bounce text-white/50" size={16} />
          </div>

          {/* --- INFO SECTION --- */}
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

                  {/* Source Code */}
                  {project.links.source && (
                    <a href={project.links.source} target="_blank" rel="noreferrer" className="flex items-center gap-3 px-6 py-4 bg-[#222] hover:bg-white hover:text-black rounded-xl transition-all group font-bold">
                      <Github size={20} /> Source Code
                    </a>
                  )}

                  {/* NEW: Itch.io Link (Red Hover) */}
                  {project.links.itch && (
                    <a href={project.links.itch} target="_blank" rel="noreferrer" className="flex items-center gap-3 px-6 py-4 bg-[#222] hover:bg-[#fa5c5c] hover:text-white rounded-xl transition-all group font-bold">
                      <Gamepad2 size={20} /> Play on Itch.io
                    </a>
                  )}

                  {/* ArtStation Link (Blue Hover) */}
                  {project.links.artstation && (
                    <a href={project.links.artstation} target="_blank" rel="noreferrer" className="flex items-center gap-3 px-6 py-4 bg-[#222] hover:bg-[#13aff0] hover:text-white rounded-xl transition-all group font-bold">
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

// --- NEW HELPER COMPONENT ---
const VideoSlide = ({ url, className, isMuted, onEnded }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(isMuted); // If it's muted/autoplay, assume playing.
  const [showOverlay, setShowOverlay] = useState(!isMuted); // Show overlay if sound is ON (not autoplaying)

  const togglePlay = (e) => {
    e.stopPropagation(); // Prevent modal from catching the click
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  const handlePlay = () => {
    setIsPlaying(true);
    setShowOverlay(false);
  };

  const handlePause = () => {
    setIsPlaying(false);
    setShowOverlay(true);
  };

  return (
    <div className="relative w-full h-full group cursor-pointer" onClick={togglePlay}>
      <video
        ref={videoRef}
        src={url}
        className={className}
        autoPlay={isMuted}
        muted={isMuted}
        playsInline
        controls={!isMuted} // Keep native controls available
        onEnded={onEnded}
        onPlay={handlePlay}
        onPause={handlePause}
      />

      {/* CUSTOM OVERLAY: Shows if video is paused OR if it's strictly a 'Click to Play' video */}
      {showOverlay && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/30 backdrop-blur-[1px] group-hover:bg-black/40 transition-all">
          <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 shadow-[0_0_30px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform duration-300">
            {/* The Play Icon */}
            <Play fill="white" className="text-white ml-2" size={40} />
          </div>
          <span className="absolute mt-28 text-sm font-bold tracking-widest uppercase text-white/80 drop-shadow-md">
            Click to Play
          </span>
        </div>
      )}

      {/* Optional: Mute Indicator icon in corner if it IS autoplaying */}
      {isMuted && isPlaying && (
        <div className="absolute bottom-6 right-6 p-2 bg-black/50 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
          <Volume2 size={16} className="text-white/50 strike-through" />
        </div>
      )}
    </div>
  );
};

export default ProjectModal;