import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: "Do I need to print the coupon?",
    answer: "No! You can simply show the coupon on your mobile device to your server when ordering."
  },
  {
    question: "Is the coupon valid for takeout?",
    answer: "Yes, the coupon is valid for both dine-in and takeout orders."
  },
  {
    question: "Where are you located?",
    answer: "We are located at 2101 North University Dr. Suite B, Sunrise, FL 33322."
  },
  {
    question: "Can I combine this with other offers?",
    answer: "This offer cannot be combined with other promotions or discounts unless specified otherwise."
  },
  {
    question: "What are your hours?",
    answer: (
      <div className="space-y-1">
        <p><span className="font-semibold">Mon – Fri:</span> 9:00 AM – 9:00 PM</p>
        <p><span className="font-semibold">Saturday:</span> 9:00 AM – 7:00 PM</p>
        <p><span className="font-semibold">Sunday:</span> 10:00 AM – 6:00 PM</p>
      </div>
    )
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-20 px-4 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#BE0101] rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#BE0101] rounded-full filter blur-3xl translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="container mx-auto max-w-3xl relative z-10">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 text-[#BE0101] font-medium mb-4"
          >
            <HelpCircle className="w-5 h-5" />
            <span className="uppercase tracking-wider text-sm">Common Questions</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4"
          >
            Frequently Asked Questions
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600"
          >
            Everything you need to know about our special offer.
          </motion.p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 rounded-2xl overflow-hidden bg-white hover:border-[#BE0101]/20 transition-colors duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none group"
              >
                <span className={`font-semibold text-lg transition-colors duration-300 ${activeIndex === index ? 'text-[#BE0101]' : 'text-[#1A1A1A]'}`}>
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`p-2 rounded-full ${activeIndex === index ? 'bg-[#BE0101] text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-[#BE0101]/10 group-hover:text-[#BE0101]'}`}
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
