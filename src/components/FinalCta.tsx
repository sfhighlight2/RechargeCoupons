import { ArrowUp } from 'lucide-react';
import { motion } from 'motion/react';
import type { Offer } from '../config';
import { FRUIT, type FruitName } from '../lib/fruit';
import CupStack from './CupStack';
import { RevealText } from './motion/Reveal';

const LANDING: Array<{ fruit: FruitName; className: string; rotate: number; delay: number }> = [
  { fruit: 'strawberry', className: 'right-[6%] top-[10%] w-14 md:right-auto md:left-[57%] md:top-[7%] md:w-16', rotate: -18, delay: 0 },
  { fruit: 'mint', className: 'right-[-10px] bottom-[8%] w-20 md:w-24', rotate: 24, delay: 0.12 },
  { fruit: 'blueberry', className: 'left-[52%] bottom-[-10px] w-16 hidden md:block', rotate: -8, delay: 0.24 },
];

export default function FinalCta({ offer }: { offer: Offer }) {
  return (
    <section aria-labelledby="final-title" className="px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
      {/* The banner itself triggers the fruit drop, since the fruit starts outside its clipped edge. */}
      <motion.div
        initial="above"
        whileInView="landed"
        viewport={{ once: true, amount: 0.4 }}
        className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-6 overflow-hidden rounded-[var(--radius-card)] bg-[linear-gradient(135deg,var(--color-yellow-400),var(--color-orange-500))] px-6 py-10 sm:px-10 md:grid-cols-[1fr_auto] lg:px-14 lg:py-14"
      >
        <div>
          <h2 id="final-title" className="text-4xl uppercase text-ink-900 sm:text-5xl lg:text-6xl">
            <RevealText>{offer.headline}</RevealText>
          </h2>
          <p className="mt-2 text-[17px] font-medium text-ink-900/80">Claim it now. It takes about 20 seconds.</p>
          <a
            href="#claim"
            className="mt-6 inline-flex h-14 items-center gap-2 rounded-full bg-ink-900 px-7 text-[17px] font-semibold text-white transition-[background-color,transform] duration-200 hover:bg-red-700 active:scale-[0.98]"
          >
            {offer.cta}
            <ArrowUp aria-hidden className="size-5" />
          </a>
        </div>
        {LANDING.map((l) => (
          <motion.img
            key={l.fruit}
            aria-hidden
            src={FRUIT[l.fruit].src}
            alt=""
            width={FRUIT[l.fruit].w}
            height={FRUIT[l.fruit].h}
            loading="lazy"
            variants={{
              above: { y: -260, rotate: l.rotate - 120, opacity: 0 },
              landed: {
                y: 0,
                rotate: l.rotate,
                opacity: 1,
                transition: { type: 'spring', stiffness: 70, damping: 10, delay: l.delay },
              },
            }}
            className={`pointer-events-none absolute h-auto drop-shadow-[0_10px_12px_rgba(122,12,18,0.2)] ${l.className}`}
          />
        ))}
        <CupStack cups={offer.cups} heightClass="h-[200px] lg:h-[240px]" className="hidden md:flex" />
      </motion.div>
    </section>
  );
}
