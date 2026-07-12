import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Github, ExternalLink, FileText } from 'lucide-react';
import ProjectModal from '../components/ProjectModal';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const scrollContainerRef = useRef(null);

  // Drag to scroll states
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [dragMoved, setDragMoved] = useState(false);

  const handleMouseDown = (e) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setDragMoved(false);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault(); // Prevents text selection/image dragging
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // scroll speed multiplier
    if (Math.abs(walk) > 5) {
      setDragMoved(true);
    }
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -500 : 500;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const getTagColor = (tag) => {
    const lower = tag.toLowerCase();
    // Core Engine (Cyan)
    if (lower.includes('unity') || lower.includes('unity 6') || lower.includes('c#'))
      return 'text-cyan-400 border-cyan-400 bg-cyan-950/30';
    // Unreal (Pink)
    if (lower.includes('unreal') || lower.includes('unreal engine') || lower.includes('ue5'))
      return 'text-pink-500 border-pink-500 bg-pink-950/30';
    // Shaders & Tech Art (Purple)
    if (lower.includes('hlsl') || lower.includes('shader') || lower.includes('shader graph') || lower.includes('tech art'))
      return 'text-purple-400 border-purple-400 bg-purple-900/30';
    // VFX (Orange/Fire)
    if (lower.includes('vfx') || lower.includes('vfx graph') || lower.includes('particle'))
      return 'text-orange-400 border-orange-400 bg-orange-950/30';
    // Animation & IK (Lime/Green)
    if (lower.includes('ik') || lower.includes('animation') || lower.includes('rigging'))
      return 'text-lime-400 border-lime-400 bg-lime-950/30';
    // Experience (Indigo)
    if (lower.includes('internship') || lower.includes('professional') || lower.includes('client'))
      return 'text-indigo-400 border-indigo-400 bg-indigo-900/30';
    // Default / Tools (Amber)
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
      tags: ["Unity", "Tech Art", "Editor Tooling", "PCG", "C#"],
      image: "/gamedev-portfolio/images/procedural-paris/city-angle.webp",
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
      links: {
        source: "https://github.com/HangyBoi/Procedural-Paris",
        wiki: "https://github.com/HangyBoi/Procedural-Paris/wiki"
      },
      status: "Released"
    },

    {
      "id": 2,
      "title": "Slice of Post-Soviet Yard",
      "category": "Technical Environment Art",
      "tags": ["Unity", "Shaders", "Lighting", "HDRP", "Level Design", "Optimization"],
      "image": "/gamedev-portfolio/images/post-soviet/bloodmoon.webp",
      "description": "A technical environment showcase combining atmospheric level design, lighting composition, and a custom URP rendering pipeline.",
      "longDescription": "A deep dive into the Universal Render Pipeline (URP) to bridge the gap between engine logic and visual art. This project implements a custom 'Digital Lens' stack, utilizing Fullscreen Renderer Features to achieve a pixel-perfect PSX aesthetic (Dithering, Quantization). It features a reactive environment where foliage blends with terrain via Render Textures and water interacts with depth buffers.",
      "details": {
        "role": "Technical Level Designer",
        "time": "3 Weeks",
        "tools": "Unity 6 (URP), HLSL, Shader Graph"
      },
      "responsibilities": [
        "Designed the environment layout using 'Iterative Detailing, which is supposed to evoke a specific Post-Soviet nostalgia.",
        "Engineered a modular Post-Processing stack (Pixelation, Dithering) using custom URP Renderer Features.",
        "Implemented reactive foliage shaders using Render Textures for seamless terrain blending and wind simulation.",
        "Solved critical pipeline sorting issues between volumetric fog and transparency injection points.",
        "Wrote custom HLSL lighting functions wrapped in Shader Graph nodes for stylized specular highlights."
      ],
      "gallery": [
        { "type": "video", "url": "/gamedev-portfolio/videos/post-soviet/car-in-river_compr.mp4" },
        { "type": "image", "url": "/gamedev-portfolio/images/post-soviet/river-car.webp", "align": "bottom" },
        { "type": "video", "url": "/gamedev-portfolio/videos/post-soviet/day-night-yard_compr.mp4" },
        { "type": "image", "url": "/gamedev-portfolio/images/post-soviet/broken-fence.webp", "align": "bottom" },
        { "type": "video", "url": "/gamedev-portfolio/videos/post-soviet/retro-stack-showcase_compr.mp4" },
        { "type": "image", "url": "/gamedev-portfolio/images/post-soviet/car.webp", "align": "bottom" },
        { "type": "video", "url": "/gamedev-portfolio/videos/post-soviet/color-palette-showcase_compr.mp4" },
        { "type": "image", "url": "/gamedev-portfolio/images/post-soviet/bloodyard.webp", "align": "center" },
        { "type": "video", "url": "/gamedev-portfolio/videos/post-soviet/orto-blackview_compr.mp4" },
      ],
      "links": {
        "source": "https://github.com/HangyBoi/Slice-of-Post-Soviet-Yard",
        "artstation": "https://www.artstation.com/artwork/eRZ9kP",
        "wiki": "https://github.com/HangyBoi/Slice-of-Post-Soviet-Yard/wiki"
      },
      "status": "Released"
    },

    {
      id: 3,
      title: "Procedural Creature Animation",
      category: "Animation",
      tags: ["Unity", "Tech Art", "Procedural Animation", "IK", "URP", "C#"],
      image: "/gamedev-portfolio/images/procedural-animation/gecko_skeleton_simple.webp",
      description: "Real-time, terrain-adaptive locomotion systems for spider and lizard using Inverse Kinematics.",
      longDescription: "A pure-code animation project exploring dynamic locomotion without keyframes. I engineered two distinct procedural architectures: an 8-legged spider utilizing a predictive tripod gait to navigate extreme topology (including ceilings), and a modular 'Gecko' controller driven by root motion, featuring independent head tracking and physics-based tail reactions.",
      details: {
        role: "Gameplay Engineer",
        time: "4 Weeks",
        tools: "Unity 6, Animation Rigging, C#"
      },
      responsibilities: [
        "Architected a modular locomotion engine separating Gait Logic, Ground Detection, and IK Solving.",
        "Implemented a robust Tripod Gait algorithm with predictive foot placement for uneven terrain.",
        "Developed a reactive Tail Physics system using bone-chain reaction for natural secondary motion.",
        "Created custom Editor Gizmos and Inspectors to visualize IK targets and limb constraints in real-time."
      ],
      gallery: [
        { type: 'video', url: "/gamedev-portfolio/videos/procedural-animation/bonehead-gecko-showcase_compr.mp4" },
        { type: 'video', url: "/gamedev-portfolio/videos/procedural-animation/spider-showcase_compr.mp4" },
        { type: 'video', url: "/gamedev-portfolio/videos/procedural-animation/gecko-constraint_compr.mp4" },
        { type: 'image', url: "/gamedev-portfolio/images/procedural-animation/gecko_skeleton_simple.webp", align: "center" },
        { type: 'video', url: "/gamedev-portfolio/videos/procedural-animation/gecko-control_compr.mp4" },
        { type: 'video', url: "/gamedev-portfolio/videos/procedural-animation/gecko-follow_compr.mp4" },
        { type: 'video', url: "/gamedev-portfolio/videos/procedural-animation/spider-upside_compr.mp4" },
        { type: 'video', url: "/gamedev-portfolio/videos/procedural-animation/spider-leg_compr.mp4" },
        { type: 'video', url: "/gamedev-portfolio/videos/procedural-animation/spider-leg-controller_compr.mp4" },
        { type: 'video', url: "/gamedev-portfolio/videos/procedural-animation/spider-constraints_compr.mp4" }
      ],
      links: {
        source: "https://github.com/HangyBoi/Chunk-of-Procedural-Animation",
        wiki: "https://github.com/HangyBoi/Chunk-of-Procedural-Animation/wiki"
      },
      status: "Prototype"
    },

    {
      id: 13,
      title: "ICover",
      category: "Technical Art",
      tags: ["UE5", "Internship", "VR", "Tech Art", "VFX", "Animation", "Motion Capture"],
      image: "/gamedev-portfolio/images/icover/placeholder.webp",
      description: "A realistic military training VR simulation featuring immersive atmospheric VFX, a hero explosion, and cleaned motion-capture animations.",
      longDescription: "Developed as a client project for the Dutch Ministry of Defence, ICover is a high-stakes VR military simulation designed to teach protocol under extreme pressure. Operating as a Technical Artist, I created ambient volumetric dust and reusable fire/smoke systems to drive visual immersion. The core of my work involved building the central drone explosion VFX entirely from scratch using Niagara additive layers and post-process camera shakes to evoke genuine player reactions. I also managed the Xsens motion capture pipeline, processing raw recordings of military personnel into clean, in-engine animations.",
      details: {
        role: "Technical Artist",
        time: "Internship",
        tools: "Unreal Engine 5 (Niagara, Material Graph), Xsens"
      },
      responsibilities: [
        "Built all central atmospheric VFX from scratch, including volumetric dust for interiors, falling ash for exteriors, reusable fire and smoke systems, and falling building debris.",
        "Engineered the core 'Hero Explosion' VFX using Niagara additive layers, custom shaders, and post-process camera shakes to maximize player impact.",
        "Managed the Xsens motion capture pipeline, processing and cleaning raw recordings into polished, in-engine animations.",
        "Evaluated visual feedback directly with Ministry of Defence clients to ensure VFX landed with the intended emotional weight."
      ],
      gallery: [
        { type: 'image', url: "/gamedev-portfolio/images/icover/placeholder-image1.webp", align: "center" },
        { type: 'video', url: "/gamedev-portfolio/videos/icover/placeholder-video1.mp4" },
        { type: 'image', url: "/gamedev-portfolio/images/icover/placeholder-image2.webp", align: "center" },
        { type: 'video', url: "/gamedev-portfolio/videos/icover/placeholder-video2.mp4" }
      ],
      links: {},
      status: "Released"
    },

    {
      id: 12,
      title: "VR Fluid Simulation",
      category: "Technical Gameplay & Rendering",
      tags: ["UE5", "Internship", "VR", "Tech Art", "VFX", "Blueprints"],
      image: "/gamedev-portfolio/images/quantum-delta/squeezebottle-multiple.png",
      description: "A performance-optimized VR fluid and chemistry simulation built for cleanroom training. It authentically replicates liquid physics and chemical reactions for interactive lab equipment.",
      longDescription: "Developed as an internship project, this VR simulation serves as a training platform for operating sensitive cleanroom equipment. To maintain high framerates in VR, it bypasses expensive traditional fluid solvers in favor of a custom math-driven approach to handle fluid physics, spatial displacement, and complex chemical reactions. Players can intuitively pour, mix, and weigh chemicals with realistic mass conservation, creating an immersive and physically accurate lab environment without performance bottlenecks.",
      details: {
        role: "Technical Artist / VR Programmer",
        time: "Internship",
        tools: "Unreal Engine 5 (Blueprints, Niagara, Material Graph), VR Expansion Plugin"
      },
      responsibilities: [
        "Architected a scalable, modular chemistry framework tracking mass, volume, and solution concentration for interactive chemical reactions.",
        "Engineered a fluid physics system simulating realistic wobbling, pouring, and splashing across various glassware without traditional expensive solvers.",
        "Developed a framerate-independent particle payload system ensuring 1:1 conservation of mass when transferring liquids.",
        "Programmed physical skill-based interaction models, allowing players to manually mix and weigh chemicals using accurate in-game scales."
      ],
      gallery: [
        { type: "video", url: "/gamedev-portfolio/videos/quantum-delta/liquid-wobbling.mov" },
        { type: "video", url: "/gamedev-portfolio/videos/quantum-delta/liquid-squeezing.mov" },
        { type: "video", url: "/gamedev-portfolio/videos/quantum-delta/beakers-interact.mov" },
        { type: "video", url: "/gamedev-portfolio/videos/quantum-delta/mass-conservation.mov" },
        { type: "video", url: "/gamedev-portfolio/videos/quantum-delta/koh-preparation.mov" },
        { type: "image", url: "/gamedev-portfolio/images/quantum-delta/squeezebottle-multiple.png", align: "center" },
        { type: "video", url: "/gamedev-portfolio/videos/quantum-delta/squeezebottle-physics.mov" },
        { type: "video", url: "/gamedev-portfolio/videos/quantum-delta/squeezebottle-beaker-interaction.mov" },
        { type: "image", url: "/gamedev-portfolio/images/quantum-delta/squeezebottle-with-splashes.png", align: "center" }
      ],
      links: {},
      status: "Released"
    },

    {
      id: 6,
      title: "Urban Alley",
      category: "Unreal",
      tags: ["UE5", "Tech Art", "Lighting", "Materials", "Niagara VFX"],
      image: "/gamedev-portfolio/images/ue5-urban-alley/alley-shot_2.webp",
      description: "A 4-week deep dive into UE5's rendering pipeline, culminating in a detailed urban diorama.",
      longDescription: "A self-directed 'Tech Art Bootcamp' focused on mastering the core pillars of Unreal Engine 5: Niagara VFX, Material Graphs, and Lumen Lighting. What began as a broad theoretical study evolved into a targeted project where I engineered a complex 'Uber-Shader' Master Material and a modular VFX system. The final output is a highly detailed Urban Alley diorama, demonstrating the practical application of vertex painting, decal layering, and cinematic lighting.",
      details: {
        role: "Technical Artist (Study)",
        time: "4 Weeks (In Progress)",
        tools: "UE5, Niagara, Blender"
      },
      responsibilities: [
        "Engineered a comprehensive Master Material ('Uber-Shader') supporting vertex painting for puddles, moss, and surface variation.",
        "Developed a modular Niagara VFX system, creating assets for weather effects (rain with puddles) and others.",
        "Performed a deep-dive lighting study, rebuilding demo scenes from scratch to master Lumen's Global Illumination settings.",
      ],
      gallery: [
        { type: 'video', url: "/gamedev-portfolio/videos/ue5-urban-alley/all_angles.mp4" },
        { type: 'video', url: "/gamedev-portfolio/videos/ue5-urban-alley/main_angle_static.mp4", align: "top" },
        { type: 'image', url: "/gamedev-portfolio/images/ue5-urban-alley/angle1_final.png", align: "center" },
        { type: 'image', url: "/gamedev-portfolio/images/ue5-urban-alley/angle2_final.png", align: "center" },
        { type: 'image', url: "/gamedev-portfolio/images/ue5-urban-alley/angle3_final.png", align: "center" },
        { type: 'image', url: "/gamedev-portfolio/images/ue5-urban-alley/angle4_final.png", align: "center" },
        { type: 'image', url: "/gamedev-portfolio/images/ue5-urban-alley/angle5_final.png", align: "center" },
        { type: 'image', url: "/gamedev-portfolio/images/ue5-urban-alley/angle6_final.png", align: "center" }

      ],
      links: {
        source: "https://dev.azure.com/nik4ebPortfolio/UE-Project-One-Alley",
        artstation: "#",
        wiki: "#"
      },
      status: "Released"
    },

    {
      id: 4,
      title: "Dynamic Weather System",
      category: "VFX",
      tags: ["Unity", "Tech Art", "Shaders", "VFX", "URP"],
      image: "/gamedev-portfolio/images/dynamic-weather/tornado-main.webp",
      description: "A centralized weather controller driving stylized tornado and atmospheric effects via VFX Graph.",
      longDescription: "A comprehensive technical art project focusing on system cohesion and tool design. The core of the project is the 'Weather Orchestrator,' a central C# controller that manipulates thousands of particle properties in real-time via a single 'Storm Intensity' float. It drives a multi-layered stylized tornado, GPU-accelerated rain, and directional wind trails with some lightning effects.",
      details: {
        role: "Technical Artist",
        time: "2 Weeks",
        tools: "Unity VFX Graph, Blender, C#"
      },
      responsibilities: [
        "Designed a centralized 'Weather Orchestrator' script to interpolate global atmospheric states (calm to storm) via a single float.",
        "Created a multi-layered Tornado effect combining custom Blender meshes with VFX Graph vortex logic.",
        "Implemented high-performance, GPU-accelerated rain, lightnings and wind trails using Leader-Follower particle architectures.",
        "Modeled custom mesh emitters in Blender to control particle flow and structural definition."
      ],
      gallery: [
        { type: 'video', url: "/gamedev-portfolio/videos/dynamic-weather/tornado-slider_compr.mp4" },
        { type: 'video', url: "/gamedev-portfolio/videos/dynamic-weather/tornado-main-showcase_compr.mp4" },
        { type: 'image', url: "/gamedev-portfolio/images/dynamic-weather/tornado-main.webp", align: "top" },
        { type: 'video', url: "/gamedev-portfolio/videos/dynamic-weather/tornado-angle_compr.mp4" },
        { type: 'video', url: "/gamedev-portfolio/videos/dynamic-weather/rain-showcase_compr.mp4" },
        { type: 'video', url: "/gamedev-portfolio/videos/dynamic-weather/wind-types_compr.mp4" },
        { type: 'video', url: "/gamedev-portfolio/videos/dynamic-weather/lightning-showcase_compr.mp4" }
      ],
      links: {
        source: "https://github.com/HangyBoi/Piece-of-Dynamic-Weather",
        wiki: "https://github.com/HangyBoi/Piece-of-Dynamic-Weather/wiki"
      },
      status: "Prototype"
    },

    {
      id: 5,
      title: "Alpine Citadel",
      category: "Unreal",
      tags: ["UE5", "Environment", "Lumen", "Nanite", "Azure DevOps"],
      image: "/gamedev-portfolio/images/ue5-citadel/castle-shot_1.webp",
      description: "My transition project into Unreal Engine 5, focusing on Landscape workflows, Lumen lighting, and Azure LFS pipelines.",
      longDescription: "A comprehensive study project marking my transition from Unity to Unreal Engine 5. While following the 'Unreal Sensei' curriculum, I focused on analyzing the architectural differences between engines - specifically the shift from GameObjects to Actors and the power of the Material Graph. Crucially, I established a professional Version Control workflow using Azure DevOps to manage massive binary assets (LFS) without the storage constraints of GitHub.",
      details: {
        role: "Environment Artist (Study)",
        time: "3 weeks",
        tools: "UE5, Quixel Bridge, Azure DevOps"
      },
      responsibilities: [
        "Mastered the UE5 Landscape material workflow, utilizing Layer Blends and Weight Maps for organic terrain texturing.",
        "Implemented Lumen Global Illumination and Nanite virtualized geometry to achieve cinematic fidelity.",
        "Optimized rendering settings for hardware-specific constraints (AMD Raytracing) to maintain editor stability.",
        "Changed my Version Control pipeline using Azure DevOps to handle unlimited Git LFS storage for heavy Unreal assets."
      ],
      gallery: [
        { type: 'video', url: "/gamedev-portfolio/videos/ue5-citadel/cinematic-tour.mp4" },
        { type: 'image', url: "/gamedev-portfolio/images/ue5-citadel/castle-shot_1.webp", align: "center" },
        { type: 'image', url: "/gamedev-portfolio/images/ue5-citadel/castle-shot_2.webp", align: "center" },
        { type: 'image', url: "/gamedev-portfolio/images/ue5-citadel/castle-shot_3.webp", align: "center" },
        { type: 'image', url: "/gamedev-portfolio/images/ue5-citadel/castle-shot_4.webp", align: "center" },
        { type: 'image', url: "/gamedev-portfolio/images/ue5-citadel/castle-shot_5.webp", align: "center" },
        { type: 'video', url: "/gamedev-portfolio/videos/ue5-citadel/castle-scene-transition.mp4" },
      ],
      links: {
        source: "https://dev.azure.com/nik4ebPortfolio/UE-Project-Zero-Citadel",
        wiki: "#"
      },
      status: "Prototype"
    },

    {
      id: 7,
      title: "Modular Tower Defense",
      category: "Tools",
      tags: ["Unity", "Architecture", "Design Patterns", "ScriptableObjects", "C#", "Game"],
      image: "/gamedev-portfolio/images/tower-defense/game-zoomed.webp",
      description: "A scalable game architecture demonstrating SOLID principles and 5+ Design Patterns (Observer, Strategy, Factory).",
      longDescription: "A technical showcase developed for a Software Architecture course, focusing on decoupling systems and data-driven design. The project utilizes a 'Designer-First' approach, where all game balance (Waves, Enemy Stats, Tower Properties) is handled via ScriptableObjects. The codebase strictly adheres to SOLID principles, using Event Buses to decouple the UI from the Game Loop.",
      details: {
        role: "Software Architect",
        time: "4 Weeks",
        tools: "Unity, C#, UML"
      },
      responsibilities: [
        "Implemented the Observer Pattern via custom Event Buses to fully decouple the UI, Economy, and Wave systems.",
        "Engineered a flexible Strategy Pattern for Tower projectiles, allowing hot-swapping of behaviors (AOE, Slow, Single) at runtime.",
        "Designed a Data-Driven Wave System using ScriptableObjects, allowing designers to configure complex enemy waves without code.",
        "Utilized the Factory Pattern for tower upgrades and Object Pooling for performant UI feedback."
      ],
      gallery: [
        { type: 'video', url: "/gamedev-portfolio/videos/tower-defense/gameloop-full_speed.mp4", align: "center" },
        { type: 'image', url: "/gamedev-portfolio/images/tower-defense/game-no-hud.webp", align: "center" },
        { type: 'image', url: "/gamedev-portfolio/images/tower-defense/game-zoomed.webp", align: "top" },
        { type: 'image', url: "/gamedev-portfolio/images/tower-defense/game-with-hud.webp", align: "bottom" },
        { type: 'image', url: "/gamedev-portfolio/images/tower-defense/editor-gizmos.webp", align: "top" },
        { type: 'image', url: "/gamedev-portfolio/images/tower-defense/ufo-prefab.webp", align: "center" }
      ],
      links: {
        source: "https://github.com/HangyBoi/Tower-Defense",
        wiki: "https://github.com/HangyBoi/Tower-Defense"
      },
      status: "Released"
    },

    {
      id: 8,
      title: "The Tale of Aamsveen",
      category: "Unity",
      tags: ["Unity", "Team Lead", "AI Framework", "HDRP", "Game"],
      image: "/gamedev-portfolio/images/aamsveen/title-still.webp",
      description: "Lead Engineer for a client-based atmospheric horror game featuring complex FSM AI and physics interactions.",
      longDescription: "An atmospheric horror experience based on Dutch folklore. A client-directed academic project developed under strict weekly Agile sprints. We presented progress to stakeholders weekly, iterating rapidly based on feedback. As the Lead Architectural Engineer, I established the codebase structure and managed the Git pipeline for the team. My primary technical contribution was the 'Thimble Hunter' AI - a complex Finite State Machine featuring volumetric line-of-sight, auditory detection, and dynamic animation blending, alongside a physics-based lantern interaction system.",
      details: {
        role: "Lead Engineer & AI Progr.",
        time: "9 Weeks (Client)",
        tools: "Unity HDRP, C#, FMOD"
      },
      responsibilities: [
        "Led technical development in a client-based environment, managing weekly deliverables and stakeholder feedback loops.",
        "Architected the 'Thimble Hunter' AI using a Finite State Machine with Volumetric Line-of-Sight and auditory sensors.",
        "Co-developed a physics-driven Lantern system with fuel logic, dynamic sway, and FMOD audio integration.",
        "Managed the Git flow (branching strategy, merge reviews), code reviews, and refactoring for modularity.",
        "Implemented Entity-Player-Environment interactions and complex detection system, including water submersion and grass hiding features."
      ],
      gallery: [
        { type: 'video', url: "/gamedev-portfolio/videos/aamsveen/start-section.mp4", muted: false, align: "bottom" },
        { type: 'video', url: "/gamedev-portfolio/videos/aamsveen/clue-interact.mp4", muted: false },
        { type: 'video', url: "/gamedev-portfolio/videos/aamsveen/hunter-interact_1.mp4", muted: false },
        { type: 'video', url: "/gamedev-portfolio/videos/aamsveen/nixie-interact_alt.mp4" },
        { type: 'video', url: "/gamedev-portfolio/videos/aamsveen/lady-interact.mp4", muted: false },
        { type: 'video', url: "/gamedev-portfolio/videos/aamsveen/lady-jumpscare.mp4", muted: false },
        { type: 'video', url: "/gamedev-portfolio/videos/aamsveen/ending.mp4", muted: false },
        { type: 'video', url: "/gamedev-portfolio/videos/aamsveen/hunter-animcycles.mp4" },
        { type: 'video', url: "/gamedev-portfolio/videos/aamsveen/hunter-blendanim_2.mp4" },
        { type: 'image', url: "/gamedev-portfolio/images/aamsveen/hunter-ranges.webp", align: "bottom" },
        { type: 'video', url: "/gamedev-portfolio/videos/aamsveen/hunter-proto-awareness.mp4" },
        { type: 'video', url: "/gamedev-portfolio/videos/aamsveen/hunter-proto-los.mp4" },
        { type: 'video', url: "/gamedev-portfolio/videos/aamsveen/hunter-proto-supress.mp4", align: "bottom" },
        { type: 'video', url: "/gamedev-portfolio/videos/aamsveen/hunter-teleport.mp4" },
        { type: 'video', url: "/gamedev-portfolio/videos/aamsveen/nixie-system.mp4", },
        { type: 'image', url: "/gamedev-portfolio/images/aamsveen/nixie-zone.webp", align: "center" },
      ],
      links: {
        source: "https://github.com/miminashca/Project-Show-Off",
        itch: "https://m-nechepurenko.itch.io/tales-of-aamsveen",
        wiki: "#"
      },
      status: "Released"
    },

    {
      id: 9,
      title: "Red Veil Operations",
      category: "Unity",
      tags: ["Unity", "Multiplayer", "AI Framework", "Photon PUN", "Mobile", "URP", "Game"],
      image: "/gamedev-portfolio/images/red-veil/bed-room.webp",
      description: "Asymmetric mobile co-op horror where players communicate via voice chat to evade a sound-sensitive monster.",
      longDescription: "A 3-week client project delivering a 2-player asymmetric horror experience on mobile. One player (The Thief) navigates a dark hospital in first-person, while the other (The Operator) guides them via CCTV feeds. I engineered the networking framework and a unique AI system where the monster reacts to the players' real-world microphone volume via Photon Voice.",
      details: {
        role: "Framework & Gameplay Eng.",
        time: "3 Weeks (Client)",
        tools: "Unity, Photon PUN 2, C#"
      },
      responsibilities: [
        "Implemented real-time Voice Chat (Photon Voice) and integrated microphone input volume as a stealth mechanic for AI detection.",
        "Architected the Monster's Finite State Machine (FSM) to handle sound-reactive patrolling and chasing.",
        "Developed the 'Thief' vs 'Operator' asymmetric framework, syncing disparate player views and UI states over the network.",
        "Managed the Git repository for a 7-person team, resolving merge conflicts and maintaining a stable main branch."
      ],
      gallery: [
        { type: 'video', url: "/gamedev-portfolio/videos/red-veil/game-introduction.mp4", muted: false },
        { type: 'image', url: "/gamedev-portfolio/images/red-veil/bed-room.webp", align: "center" },
        { type: 'video', url: "/gamedev-portfolio/videos/red-veil/jar-interact.mp4", muted: false },
        { type: 'video', url: "/gamedev-portfolio/videos/red-veil/simeon-gyroscope-final.mp4", muted: false },
        { type: 'image', url: "/gamedev-portfolio/images/red-veil/reception-jar.webp", align: "center" },
        { type: 'image', url: "/gamedev-portfolio/images/red-veil/reception-camera.webp", align: "center" },
        { type: 'video', url: "/gamedev-portfolio/videos/red-veil/intense-moment.mp4", muted: false },
        { type: 'image', url: "/gamedev-portfolio/images/red-veil/monster-center.webp", align: "top" },
        { type: 'video', url: "/gamedev-portfolio/videos/red-veil/toilet-hiding.mp4", muted: false },
        { type: 'image', url: "/gamedev-portfolio/images/red-veil/monster-back.webp", align: "center" },
        { type: 'video', url: "/gamedev-portfolio/videos/red-veil/last-jars.mp4", muted: false },
        { type: 'video', url: "/gamedev-portfolio/videos/red-veil/death-from-monster.mp4", muted: false },
        { type: 'image', url: "/gamedev-portfolio/images/red-veil/style-sheet.webp", align: "center" },
        { type: 'image', url: "/gamedev-portfolio/images/red-veil/modelling-sheet.webp", align: "center" },
        { type: 'image', url: "/gamedev-portfolio/images/red-veil/map-layout.webp", align: "center" },
        { type: 'video', url: "/gamedev-portfolio/videos/red-veil/monster-twerk.mp4", muted: true },
      ],
      links: {
        source: "https://github.com/miminashca/ProjectInnovation",
        wiki: "#"
      },
      status: "Released"
    },

    {
      id: 10,
      title: "Fading Colors",
      category: "Unity",
      tags: ["Unity", "Shaders", "Post-Processing", "Narrative", "Serious Game"],
      image: "/gamedev-portfolio/images/fading-colors/main-theme.webp",
      description: "An educational narrative experience simulating Alzheimer's disease through distortive visual mechanics.",
      longDescription: "A client-driven 'Serious Game' developed to raise awareness for the Alzheimer’s Association. The project simulates the cognitive decline of an artist through progressive visual distortion and disorientation mechanics. Players experience the world from two perspectives: the patient, struggling with memory loss and blurred reality, and the caregiver, using sticky notes and organization to restore order.",
      details: {
        role: "Engineer & Tech Art Support",
        time: "3 Weeks (Client)",
        tools: "Unity, C#, Shader Graph"
      },
      responsibilities: [
        "Developed UI systems, such as monologue system via object interaction, allowing both the Patient and Caregiver explore the inner selves and the environment around.",
        "Closely worked with Designers and Engineer to come up with a coherent game loop, understandable game progression and intuitive core mechanics",
        "Implemented custom Post-Processing stacks to simulate progressive vision loss and cognitive distortion.",
        "Programmed the 'Disorientation' system, handling seamless scene transitions and furniture shuffling to confuse the player.",
        "Collaborated on Triplanar Mapping shaders to ensure consistent texture tiling across the evolving house geometry."
      ],
      gallery: [
        { type: 'image', url: "/gamedev-portfolio/images/fading-colors/main-theme.webp", align: "center" },
        { type: 'video', url: "/gamedev-portfolio/videos/fading-colors/day1-intro.mp4", align: "bottom", muted: false },
        { type: 'video', url: "/gamedev-portfolio/videos/fading-colors/day1-music-painting.mp4", align: "bottom", muted: false },
        { type: 'image', url: "/gamedev-portfolio/images/fading-colors/bedroom.webp", align: "center" },
        { type: 'image', url: "/gamedev-portfolio/images/fading-colors/house-layout.webp", align: "center" },
        { type: 'video', url: "/gamedev-portfolio/videos/fading-colors/day2-check-painting.mp4", align: "bottom", muted: false },
        { type: 'video', url: "/gamedev-portfolio/videos/fading-colors/day2-check-objects.mp4", align: "bottom", muted: false },
        { type: 'image', url: "/gamedev-portfolio/images/fading-colors/coffee-machine.webp", align: "center" },
        { type: 'video', url: "/gamedev-portfolio/videos/fading-colors/day2-shuffle.mp4", align: "bottom", muted: false },
        { type: 'image', url: "/gamedev-portfolio/images/fading-colors/main-room-normal.webp", align: "center" },
        { type: 'image', url: "/gamedev-portfolio/images/fading-colors/main-room-shuffled.webp", align: "center" },
        { type: 'video', url: "/gamedev-portfolio/videos/fading-colors/day2-painting.mp4", align: "bottom", muted: false },
        { type: 'video', url: "/gamedev-portfolio/videos/fading-colors/day3-vinyl-note.mp4", align: "bottom", muted: false },
        { type: 'video', url: "/gamedev-portfolio/videos/fading-colors/day3-paintings.mp4", align: "bottom", muted: false },
        { type: 'image', url: "/gamedev-portfolio/images/fading-colors/postit-notes.webp", align: "center" },
        { type: 'video', url: "/gamedev-portfolio/videos/fading-colors/day4-forgot.mp4", align: "bottom", muted: false },
        { type: 'video', url: "/gamedev-portfolio/videos/fading-colors/day4-vinyl-coffee.mp4", align: "bottom", muted: false },
        { type: 'image', url: "/gamedev-portfolio/images/fading-colors/milk.webp", align: "center" },
        { type: 'image', url: "/gamedev-portfolio/images/fading-colors/vinyl-player.webp", align: "center" },
        { type: 'video', url: "/gamedev-portfolio/videos/fading-colors/day4-ending.mp4", align: "bottom", muted: false },
        { type: 'image', url: "/gamedev-portfolio/images/fading-colors/end-painting.webp", align: "center" },
        { type: 'video', url: "/gamedev-portfolio/videos/fading-colors/campaign-video.mp4", align: "bottom", muted: false },
      ],
      links: {
        source: "https://github.com/BattleRamGamer/ProjectCustomer",
        wiki: "#"
      },
      status: "Released"
    },

    {
      id: 11,
      title: "Folksroad",
      category: "Unity",
      tags: ["Unity", "Team Lead", "Agile", "Business Dev"],
      image: "/gamedev-portfolio/images/folksroad/main-mara.webp",
      description: "A 2.5D RPG vertical slice developed alongside a complete business model for investor pitching.",
      longDescription: "A dual-focus project combining technical game development with business strategy. We built a polished Vertical Slice of 'Folksroad', a folklore-inspired RPG, while simultaneously developing a go-to-market Business Plan for a 'Dragon's Den' style investor pitch. As Team Lead, I restructured the development pipeline after an initial setback, implementing strict Agile processes (Daily Stand-ups, QA) to deliver a high-quality product on a tight deadline.",
      details: {
        role: "Team Lead & Gameplay Eng.",
        time: "3 Weeks (Client)",
        tools: "Unity 2.5D, C#, Tilemap, Agile"
      },
      responsibilities: [
        "Led a critical project turnaround by instituting Agile methodologies (Daily Stand-ups, QA loops) to recover from early production delays.",
        "Engineered a custom 2.5D Rendering Framework, implementing 'Don't Starve'-style billboard logic with 360° camera rotation.",
        "Programmed the core Combat System and basic Enemy AI, integrating frame-by-frame 2D animations into the 3D physics world.",
        "Established an efficient asset pipeline for 2D artists to deliver sprites that functioned correctly within the 2.5D perspective."
      ],
      gallery: [
        { type: 'image', url: "/gamedev-portfolio/images/folksroad/folksroad-theme.webp", align: "center" },
        { type: 'image', url: "/gamedev-portfolio/images/folksroad/poster-studio.webp", align: "bottom" },
        { type: 'image', url: "/gamedev-portfolio/images/folksroad/main-mara.webp", align: "top" },
        { type: 'video', url: "/gamedev-portfolio/videos/folksroad/main-theme.mp4", align: "center", muted: false },
        { type: 'image', url: "/gamedev-portfolio/images/folksroad/enemy-forces.webp", align: "bottom" },
        { type: 'video', url: "/gamedev-portfolio/videos/folksroad/camera-showcase.mp4", align: "center", muted: false },
        { type: 'video', url: "/gamedev-portfolio/videos/folksroad/dialogue-showcase.mp4", align: "bottom", muted: false },
        { type: 'image', url: "/gamedev-portfolio/images/folksroad/dialogue.webp", align: "center" },
        { type: 'video', url: "/gamedev-portfolio/videos/folksroad/fight-showcase.mp4", align: "center", muted: false },
        { type: 'image', url: "/gamedev-portfolio/images/folksroad/fight.webp", align: "center" },
        { type: 'video', url: "/gamedev-portfolio/videos/folksroad/restoring-showcase.mp4", align: "center", muted: false },
        { type: 'image', url: "/gamedev-portfolio/images/folksroad/home.webp", align: "center" },
        { type: 'video', url: "/gamedev-portfolio/videos/folksroad/bestiary-showcase.mp4", align: "center", muted: false },
        { type: 'image', url: "/gamedev-portfolio/images/folksroad/bestiary.webp", align: "center" },
      ],
      links: {
        source: "https://github.com/HangyBoi/Business-Startup",
        wiki: "#"
      },
      status: "Prototype"
    },

  ];

  const filteredProjects = activeFilter === 'All'
    ? (showAllProjects ? projects : projects.slice(0, 6))
    : projects.filter(project =>
      project.category === activeFilter ||
      project.tags.some(tag => tag.toLowerCase().includes(activeFilter.toLowerCase()))
    );

  const filters = ['All', 'UE5', 'Unity', 'Game', 'Tech Art', 'Shaders', 'VFX', 'Animation', 'Tools'];

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
                  onClick={() => {
                    setActiveFilter(filter);
                    if (filter === 'All') setShowAllProjects(false);
                  }}
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
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`grid grid-rows-2 grid-flow-col gap-8 overflow-x-auto pb-12 px-4 scrollbar-hide auto-cols-[350px] md:auto-cols-[450px] transition-all duration-500 ease-in-out ${activeFilter === 'All' && !showAllProjects ? 'xl:justify-center justify-start' : 'justify-start'
            } ${isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'}`}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              onClick={(e) => {
                if (dragMoved) {
                  e.preventDefault();
                  e.stopPropagation();
                  return;
                }
                setSelectedProject(project);
              }}
              className="group relative bg-[#111] rounded-2xl overflow-hidden border border-white/10 flex flex-col transition-all duration-300 hover:border-[#00f3ff] hover:shadow-[0_0_40px_rgba(0,243,255,0.1)] w-full h-full cursor-pointer"
            >
              {/* Aspect-video forces 16:9 ratio */}
              <figure className="relative w-full aspect-video overflow-hidden bg-gray-900 shrink-0 m-0">
                <img
                  src={project.image}
                  alt={project.title}
                  draggable={false}
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
                      onClick={(e) => {
                        if (dragMoved) e.preventDefault();
                        e.stopPropagation();
                      }}
                      className="text-xs font-bold uppercase tracking-widest text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
                    >
                      <FileText size={12} /> Read Tech Wiki
                    </a>
                  ) : (
                    <span className="text-xs text-[#00f3ff] font-bold uppercase tracking-widest group-hover:underline">View Details +</span>
                  )}

                  <div className="flex gap-2" onClick={(e) => {
                    if (dragMoved) e.preventDefault();
                    e.stopPropagation();
                  }}>
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

        {/* View More Button */}
        {activeFilter === 'All' && !showAllProjects && projects.length > 6 && (
          <div className="flex justify-center mt-4">
            <button
              onClick={() => {
                setShowAllProjects(true);
              }}
              className="px-8 py-3 rounded-full bg-[#111] border border-[#00f3ff]/50 text-[#00f3ff] font-bold tracking-widest uppercase hover:bg-[#00f3ff] hover:text-black hover:shadow-[0_0_30px_rgba(0,243,255,0.4)] transition-all hover:-translate-y-1 active:scale-95 flex items-center gap-2"
            >
              View More Projects <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;