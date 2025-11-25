import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const updateCursor = (e) => {
      if (cursorRef.current) {
        // Direct transform is the fastest way to render
        cursorRef.current.style.transform = `translate(${e.clientX - 12}px, ${e.clientY - 12}px)`;
      }
    };
    
    window.addEventListener('mousemove', updateCursor);
    return () => window.removeEventListener('mousemove', updateCursor);
  }, []);

  return (
    <div 
      ref={cursorRef}
      // REMOVED: "transition-transform duration-75" to fix lag
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-exclusion hidden md:block will-change-transform"
    >
      <div className="w-6 h-6 rounded-full border-2 border-[#00f3ff] shadow-[0_0_10px_#00f3ff]"></div>
      <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
    </div>
  );
};

export default CustomCursor;