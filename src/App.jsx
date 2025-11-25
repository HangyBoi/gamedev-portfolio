import React, { useState, useEffect } from 'react';
import CustomCursor from './components/Cursor';
import ConstellationBackground from './components/Constellation';
import Navigation from './components/Navbar';
import Projects from './sections/Projects';
import { Layers, Gamepad2, Cpu, ArrowRight, Download, Mail, Linkedin, Github, Disc, Link as LinkIcon } from 'lucide-react';

// Hero Component (Internal for simplicity)
const Hero = () => (
  <section id="hero" className="h-screen w-full flex flex-col justify-center items-center relative px-6 z-10 overflow-hidden">
    <div className="max-w-7xl mx-auto text-center relative">
      <div className="inline-block px-5 py-2 border border-[#ff0055]/30 bg-[#ff0055]/10 rounded-full text-xs font-bold tracking-[0.2em] uppercase mb-8 text-[#ff0055] animate-pulse">
        Open for Internships 2026
      </div>
      
      <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-6 text-white leading-none">
        TECHNICAL <br/>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f3ff] to-[#0066ff]">ARTIST</span>
      </h1>
      
      <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 leading-relaxed mb-12 font-light">
        Bridging the gap between <span className="text-white font-medium">Code</span> and <span className="text-white font-medium">Art</span>.
        <br className="hidden md:block"/>
        Specializing in procedural tools, shaders, VFX, and materials.
      </p>
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
        <a href="#works" className="px-8 py-4 rounded-full bg-white text-black font-bold uppercase tracking-widest hover:bg-[#00f3ff] hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,243,255,0.5)] transition-all duration-300 flex items-center gap-2">
          Selected Works <ArrowRight size={18} />
        </a>
      </div>
    </div>

    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500 animate-bounce">
      <ArrowRight className="rotate-90" />
    </div>
  </section>
);

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-gray-200 font-sans selection:bg-[#ff0055] selection:text-white">
      <CustomCursor />
      <ConstellationBackground />
      <Navigation isScrolled={isScrolled} />
      
      <Hero />
      
      <section id="stack" className="py-32 px-6 border-t border-white/5 bg-transparent relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
             <div>
               <span className="text-[#00f3ff] font-mono text-xl mb-2 block">01.</span>
               <h2 className="text-4xl md:text-5xl font-bold text-white">Technical Arsenal</h2>
             </div>
             <p className="text-gray-400 max-w-md text-right md:text-left">
               Solving complex pipeline and rendering challenges.
             </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Unity Card */}
            <article className="bg-[#111]/80 backdrop-blur-sm p-10 rounded-2xl border border-white/5 transition-all duration-300 hover:-translate-y-2 hover:border-[#00f3ff] hover:shadow-[0_0_30px_rgba(0,243,255,0.15)] group flex flex-col h-full">
              <div className="w-14 h-14 bg-[#1a1a1a] text-white rounded-xl flex items-center justify-center mb-8 transition-colors duration-300 border border-white/10 group-hover:bg-[#00f3ff] group-hover:text-black group-hover:border-transparent">
                <Layers size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Unity Ecology</h3>
              <p className="text-gray-400 leading-relaxed mb-6 text-sm">2+ years of C# & Unity development. Focus on game architecture and tooling.</p>
              <ul className="space-y-3 mt-auto">
                {['System Architecture', 'WFC Procedural Gen', 'Editor Tooling', 'Custom Animations'].map(skill => (
                  <li key={skill} className="flex items-center gap-3 text-sm text-gray-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00f3ff]"></div>{skill}
                  </li>
                ))}
              </ul>
            </article>

            {/* Unreal Card */}
            <article className="bg-[#111]/80 backdrop-blur-sm p-10 rounded-2xl border border-white/5 transition-all duration-300 hover:-translate-y-2 hover:border-[#ff0055] hover:shadow-[0_0_30px_rgba(255,0,85,0.15)] group flex flex-col h-full">
              <div className="w-14 h-14 bg-[#1a1a1a] text-white rounded-xl flex items-center justify-center mb-8 transition-colors duration-300 border border-white/10 group-hover:bg-[#ff0055] group-hover:text-white group-hover:border-transparent">
                <Gamepad2 size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Unreal Focus</h3>
              <p className="text-gray-400 leading-relaxed mb-6 text-sm">Translating logic to UE5. Building visual systems and material graphs.</p>
              <ul className="space-y-3 mt-auto">
                {['Niagara VFX Systems', 'Material Graph Magic', 'Blueprint Logic', 'Control Rig (Learning)'].map(skill => (
                  <li key={skill} className="flex items-center gap-3 text-sm text-gray-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ff0055]"></div>{skill}
                  </li>
                ))}
              </ul>
            </article>

            {/* Generalist Card */}
            <article className="bg-[#111]/80 backdrop-blur-sm p-10 rounded-2xl border border-white/5 transition-all duration-300 hover:-translate-y-2 hover:border-purple-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] group flex flex-col h-full">
              <div className="w-14 h-14 bg-[#1a1a1a] text-white rounded-xl flex items-center justify-center mb-8 transition-colors duration-300 border border-white/10 group-hover:bg-purple-500 group-hover:text-white group-hover:border-transparent">
                <Cpu size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Future Generalist</h3>
              <p className="text-gray-400 leading-relaxed mb-6 text-sm">Bridging disciplines to handle the full technical art pipeline.</p>
              <ul className="space-y-3 mt-auto">
                {['Technical Art & Shaders', 'Custom C++ in UE5', 'Houdini & Blender', 'Pipeline Optimization'].map(skill => (
                  <li key={skill} className="flex items-center gap-3 text-sm text-gray-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>{skill}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <Projects />
      
      <section id="about" className="py-32 bg-transparent border-t border-white/5 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-left mb-16">
             <span className="text-[#00f3ff] font-mono text-xl mb-2 block">03.</span>
             <h2 className="text-4xl md:text-5xl font-bold text-white">About Me</h2>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-12">
            <figure className="w-64 h-64 flex-shrink-0 relative group">
               <div className="absolute inset-0 border-2 border-[#00f3ff] rounded-2xl translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300"></div>
               <img src="https://placehold.co/400x400/222/fff?text=Photo" alt="Nikita Cebotari Portrait" className="w-full h-full object-cover rounded-2xl relative z-10 grayscale hover:grayscale-0 transition-all duration-500 shadow-2xl" />
            </figure>

            <article className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold text-white mb-4">Nikita Cebotari</h3>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                3rd Year Creative Media & Game Technology student. My focus is building robust tools for artists and optimizing rendering pipelines. 
                I solve the technical challenges that allow art to run at 60fps.
                <br/><br/>
                Currently seeking a <span className="text-[#00f3ff] font-semibold">Summer 2026 Internship</span> in Game Development.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                 <a href="/resume.pdf" className="px-8 py-3 rounded-full bg-[#ff0055] text-white font-bold uppercase tracking-widest hover:bg-[#d40047] hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(255,0,85,0.4)] transition-all duration-300 flex items-center justify-center gap-2">
                   <Download size={18} /> Download Resume
                 </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      <footer className="py-12 bg-[#050505] border-t border-white/10 text-center relative z-10">
        <div className="flex justify-center gap-8 mb-8">
          {[
            { href: "mailto:nik4eb@gmail.com", icon: <Mail size={20} />, label: "Email" },
            { href: "https://linkedin.com/in/nichita-cebotari-881979207/", icon: <Linkedin size={20} />, label: "LinkedIn" },
            { href: "https://github.com/HangyBoi", icon: <Github size={20} />, label: "GitHub" },
            { href: "#", icon: <LinkIcon size={20} />, label: "Linktree" },
            { href: "#", icon: <Disc size={20} />, label: "Discord" }
          ].map((link, i) => (
            <a key={i} href={link.href} target="_blank" rel="noreferrer" aria-label={link.label} className="text-gray-400 hover:text-[#00f3ff] transition-all transform hover:-translate-y-1 hover:scale-110">
              {link.icon}
            </a>
          ))}
        </div>
        <p className="text-gray-600 text-sm font-mono">&copy; 2025 Nikita Cebotari. Built with React.</p>
      </footer>
    </main>
  );
};

export default App;