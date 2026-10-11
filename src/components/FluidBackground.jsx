import React, { useEffect, useRef } from 'react';

const FluidBackground = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, vx: 0, vy: 0 });
  const rawMouseRef = useRef({ x: -1000, y: -1000 });
  const prevMouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let cyanParticles = [];
    let blueParticles = [];
    let time = 0;
    let lastFrameTime = 0;
    const targetFPS = 60;
    const frameInterval = 1000 / targetFPS;

    const createParticle = (width, height) => {
      const startX = Math.random() * width;
      const startY = Math.random() * height;
      return {
        x: startX,
        y: startY,
        originX: startX,
        originY: startY,
        vx: 0,
        vy: 0,
        baseSize: Math.random() * 0.8 + 0.2,
      };
    };

    const initParticles = () => {
      cyanParticles = [];
      blueParticles = [];
      const particleCount = window.innerWidth < 768 ? 800 : 2000;
      const halfCount = Math.floor(particleCount / 2);

      for (let i = 0; i < halfCount; i++) {
        cyanParticles.push(createParticle(canvas.width, canvas.height));
        blueParticles.push(createParticle(canvas.width, canvas.height));
      }
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      initParticles();
    };

    // Low-overhead mouse handler: stores raw coords (shielding against 1000Hz+ mouse event flood)
    const handleMouseMove = (e) => {
      rawMouseRef.current.x = e.clientX;
      rawMouseRef.current.y = e.clientY;
    };

    const updateParticle = (p, width, height, mouseX, mouseY, mouseVx, mouseVy) => {
      // EXACT ORIGINAL PHYSICS: Pseudo-random flow field using sine waves
      const angle = Math.sin(p.x * 0.005 + time) * Math.cos(p.y * 0.005 + time) * Math.PI * 2;

      // Base flow field velocity
      p.vx += Math.cos(angle) * 0.02;
      p.vy += Math.sin(angle) * 0.02;

      // Mouse repulsion & dragging
      const dxMouse = mouseX - p.x;
      const dyMouse = mouseY - p.y;
      const distSq = dxMouse * dxMouse + dyMouse * dyMouse;

      if (distSq < 40000 && distSq > 0) { // 200 * 200 = 40000 (squared distance avoids Math.sqrt for distant particles)
        const distMouse = Math.sqrt(distSq);
        const force = (200 - distMouse) / 200;
        // Repel outward from cursor
        p.vx -= (dxMouse / distMouse) * force * 1.5;
        p.vy -= (dyMouse / distMouse) * force * 1.5;

        // Drag particles along with mouse movement
        p.vx += mouseVx * force * 0.05;
        p.vy += mouseVy * force * 0.05;
      }

      // Spring back to origin (recovery) to prevent chunky wave buildup
      const dxOrigin = p.originX - p.x;
      const dyOrigin = p.originY - p.y;
      p.vx += dxOrigin * 0.0003;
      p.vy += dyOrigin * 0.0003;

      // Apply Friction to prevent infinite acceleration
      p.vx *= 0.92;
      p.vy *= 0.92;

      // Update Position
      p.x += p.vx;
      p.y += p.vy;

      // Wrap around screen, moving the origin too so they don't rubber-band across the whole screen
      if (p.x < 0) { p.x += width; p.originX += width; }
      if (p.x > width) { p.x -= width; p.originX -= width; }
      if (p.y < 0) { p.y += height; p.originY += height; }
      if (p.y > height) { p.y -= height; p.originY -= height; }
    };

    const animate = (currentTime) => {
      animationFrameId = requestAnimationFrame(animate);

      // Pause when tab is inactive to save system resources
      if (document.hidden) return;

      // Frame rate clamping: ensures 120Hz/144Hz/240Hz monitors run at a rock-solid 60 FPS
      const elapsed = currentTime - lastFrameTime;
      if (elapsed < frameInterval - 1) return;
      lastFrameTime = currentTime - (elapsed % frameInterval);

      // CLEAN FADE FIX: Use 'destination-out' to decay existing trails cleanly to transparent (alpha 0)
      // This eliminates the 8-bit color quantization bug where rgba(10,10,10,0.25) permanently baked onto #0a0a0a
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'source-over';

      time += 0.005;

      // Process mouse velocity once per frame
      const mouseX = rawMouseRef.current.x;
      const mouseY = rawMouseRef.current.y;

      if (prevMouseRef.current.x !== -1000) {
        mouseRef.current.vx = mouseX - prevMouseRef.current.x;
        mouseRef.current.vy = mouseY - prevMouseRef.current.y;
      }
      mouseRef.current.x = mouseX;
      mouseRef.current.y = mouseY;
      prevMouseRef.current.x = mouseX;
      prevMouseRef.current.y = mouseY;

      const mouseVx = mouseRef.current.vx;
      const mouseVy = mouseRef.current.vy;
      const width = canvas.width;
      const height = canvas.height;

      // BATCH 1: Cyan particles (single beginPath & fill call)
      ctx.fillStyle = 'rgba(0, 243, 255, 0.15)';
      ctx.beginPath();
      for (let i = 0; i < cyanParticles.length; i++) {
        const p = cyanParticles[i];
        updateParticle(p, width, height, mouseX, mouseY, mouseVx, mouseVy);
        ctx.moveTo(p.x + p.baseSize, p.y);
        ctx.arc(p.x, p.y, p.baseSize, 0, Math.PI * 2);
      }
      ctx.fill();

      // BATCH 2: Blue particles (single beginPath & fill call)
      ctx.fillStyle = 'rgba(0, 102, 255, 0.15)';
      ctx.beginPath();
      for (let i = 0; i < blueParticles.length; i++) {
        const p = blueParticles[i];
        updateParticle(p, width, height, mouseX, mouseY, mouseVx, mouseVy);
        ctx.moveTo(p.x + p.baseSize, p.y);
        ctx.arc(p.x, p.y, p.baseSize, 0, Math.PI * 2);
      }
      ctx.fill();

      // Slowly decay mouse velocity so dragging stops when mouse stops
      mouseRef.current.vx *= 0.9;
      mouseRef.current.vy *= 0.9;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    resize();
    animationFrameId = requestAnimationFrame(animate);

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
