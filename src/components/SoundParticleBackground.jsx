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
    const maxParticles = 220; // Dense, rich particle stream

    class Particle {
      constructor(width, height) {
        this.reset(width, height, true);
      }

      reset(width, height, initial = false) {
        this.x = initial ? Math.random() * width : -10;
        this.speed = 0.5 + Math.random() * 1.5; // Smooth flowing speed
        this.size = 2.0 + Math.random() * 4.0; // Glowing particles (2px to 6px)
        this.alpha = 0.4 + Math.random() * 0.5; // High visibility opacity
        this.waveSelect = Math.floor(Math.random() * 3);
        this.offsetY = (Math.random() - 0.5) * 120; // Spread vertically across the hero background
        
        // Brand color palette (Cyan, Blue, Purple)
        this.hue = [185, 215, 260][Math.floor(Math.random() * 3)];
      }

      update(width, height, time) {
        this.x += this.speed;

        // Distinct waves to create a fluid, overlapping texture
        let freq, amp, speedCoeff;
        if (this.waveSelect === 0) {
          freq = 0.002; amp = 120; speedCoeff = 0.015;
        } else if (this.waveSelect === 1) {
          freq = 0.004; amp = 80; speedCoeff = 0.03;
        } else {
          freq = 0.0015; amp = 150; speedCoeff = 0.01;
        }

        const centerY = height / 2;
        const sineVal = Math.sin(this.x * freq + time * speedCoeff);
        this.y = centerY + sineVal * amp + this.offsetY;

        // Smooth fade-in near left edge, fade-out near right edge
        const edgeFade = Math.sin((this.x / width) * Math.PI);
        this.currentAlpha = Math.max(0, this.alpha * edgeFade);

        // Reset if goes off-screen
        if (this.x > width + 10) {
          this.reset(width, height);
        }
      }

      draw(ctx) {
        if (this.currentAlpha <= 0) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, 90%, 65%, ${this.currentAlpha})`;
        ctx.shadowColor = `hsla(${this.hue}, 90%, 65%, ${this.currentAlpha * 0.5})`;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }
    }

    const render = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const parentWidth = parent.clientWidth;
      const parentHeight = parent.clientHeight;

      // Bulletproof Resize Check: Automatically resize internal canvas buffer if container size changed
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

      time += 0.5;
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
