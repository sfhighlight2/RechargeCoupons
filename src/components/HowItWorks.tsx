import { motion } from 'motion/react';
import type { Offer } from '../config';

export default function HowItWorks({ offer }: { offer: Offer }) {
  const steps = [
    { title: 'Claim it here', body: 'Fill in the quick form and we send your coupon right away.' },
    { title: 'Visit the cafe', body: 'Stop by 2101 N University Dr in Sunrise within 7 days.' },
    { title: 'Show it at the counter', body: offer.enjoyStep },
  ];

  return (
    <section aria-labelledby="how-title" className="bg-[linear-gradient(135deg,var(--color-red-600),var(--color-red-800))] text-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <h2 id="how-title" className="text-4xl uppercase sm:text-5xl">
          Three steps to your smoothie
        </h2>
        <ol className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
          {steps.map((step, i) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="flex gap-4 md:flex-col md:gap-3"
            >
              <span
                aria-hidden
                className="font-display text-6xl leading-none text-yellow-400 tabular md:text-7xl"
              >
                {i + 1}
              </span>
              <div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="mt-1 max-w-[30ch] text-[16px] leading-relaxed text-white/85">{step.body}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
