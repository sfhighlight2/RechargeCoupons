import { useEffect, useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { FRUIT, FRUIT_NAMES } from '../../lib/fruit';

/** One-time shower of fruit across the screen (thank-you page celebration). */
export default function FruitRain({ count = 22 }: { count?: number }) {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);

  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const fruit = FRUIT_NAMES[i % FRUIT_NAMES.length];
        return {
          fruit,
          left: Math.random() * 100,
          size: 34 + Math.random() * 46,
          delay: Math.random() * 0.9,
          duration: 2.2 + Math.random() * 1.6,
          spin: (Math.random() > 0.5 ? 1 : -1) * (180 + Math.random() * 360),
          drift: (Math.random() - 0.5) * 120,
        };
      }),
    [count],
  );

  useEffect(() => {
    const t = window.setTimeout(() => setDone(true), 4600);
    return () => window.clearTimeout(t);
  }, []);

  if (reduce || done) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {pieces.map((p, i) => {
        const img = FRUIT[p.fruit];
        return (
          <motion.img
            key={i}
            src={img.src}
            alt=""
            width={img.w}
            height={img.h}
            initial={{ y: '-15vh', x: 0, rotate: 0 }}
            animate={{ y: '115vh', x: p.drift, rotate: p.spin }}
            transition={{ duration: p.duration, delay: p.delay, ease: [0.45, 0, 0.8, 0.6] }}
            className="absolute top-0 h-auto drop-shadow-[0_8px_10px_rgba(34,26,21,0.18)]"
            style={{ left: `${p.left}%`, width: p.size }}
          />
        );
      })}
    </div>
  );
}
