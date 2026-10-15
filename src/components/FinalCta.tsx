import { ArrowUp } from 'lucide-react';
import type { Offer } from '../config';
import CupStack from './CupStack';

export default function FinalCta({ offer }: { offer: Offer }) {
  return (
    <section aria-labelledby="final-title" className="px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-6 overflow-hidden rounded-[var(--radius-card)] bg-[linear-gradient(135deg,var(--color-yellow-400),var(--color-orange-500))] px-6 py-10 sm:px-10 md:grid-cols-[1fr_auto] lg:px-14 lg:py-14">
        <div>
          <h2 id="final-title" className="text-4xl uppercase text-ink-900 sm:text-5xl lg:text-6xl">
            {offer.headline}
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
        <CupStack cups={offer.cups} heightClass="h-[200px] lg:h-[240px]" className="hidden md:flex" />
      </div>
    </section>
  );
}
