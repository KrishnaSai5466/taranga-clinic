import React, { useEffect, useRef } from 'react';

function SoundWave() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    const resizeCanvas = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = 140 * window.devicePixelRatio;
      canvas.style.width = '100%';
      canvas.style.height = '140px';
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const render = () => {
      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;
      
      ctx.clearRect(0, 0, width, height);

      // Sound waves parameters: [amplitude, frequency, speed, color, lineWidth]
      const waves = [
        { amp: 22, freq: 0.006, speed: 0.05, color: 'rgba(59, 130, 246, 0.7)', width: 2.5, glow: 'rgba(59, 130, 246, 0.4)' },   // Blue
        { amp: 14, freq: 0.012, speed: 0.08, color: 'rgba(99, 102, 241, 0.65)', width: 1.5, glow: 'rgba(99, 102, 241, 0.3)' },  // Indigo
        { amp: 18, freq: 0.008, speed: -0.04, color: 'rgba(168, 85, 247, 0.5)', width: 2.0, glow: 'rgba(168, 85, 247, 0.2)' },  // Purple
        { amp: 10, freq: 0.018, speed: 0.12, color: 'rgba(6, 182, 212, 0.8)', width: 1.0, glow: 'rgba(6, 182, 212, 0.5)' }     // Cyan
      ];

      waves.forEach(wave => {
        ctx.beginPath();
        
        // Horizontal line coordinates
        const centerY = height / 2;
        
        for (let x = 0; x < width; x++) {
          // Sine wave formula: y = A * sin(B * x + C * t)
          // Add a fade effect at the left and right edges so the wave starts/ends at 0 amplitude
          const edgeFade = Math.sin((x / width) * Math.PI);
          const y = centerY + Math.sin(x * wave.freq + time * wave.speed) * wave.amp * edgeFade;
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.strokeStyle = wave.color;
        ctx.lineWidth = wave.width;
        ctx.shadowColor = wave.glow;
        ctx.shadowBlur = 8;
        ctx.stroke();
        ctx.shadowBlur = 0; // reset
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
    <div className="relative w-full h-[140px] overflow-hidden flex items-center justify-center">
      <canvas ref={canvasRef} className="block opacity-85" />
    </div>
  );
}

export default SoundWave;
