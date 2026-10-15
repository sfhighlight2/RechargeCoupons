import { Plus } from 'lucide-react';
import { BUSINESS, COUPON_VALID_DAYS } from '../config';

const faqs = [
  {
    q: 'Do I need to print the coupon?',
    a: 'No. Show the coupon on your phone at the counter when you order.',
  },
  {
    q: 'How long is it good for?',
    a: `${COUPON_VALID_DAYS} days from the day you sign up. One coupon per person.`,
  },
  {
    q: 'Can I use it for takeout or delivery?',
    a: 'Use it for dine-in or takeout when you order at our cafe. It does not work on DoorDash, Uber Eats or other delivery apps.',
  },
  {
    q: 'Can I combine it with other offers?',
    a: 'No, it cannot be combined with other promotions or discounts.',
  },
  {
    q: 'Where are you and when are you open?',
    a: `${BUSINESS.street}, ${BUSINESS.cityLine}. ${BUSINESS.hours.map((h) => `${h.days} ${h.time}`).join('. ')}.`,
  },
];

export default function FAQ() {
  return (
    <section aria-labelledby="faq-title" className="py-16 lg:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 id="faq-title" className="text-4xl uppercase sm:text-5xl">
          Good to know
        </h2>
        <div className="mt-8 divide-y divide-ink-900/10 border-y border-ink-900/10">
          {faqs.map((f) => (
            <details key={f.q} className="group">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 text-left text-[17px] font-semibold text-ink-900 [&::-webkit-details-marker]:hidden">
                {f.q}
                <Plus
                  aria-hidden
                  className="size-5 shrink-0 text-red-600 transition-transform duration-300 ease-[var(--ease-out-expo)] group-open:rotate-45"
                />
              </summary>
              <p className="max-w-[60ch] pb-5 text-[16px] leading-relaxed text-ink-700">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
