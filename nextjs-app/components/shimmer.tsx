'use client';

import { motion } from 'framer-motion';

export function Shimmer() {
  return (
    <motion.div
      className="absolute inset-0 -translate-x-full"
      animate={{
        translateX: ['100%', '-100%'],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'linear',
      }}
      style={{
        background:
          'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
      }}
    />
  );
}
