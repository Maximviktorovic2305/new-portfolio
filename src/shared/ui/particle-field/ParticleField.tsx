import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { colors } from "@/shared/config";

const particleColors = [colors.pink, colors.teal, colors.orange, colors.lavender, colors.lime, colors.sky];

interface Particle {
  x: number;
  y: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  wobble: number;
  wobbleSpeed: number;
}

export function ParticleField() {
  const shouldReduceMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const count = Math.min(35, Math.floor(window.innerWidth / 40));

    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * 200,
      vy: -(Math.random() * 0.4 + 0.1),
      size: Math.random() * 8 + 3,
      opacity: Math.random() * 0.15 + 0.03,
      color: particleColors[Math.floor(Math.random() * particleColors.length)] ?? colors.lavender,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.02 + 0.01,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;

      for (const b of particles) {
        b.y += b.vy;
        b.wobble += b.wobbleSpeed;
        const wx = Math.sin(b.wobble) * 20;

        if (b.y < -20) {
          b.y = canvas.height + 20;
          b.x = Math.random() * canvas.width;
          b.color = particleColors[Math.floor(Math.random() * particleColors.length)] ?? colors.lavender;
        }

        // Draw bubble
        ctx.beginPath();
        ctx.arc(b.x + wx, b.y, b.size, 0, Math.PI * 2);
        ctx.fillStyle = b.color;
        ctx.globalAlpha = b.opacity;
        ctx.fill();

        // Highlight
        ctx.beginPath();
        ctx.arc(b.x + wx - b.size * 0.25, b.y - b.size * 0.25, b.size * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.globalAlpha = b.opacity * 0.5;
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [shouldReduceMotion]);

  if (shouldReduceMotion) return null;

  return (
    <canvas
      aria-hidden="true"
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
