import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Check, X } from 'lucide-react';
import type { Offer } from '../config';
import {
  exitRecentlyDismissed,
  exitShownThisSession,
  hasConverted,
  markExitDismissed,
  markExitShown,
} from '../lib/visitor';

const MIN_TIME_ON_PAGE_MS = 8000;

/** True once the visitor has typed into the coupon form. */
function formStarted() {
  return [...document.querySelectorAll<HTMLInputElement>('#claim input:not([name="rc_hp_check"])')].some((i) => i.value.trim());
}

function focusForm() {
  const form = document.getElementById('claim');
  form?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const firstEmpty = [...document.querySelectorAll<HTMLInputElement>('#claim input:not([name="rc_hp_check"])')].find((i) => !i.value.trim());
  // Focus after the scroll settles so mobile keyboards don't fight the scroll.
  window.setTimeout(() => firstEmpty?.focus({ preventScroll: true }), 450);
}

/**
 * Exit-intent reminder for the coupon pages.
 * Desktop: cursor leaves through the top of the window.
 * Mobile: a fast scroll back toward the top after reading, or returning to the tab after leaving it.
 * Shows at most once per session, never after a signup, and not again for 7 days after "No thanks".
 * Add ?preview_exit=1 to the URL to see it right away.
 */
export default function ExitIntent({ offer }: { offer: Offer }) {
  const [open, setOpen] = useState(false);
  const [started, setStarted] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const loadedAt = useRef(Date.now());

  const show = useCallback(() => {
    const preview = new URLSearchParams(window.location.search).has('preview_exit');
    if (!preview) {
      if (hasConverted() || exitShownThisSession() || exitRecentlyDismissed()) return;
      if (Date.now() - loadedAt.current < MIN_TIME_ON_PAGE_MS) return;
      if (document.querySelector('#claim :focus')) return; // they are filling the form right now
    }
    markExitShown();
    returnFocus.current = document.activeElement as HTMLElement | null;
    setStarted(formStarted());
    setOpen(true);
  }, []);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).has('preview_exit')) {
      const t = window.setTimeout(show, 800);
      return () => window.clearTimeout(t);
    }

    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const cleanups: Array<() => void> = [];

    if (finePointer) {
      const onOut = (e: MouseEvent) => {
        if (!e.relatedTarget && e.clientY <= 8) show();
      };
      document.addEventListener('mouseout', onOut);
      cleanups.push(() => document.removeEventListener('mouseout', onOut));
    } else {
      // Fast upward flick after reading at least a third of the page.
      let lastY = window.scrollY;
      let lastT = performance.now();
      let maxY = 0;
      let frame = 0;
      const onScroll = () => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          const y = window.scrollY;
          const t = performance.now();
          maxY = Math.max(maxY, y);
          const velocity = (lastY - y) / Math.max(t - lastT, 1); // px per ms, positive = upward
          const readEnough = maxY > document.documentElement.scrollHeight * 0.33;
          if (readEnough && velocity > 2.2 && y < maxY - 600) show();
          lastY = y;
          lastT = t;
        });
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      cleanups.push(() => {
        window.removeEventListener('scroll', onScroll);
        cancelAnimationFrame(frame);
      });
    }

    // Came back after switching tabs or apps for a while.
    let hiddenAt = 0;
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') hiddenAt = Date.now();
      else if (hiddenAt && Date.now() - hiddenAt > 5000) show();
    };
    document.addEventListener('visibilitychange', onVisibility);
    cleanups.push(() => document.removeEventListener('visibilitychange', onVisibility));

    return () => cleanups.forEach((fn) => fn());
  }, [show]);

  const close = useCallback((remember: boolean) => {
    if (remember) markExitDismissed();
    setOpen(false);
    returnFocus.current?.focus?.({ preventScroll: true });
  }, []);

  const claim = () => {
    setOpen(false);
    focusForm();
  };

  // Escape to close, focus trap, and lock page scroll while open.
  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    dialog?.querySelector<HTMLElement>('[data-autofocus]')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close(true);
      if (e.key !== 'Tab' || !dialog) return;
      const items = [...dialog.querySelectorAll<HTMLElement>('button, a[href]')];
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close]);

  const headline = started ? "You're almost done" : offer.exitHeadline;
  const body = started
    ? 'Finish the form and your coupon is on its way. It only takes a few more seconds.'
    : 'Claim it in about 20 seconds, then use it at our Sunrise cafe any time in the next 7 days.';

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6">
          <motion.div
            aria-hidden
            onClick={() => close(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-ink-900/60 backdrop-blur-[2px]"
          />
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="exit-title"
            aria-describedby="exit-body"
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full overflow-hidden rounded-t-[28px] bg-white shadow-[var(--shadow-lift)] sm:max-w-[560px] sm:rounded-[var(--radius-card)]"
          >
            <button
              type="button"
              onClick={() => close(true)}
              aria-label="Close"
              className="absolute top-3 right-3 z-10 inline-flex size-11 items-center justify-center rounded-full bg-white/90 text-ink-900 transition-colors hover:bg-ink-900/5"
            >
              <X aria-hidden className="size-5" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr]">
              <img
                src="/img/lifestyle-green.webp"
                alt=""
                width={522}
                height={1100}
                className="hidden h-full w-full object-cover sm:block"
              />
              <div className="px-6 pt-7 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-7 sm:py-8">
                <div aria-hidden className="mx-auto mb-5 h-1.5 w-10 rounded-full bg-ink-900/15 sm:hidden" />
                <h2 id="exit-title" className="pr-8 text-[2.1rem] uppercase leading-[0.95] text-ink-900 sm:text-4xl">
                  {headline}
                </h2>
                <p id="exit-body" className="mt-3 text-[16px] leading-relaxed text-ink-700">
                  {body}
                </p>
                {!started && (
                  <ul className="mt-4 flex flex-col gap-1.5 text-[15px] font-medium text-ink-900">
                    {['Takes about 20 seconds', 'No app to download', 'Good for 7 days'].map((t) => (
                      <li key={t} className="flex items-center gap-2">
                        <Check aria-hidden className="size-4 text-green-600" strokeWidth={3} />
                        {t}
                      </li>
                    ))}
                  </ul>
                )}
                <button
                  type="button"
                  data-autofocus
                  onClick={claim}
                  className="mt-6 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-red-600 px-6 text-[17px] font-semibold text-white shadow-[var(--shadow-cta)] transition-[background-color,transform] duration-200 hover:bg-red-700 active:scale-[0.98]"
                >
                  {started ? 'Finish My Coupon' : offer.cta}
                  <ArrowRight aria-hidden className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={() => close(true)}
                  className="mt-2 h-11 w-full text-[15px] font-medium text-ink-500 underline-offset-4 hover:text-ink-900 hover:underline"
                >
                  No thanks
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
