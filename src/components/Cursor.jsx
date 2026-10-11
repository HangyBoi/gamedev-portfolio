import React, { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const isHoveringRef = useRef(false);
  const isVisibleRef = useRef(false);
  const posRef = useRef({ x: -100, y: -100 });
  const rafIdRef = useRef(null);
  const isRafScheduledRef = useRef(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const render = () => {
      // translate3d enables pure hardware-accelerated GPU layer compositing
      cursor.style.transform = `translate3d(${posRef.current.x - 12}px, ${posRef.current.y - 12}px, 0)`;
      isRafScheduledRef.current = false;
    };

    const handleMouseMove = (e) => {
      posRef.current.x = e.clientX;
      posRef.current.y = e.clientY;

      // Throttle DOM mutations to display refresh rate (shields against 1000Hz+ gaming mice)
      if (!isRafScheduledRef.current) {
        isRafScheduledRef.current = true;
        rafIdRef.current = requestAnimationFrame(render);
      }

      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target || !(target instanceof Element)) return;

      const clickableElement = target.closest('a, button, [role="button"], input, select, textarea, article, [class*="cursor-pointer"], .group');
      const hovering = !!clickableElement;

      // Only trigger React re-renders when the hover state actually changes
      if (hovering !== isHoveringRef.current) {
        isHoveringRef.current = hovering;
        setIsHovering(hovering);
      }
    };

    const handleMouseLeave = () => {
      isVisibleRef.current = false;
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      isVisibleRef.current = true;
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className={`fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-exclusion hidden md:block will-change-transform transition-opacity duration-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className={`w-6 h-6 rounded-full border-2 border-[#00f3ff] shadow-[0_0_10px_#00f3ff] transition-all duration-300 ease-out ${isHovering ? 'scale-[1.5] bg-[#00f3ff]/20 border-[#00f3ff]/50' : ''}`}></div>
      <div className={`absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${isHovering ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}></div>
    </div>
  );
};

export default CustomCursor;