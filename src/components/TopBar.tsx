import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

export default function TopBar() {
  const [count, setCount] = useState(20);

  useEffect(() => {
    // Random number between 11 and 33
    const randomCount = Math.floor(Math.random() * (33 - 11 + 1)) + 11;
    setCount(randomCount);
  }, []);

  return (
    <motion.div 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-[#1A1A1A] text-white py-2 px-4 text-center text-xs sm:text-sm font-medium tracking-wide relative z-50"
    >
      <div className="container mx-auto flex items-center justify-center gap-2">
        <span>🔥 Hurry! Less Than {count} Coupons left...</span>
      </div>
    </motion.div>
  );
}
