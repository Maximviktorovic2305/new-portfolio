"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useAnimation } from '@/contexts/AnimationContext';

export default function AboutSection() {
  const { settings } = useAnimation();

  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Обо <span className="text-accent">мне</span>
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto"></div>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              {/* Replaced placeholder with actual photo */}
              <div className="rounded-2xl w-80 h-80 mx-auto overflow-hidden shadow-2xl">
                <Image 
                  src="/photo.jpg" 
                  alt="Фото профиля" 
                  width={320} 
                  height={320}
                  className="object-cover w-full h-full"
                />
              </div>
              <motion.div 
                className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent rounded-full z-[-1]"
                animate={settings.enabled ? {
                  scale: [1, 1.05, 1],
                  rotate: [0, 5, 0]
                } : {}}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            </div>
          </motion.div>

          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Fullstack разработчик из России
            </h3>
            <p className="text-foreground/80 mb-6">
              Я специализируюсь на создании современных веб-приложений с использованием 
              передовых технологий. Мой подход сочетает в себе техническое мастерство и 
              творческий подход к решению задач.
            </p>
            <p className="text-foreground/80 mb-6">
              С 5-летним опытом в индустрии я работал над проектами различной сложности - 
              от стартапов до корпоративных решений. Мое внимание к деталям и страсть к 
              анимациям помогают создавать уникальные пользовательские experiences.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mt-8">
              <motion.div 
                className="bg-gray-800 p-4 rounded-lg"
                whileHover={settings.enabled ? { y: -5 } : {}}
              >
                <h4 className="text-accent font-bold text-lg mb-2">Frontend</h4>
                <p className="text-foreground/80">React, Next.js, TypeScript</p>
              </motion.div>
              
              <motion.div 
                className="bg-gray-800 p-4 rounded-lg"
                whileHover={settings.enabled ? { y: -5 } : {}}
              >
                <h4 className="text-accent font-bold text-lg mb-2">Backend</h4>
                <p className="text-foreground/80">Node.js, Express, MongoDB</p>
              </motion.div>
              
              <motion.div 
                className="bg-gray-800 p-4 rounded-lg"
                whileHover={settings.enabled ? { y: -5 } : {}}
              >
                <h4 className="text-accent font-bold text-lg mb-2">Анимации</h4>
                <p className="text-foreground/80">GSAP, Three.js, Framer Motion</p>
              </motion.div>
              
              <motion.div 
                className="bg-gray-800 p-4 rounded-lg"
                whileHover={settings.enabled ? { y: -5 } : {}}
              >
                <h4 className="text-accent font-bold text-lg mb-2">Деплой</h4>
                <p className="text-foreground/80">Vercel, Docker, CI/CD</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}