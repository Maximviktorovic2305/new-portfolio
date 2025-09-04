"use client";

import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Главная', href: '#hero' },
    { name: 'Обо мне', href: '#about' },
    { name: 'Навыки', href: '#skills' },
    { name: 'Проекты', href: '#projects' },
    { name: 'Контакты', href: '#contact' },
  ];

  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-gray-800"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <motion.div 
              className="text-xl font-bold text-accent"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Portfolio
            </motion.div>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="text-foreground hover:text-accent transition-colors duration-300"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.name}
              </motion.a>
            ))}
            
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-800 text-foreground hover:text-accent transition-colors duration-300"
              whileHover={{ rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? '🌙' : '☀️'}
            </motion.button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <motion.button
              onClick={toggleTheme}
              className="p-2 mr-2 rounded-full bg-gray-800 text-foreground hover:text-accent transition-colors duration-300"
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? '🌙' : '☀️'}
            </motion.button>
            
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-foreground hover:text-accent focus:outline-none"
              whileTap={{ scale: 0.9 }}
            >
              {isMenuOpen ? '✕' : '☰'}
            </motion.button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div 
          className="md:hidden bg-background/95 backdrop-blur-sm"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-accent hover:bg-gray-800"
                onClick={() => setIsMenuOpen(false)}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.name}
              </motion.a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}