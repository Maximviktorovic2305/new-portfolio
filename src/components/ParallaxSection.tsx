"use client";

import { useEffect, useRef } from 'react';
import { useAnimation } from '@/contexts/AnimationContext';

export default function ParallaxSection() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const { settings } = useAnimation();

  useEffect(() => {
    if (!settings.enabled) return;
    
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrollPosition = window.scrollY;
        const speed = settings.intensity === 'subtle' ? 0.1 : 
                     settings.intensity === 'moderate' ? 0.2 : 0.3;
        
        parallaxRef.current.style.transform = `translateY(${scrollPosition * speed}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [settings]);

  return (
    <div className="relative h-96 overflow-hidden">
      <div 
        ref={parallaxRef}
        className="absolute inset-0 flex items-center justify-center"
        style={{ 
          backgroundImage: 'linear-gradient(45deg, #0a0a0a 25%, #1a1a1a 25%, #1a1a1a 50%, #0a0a0a 50%, #0a0a0a 75%, #1a1a1a 75%)',
          backgroundSize: '20px 20px'
        }}
      >
        <div className="text-center p-8 bg-background/80 backdrop-blur-sm rounded-xl border border-gray-800">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Эффект <span className="text-accent">параллакса</span>
          </h2>
          <p className="text-foreground/80 max-w-2xl">
            Этот раздел демонстрирует эффект параллакса при прокрутке. 
            Элементы движутся с разной скоростью, создавая ощущение глубины.
          </p>
        </div>
      </div>
    </div>
  );
}