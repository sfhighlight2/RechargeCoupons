import type { ReactNode } from 'react';
import { ArrowRight, Clock, MapPin, Phone } from 'lucide-react';
import { BUSINESS } from '../config';
import { RevealText } from './motion/Reveal';

const MAP_EMBED =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3581.526662095697!2d-80.2583704!3d26.1520731!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d906391e0767a5%3A0x9f88449ffabe3c26!2s2101%20N%20University%20Dr%20Ste%20B%2C%20Sunrise%2C%20FL%2033322!5e0!3m2!1sen!2sus!4v1709845678901!5m2!1sen!2sus';

function Row({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <div className="flex items-start gap-5">
      <div aria-hidden className="flex size-12 shrink-0 items-center justify-center rounded-full bg-red-600/8 text-red-600">
        {icon}
      </div>
      <div>
        <h3 className="font-display text-xl uppercase tracking-wide text-ink-900">{title}</h3>
        <div className="mt-1 text-[16px] leading-relaxed text-ink-700">{children}</div>
      </div>
    </div>
  );
}

export default function Visit() {
  return (
    <section id="location" aria-labelledby="visit-title" className="bg-white py-16 lg:py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-stretch gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-red-600">Visit us</p>
          <h2 id="visit-title" className="mt-2 text-4xl uppercase sm:text-5xl">
            <RevealText>Find your Recharge.</RevealText>
          </h2>
          <p className="mt-5 max-w-[42ch] text-lg leading-relaxed text-ink-700">
            We're located in the heart of Sunrise, FL. Stop by for a quick pick-me-up or a healthy meal.
          </p>

          <div className="mt-10 flex flex-col gap-8">
            <Row icon={<MapPin className="size-5" />} title="Location">
              <p>
                {BUSINESS.street}
                <br />
                {BUSINESS.cityLine}
              </p>
              <a
                href={BUSINESS.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-2 inline-flex items-center gap-1 text-[15px] font-semibold text-red-600 hover:underline underline-offset-4"
              >
                Get directions
                <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </Row>

            <Row icon={<Clock className="size-5" />} title="Hours">
              <ul className="grid grid-cols-[auto_auto] gap-x-5 gap-y-0.5 text-[15px] tabular">
                {BUSINESS.hours.map((h) => (
                  <li key={h.days} className="contents">
                    <span>{h.days}:</span>
                    <span>{h.time}</span>
                  </li>
                ))}
              </ul>
            </Row>

            <Row icon={<Phone className="size-5" />} title="Contact">
              <p>
                <a href={BUSINESS.phoneHref} className="hover:text-red-600">
                  {BUSINESS.phoneDisplay}
                </a>
              </p>
              <p>
                <a href={`mailto:${BUSINESS.email}`} className="hover:text-red-600">
                  {BUSINESS.email}
                </a>
              </p>
            </Row>
          </div>
        </div>

        <div className="min-h-[380px] overflow-hidden rounded-[2rem] bg-cream-100 shadow-[var(--shadow-lift)] ring-1 ring-ink-900/5 lg:min-h-[460px]">
          <iframe
            src={MAP_EMBED}
            title="Map to Recharge Smoothies Cafe, 2101 N University Dr, Sunrise"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="block h-full min-h-[380px] w-full border-0 lg:min-h-[460px]"
          />
        </div>
      </div>
    </section>
  );
}
