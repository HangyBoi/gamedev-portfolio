import React, { useState, useEffect } from 'react';
import CustomCursor from './components/Cursor';
import ConstellationBackground from './components/Constellation';
import Navigation from './components/Navbar';
import Projects from './sections/Projects';
import { Layers, Gamepad2, Cpu, ArrowRight, Download, Mail, Linkedin, Github, Disc, Link as LinkIcon, MapPin, ChevronDown, ChevronUp, Briefcase, GraduationCap } from 'lucide-react';

// Hero Component (Internal for simplicity)
const Hero = () => (
  <section id="hero" className="h-screen w-full flex flex-col justify-center items-center relative px-6 z-10 overflow-hidden">
    <div className="max-w-7xl mx-auto text-center relative">

      {/* Internship Badge*/}
      <a href="https://mail.google.com/mail/?view=cm&fs=1&to=nik4eb@gmail.com" target="_blank" rel="noopener noreferrer" className="inline-block px-5 py-2 border border-cyan-500/50 bg-cyan-500/10 rounded-full text-xs font-bold tracking-[0.2em] uppercase mb-8 text-cyan-400 hover:bg-[#00f3ff] hover:text-black hover:border-[#00f3ff] hover:shadow-[0_0_30px_rgba(0,243,255,0.6)] hover:scale-105 transition-all duration-300 animate-pulse cursor-pointer shadow-[0_0_15px_rgba(0,243,255,0.2)]">
        Seeking Grad Internship 2027 • Contact Me
      </a>

      {/* Main Title */}
      <h1 className="text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-6 text-white leading-none">
        GAMEPLAY <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f3ff] to-[#0066ff]">PROGRAMMER</span>
      </h1>

      {/* Subtitle - New Colors*/}
      <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 leading-relaxed mb-12 font-light">
        Bridging the gap between Code and Art.
        <br className="hidden md:block" />
        Specializing in <span className="text-[#ff0055] font-medium">Technical Art</span>,
        <span className="text-emerald-400 font-medium"> Tools</span>,
        <span className="text-[#b145ff] font-medium"> Shaders</span>, and
        <span className="text-amber-400 font-medium"> VFX</span>.
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

const ExperienceSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-8 border border-white/10 rounded-2xl bg-white/5 overflow-hidden transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-white/5 transition-colors focus:outline-none"
      >
        <span className="text-base font-semibold text-gray-200 flex items-center gap-2">
          <Briefcase className="text-[#00f3ff]" size={18} />
          Experience & Education
        </span>
        {isOpen ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-[#00f3ff]" />}
      </button>

      <div className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <div className="p-5 pt-0 text-left">

            {/* Work Experience */}
            <div className="mb-6 relative border-l-2 border-[#00f3ff]/30 pl-5 ml-2.5">
              <div className="absolute w-2.5 h-2.5 bg-[#00f3ff] rounded-full -left-[6px] top-1.5 shadow-[0_0_10px_rgba(0,243,255,0.5)]"></div>
              <h4 className="text-base font-bold text-white mb-1">UE5 Technical Artist & VR Engineer Intern</h4>
              <div className="text-sm text-[#ff0055] font-semibold mb-1">Saxion XR Lab</div>
              <div className="text-xs text-gray-500 font-mono mb-3">Enschede, NL | Feb 2026 - Jul 2026</div>

              <ul className="space-y-4">
                <li className="text-sm text-gray-400 leading-relaxed">
                  <div className="flex items-center flex-wrap gap-2 mb-1.5">
                    <strong className="text-gray-200">ICover</strong>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#00f3ff] px-2 py-0.5 border border-[#00f3ff]/30 rounded bg-[#00f3ff]/10">
                      Client: Ministry of Defence (NL)
                    </span>
                  </div>
                  Developed immersive Niagara VFX and managed the Xsens mocap pipeline for a VR training simulation.
                </li>
                <li className="text-sm text-gray-400 leading-relaxed">
                  <div className="flex items-center flex-wrap gap-2 mb-1.5">
                    <strong className="text-gray-200">Quantum Delta</strong>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#00f3ff] px-2 py-0.5 border border-[#00f3ff]/30 rounded bg-[#00f3ff]/10">
                      Client: University of Twente Labs
                    </span>
                  </div>
                  Engineered a highly performant VR fluid and chemistry simulation using custom math models and UE5 Blueprints.
                </li>
              </ul>
            </div>

            {/* Education */}
            <div className="relative border-l-2 border-emerald-500/30 pl-5 ml-2.5">
              <div className="absolute w-2.5 h-2.5 bg-emerald-500 rounded-full -left-[6px] top-1.5 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
              <h4 className="text-base font-bold text-white mb-1">B.Sc. Creative Media and Game Technology</h4>
              <div className="text-sm text-emerald-400 font-semibold mb-1">Saxion University of Applied Sciences</div>
              <div className="text-xs text-gray-500 font-mono mb-3">Enschede, NL | 2023 - Present</div>

              <ul className="space-y-1">
                <li className="text-sm text-gray-400">
                  <span className="text-[#00f3ff] mr-2">▹</span> Specialization: Engineer
                </li>
                <li className="text-sm text-gray-400">
                  <span className="text-[#00f3ff] mr-2">▹</span> Expected Graduation: 2027
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

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

            {/* 1. UNREAL ENGINE CARD (Pink Glow) */}
            <article className="bg-[#111]/80 backdrop-blur-sm p-10 rounded-2xl border border-white/5 transition-all duration-300 hover:-translate-y-2 hover:border-[#ff0055] hover:shadow-[0_0_30px_rgba(255,0,85,0.15)] group flex flex-col h-full">
              <div className="w-14 h-14 bg-[#1a1a1a] text-white rounded-xl flex items-center justify-center mb-8 transition-colors duration-300 border border-white/10 group-hover:bg-[#ff0055] group-hover:text-white group-hover:border-transparent">
                <Gamepad2 size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Unreal Engine 5</h3>
              <p className="text-gray-400 leading-relaxed mb-6 text-sm">
                Expanding my skillset into high-fidelity pipelines. Focusing on visual scripting, materials, and environment design.
              </p>
              <ul className="space-y-3 mt-auto">
                {['Blueprints & Logic', 'Material Graph / Shaders', 'Niagara VFX Systems', 'Level Design & Lighting'].map(skill => (
                  <li key={skill} className="flex items-center gap-3 text-sm text-gray-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ff0055]"></div>{skill}
                  </li>
                ))}
              </ul>
            </article>

            {/* 2. UNITY ARCHITECT CARD (Emerald Glow) */}
            <article className="bg-[#111]/80 backdrop-blur-sm p-10 rounded-2xl border border-white/5 transition-all duration-300 hover:-translate-y-2 hover:border-emerald-500 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] group flex flex-col h-full">
              <div className="w-14 h-14 bg-[#1a1a1a] text-white rounded-xl flex items-center justify-center mb-8 transition-colors duration-300 border border-white/10 group-hover:bg-emerald-500 group-hover:text-black group-hover:border-transparent">
                <Layers size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Unity Engineering</h3>
              <p className="text-gray-400 leading-relaxed mb-6 text-sm">
                My primary engine for 2+ years. Specializing in clean C# architecture, custom editor tooling, and procedural algorithms.
              </p>
              <ul className="space-y-3 mt-auto">
                {['C# System Architecture', 'Editor Tools & Inspectors', 'Procedural Generation', 'Multiplayer (Netcode)'].map(skill => (
                  <li key={skill} className="flex items-center gap-3 text-sm text-gray-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>{skill}
                  </li>
                ))}
              </ul>
            </article>

            {/* 3. TECH ART CARD (Cyan Glow) */}
            <article className="bg-[#111]/80 backdrop-blur-sm p-10 rounded-2xl border border-white/5 transition-all duration-300 hover:-translate-y-2 hover:border-[#00f3ff] hover:shadow-[0_0_30px_rgba(0,243,255,0.15)] group flex flex-col h-full">
              <div className="w-14 h-14 bg-[#1a1a1a] text-white rounded-xl flex items-center justify-center mb-8 transition-colors duration-300 border border-white/10 group-hover:bg-[#00f3ff] group-hover:text-black group-hover:border-transparent">
                <Cpu size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Tech Art Bridge</h3>
              <p className="text-gray-400 leading-relaxed mb-6 text-sm">
                Combining engineering logic with artistic vision. I ensure assets look great while maintaining high performance.
              </p>
              <ul className="space-y-3 mt-auto">
                {['Shader Graph & VFX Graph', 'Procedural Animation (IK)', 'Animation Pipeline', 'Performance Profiling'].map(skill => (
                  <li key={skill} className="flex items-center gap-3 text-sm text-gray-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00f3ff]"></div>{skill}
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
              <img src="/gamedev-portfolio/images/misc/pfp_color_compr.jpg" alt="Nichita Cebotari" className="w-full h-full object-cover rounded-2xl relative z-10 grayscale hover:grayscale-0 transition-all duration-500 shadow-2xl" />
            </figure>

            <article className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold text-white mb-4">Nichita Cebotari</h3>

              <div className="flex items-center justify-center md:justify-start gap-2 text-gray-400 mb-6 font-mono text-sm">
                <MapPin size={16} className="text-[#00f3ff]" />
                <span>Enschede, Netherlands</span>
              </div>

              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                I am a Gameplay Engineer with a keen eye for visual polish. While my core strength lies in
                <span className="text-white font-medium"> Unreal Engine</span> and <span className="text-white font-medium">Blueprints</span>,
                I actively study animation pipelines, shaders, and VFX to deliver products that feel as good as they run.
                <br /><br />
                Seeking a <span className="text-[#00f3ff] font-semibold">Graduation Internship for early 2027</span>.
              </p>

              <ExperienceSection />

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <a href="/gamedev-portfolio/resume.pdf" target="_blank" className="px-8 py-3 rounded-full bg-[#ff0055] text-white font-bold uppercase tracking-widest hover:bg-[#d40047] hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(255,0,85,0.4)] transition-all duration-300 flex items-center justify-center gap-2">
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
            { href: "https://mail.google.com/mail/?view=cm&fs=1&to=nik4eb@gmail.com", icon: <Mail size={20} />, label: "Email" },
            { href: "https://linkedin.com/in/nichita-cebotari-881979207/", icon: <Linkedin size={20} />, label: "LinkedIn" },
            { href: "https://github.com/HangyBoi", icon: <Github size={20} />, label: "GitHub" },
            { href: "https://linktr.ee/nikkicheb", icon: <LinkIcon size={20} />, label: "Linktree" },
            { href: "https://discord.com/users/406555739696529418", icon: <Disc size={20} />, label: "Discord" }
          ].map((link, i) => (
            <a key={i} href={link.href} target="_blank" rel="noreferrer" aria-label={link.label} className="text-gray-400 hover:text-[#00f3ff] transition-all transform hover:-translate-y-1 hover:scale-110">
              {link.icon}
            </a>
          ))}
        </div>
        <p className="text-gray-600 text-sm font-mono">&copy; 2026 Nichita Cebotari. Built with React.</p>
      </footer>
    </main>
  );
};

export default App;