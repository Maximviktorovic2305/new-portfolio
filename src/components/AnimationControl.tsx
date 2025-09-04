"use client";

import { useAnimation } from '@/contexts/AnimationContext';
import { motion } from 'framer-motion';

export default function AnimationControl() {
  const { settings, updateSettings } = useAnimation();

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-gray-800/90 backdrop-blur-sm p-4 text-white/80 rounded-lg border border-gray-700">
      <h3 className=" font-medium mb-3">Настройки анимации</h3>
      
      <div className="space-y-3">
        <div>
          <label className="flex items-center  text-sm">
            <input
              type="checkbox"
              checked={settings.enabled}
              onChange={(e) => updateSettings({ enabled: e.target.checked })}
              className="mr-2 w-4 h-4 accent-accent"
            />
            Включить анимации
          </label>
        </div>
        
        {settings.enabled && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <label className="block  text-sm mb-2">Интенсивность</label>
            <div className="flex space-x-2">
              {(['subtle', 'moderate', 'intense'] as const).map((intensity) => (
                <button
                  key={intensity}
                  onClick={() => updateSettings({ intensity })}
                  className={`px-3 py-1 text-xs rounded-full transition-colors ${
                    settings.intensity === intensity
                      ? 'bg-accent '
                      : 'bg-gray-700  hover:bg-gray-600'
                  }`}
                >
                  {intensity === 'subtle' && 'Слабая'}
                  {intensity === 'moderate' && 'Средняя'}
                  {intensity === 'intense' && 'Сильная'}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}