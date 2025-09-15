"use client";

import { InfoButton, RuButton, HomeButton } from './components';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function FixedButtons() {
  const pathname = usePathname();
  const isMain = pathname === '/';
  const isPoseleniya = pathname.startsWith('/poseleniya');
  const isInvest = pathname.startsWith('/invest');

  return (
    <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          style={{
            position: 'fixed',
            left: 1820,
            // top: isMain ? 860 : 776,
            bottom: 64, 
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
            <InfoButton whiteBg={isPoseleniya || isInvest} />
          </motion.div>
          <motion.div
            key={`ru-${pathname}`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            <RuButton whiteBg={isPoseleniya || isInvest} />
          </motion.div>
          {!isMain && (
            <motion.div
              key={`home-${pathname}`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <HomeButton whiteBg={isPoseleniya || isInvest} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}               