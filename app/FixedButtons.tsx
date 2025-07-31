"use client";

import { InfoButton, RuButton, HomeButton } from './components';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function FixedButtons() {
  const pathname = usePathname();
  const isMain = pathname === '/';
  const isPoseleniya = pathname.startsWith('/poseleniya');

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        style={{
          position: 'fixed',
          left: 1820,
          top: isMain ? 860 : 776,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          zIndex: 1000,
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`info-${pathname}`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0 }}
          >
            <InfoButton whiteBg={isPoseleniya} />
          </motion.div>
          <motion.div
            key={`ru-${pathname}`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            <RuButton whiteBg={isPoseleniya} />
          </motion.div>
          {!isMain && (
            <motion.div
              key={`home-${pathname}`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <HomeButton whiteBg={isPoseleniya} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
} 