// src/components/AnimatedText.tsx

import React from 'react';
import { motion } from 'framer-motion';

// Varian animasi untuk container
const containerVariants = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.5 * i },
  }),
};

// Varian animasi untuk setiap huruf
const childVariants = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 100,
    },
  },
  hidden: {
    opacity: 0,
    y: 20,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 100,
    },
  },
};

interface AnimatedTextProps {
  text: string;
  className?: string;
  delays?: number[]; // Opsional: delay berbeda untuk setiap baris
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className, delays = [] }) => {
  const lines = text.split('\n');

  return (
    <div className={className}>
      {lines.map((line, lineIndex) => (
        <motion.h1
          key={lineIndex}
          className="overflow-hidden flex justify-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          custom={delays[lineIndex] || 1} // Gunakan delay custom atau default
        >
          {line.split(' ').map((word, wordIndex) => (
            <div key={wordIndex} className="flex">
              {word.split('').map((char, charIndex) => (
                <motion.span key={charIndex} variants={childVariants} className="inline-block">
                  {char}
                </motion.span>
              ))}
              {/* Tambahkan spasi antar kata */}
              <span className="inline-block">&nbsp;</span>
            </div>
          ))}
        </motion.h1>
      ))}
    </div>
  );
};

export default AnimatedText;