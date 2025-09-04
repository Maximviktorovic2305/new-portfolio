"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type AnimationIntensity = 'subtle' | 'moderate' | 'intense';

interface AnimationSettings {
  intensity: AnimationIntensity;
  enabled: boolean;
}

interface AnimationContextType {
  settings: AnimationSettings;
  updateSettings: (newSettings: Partial<AnimationSettings>) => void;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export function AnimationProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AnimationSettings>({
    intensity: 'moderate',
    enabled: true
  });

  useEffect(() => {
    // Load saved animation settings
    const savedSettings = localStorage.getItem('animationSettings');
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (e) {
        console.error('Failed to parse animation settings', e);
      }
    }
  }, []);

  useEffect(() => {
    // Save settings to localStorage
    localStorage.setItem('animationSettings', JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (newSettings: Partial<AnimationSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <AnimationContext.Provider value={{ settings, updateSettings }}>
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimation() {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
}