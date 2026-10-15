import { motion } from 'motion/react';
import { CUP_IMAGES, type Cup } from '../config';

/**
 * Row of real Recharge cup photos, side by side. The photos have white backgrounds that
 * multiply into the page, so cups must never overlap (overlaps turn see-through).
 */
export default function CupStack({
  cups,
  className = '',
  heightClass,
  priority = false,
}: {
  cups: Cup[];
  className?: string;
  heightClass: string;
  priority?: boolean;
}) {
  return (
    <div className={`flex items-end justify-center gap-1 ${className}`}>
      {cups.map((cup, i) => {
        const img = CUP_IMAGES[cup];
        return (
          <motion.img
            key={cup}
            src={img.src}
            alt={img.alt}
            width={img.w}
            height={img.h}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority && i === 0 ? 'high' : undefined}
            decoding="async"
            initial={{ y: 24 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: 0.08 * i, ease: [0.16, 1, 0.3, 1] }}
            className={`blend-photo w-auto object-contain ${heightClass}`}
          />
        );
      })}
    </div>
  );
}
