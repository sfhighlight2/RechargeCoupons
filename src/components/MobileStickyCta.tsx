import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import type { Offer } from '../config';

/**
 * One primary action on mobile. Hidden while the form or the closing CTA is on screen,
 * so it never covers the thing it points to.
 */
export default function MobileStickyCta({ offer }: { offer: Offer }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const targets = ['claim', 'final-title'].map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const form = document.getElementById('claim');
    if (!form) return;
    const onScreen = new Map<Element, boolean>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => onScreen.set(e.target, e.isIntersecting));
        const anyVisible = [...onScreen.values()].some(Boolean);
        // Only show once the visitor has scrolled past the form, not before reaching it.
        const pastForm = form.getBoundingClientRect().bottom < 0;
        setVisible(!anyVisible && pastForm);
      },
      { threshold: 0 },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: '110%' }}
          animate={{ y: 0 }}
          exit={{ y: '110%' }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-ink-900/10 bg-white/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgba(34,26,21,0.08)] backdrop-blur lg:hidden"
        >
          <a
            href="#claim"
            className="flex h-13 w-full items-center justify-center gap-2 rounded-full bg-red-600 text-[17px] font-semibold text-white shadow-[var(--shadow-cta)] active:scale-[0.98]"
          >
            {offer.stickyCta}
            <ArrowUp aria-hidden className="size-5" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
