import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Check, Clock, MapPin, MessageCircle, Navigation, Phone, Share2 } from 'lucide-react';
import { BUSINESS, COUPON_VALID_DAYS, OFFER_TERMS, OFFERS } from '../config';
import FruitRain from './motion/FruitRain';

interface ThankYouState {
  firstName?: string;
  offerKey?: string;
  couponName?: string;
  from?: string;
}

function expiryDate() {
  const d = new Date();
  d.setDate(d.getDate() + COUPON_VALID_DAYS);
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
}

function ShareButton({ path, text }: { path: string; text: string }) {
  const [copied, setCopied] = useState(false);
  const url = `${window.location.origin}${path}`;

  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ text, url });
      } catch {
        // Visitor closed the share sheet.
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(`${text} ${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      window.location.href = `sms:?&body=${encodeURIComponent(`${text} ${url}`)}`;
    }
  };

  return (
    <button
      type="button"
      onClick={share}
      className="inline-flex h-12 items-center justify-center gap-2 rounded-full border-2 border-ink-900 px-6 font-semibold text-ink-900 transition-colors hover:bg-ink-900 hover:text-white"
    >
      {copied ? <Check aria-hidden className="size-4" /> : <Share2 aria-hidden className="size-4" />}
      <span aria-live="polite">{copied ? 'Link copied' : 'Share with a friend'}</span>
    </button>
  );
}

export default function ThankYouPage() {
  const state = (useLocation().state ?? {}) as ThankYouState;
  const claimed = Boolean(state.offerKey);
  const offer = Object.values(OFFERS).find((o) => state.offerKey?.startsWith(o.key)) ?? OFFERS.half;
  const couponName = state.couponName ?? offer.couponName;
  const sharePath = state.from && state.from.startsWith('/') ? state.from : offer.path;

  if (!claimed) {
    return (
      <section className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
        <h1 className="text-5xl uppercase sm:text-6xl">Looking for your coupon?</h1>
        <p className="mx-auto mt-4 max-w-[40ch] text-lg text-ink-700">
          If you already signed up, check your texts and email for it. If not, it only takes a few seconds.
        </p>
        <Link
          to={OFFERS.half.path}
          className="mt-8 inline-flex h-14 items-center rounded-full bg-red-600 px-8 text-[17px] font-semibold text-white shadow-[var(--shadow-cta)] hover:bg-red-700"
        >
          Get my coupon
        </Link>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden pt-6 pb-20 sm:pt-10">
      <FruitRain />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 size-[44rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,217,61,0.35),rgba(247,148,29,0.1)_55%,transparent)]"
      />
      <div className="relative mx-auto max-w-2xl px-4 sm:px-6">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          className="mx-auto flex size-16 items-center justify-center rounded-full bg-green-600 text-white shadow-[var(--shadow-card)]"
        >
          <Check aria-hidden className="size-8" strokeWidth={3} />
        </motion.div>

        <h1 className="mt-6 text-center text-5xl uppercase sm:text-6xl">
          {state.firstName ? `${state.firstName}, you're in` : "You're in"}
        </h1>
        <p className="mx-auto mt-3 max-w-[42ch] text-center text-lg leading-relaxed text-ink-700">
          Your coupon is on its way. Watch for a text or email from Recharge Smoothies in the next few minutes.
        </p>

        {/* Coupon summary */}
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-10 overflow-hidden rounded-[var(--radius-card)] bg-white shadow-[var(--shadow-lift)]"
        >
          <div className="bg-[linear-gradient(135deg,var(--color-red-600),var(--color-red-800))] px-6 py-6 text-white sm:px-8">
            <p className="text-sm font-semibold text-white/80">Your coupon</p>
            <p className="mt-1 font-display text-4xl uppercase leading-none sm:text-5xl">{couponName}</p>
          </div>
          {/* Ticket perforation */}
          <div aria-hidden className="relative h-0">
            <span className="absolute -top-3 -left-3 size-6 rounded-full bg-cream-50" />
            <span className="absolute -top-3 -right-3 size-6 rounded-full bg-cream-50" />
          </div>
          <div className="flex flex-col gap-4 px-6 py-6 sm:px-8">
            <p className="flex items-center gap-3 text-[17px] font-semibold">
              <Clock aria-hidden className="size-5 text-red-600" />
              Use it by {expiryDate()}
            </p>
            <p className="flex items-start gap-3 text-[16px] leading-relaxed text-ink-700">
              <MessageCircle aria-hidden className="mt-0.5 size-5 shrink-0 text-red-600" />
              Show the coupon we send you at the counter when you order.
            </p>
            <p className="border-t border-dashed border-ink-900/15 pt-4 text-[13px] leading-snug text-ink-500">{OFFER_TERMS}</p>
          </div>
        </motion.div>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <a
            href={BUSINESS.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-red-600 px-6 text-[17px] font-semibold text-white shadow-[var(--shadow-cta)] transition-colors hover:bg-red-700"
          >
            <Navigation aria-hidden className="size-5" />
            Get directions
          </a>
          <a
            href={BUSINESS.phoneHref}
            className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-ink-900 px-6 text-[17px] font-semibold text-white transition-colors hover:bg-ink-700"
          >
            <Phone aria-hidden className="size-5" />
            Call {BUSINESS.phoneDisplay}
          </a>
        </div>

        <div className="mt-12 grid grid-cols-1 items-center gap-8 rounded-[var(--radius-card)] bg-white p-6 shadow-[var(--shadow-card)] sm:grid-cols-[1fr_auto] sm:p-8">
          <div>
            <h2 className="text-3xl uppercase">Bring a friend</h2>
            <p className="mt-2 max-w-[36ch] text-[16px] leading-relaxed text-ink-700">
              Send them the link so they can claim their own coupon and come with you.
            </p>
            <div className="mt-5">
              <ShareButton path={sharePath} text={offer.shareText} />
            </div>
          </div>
          <img
            src="/img/lifestyle-berry.webp"
            alt="Guest holding a berry smoothie in a Recharge cup"
            width={521}
            height={1100}
            loading="lazy"
            className="mx-auto hidden h-56 w-40 rounded-[18px] object-cover object-[50%_35%] sm:block"
          />
        </div>

        <div className="mt-12 flex flex-col gap-2 text-center text-[15px] text-ink-700">
          <p className="flex items-center justify-center gap-2">
            <MapPin aria-hidden className="size-4 text-red-600" />
            {BUSINESS.street}, {BUSINESS.cityLine}
          </p>
          <ul className="tabular">
            {BUSINESS.hours.map((h) => (
              <li key={h.days}>
                <span className="text-ink-500">{h.days}</span> {h.time}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
