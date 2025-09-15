"use client";

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

const variants = {
  initial: {
    opacity: 0,
    scale: 0.9,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.6,
    },
  },
};

const poseleniyaVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.8,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function AnimatedPage({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isPoseleniyaOrInvest = pathname.startsWith('/poseleniya') || pathname.startsWith('/invest');
  const usedVariants = isPoseleniyaOrInvest ? poseleniyaVariants : variants;
  return (
    <motion.div
      key={pathname}
      variants={usedVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
} 