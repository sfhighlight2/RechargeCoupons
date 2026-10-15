import { ArrowUpRight, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { BUSINESS } from '../config';
import { RevealText } from './motion/Reveal';

// Verbatim from Recharge Smoothies Cafe's Google Business Profile (5 stars, Oct 2026).
// Only quote real reviews by real customers. Never the owner, staff, or invented ones.
const review = {
  quote:
    "First time stopping by and it definitely won't be the last. I had the Mega Mass and my wife had the Mango Blast. Both were delicious and made with fresh ingredients.",
  name: 'Paul R.',
  detail: 'Google review',
};

export default function Reviews() {
  return (
    <section aria-labelledby="reviews-title" className="bg-cream-100/60 py-16 lg:py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 sm:px-6 md:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-8">
        <motion.img
          src="/img/lifestyle-green.webp"
          alt="Smiling guest sipping a green smoothie from a Recharge cup in the park"
          width={522}
          height={1100}
          loading="lazy"
          decoding="async"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="order-2 mx-auto aspect-[4/3] w-full max-w-sm md:aspect-[4/5] rounded-[var(--radius-card)] object-cover object-[50%_30%] shadow-[var(--shadow-lift)] md:order-1"
        />

        <div className="order-1 md:order-2">
          <h2 id="reviews-title" className="text-4xl uppercase sm:text-5xl">
            <RevealText>Sunrise keeps coming back</RevealText>
          </h2>
          <figure className="mt-8">
            <div className="flex text-orange-500" aria-label="5 out of 5 stars">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} aria-hidden className="size-5 fill-current" />
              ))}
            </div>
            <blockquote className="mt-4 max-w-[46ch] text-xl leading-relaxed font-medium text-ink-900 sm:text-[22px]">
              “{review.quote}”
            </blockquote>
            <figcaption className="mt-4 text-[15px] text-ink-500">
              <span className="font-semibold text-ink-900">{review.name}</span>, {review.detail}
            </figcaption>
          </figure>
          <a
            href={BUSINESS.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-1.5 font-semibold text-ink-900 underline decoration-ink-900/25 underline-offset-4 hover:decoration-ink-900"
          >
            Read our reviews on Google
            <ArrowUpRight aria-hidden className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
