import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Github, ExternalLink, FileText } from 'lucide-react';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -500 : 500;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const getTagColor = (tag) => {
    const lower = tag.toLowerCase();
    if (lower.includes('unity') || lower.includes('c#')) return 'text-cyan-400 border-cyan-400 bg-cyan-950/30';
    if (lower.includes('unreal') || lower.includes('ue5')) return 'text-pink-500 border-pink-500 bg-pink-950/30';
    if (lower.includes('hlsl') || lower.includes('shader')) return 'text-purple-400 border-purple-400 bg-purple-900/30';
    return 'text-amber-400 border-amber-400 bg-amber-900/30';
  };

  const getStatusColor = (status) => {
    if (status === 'Released') return 'bg-emerald-500 text-black';
    if (status === 'In Development') return 'bg-amber-400 text-black';
    return 'bg-purple-500 text-white';
  };

  // Data from your original portfolio
  const projects = [
    {
      id: 1,
      title: "Procedural City Generator",
      category: "Tools",
      tags: ["Unity", "C#", "Wave Function Collapse"],
      image: "https://placehold.co/600x400/1e293b/00f3ff?text=City+Generator",
      description: "Editor Utility Widget for quickly laying out city blocks. Uses Wave Function Collapse algorithm for logic.",
      links: { source: "https://github.com", artstation: "https://artstation.com", wiki: "https://github.com/wiki" },
      status: "Released"
    },
    {
      id: 2,
      title: "Volumetric Cloud Renderer",
      category: "Shaders",
      tags: ["HLSL", "Raymarching", "Optimization"],
      image: "https://placehold.co/600x400/1e293b/ff0055?text=Cloud+Renderer",
      description: "Raymarching based volumetric cloud solution optimized for mobile. Implements light scattering.",
      links: { source: "https://github.com", artstation: "https://artstation.com", wiki: "https://github.com/wiki" },
      status: "Prototype"
    },
    {
      id: 3,
      title: "Sci-Fi Shield Effect",
      category: "Unreal",
      tags: ["UE5", "Niagara", "Materials"],
      image: "https://placehold.co/600x400/1e293b/00f3ff?text=Shield+Effect",
      description: "Reactive shield material with hex-grid displacement and Niagara particle collision interaction events.",
      links: { source: "https://github.com", artstation: "https://artstation.com", wiki: "https://github.com/wiki" },
      status: "Released"
    },
    {
      id: 4,
      title: "LOD Automator",
      category: "Tools",
      tags: ["Unity", "Editor Tooling", "Pipeline"],
      image: "https://placehold.co/600x400/1e293b/ff0055?text=LOD+Automator",
      description: "Editor extension that automatically sets up LOD groups based on mesh naming conventions and vertex count.",
      links: { source: "https://github.com", artstation: "#", wiki: "https://github.com/wiki" },
      status: "In Development"
    },
    {
      id: 5,
      title: "Foreshadow",
      category: "Unity",
      tags: ["Unity", "AI", "Stealth"],
      image: "https://placehold.co/600x400/1e293b/00f3ff?text=Foreshadow",
      description: "Minimalistic stealth game built with level-design focus. Guards movement and Path System.",
      links: { source: "https://github.com", artstation: "#", wiki: "#" },
      status: "Released"
    }
  ];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeFilter || p.tags.includes(activeFilter));

  const filters = ['All', 'Unity', 'Unreal', 'Shaders', 'Tools'];

  return (
    <section id="works" className="py-32 bg-transparent border-t border-white/5">
      <div className="max-w-[90%] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 px-4">
           <div className="text-left">
              <span className="text-[#00f3ff] font-mono text-xl mb-2 block">02.</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Selected Works</h2>
              <p className="text-gray-400 text-sm flex items-center gap-2">
                 Swipe or use arrows to navigate
              </p>
           </div>
           
           <div className="flex flex-col items-end gap-6 mt-6 md:mt-0">
              <div className="flex flex-wrap justify-end gap-3">
                {filters.map(filter => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider border transition-all hover:-translate-y-1 ${
                      activeFilter === filter 
                        ? 'bg-[#00f3ff] border-[#00f3ff] text-black shadow-[0_0_15px_rgba(0,243,255,0.5)]' 
                        : 'bg-transparent border-white/20 text-gray-400 hover:border-white hover:text-white'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
              <div className="flex gap-4">
                <button onClick={() => scroll('left')} className="p-3 rounded-full border border-white/10 text-white hover:bg-white hover:text-black transition-all hover:scale-110 active:scale-95">
                  <ChevronLeft size={24} />
                </button>
                <button onClick={() => scroll('right')} className="p-3 rounded-full border border-white/10 text-white hover:bg-white hover:text-black transition-all hover:scale-110 active:scale-95">
                  <ChevronRight size={24} />
                </button>
              </div>
           </div>
        </div>

        {/* Note: 'snap-x' removed to fix the sticky mouse issue */}
        <div 
          ref={scrollContainerRef}
          className="grid grid-rows-2 grid-flow-col gap-8 overflow-x-auto pb-12 px-4 scrollbar-hide auto-cols-[350px] md:auto-cols-[450px]"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {filteredProjects.map((project) => (
            <article key={project.id} className="group relative bg-[#111] rounded-2xl overflow-hidden border border-white/10 flex flex-col transition-all duration-300 hover:border-[#00f3ff] hover:shadow-[0_0_40px_rgba(0,243,255,0.1)] w-full h-full">
              <figure className="relative h-56 overflow-hidden bg-gray-900 shrink-0 m-0">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
                
                {project.status && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className={`px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-lg shadow-lg ${getStatusColor(project.status)}`}>
                        {project.status}
                    </span>
                  </div>
                )}

                <div className="absolute top-4 right-4 flex flex-wrap justify-end gap-2 max-w-[60%] z-10">
                    {project.tags.map(tag => (
                      <span key={tag} className={`px-3 py-1.5 text-[10px] font-bold font-mono rounded-lg border backdrop-blur-md ${getTagColor(tag)}`}>
                          {tag}
                      </span>
                    ))}
                </div>
              </figure>

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#00f3ff] transition-colors">{project.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed mb-6 flex-grow">{project.description}</p>

                <div className="pt-4 border-t border-white/5 flex flex-wrap gap-2 mt-auto">
                  {project.links.source && (
                    <a href={project.links.source} className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-[#222] text-white text-[10px] font-bold uppercase tracking-wide hover:bg-white hover:text-black hover:-translate-y-1 transition-all duration-300 group/btn">
                      <Github size={14} className="group-hover/btn:scale-110 transition-transform"/> 
                      <span className="hidden sm:inline">GitHub</span>
                    </a>
                  )}
                  {project.links.artstation && project.links.artstation !== "#" && (
                    <a href={project.links.artstation} className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-[#222] text-white text-[10px] font-bold uppercase tracking-wide hover:bg-[#13aff0] hover:text-white hover:-translate-y-1 transition-all duration-300 group/btn">
                      <ExternalLink size={14} className="group-hover/btn:scale-110 transition-transform"/> 
                      <span className="hidden sm:inline">ArtStation</span>
                    </a>
                  )}
                  {project.links.wiki && project.links.wiki !== "#" && (
                    <a href={project.links.wiki} className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-white/20 text-gray-300 text-[10px] font-bold uppercase tracking-wide hover:border-[#00f3ff] hover:text-[#00f3ff] hover:-translate-y-1 transition-all duration-300 group/btn">
                      <FileText size={14} className="group-hover/btn:scale-110 transition-transform"/> 
                      <span className="hidden sm:inline">Wiki</span>
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;