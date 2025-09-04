"use client";

import { motion } from 'framer-motion';
import { useAnimation } from '@/contexts/AnimationContext';

interface Skill {
  name: string;
  level: number;
  category: string;
}

export default function SkillsSection() {
  const { settings } = useAnimation();

  const skills: Skill[] = [
    { name: 'React', level: 90, category: 'Frontend' },
    { name: 'Next.js', level: 85, category: 'Frontend' },
    { name: 'TypeScript', level: 80, category: 'Frontend' },
    { name: 'Node.js', level: 85, category: 'Backend' },
    { name: 'Express', level: 80, category: 'Backend' },
    { name: 'MongoDB', level: 75, category: 'Backend' },
    { name: 'GSAP', level: 90, category: 'Animations' },
    { name: 'Three.js', level: 85, category: 'Animations' },
    { name: 'Framer Motion', level: 80, category: 'Animations' },
    { name: 'Tailwind CSS', level: 95, category: 'Styling' },
  ];

  const categories = Array.from(new Set(skills.map(skill => skill.category)));

  return (
    <section id="skills" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Мои <span className="text-accent">навыки</span>
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800 p-6 rounded-xl"
            >
              <div className="flex justify-between mb-2">
                <h3 className="text-lg font-medium text-foreground">{skill.name}</h3>
                <span className="text-accent">{skill.level}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <motion.div
                  className="bg-accent h-2.5 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 1, 
                    delay: index * 0.1 + 0.5,
                    ease: "easeOut"
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold text-foreground mb-8">
            Категории <span className="text-accent">навыков</span>
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={category}
                className="px-6 py-3 bg-gray-800 rounded-full text-foreground hover:bg-accent hover:text-background transition-colors duration-300 cursor-pointer"
                whileHover={settings.enabled ? { 
                  y: -5,
                  boxShadow: "0 10px 20px rgba(116, 221, 227, 0.3)"
                } : {}}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {category}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}