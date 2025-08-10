// src/components/AnimatedText.tsx

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface WordProps {
  children: React.ReactNode;
  range: [number, number];
  progress: any; // motion value
}

const Word: React.FC<WordProps> = ({ children, range, progress }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <span className="relative inline-block mr-3 mt-3">
      <span className="absolute opacity-20">{children}</span>
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
};

interface AnimatedTextProps {
  text: string;
  className?: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className }) => {
  const element = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: element,
    offset: ["start 0.8", "start 0.15"],
  });

  const words = text.split(" ");

  return (
    <p ref={element} className={`flex flex-wrap ${className}`} style={{ lineHeight: '1.2' }}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + (1 / words.length);
        return <Word key={i} range={[start, end]} progress={scrollYProgress}>{word}</Word>
      })}
    </p>
  );
};

export default AnimatedText;