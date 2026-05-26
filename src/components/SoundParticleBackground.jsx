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
    const maxParticles = 250; // More particles for a fuller wave

    class Particle {
      constructor(width, height) {
        this.reset(width, height, true);
      }

      reset(width, height, initial = false) {
        // Spread starting positions across the width if initial, otherwise start at the left edge
        this.x = initial ? Math.random() * width : -10;
        this.speed = 0.8 + Math.random() * 1.8; // Left to right movement speed
        this.size = 2.0 + Math.random() * 3.5; // Larger particles (2px to 5.5px) for clear visibility
        this.alpha = 0.35 + Math.random() * 0.55; // Higher base opacity (35% to 90%)
        this.waveSelect = Math.floor(Math.random() * 3); // Assign to one of 3 waveforms
        this.offsetY = (Math.random() - 0.5) * 80; // Vertical spread of the stream
        
        // Brand color palette (Cyan, Blue, Purple)
        this.hue = [185, 215, 260][Math.floor(Math.random() * 3)];
      }

      update(width, height, time) {
        this.x += this.speed;

        // Wave characteristics based on wave type
        let freq, amp, speedCoeff;
        if (this.waveSelect === 0) {
          freq = 0.0025; amp = 100; speedCoeff = 0.02;
        } else if (this.waveSelect === 1) {
          freq = 0.005; amp = 60; speedCoeff = 0.035;
        } else {
          freq = 0.0018; amp = 120; speedCoeff = 0.015;
        }

        const centerY = height / 2;
        // Base sine wave motion
        const sineVal = Math.sin(this.x * freq + time * speedCoeff);
        this.y = centerY + sineVal * amp + this.offsetY;

        // Smooth fade-in near left edge, fade-out near right edge
        const edgeFade = Math.sin((this.x / width) * Math.PI);
        this.currentAlpha = Math.max(0, this.alpha * edgeFade);

        // Reset particle when it travels off-screen
        if (this.x > width + 10) {
          this.reset(width, height);
        }
      }

      draw(ctx) {
        if (this.currentAlpha <= 0) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, 90%, 65%, ${this.currentAlpha})`;
        ctx.shadowColor = `hsla(${this.hue}, 90%, 65%, ${this.currentAlpha * 0.6})`;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }
    }

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth * window.devicePixelRatio;
      canvas.height = parent.clientHeight * window.devicePixelRatio;
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      
      // Reset scale before setting it to prevent stacking scale calls
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;
      particles = [];
      for (let i = 0; i < maxParticles; i++) {
        particles.push(new Particle(width, height));
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const render = () => {
      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;

      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.update(width, height, time);
        p.draw(ctx);
      });

      time += 0.5;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="block w-full h-full" />
  );
}

export default SoundParticleBackground;
