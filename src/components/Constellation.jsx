import React, { useEffect, useRef } from 'react';

const ConstellationBackground = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const particleCount = window.innerWidth < 768 ? 40 : 80;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          baseSize: Math.random() * 1.5 + 0.5,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.02 + Math.random() * 0.02,
        });
      }
    };

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, index) => {
        p.pulsePhase += p.pulseSpeed;
        const currentSize = p.baseSize + Math.sin(p.pulsePhase) * 0.5;
        const drawSize = Math.max(0.1, currentSize);

        const dxMouse = mouseRef.current.x - p.x;
        const dyMouse = mouseRef.current.y - p.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        // ORBITAL SWIRL (Black Hole)
        if (distMouse < 300) {
          const force = (300 - distMouse) / 300;
          // Tangent vector for swirl (-dy, dx)
          p.vx += (-dyMouse / distMouse) * force * 0.04;
          p.vy += (dxMouse / distMouse) * force * 0.04;
          // Very slight gravity so they don't completely fly away forever
          p.vx += (dxMouse / distMouse) * force * 0.01;
          p.vy += (dyMouse / distMouse) * force * 0.01;
        }

        // Apply Friction
        p.vx *= 0.98;
        p.vy *= 0.98;

        // Restore natural drift if they slow down too much
        if (Math.abs(p.vx) < 0.05 && Math.abs(p.vy) < 0.05) {
          p.vx += (Math.random() - 0.5) * 0.01;
          p.vy += (Math.random() - 0.5) * 0.01;
        }

        // Update Position
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off walls smoothly
        if (p.x < 0) { p.x = 0; p.vx *= -1; }
        if (p.x > canvas.width) { p.x = canvas.width; p.vx *= -1; }
        if (p.y < 0) { p.y = 0; p.vy *= -1; }
        if (p.y > canvas.height) { p.y = canvas.height; p.vy *= -1; }

        // Draw Star
        ctx.beginPath();
        ctx.arc(p.x, p.y, drawSize, 0, Math.PI * 2);

        // Brand color for stars near mouse
        if (distMouse < 200) {
          ctx.fillStyle = `rgba(0, 243, 255, ${0.6 * (1 - distMouse / 200)})`;
        } else {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        }
        ctx.fill();

        // DRAW CONNECTIONS
        // Mouse Connection (Cyan)
        if (distMouse < 180) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0, 243, 255, ${0.3 * (1 - distMouse / 180)})`;
          ctx.lineWidth = 0.6;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
          ctx.stroke();
        }

        // Particle Connections
        for (let j = index + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.05 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.4;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

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
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-50"
    />
  );
};

export default ConstellationBackground;