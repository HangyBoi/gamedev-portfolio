import React, { useEffect, useRef } from 'react';

const FluidBackground = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, vx: 0, vy: 0 });
  const prevMouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const particleCount = window.innerWidth < 768 ? 800 : 2000;
      for (let i = 0; i < particleCount; i++) {
        const startX = Math.random() * canvas.width;
        const startY = Math.random() * canvas.height;
        particles.push({
          x: startX,
          y: startY,
          originX: startX,
          originY: startY,
          vx: 0,
          vy: 0,
          baseSize: Math.random() * 0.8 + 0.2, // Smaller particles
          color: Math.random() > 0.5 ? 'rgba(0, 243, 255, 0.15)' : 'rgba(0, 102, 255, 0.15)' // Reduced brightness
        });
      }
    };

    const handleMouseMove = (e) => {
      prevMouseRef.current = { x: mouseRef.current.x, y: mouseRef.current.y };
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.vx = mouseRef.current.x - prevMouseRef.current.x;
      mouseRef.current.vy = mouseRef.current.y - prevMouseRef.current.y;
    };

    const animate = () => {
      // Create trailing effect by filling with semi-transparent background color
      ctx.fillStyle = 'rgba(10, 10, 10, 0.25)'; // Faster fade to prevent muddy brightness
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.005;

      particles.forEach((p) => {
        // Pseudo-random flow field using sine waves
        const angle = Math.sin(p.x * 0.005 + time) * Math.cos(p.y * 0.005 + time) * Math.PI * 2;

        // Base flow field velocity (drastically reduced for a calmer resting state)
        p.vx += Math.cos(angle) * 0.02;
        p.vy += Math.sin(angle) * 0.02;

        // Mouse repulsion & dragging
        const dxMouse = mouseRef.current.x - p.x;
        const dyMouse = mouseRef.current.y - p.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distMouse < 200) {
          const force = (200 - distMouse) / 200;
          // Repel outward from cursor
          p.vx -= (dxMouse / distMouse) * force * 1.5;
          p.vy -= (dyMouse / distMouse) * force * 1.5;

          // Drag particles along with mouse movement
          p.vx += mouseRef.current.vx * force * 0.05;
          p.vy += mouseRef.current.vy * force * 0.05;
        }

        // Spring back to origin (recovery) to prevent chunky wave buildup
        const dxOrigin = p.originX - p.x;
        const dyOrigin = p.originY - p.y;
        p.vx += dxOrigin * 0.0003; // Extremely slow recovery
        p.vy += dyOrigin * 0.0003;

        // Apply Friction to prevent infinite acceleration
        p.vx *= 0.92;
        p.vy *= 0.92;

        // Update Position
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around screen, moving the origin too so they don't rubber-band across the whole screen
        if (p.x < 0) { p.x += canvas.width; p.originX += canvas.width; }
        if (p.x > canvas.width) { p.x -= canvas.width; p.originX -= canvas.width; }
        if (p.y < 0) { p.y += canvas.height; p.originY += canvas.height; }
        if (p.y > canvas.height) { p.y -= canvas.height; p.originY -= canvas.height; }

        // Draw Particle
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.baseSize, 0, Math.PI * 2);
        ctx.fill();
      });

      // Slowly decay mouse velocity so dragging stops when mouse stops
      mouseRef.current.vx *= 0.9;
      mouseRef.current.vy *= 0.9;

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      role="presentation"
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default FluidBackground;
