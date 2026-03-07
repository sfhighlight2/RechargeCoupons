import { motion } from 'motion/react';
import { ClipboardList, Store, Smile } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: ClipboardList,
      title: "Claim Your Coupon",
      description: "Fill out the quick form"
    },
    {
      icon: Store,
      title: "Visit Recharge Smoothies Cafe",
      description: "Show your coupon at checkout."
    },
    {
      icon: Smile,
      title: "Enjoy Your Free Smoothie",
      description: "Sip, savor, and smile!"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-[#1A1A1A] mb-6 uppercase tracking-tight">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 font-medium leading-relaxed">
            At Recharge Smoothies Cafe, we believe everyone deserves a taste of the best smoothies in Sunrise, Florida. This is our way of saying thank you to our community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="flex flex-col items-center text-center p-8 rounded-2xl bg-[#F9F7F2] border border-black/5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-20 h-20 bg-[#BE0101]/10 rounded-full flex items-center justify-center mb-6 text-[#BE0101]">
                <step.icon className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-3 uppercase tracking-wide">
                {step.title}
              </h3>
              <p className="text-gray-600 font-medium text-lg">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
