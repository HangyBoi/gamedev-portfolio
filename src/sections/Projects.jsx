import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Github, ExternalLink, FileText } from 'lucide-react';
import ProjectModal from '../components/ProjectModal';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
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

  // Data
  const projects = [
    {
id: 1,
      title: "Procedural Parisian Cityscape",
      category: "Tools",
      tags: ["Unity 6", "C#", "Voronoi", "Editor Tooling"],
      image: "/gamedev-portfolio/images/procedural-paris/image1.webp",
      description: "One-click generation of organic, 18th-century city layouts using Voronoi Tessellation.",
      longDescription: "A sophisticated two-layer procedural generation system designed to move away from grid-based layouts. The tool utilizes Voronoi diagrams for organic street distribution and Sutherland-Hodgman clipping for lot subdivision. Features a non-destructive custom Editor workflow, allowing real-time vertex manipulation of building footprints with instant mesh regeneration for facades and watertight Mansard roofs.",
      details: {
        role: "Tooling Engineer & Tech Art",
        time: "4 weeks",
        tools: "Unity 6, C#, Shader Graph"
      },
      responsibilities: [
        "Engineered the 'City Planner' algorithm using Voronoi diagrams and Sutherland-Hodgman clipping.",
        "Developed a custom Editor interface with scene-view handles for non-destructive, real-time building manipulation.",
        "Implemented procedural mesh generation logic to create watertight Mansard roofs on arbitrary N-gon shapes.",
        "Optimized rendering via Static Batching and GPU Instancing for high-density scenes."
      ],
      gallery: [
        { type: 'image', url: "/gamedev-portfolio/images/procedural-paris/city-angle.webp", align: "top" },
        { type: 'video', url: "/gamedev-portfolio/videos/procedural-paris/City-Showcase_compr.mp4" },
        { type: 'image', url: "/gamedev-portfolio/images/procedural-paris/voronoi-cells.webp", align: "top" },
        { type: 'video', url: "/gamedev-portfolio/videos/procedural-paris/City-Generator-Showcase_compr.mp4" },
        { type: 'image', url: "/gamedev-portfolio/images/procedural-paris/procedural-house.webp" },
        { type: 'video', url: "/gamedev-portfolio/videos/procedural-paris/Building-Manipulation-Showcase_compr.mp4" },
        { type: 'image', url: "/gamedev-portfolio/images/procedural-paris/modular-assets.webp" },
        { type: 'image', url: "/gamedev-portfolio/images/procedural-paris/procedural-roof.webp", align: "bottom" }
      ],
      links: { source: "https://github.com/HangyBoi/Procedural-Paris", artstation: "#", wiki: "https://github.com/HangyBoi/Procedural-Paris/wiki" },
      status: "Released"
    },
    {
      id: 2,
      title: "Dynamic Weather System",
      category: "VFX",
      tags: ["Unity", "VFX Graph", "Particles"],
      image: "/gamedev-portfolio/images/weather.jpg",
      description: "Complete weather system with tornado, lightning, and rain effects.",
      longDescription: "A visual-heavy technical art project focusing on environmental immersion. I utilized Unity's VFX Graph to create a performant, reactive weather system that transitions seamlessly between states (Sunny, Rain, Storm, Tornado).",
      details: {
        role: "Technical Artist",
        time: "3 Weeks",
        tools: "Unity VFX Graph"
      },
      responsibilities: [
        "Simulated tornado physics using vector fields in VFX Graph.",
        "Created lighting-reactive rain and dust particles.",
        "Managed state transitions for seamless weather changes."
      ],
      gallery: [{ type: 'image', url: "/gamedev-portfolio/images/weather.jpg" }],
      links: { source: "https://github.com/HangyBoi", artstation: "#", wiki: "#" },
      status: "Released"
    },
    {
      id: 3,
      title: "Post-Soviet Shader Showcase",
      category: "Shaders",
      tags: ["Unity", "Shader Graph", "Rendering"],
      image: "/gamedev-portfolio/images/post-soviet.jpg",
      description: "Complex environmental shaders including stylized grass, water, and fog.",
      longDescription: "My deep dive into the Universal Render Pipeline (URP). This project features a collection of custom shaders designed to capture the specific 'Post-Soviet' aesthetic, including a PSX-style Renderer Feature for that retro feel.",
      details: {
        role: "Shader Artist",
        time: "3 Weeks",
        tools: "Unity Shader Graph"
      },
      responsibilities: [
        "Developed interactive foliage and water shaders.",
        "Implemented a custom PSX Render Feature for retro aliasing.",
        "Designed the level environment to showcase shader capabilities."
      ],
      gallery: [{ type: 'image', url: "/gamedev-portfolio/images/post-soviet.jpg" }],
      links: { source: "https://github.com/HangyBoi", artstation: "#", wiki: "#" },
      status: "Released"
    },
    {
      id: 4,
      title: "Swamp Horror Game",
      category: "Unity",
      tags: ["Unity", "AI Systems", "Architecture"],
      image: "/gamedev-portfolio/images/swamp-horror.jpg",
      description: "Complex survival horror featuring advanced AI and cinematics.",
      longDescription: "A large-scale group project completed in 9 weeks. I served as the Lead Engineer, architecting the interaction systems and the complex AI for the stalking creatures. The game features cutscenes, an inventory system, and sound-reactive enemies.",
      details: {
        role: "Lead Engineer",
        time: "9 Weeks",
        tools: "Unity, C#"
      },
      responsibilities: [
        "Architected the AI state machine for stalking enemies.",
        "Implemented the Interaction and Inventory systems.",
        "Integrated cinematics and animation events.",
        "Managed Git version control for the team."
      ],
      gallery: [{ type: 'image', url: "/gamedev-portfolio/images/swamp-horror.jpg" }],
      links: { source: "https://github.com/HangyBoi", artstation: "#", wiki: "#" },
      status: "Released"
    },
    {
      id: 5,
      title: "Sci-Fi Shield & UE5 Study",
      category: "Unreal",
      tags: ["UE5", "Niagara", "Materials"],
      image: "/gamedev-portfolio/images/shield.jpg",
      description: "Reactive shield material with hex-grid displacement and Niagara collision.",
      longDescription: "My transition project into Unreal Engine 5. I created a reactive Master Material for the shield effect and connected it to Niagara particle systems to detect and react to projectile hits in real-time.",
      details: {
        role: "VFX Artist",
        time: "1 Week",
        tools: "Unreal 5, Niagara"
      },
      responsibilities: [
        "Created Master Material with exposed parameters.",
        "Implemented Niagara collision events for hit detection.",
        "Optimized shader complexity for real-time use."
      ],
      gallery: [{ type: 'image', url: "/gamedev-portfolio/images/shield.jpg" }],
      links: { source: "https://github.com/HangyBoi", artstation: "#", wiki: "#" },
      status: "Prototype"
    }
  ];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter || p.tags.includes(activeFilter));

  const filters = ['All', 'Unity', 'Unreal', 'Shaders', 'Tools'];

  // Modal handlers
  const handleNextProject = () => {
    if (!selectedProject) return;
    const currentIndex = filteredProjects.findIndex(p => p.id === selectedProject.id);
    const nextIndex = (currentIndex + 1) % filteredProjects.length;
    setSelectedProject(filteredProjects[nextIndex]);
  };

  const handlePrevProject = () => {
    if (!selectedProject) return;
    const currentIndex = filteredProjects.findIndex(p => p.id === selectedProject.id);
    const prevIndex = (currentIndex - 1 + filteredProjects.length) % filteredProjects.length;
    setSelectedProject(filteredProjects[prevIndex]);
  };

  return (
    // --- THE FIX IS HERE ---
    // 1. 'z-40': High enough to cover the 'Scroll for Details' text from the Hero section.
    // 2. 'z-[100]': When selectedProject is true, we force this ENTIRE section above the Navbar (usually z-50).
    <section
      id="works"
      className={`relative py-32 bg-[#0a0a0a] border-t border-white/5 transition-all ${selectedProject ? 'z-[100]' : 'z-40'}`}
    >

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onNext={handleNextProject}
          onPrev={handlePrevProject}
        />
      )}

      <div className="max-w-[90%] mx-auto">
        {/* Header & Filters */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 px-4">
          <div className="text-left">
            <span className="text-[#00f3ff] font-mono text-xl mb-2 block">02.</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Selected Works</h2>
            <p className="text-gray-400 text-sm flex items-center gap-2">
              Click card for details &bull; Swipe to navigate
            </p>
          </div>

          <div className="flex flex-col items-end gap-6 mt-6 md:mt-0">
            <div className="flex flex-wrap justify-end gap-3">
              {filters.map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider border transition-all hover:-translate-y-1 ${activeFilter === filter
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

        {/* Project Grid */}
        <div
          ref={scrollContainerRef}
          className="grid grid-rows-2 grid-flow-col gap-8 overflow-x-auto pb-12 px-4 scrollbar-hide auto-cols-[350px] md:auto-cols-[450px]"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group relative bg-[#111] rounded-2xl overflow-hidden border border-white/10 flex flex-col transition-all duration-300 hover:border-[#00f3ff] hover:shadow-[0_0_40px_rgba(0,243,255,0.1)] w-full h-full cursor-pointer"
            >
              {/* Aspect-video forces 16:9 ratio */}
              <figure className="relative w-full aspect-video overflow-hidden bg-gray-900 shrink-0 m-0">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 pointer-events-none" />

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

                <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center gap-4">
                  {/* Logic for "Read Docs" button */}
                  {project.links.wiki && project.links.wiki !== "#" ? (
                    <a
                      href={project.links.wiki}
                      target="_blank"
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs font-bold uppercase tracking-widest text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
                    >
                      <FileText size={12} /> Read Tech Wiki
                    </a>
                  ) : (
                    <span className="text-xs text-[#00f3ff] font-bold uppercase tracking-widest group-hover:underline">View Details +</span>
                  )}

                  <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                    {project.links.source && (
                      <a href={project.links.source} target="_blank" className="p-2 bg-[#222] hover:bg-white hover:text-black rounded-lg transition-colors" title="View Code">
                        <Github size={14} />
                      </a>
                    )}
                    {project.links.artstation && (
                      <a href={project.links.artstation} target="_blank" className="p-2 bg-[#222] hover:bg-[#13aff0] hover:text-white rounded-lg transition-colors" title="View ArtStation">
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
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