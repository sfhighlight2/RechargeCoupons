import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { CUP_IMAGES, MENU, type Offer } from '../config';

const ITEMS = MENU.flatMap((group) => group.items.map((item) => ({ ...item, category: group.category })));
const FIRST_INDEX = Object.fromEntries(MENU.map((g) => [g.category, ITEMS.findIndex((i) => i.category === g.category)]));

export default function Favorites({ offer }: { offer: Offer }) {
  const track = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(MENU[0].category);
  const [edges, setEdges] = useState({ start: true, end: false });

  const sync = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const cards = [...el.children] as HTMLElement[];
    const left = el.scrollLeft + 8;
    const first = cards.findIndex((c) => c.offsetLeft - el.offsetLeft + c.offsetWidth / 2 > left);
    if (first >= 0) setActive(ITEMS[first].category);
    setEdges({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(sync);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    sync();
    return () => {
      el.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [sync]);

  const jumpTo = (category: string) => {
    const el = track.current;
    const card = el?.children[FIRST_INDEX[category]] as HTMLElement | undefined;
    if (!el || !card) return;
    setActive(category);
    el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: 'smooth' });
  };

  const page = (dir: 1 | -1) => {
    const el = track.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: 'smooth' });
  };

  const arrow =
    'inline-flex size-12 items-center justify-center rounded-full border-2 border-ink-900 text-ink-900 transition-colors hover:bg-ink-900 hover:text-white disabled:cursor-default disabled:border-ink-900/15 disabled:text-ink-900/25 disabled:hover:bg-transparent';

  return (
    <section aria-labelledby="fav-title" className="py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 id="fav-title" className="text-4xl uppercase sm:text-5xl">
              Pick your favorite
            </h2>
            <p className="mt-3 max-w-[48ch] text-[17px] leading-relaxed text-ink-700">
              24 smoothies made with real fruit, blended when you order. Your coupon works on any of them.
            </p>
          </div>
          <div className="hidden shrink-0 gap-3 md:flex">
            <button type="button" onClick={() => page(-1)} disabled={edges.start} aria-label="Previous smoothies" className={arrow}>
              <ChevronLeft aria-hidden className="size-5" />
            </button>
            <button type="button" onClick={() => page(1)} disabled={edges.end} aria-label="More smoothies" className={arrow}>
              <ChevronRight aria-hidden className="size-5" />
            </button>
          </div>
        </div>

        <div role="group" aria-label="Smoothie categories" className="no-scrollbar -mx-4 mt-7 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          {MENU.map((g) => {
            const on = g.category === active;
            return (
              <button
                key={g.category}
                type="button"
                aria-pressed={on}
                onClick={() => jumpTo(g.category)}
                className={`h-11 shrink-0 rounded-full px-5 text-[15px] font-semibold transition-colors duration-200 ${
                  on ? 'bg-red-600 text-white' : 'bg-white text-ink-900 ring-1 ring-ink-900/10 hover:ring-ink-900/30'
                }`}
              >
                {g.category}
              </button>
            );
          })}
        </div>

        <ul
          ref={track}
          aria-label="Smoothie menu"
          className="no-scrollbar -mx-4 mt-6 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pt-1 pb-4 sm:mx-0 sm:scroll-px-0 sm:gap-4 sm:px-0"
        >
          {ITEMS.map((item) => {
            const img = CUP_IMAGES[item.cup];
            return (
              <li
                key={item.name}
                className="flex w-[44%] shrink-0 snap-start flex-col rounded-[var(--radius-card)] bg-white pt-5 pb-5 shadow-[var(--shadow-card)] sm:w-[30%] md:w-[23%] lg:w-[calc((100%-4rem)/5)]"
              >
                <img
                  src={img.src}
                  alt=""
                  width={img.w}
                  height={img.h}
                  loading="lazy"
                  decoding="async"
                  className="mx-auto h-[150px] w-auto object-contain lg:h-[170px]"
                />
                <div className="px-4 pt-3">
                  <h3 className="text-[16px] leading-tight font-semibold">{item.name}</h3>
                  <p className="mt-1 text-[13px] leading-snug text-ink-500">{item.ingredients}</p>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
          <a
            href="#claim"
            className="group inline-flex items-center gap-2 font-semibold text-red-600 underline-offset-4 hover:underline"
          >
            {offer.cta}
            <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <p className="text-[13px] text-ink-500">Photos show similar blends. Add protein or a superfood boost to any smoothie.</p>
        </div>
      </div>
    </section>
  );
}
