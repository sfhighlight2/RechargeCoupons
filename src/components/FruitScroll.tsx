import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

// Using placeholder images for fruits since we don't have local assets
// In a real project, these would be transparent PNGs of fruits
const fruits = [
  { src: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=500&auto=format&fit=crop", alt: "Orange", top: "10%", left: "5%", speed: 0.2, rotate: 45 },
  { src: "https://images.unsplash.com/photo-1596363505729-4190a9506133?q=80&w=500&auto=format&fit=crop", alt: "Strawberry", top: "30%", right: "10%", speed: 0.5, rotate: -30 },
  { src: "https://images.unsplash.com/photo-1528825871115-3581a5387919?q=80&w=500&auto=format&fit=crop", alt: "Banana", top: "60%", left: "15%", speed: 0.3, rotate: 15 },
  { src: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=500&auto=format&fit=crop", alt: "Blueberry", top: "80%", right: "20%", speed: 0.6, rotate: -60 },
  { src: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?q=80&w=500&auto=format&fit=crop", alt: "Pineapple", top: "50%", left: "45%", speed: 0.4, rotate: 10 },
];

export default function FruitScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {fruits.map((fruit, index) => {
        const y = useTransform(scrollYProgress, [0, 1], [0, fruit.speed * 500]);
        const rotate = useTransform(scrollYProgress, [0, 1], [0, fruit.rotate * 2]);
        
        return (
          <motion.div
            key={index}
            style={{ 
              position: 'absolute', 
              top: fruit.top, 
              left: fruit.left, 
              right: fruit.right,
              y,
              rotate
            }}
            className="opacity-10 w-24 h-24 md:w-48 md:h-48"
          >
            <img 
              src={fruit.src} 
              alt={fruit.alt} 
              className="w-full h-full object-contain drop-shadow-2xl mix-blend-multiply"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        );
      })}
    </div>
  );
}
