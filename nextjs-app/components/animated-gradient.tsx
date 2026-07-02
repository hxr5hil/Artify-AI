'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedGradientProps {
  children: ReactNode;
  className?: string;
}

export function AnimatedGradient({ children, className = '' }: AnimatedGradientProps) {
  return (
    <motion.div
      className={className}
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      }}
      transition={{
        duration: 15,
        ease: 'linear',
        repeat: Infinity,
      }}
      style={{
        backgroundSize: '200% 200%',
      }}
    >
      {children}
    </motion.div>
  );
}
