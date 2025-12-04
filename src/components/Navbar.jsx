import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navigation = ({ isScrolled }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-8'}`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo Image */}
        <div className="relative z-50 hover:-translate-y-1 transition-transform">
           <a href="#hero" aria-label="Home">
             <img 
               src="/gamedev-portfolio/images/logo.png" 
               alt="4ibik Logo" 
               className="h-8 w-auto object-contain invert brightness-0 filter" 
               // NOTE: Your logo is black. 'invert' makes it white to match the dark theme.
               // If your logo is already white, remove 'invert brightness-0 filter'
             />
           </a>
        </div>

        {/* Desktop Navigation */}
        <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-8 font-medium text-sm text-gray-400">
          <a href="#hero" className="hover:text-[#00f3ff] transition-all hover:-translate-y-0.5 uppercase tracking-widest text-xs font-bold">Home</a>
          <a href="#stack" className="hover:text-[#00f3ff] transition-all hover:-translate-y-0.5 uppercase tracking-widest text-xs font-bold">Stack</a>
          <a href="#works" className="hover:text-[#00f3ff] transition-all hover:-translate-y-0.5 uppercase tracking-widest text-xs font-bold">Work</a>
          <a href="#about" className="hover:text-[#00f3ff] transition-all hover:-translate-y-0.5 uppercase tracking-widest text-xs font-bold">About</a>
          
          <a href="mailto:nik4eb@gmail.com" className="px-6 py-2.5 rounded-full border border-[#00f3ff] text-[#00f3ff] hover:bg-[#00f3ff] hover:text-black transition-all duration-300 hover:-translate-y-1 uppercase text-xs font-bold tracking-widest shadow-[0_0_10px_rgba(0,243,255,0.2)] hover:shadow-[0_0_20px_rgba(0,243,255,0.6)]">
            Contact
          </a>
        </nav>

        {/* Mobile Toggle Button */}
        <button 
          className="md:hidden text-white z-50" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
      
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <nav 
          aria-label="Mobile Navigation"
          className="md:hidden absolute top-0 left-0 w-full h-screen bg-[#0a0a0a] px-6 flex flex-col justify-center items-center gap-8 font-medium text-xl z-40"
        >
          <a href="#hero" onClick={() => setMobileMenuOpen(false)} className="text-white">Home</a>
          <a href="#stack" onClick={() => setMobileMenuOpen(false)} className="text-white">Stack</a>
          <a href="#works" onClick={() => setMobileMenuOpen(false)} className="text-white">Work</a>
          <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-white">About</a>
        </nav>
      )}
    </header>
  );
};

export default Navigation;