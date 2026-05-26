import React, { useEffect, useRef } from 'react';

function SoundParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;
    let particles = [];
    let lastTime = performance.now();
    const maxParticles = 180; // Stable, dense particle stream

    class Particle {
      constructor(width, height) {
        this.reset(width, height, true);
      }

      reset(width, height, initial = false) {
        // Set starting coordinate
        this.x = initial ? Math.random() * width : -10;
        
        // Speed in PIXELS PER SECOND (8px/s to 20px/s)
        // A 1500px wide screen will take ~75 to 180 seconds to traverse.
        this.speed = 8.0 + Math.random() * 12.0; 
        
        // Exact size constraint: 2px to 6px
        this.size = 2.0 + Math.random() * 4.0; 
        
        // Soft glowing opacity
        this.alpha = 0.15 + Math.random() * 0.45; 
        
        this.waveSelect = Math.floor(Math.random() * 3);
        
        // Vertical spread across the hero height
        this.offsetY = (Math.random() - 0.5) * 160; 
        
        // Brand audio colors (Cyan, Indigo/Blue, Purple)
        this.hue = [188, 222, 268][Math.floor(Math.random() * 3)];
      }

      update(width, height, time, dt) {
        // Increment x based on elapsed seconds (dt) to keep speed constant across all monitor refresh rates
        this.x += this.speed * dt;

        // Mathematical waveforms
        let freq, amp, speedCoeff;
        if (this.waveSelect === 0) {
          freq = 0.0012; amp = 100; speedCoeff = 0.05;
        } else if (this.waveSelect === 1) {
          freq = 0.0025; amp = 60; speedCoeff = 0.09;
        } else {
          freq = 0.0008; amp = 130; speedCoeff = 0.03;
        }

        const centerY = height / 2;
        // time represents seconds elapsed
        const sineVal = Math.sin(this.x * freq + time * speedCoeff);
        this.y = centerY + sineVal * amp + this.offsetY;

        // Edge-to-Edge: Smooth fade in at left, fade out at right
        const edgeFade = Math.sin((this.x / width) * Math.PI);
        this.currentAlpha = Math.max(0, this.alpha * edgeFade);

        // Recycle particle once it drifts off-screen
        if (this.x > width + 10) {
          this.reset(width, height);
        }
      }

      draw(ctx) {
        if (this.currentAlpha <= 0) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        
        // Render glowing circles
        ctx.fillStyle = `hsla(${this.hue}, 85%, 68%, ${this.currentAlpha})`;
        ctx.shadowColor = `hsla(${this.hue}, 85%, 68%, ${this.currentAlpha * 0.4})`;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }
    }

    const initParticles = (width, height) => {
      particles = [];
      for (let i = 0; i < maxParticles; i++) {
        particles.push(new Particle(width, height));
      }
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const width = parent.clientWidth;
      const height = parent.clientHeight;

      // Set display layout sizes
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      // Set backing store dimensions (avoiding floating point comparison loops)
      canvas.width = Math.round(width * window.devicePixelRatio);
      canvas.height = Math.round(height * window.devicePixelRatio);

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

      initParticles(width, height);
    };

    // Perform initial size configuration
    resize();

    // Use ResizeObserver to decouple layout recalculations from the animation render loop
    const resizeObserver = new ResizeObserver(() => {
      resize();
    });

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    const render = (now) => {
      // Calculate delta time in seconds
      let dt = (now - lastTime) / 1000;
      // Cap delta time to prevent massive jumps when switching tabs
      if (dt > 0.1) dt = 0.1;
      lastTime = now;

      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;

      ctx.clearRect(0, 0, width, height);

      // Increment wave progression based on delta time
      time += dt * 4.0;

      particles.forEach(p => {
        p.update(width, height, time, dt);
        p.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    // Initialize start time and launch animation loop
    lastTime = performance.now();
    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="block w-full h-full pointer-events-none" />
  );
}

export default SoundParticleBackground;
