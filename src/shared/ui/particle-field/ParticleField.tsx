import { useEffect, useRef } from "react";
import { colors } from "@/shared/config";

interface Bubble {
  x: number;
  y: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  wobble: number;
  wobbleSpeed: number;
}

const bubbleColors = [colors.pink, colors.teal, colors.orange, colors.lavender, colors.lime];

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bubblesRef = useRef<Bubble[]>([]);
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);

  useEffect(() => {
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

    bubblesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * 200,
      vy: -(Math.random() * 0.4 + 0.1),
      size: Math.random() * 8 + 3,
      opacity: Math.random() * 0.15 + 0.03,
      color: bubbleColors[Math.floor(Math.random() * bubbleColors.length)],
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.02 + 0.01,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      timeRef.current += 1;
      const bubbles = bubblesRef.current;

      for (const b of bubbles) {
        b.y += b.vy;
        b.wobble += b.wobbleSpeed;
        const wx = Math.sin(b.wobble) * 20;

        if (b.y < -20) {
          b.y = canvas.height + 20;
          b.x = Math.random() * canvas.width;
          b.color = bubbleColors[Math.floor(Math.random() * bubbleColors.length)];
        }

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
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}