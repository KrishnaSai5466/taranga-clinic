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
    const maxParticles = 190; // Dense, flowing stream of particles

    class Particle {
      constructor(width, height) {
        this.reset(width, height, true);
      }

      reset(width, height, initial = false) {
        // Set starting coordinate
        this.x = initial ? Math.random() * width : -10;
        
        // Halved speed (0.125 to 0.35) for a super slow-motion drift
        this.speed = 0.125 + Math.random() * 0.225; 
        
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

      update(width, height, time) {
        this.x += this.speed;

        // Halved wave speed coefficients
        let freq, amp, speedCoeff;
        if (this.waveSelect === 0) {
          freq = 0.0012; amp = 100; speedCoeff = 0.002;
        } else if (this.waveSelect === 1) {
          freq = 0.0025; amp = 60; speedCoeff = 0.0035;
        } else {
          freq = 0.0008; amp = 130; speedCoeff = 0.0015;
        }

        const centerY = height / 2;
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

    const render = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const parentWidth = parent.clientWidth;
      const parentHeight = parent.clientHeight;

      // Dynamic resize detection
      if (
        canvas.width !== parentWidth * window.devicePixelRatio ||
        canvas.height !== parentHeight * window.devicePixelRatio
      ) {
        canvas.width = parentWidth * window.devicePixelRatio;
        canvas.height = parentHeight * window.devicePixelRatio;
        canvas.style.width = '100%';
        canvas.style.height = '100%';

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

        const width = canvas.width / window.devicePixelRatio;
        const height = canvas.height / window.devicePixelRatio;

        particles = [];
        for (let i = 0; i < maxParticles; i++) {
          particles.push(new Particle(width, height));
        }
      }

      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;

      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.update(width, height, time);
        p.draw(ctx);
      });

      time += 0.25; // Halved from 0.5 to slow down wave animations
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="block w-full h-full" />
  );
}

export default SoundParticleBackground;
