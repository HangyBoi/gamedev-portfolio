import React, { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateCursor = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 12}px, ${e.clientY - 12}px)`;
      }
    };

    const handleMouseOver = (e) => {
      // Check if the target or its ancestors are clickable elements
      const target = e.target;
      const clickableElement = target.closest('a, button, [role="button"], input, select, textarea, article, [class*="cursor-pointer"], .group');
      setIsHovering(!!clickableElement);
    };

    window.addEventListener('mousemove', updateCursor);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', updateCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-exclusion hidden md:block will-change-transform"
    >
      <div className={`w-6 h-6 rounded-full border-2 border-[#00f3ff] shadow-[0_0_10px_#00f3ff] transition-all duration-300 ease-out ${isHovering ? 'scale-[1.5] bg-[#00f3ff]/20 border-[#00f3ff]/50' : ''}`}></div>
      <div className={`absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${isHovering ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}></div>
    </div>
  );
};

export default CustomCursor;