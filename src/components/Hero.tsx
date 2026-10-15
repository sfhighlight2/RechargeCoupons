import { Check, Star } from 'lucide-react';
import { HERO_RATING_CLAIM, type Offer } from '../config';
import LeadForm from './LeadForm';

function Headline({ offer }: { offer: Offer }) {
  const long = offer.headline.length > 22;
  const size = long
    ? 'text-[clamp(2.9rem,13.5vw,3.6rem)] leading-[0.95] sm:text-6xl lg:text-[4.4rem]'
    : 'text-[clamp(3.4rem,16vw,4.4rem)] leading-[0.92] sm:text-7xl lg:text-[5.6rem]';
  const { headline, highlight } = offer;
  const at = highlight ? headline.indexOf(highlight) : -1;
  return (
    <h1 className={`text-center uppercase text-ink-900 lg:text-left ${size}`}>
      {at >= 0 ? (
        <>
          {headline.slice(0, at)}
          <span className="whitespace-nowrap text-red-600">{highlight}</span>
          {headline.slice(at + highlight!.length)}
        </>
      ) : (
        headline
      )}
    </h1>
  );
}

export default function Hero({ offer }: { offer: Offer }) {
  return (
    <section id="top" className="relative overflow-hidden pt-5 pb-14 sm:pt-10 lg:pt-14 lg:pb-24">
      {/* Citrus warmth behind the product, from the logo's yellow-to-red sweep */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 size-[38rem] rounded-full bg-[radial-gradient(closest-side,rgba(255,217,61,0.35),rgba(247,148,29,0.12)_55%,transparent)] lg:-right-20 lg:top-0 lg:size-[52rem]"
      />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-7 px-4 sm:px-6 lg:grid-cols-2 lg:items-stretch lg:gap-12 lg:px-8">
        <div className="flex flex-col gap-2.5 sm:gap-4 lg:justify-center lg:gap-10">
          <div className="flex flex-col gap-2.5 sm:gap-4 lg:gap-6">
          <p className="flex items-center justify-center gap-2 text-[13px] font-semibold text-ink-700 lg:justify-start">
            <span className="flex text-orange-500" aria-hidden>
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="size-4 fill-current" />
              ))}
            </span>
            {HERO_RATING_CLAIM}
          </p>

          <Headline offer={offer} />

          <p className="mx-auto max-w-[36ch] text-center text-[17px] leading-relaxed text-ink-700 sm:text-lg lg:mx-0 lg:text-left">{offer.subhead}</p>

          </div>

          {/* Story card: desktop only. The whole left column is centered against the form card. */}
          <div className="hidden items-center gap-5 rounded-[var(--radius-card)] bg-white p-5 shadow-[var(--shadow-card)] ring-1 ring-ink-900/5 lg:flex">
            <img
              src="/img/hero-lifestyle.webp"
              alt="Smiling guest holding out a berry smoothie in a Recharge cup"
              width={720}
              height={901}
              decoding="async"
              className="aspect-[4/5] w-[112px] shrink-0 rounded-[16px] object-cover"
            />
            <div>
              <p className="text-[15px] leading-relaxed text-ink-700">
                Handcrafted smoothies, fresh wraps, and acai bowls. Blended with love, served with joy, and packed with
                natural energy.
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {['Fresh Fruit', 'Natural Flavors'].map((t) => (
                  <li
                    key={t}
                    className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-[13px] font-semibold text-green-600"
                  >
                    <Check aria-hidden className="size-3.5" strokeWidth={3} />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div
          id="claim"
          className="scroll-mt-24 rounded-[var(--radius-card)] bg-white p-5 shadow-[var(--shadow-card)] ring-1 ring-ink-900/5 sm:p-8"
        >
          <h2 className="mb-1 text-center font-sans text-[22px] lg:text-left font-bold leading-tight tracking-normal text-ink-900 sm:text-2xl lg:text-[32px]">
            {offer.formTitle}
          </h2>
          <p className="mb-5 text-center text-[15px] text-ink-500 lg:mt-1 lg:mb-6 lg:text-left lg:text-[17px]">Takes about 20 seconds. No app needed.</p>
          <LeadForm offer={offer} />
        </div>
      </div>
    </section>
  );
}
