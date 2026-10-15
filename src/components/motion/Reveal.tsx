import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { EASE_OUT_EXPO } from '../../lib/fruit';

/**
 * Masked slide-up reveal for section headlines. The visible wrapper is the in-view trigger
 * (the moving text starts fully clipped, so it can't trigger itself). Text stays in the DOM.
 */
export function RevealText({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.span
      className="block overflow-hidden pb-[0.08em]"
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
    >
      <motion.span
        className="block"
        variants={{
          hidden: { y: '108%', rotate: 2 },
          shown: { y: '0%', rotate: 0, transition: { duration: 0.9, delay, ease: EASE_OUT_EXPO } },
        }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}
