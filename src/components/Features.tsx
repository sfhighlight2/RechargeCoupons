import { motion } from 'motion/react';
import { Heart, Leaf, SlidersHorizontal } from 'lucide-react';
import { RevealText } from './motion/Reveal';

const features = [
  {
    icon: Leaf,
    title: 'Local Ingredients',
    description: 'We source the freshest local fruits and produce to ensure every sip is packed with natural goodness.',
    tint: 'bg-green-100 text-green-600',
  },
  {
    icon: SlidersHorizontal,
    title: 'Fully Customizable',
    description: 'Personalize your smoothie with protein boosts, superfoods, and vegan alternatives.',
    tint: 'bg-orange-500/12 text-orange-600',
  },
  {
    icon: Heart,
    title: 'Community Focused',
    description: 'Proudly serving Sunrise, FL. We love giving back through local events and partnerships.',
    tint: 'bg-red-600/8 text-red-600',
  },
];

export default function Features() {
  return (
    <section id="about" aria-labelledby="why-title" className="py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-red-600">Why choose Recharge?</p>
          <h2 id="why-title" className="mt-2 text-4xl uppercase sm:text-5xl">
            <RevealText>Blended with love,
            <br />
            served with joy.</RevealText>
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-[var(--radius-card)] bg-white p-7 shadow-[var(--shadow-card)] sm:p-8"
            >
              <div aria-hidden className={`flex size-14 items-center justify-center rounded-2xl ${f.tint}`}>
                <f.icon className="size-7" />
              </div>
              <h3 className="mt-6 text-2xl font-semibold text-ink-900">{f.title}</h3>
              <p className="mt-3 text-[16px] leading-relaxed text-ink-700">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
