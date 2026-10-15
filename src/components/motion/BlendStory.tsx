import { useRef, type ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { CUP_IMAGES, type Offer } from '../../config';
import { FRUIT, type FruitName } from '../../lib/fruit';

// Each fruit drops from above the viewport into the cup mouth during its own slice of the scroll.
const DROPS: Array<{ fruit: FruitName; from: number; x: number; spin: number; size: number }> = [
  { fruit: 'strawberry', from: 0.04, x: -150, spin: 220, size: 78 },
  { fruit: 'mango', from: 0.12, x: 140, spin: -260, size: 96 },
  { fruit: 'blueberry', from: 0.2, x: -90, spin: 300, size: 70 },
  { fruit: 'pineapple', from: 0.28, x: 170, spin: -200, size: 92 },
  { fruit: 'raspberry', from: 0.36, x: -170, spin: 240, size: 64 },
  { fruit: 'banana', from: 0.44, x: 110, spin: -320, size: 88 },
  { fruit: 'kiwi', from: 0.52, x: -60, spin: 280, size: 76 },
];

function Drop({ drop, progress }: { drop: (typeof DROPS)[number]; progress: MotionValue<number> }) {
  const img = FRUIT[drop.fruit];
  const end = drop.from + 0.2;
  const y = useTransform(progress, [drop.from, end], ['-85vh', '0vh']);
  const x = useTransform(progress, [drop.from, end], [drop.x, 0]);
  const rotate = useTransform(progress, [drop.from, end], [0, drop.spin]);
  const scale = useTransform(progress, [drop.from, end - 0.04, end], [1, 0.8, 0.35]);
  const opacity = useTransform(progress, [drop.from, drop.from + 0.02, end - 0.02, end], [0, 1, 1, 0]);
  return (
    <motion.img
      src={img.src}
      alt=""
      width={img.w}
      height={img.h}
      loading="lazy"
      style={{ x, y, rotate, scale, opacity, width: drop.size, marginLeft: -drop.size / 2 }}
      className="absolute top-[8%] left-1/2 z-20 h-auto drop-shadow-[0_10px_14px_rgba(122,12,18,0.2)] will-change-transform"
    />
  );
}

function Line({ progress, at, children, className = '' }: { progress: MotionValue<number>; at: number; children: ReactNode; className?: string }) {
  const opacity = useTransform(progress, [at, at + 0.08], [0.12, 1]);
  const y = useTransform(progress, [at, at + 0.08], [28, 0]);
  return (
    <motion.p style={{ opacity, y }} className={className}>
      {children}
    </motion.p>
  );
}

/**
 * Scroll-pinned story: fruit falls into a Recharge cup and the cup fills with color as you scroll.
 * Reduced motion renders the finished state without pinning.
 */
export default function BlendStory({ offer }: { offer: Offer }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const fill = useTransform(scrollYProgress, [0.18, 0.8], [96, 0]);
  const clipPath = useTransform(fill, (v) => `inset(${v}% 0 0 0)`);
  const cupScale = useTransform(scrollYProgress, [0.78, 0.9, 1], [1, 1.06, 1]);
  const ctaOpacity = useTransform(scrollYProgress, [0.82, 0.9], [0, 1]);
  const ctaY = useTransform(scrollYProgress, [0.82, 0.9], [16, 0]);
  const cup = CUP_IMAGES.pink;

  const text = 'font-display uppercase leading-[0.95] text-[2.6rem] sm:text-6xl lg:text-7xl';

  if (reduce) {
    return (
      <section aria-label="Real fruit in, real flavor out" className="py-16">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 text-center sm:px-6 lg:flex-row lg:justify-between lg:text-left lg:px-8">
          <div className="flex flex-col gap-2">
            <p className={`${text} text-ink-900`}>Real fruit in.</p>
            <p className={`${text} text-orange-500`}>Blended when you order.</p>
            <p className={`${text} text-red-600`}>Real flavor out.</p>
          </div>
          <img src={cup.src} alt={cup.alt} width={cup.w} height={cup.h} loading="lazy" className="blend-photo h-[320px] w-auto" />
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} aria-label="Real fruit in, real flavor out" className="relative h-[260vh]">
      <div className="sticky top-0 flex h-[100dvh] items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-4 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
          <div className="relative z-30 flex flex-col gap-1 text-center sm:gap-2 lg:text-left">
            <Line progress={scrollYProgress} at={0.02} className={`${text} text-ink-900`}>
              Real fruit in.
            </Line>
            <Line progress={scrollYProgress} at={0.36} className={`${text} text-orange-500`}>
              Blended when you order.
            </Line>
            <Line progress={scrollYProgress} at={0.7} className={`${text} text-red-600`}>
              Real flavor out.
            </Line>
            <motion.div style={{ opacity: ctaOpacity, y: ctaY }} className="mt-4 flex justify-center lg:justify-start">
              <a
                href="#claim"
                className="inline-flex h-14 items-center gap-2 rounded-full bg-red-600 px-7 text-[17px] font-semibold text-white shadow-[var(--shadow-cta)] transition-colors hover:bg-red-700"
              >
                {offer.cta}
                <ArrowRight aria-hidden className="size-5" />
              </a>
            </motion.div>
          </div>

          <motion.div style={{ scale: cupScale }} className="relative isolate mx-auto h-[min(46vh,420px)] w-[min(46vh,420px)] bg-cream-50 lg:h-[540px] lg:w-[420px]">
            {/* Soft citrus glow behind the cup */}
            <div className="absolute inset-[8%] rounded-full bg-[radial-gradient(closest-side,rgba(255,217,61,0.45),rgba(247,148,29,0.12)_60%,transparent)]" />
            {/* Empty cup ghost, then the colored cup revealed from the bottom up */}
            <img
              src={cup.src}
              alt=""
              width={cup.w}
              height={cup.h}
              loading="lazy"
              className="blend-photo absolute inset-0 z-10 m-auto h-full w-auto opacity-30 grayscale"
            />
            <motion.img
              src={cup.src}
              alt={cup.alt}
              width={cup.w}
              height={cup.h}
              loading="lazy"
              style={{ clipPath }}
              className="blend-photo absolute inset-0 z-10 m-auto h-full w-auto"
            />
            {DROPS.map((d) => (
              <Drop key={d.fruit} drop={d} progress={scrollYProgress} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
