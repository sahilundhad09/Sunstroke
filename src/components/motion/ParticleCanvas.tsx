"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  life: number;
  maxLife: number;
}

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: Particle[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const spawn = (): Particle => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const maxLife = 120 + Math.random() * 180;
      return {
        x, y,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -Math.random() * 0.5 - 0.2,
        radius: Math.random() * 1.5 + 0.5,
        opacity: 0,
        life: 0,
        maxLife,
      };
    };

    for (let i = 0; i < 60; i++) {
      const p = spawn();
      p.life = Math.random() * p.maxLife;
      particles.push(p);
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Occasionally spawn new
      if (particles.length < 80 && Math.random() < 0.3) {
        particles.push(spawn());
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;

        const lifeRatio = p.life / p.maxLife;
        p.opacity = lifeRatio < 0.2
          ? lifeRatio / 0.2
          : lifeRatio > 0.8
          ? (1 - lifeRatio) / 0.2
          : 1;

        const isBlue = i % 3 === 0;
        const color = isBlue
          ? `rgba(59,130,246,${p.opacity * 0.35})`
          : `rgba(0,212,255,${p.opacity * 0.3})`;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
