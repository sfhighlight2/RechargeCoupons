import { useRef } from 'react';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from 'motion/react';
import { FRUIT, type FruitName } from '../../lib/fruit';

const WORDS: Array<[string, FruitName]> = [
  ['Real fruit', 'strawberry'],
  ['Blended when you order', 'mango'],
  ['Sunrise, FL', 'kiwi'],
  ['24 smoothies', 'blueberry'],
  ['Acai bowls', 'raspberry'],
  ['Protein boosts', 'banana'],
  ['Made fresh', 'pineapple'],
];

function Row() {
  return (
    <div className="flex shrink-0 items-center gap-6 pr-6 sm:gap-8 sm:pr-8">
      {WORDS.map(([word, fruit]) => (
        <div key={word} className="flex items-center gap-6 sm:gap-8">
          <span className="font-display text-[26px] uppercase leading-none whitespace-nowrap text-cream-50 sm:text-4xl">{word}</span>
          <img src={FRUIT[fruit].src} alt="" width={FRUIT[fruit].w} height={FRUIT[fruit].h} loading="lazy" className="h-9 w-auto sm:h-11" />
        </div>
      ))}
    </div>
  );
}

/** Tilted marquee that drifts on its own and speeds up / reverses with scroll velocity. */
export default function FruitRibbon() {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const boost = useTransform(velocity, [-1500, 0, 1500], [-4, 0, 4], { clamp: false });
  const direction = useRef(1);
  // Four copies; wrap at one copy's width (-25%) for a seamless loop.
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const b = boost.get();
    if (b < -0.05) direction.current = -1;
    else if (b > 0.05) direction.current = 1;
    const moveBy = direction.current * -1.6 * (delta / 1000) * (1 + Math.abs(b));
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div aria-hidden className="relative z-10 -my-3 overflow-hidden py-3">
      <div className="-mx-4 -rotate-2 bg-[linear-gradient(90deg,var(--color-red-700),var(--color-red-600),var(--color-red-700))] py-3.5 shadow-[0_12px_30px_rgba(154,14,23,0.25)] sm:py-4">
        <motion.div className="flex w-max" style={{ x: reduce ? '0%' : x }}>
          <Row />
          <Row />
          <Row />
          <Row />
        </motion.div>
      </div>
    </div>
  );
}
