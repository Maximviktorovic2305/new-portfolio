"use client";

import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-gray-900 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-6 md:mb-0"
          >
            <div className="text-xl font-bold text-accent">Portfolio</div>
            <p className="text-foreground/60 mt-2">Fullstack разработчик</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex space-x-6"
          >
            {['GitHub', 'LinkedIn', 'Twitter', 'Instagram'].map((social, index) => (
              <motion.a
                key={social}
                href="#"
                className="text-foreground/60 hover:text-accent transition-colors duration-300"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.9 }}
              >
                {social}
              </motion.a>
            ))}
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 pt-8 border-t border-gray-800 text-center text-foreground/60"
        >
          <p>© {new Date().getFullYear()} Портфолио. Все права защищены.</p>
        </motion.div>
      </div>
    </footer>
  );
}