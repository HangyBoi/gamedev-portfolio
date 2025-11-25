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
      const particleCount = window.innerWidth < 768 ? 40 : 80; // Increased count slightly for better fluid feel
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          // Lower base velocity for a calmer drift
          vx: (Math.random() - 0.5) * 0.2, 
          vy: (Math.random() - 0.5) * 0.2,
          // Store base size to oscillate around
          baseSize: Math.random() * 1.5 + 0.5,
          // Randomize the twinkling phase so they don't pulse in unison
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
        // 1. TWINKLE EFFECT
        // Oscillate size using sine wave for smooth "breathing"
        p.pulsePhase += p.pulseSpeed;
        const currentSize = p.baseSize + Math.sin(p.pulsePhase) * 0.5; // Fluctuate size by +/- 0.5px
        // Ensure size doesn't go negative
        const drawSize = Math.max(0.1, currentSize);

        // 2. MOUSE ATTRACTION (The "Magnetic" Feel)
        const dxMouse = mouseRef.current.x - p.x;
        const dyMouse = mouseRef.current.y - p.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        
        // If within range, gently pull particle towards mouse
        if (distMouse < 250) {
            const force = (250 - distMouse) / 250; // Stronger force when closer
            // Add a tiny vector towards the mouse (Subtle gravity)
            p.vx += (dxMouse / distMouse) * force * 0.02; 
            p.vy += (dyMouse / distMouse) * force * 0.02;
        }

        // Apply Friction (to stop them from speeding up infinitely)
        p.vx *= 0.98;
        p.vy *= 0.98;

        // Update Position
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off walls
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Draw Star
        ctx.beginPath();
        ctx.arc(p.x, p.y, drawSize, 0, Math.PI * 2);
        // Use your Cyan brand color for stars near mouse, white for others
        if (distMouse < 200) {
           ctx.fillStyle = `rgba(0, 243, 255, ${0.6 * (1 - distMouse / 200)})`; 
        } else {
           ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        }
        ctx.fill();

        // 3. DRAW CONNECTIONS
        // Mouse Connection (Cyan)
        if (distMouse < 180) {
           ctx.beginPath();
           ctx.strokeStyle = `rgba(0, 243, 255, ${0.3 * (1 - distMouse / 180)})`;
           ctx.lineWidth = 0.6;
           ctx.moveTo(p.x, p.y);
           ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
           ctx.stroke();
        }

        // Particle Connections (Subtle White)
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