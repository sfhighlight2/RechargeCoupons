import { useEffect, type RefObject } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react';
import { FRUIT, type FruitName } from '../../lib/fruit';

interface Piece {
  fruit: FruitName;
  /** Tailwind position + size + visibility classes */
  className: string;
  /** 0.4 (far) to 1.4 (near): scales parallax distance */
  depth: number;
  rotate: number;
}

// Kept to the edges and the gutter between columns so nothing covers the headline or the form.
const PIECES: Piece[] = [
  { fruit: 'strawberry', depth: 1.2, rotate: -16, className: 'right-[-14px] top-[4px] w-[54px] sm:w-[70px] lg:left-[1%] lg:right-auto lg:top-[3%] lg:w-[86px]' },
  { fruit: 'blueberry', depth: 1.4, rotate: 10, className: 'left-[-30px] top-[112px] w-[52px] sm:left-[-18px] sm:w-[76px] lg:left-[46.5%] lg:top-[4%] lg:w-[64px]' },
  { fruit: 'mango', depth: 0.7, rotate: 14, className: 'hidden lg:block lg:left-[-3%] lg:top-[60%] lg:w-[128px]' },
  { fruit: 'kiwi', depth: 0.9, rotate: -24, className: 'hidden lg:block lg:left-[46%] lg:bottom-[4%] lg:w-[84px]' },
  { fruit: 'pineapple', depth: 1.0, rotate: 18, className: 'hidden lg:block lg:right-[0.5%] lg:top-[2%] lg:w-[112px]' },
  { fruit: 'mint', depth: 0.6, rotate: -10, className: 'hidden lg:block lg:right-[-1%] lg:top-[44%] lg:w-[86px]' },
  { fruit: 'raspberry', depth: 1.3, rotate: 22, className: 'right-[-16px] top-[250px] w-[48px] sm:w-[60px] lg:right-[3%] lg:top-auto lg:bottom-[6%] lg:w-[70px]' },
];

function Fruit({
  piece,
  index,
  progress,
  mx,
  my,
  reduce,
}: {
  piece: Piece;
  index: number;
  progress: MotionValue<number>;
  mx: MotionValue<number>;
  my: MotionValue<number>;
  reduce: boolean;
}) {
  const img = FRUIT[piece.fruit];
  const scrollY = useTransform(progress, [0, 1], [0, -piece.depth * 320]);
  const scrollRotate = useTransform(progress, [0, 1], [0, piece.rotate * 3]);
  const x = useTransform(mx, (v) => v * piece.depth * 22);
  const yMouse = useTransform(my, (v) => v * piece.depth * 16);
  const y = useTransform([scrollY, yMouse] as MotionValue<number>[], ([a, b]) => (a as number) + (b as number));

  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none absolute will-change-transform ${piece.className}`}
      style={reduce ? { rotate: piece.rotate } : { x, y, rotate: scrollRotate }}
    >
      <motion.div
        initial={reduce ? false : { y: '-110vh', rotate: piece.rotate - 160, opacity: 1 }}
        animate={{ y: 0, rotate: piece.rotate }}
        transition={{ type: 'spring', stiffness: 60, damping: 11, mass: 1.1, delay: 0.25 + index * 0.12 }}
      >
        <motion.img
          src={img.src}
          alt=""
          width={img.w}
          height={img.h}
          decoding="async"
          draggable={false}
          className="h-auto w-full select-none drop-shadow-[0_14px_18px_rgba(122,12,18,0.18)]"
          animate={reduce ? undefined : { y: [0, -9, 0], rotate: [0, index % 2 ? 4 : -4, 0] }}
          transition={{ duration: 5 + (index % 3), repeat: Infinity, ease: 'easeInOut', delay: 1.6 + index * 0.2 }}
        />
      </motion.div>
    </motion.div>
  );
}

/** Fruit that falls into the hero on load, floats, drifts with scroll and leans toward the cursor. */
export default function HeroFruit({ target }: { target: RefObject<HTMLElement | null> }) {
  const reduce = Boolean(useReducedMotion());
  const { scrollYProgress } = useScroll({ target, offset: ['start start', 'end start'] });
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mx = useSpring(rawX, { stiffness: 60, damping: 18 });
  const my = useSpring(rawY, { stiffness: 60, damping: 18 });

  useEffect(() => {
    if (reduce || !window.matchMedia('(pointer: fine)').matches) return;
    const onMove = (e: PointerEvent) => {
      rawX.set(e.clientX / window.innerWidth - 0.5);
      rawY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [reduce, rawX, rawY]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
      <div className="relative mx-auto h-full max-w-[1400px]">
        {PIECES.map((p, i) => (
          <Fruit key={p.fruit} piece={p} index={i} progress={scrollYProgress} mx={mx} my={my} reduce={reduce} />
        ))}
      </div>
    </div>
  );
}
