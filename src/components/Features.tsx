import { motion } from 'motion/react';
import { Leaf, Sliders, Heart, CheckCircle } from 'lucide-react';

const features = [
  {
    icon: <Leaf className="w-8 h-8 text-green-600" />,
    title: "Local Ingredients",
    description: "We source the freshest local fruits and produce to ensure every sip is packed with natural goodness.",
    color: "bg-green-50"
  },
  {
    icon: <Sliders className="w-8 h-8 text-orange-600" />,
    title: "Fully Customizable",
    description: "Personalize your smoothie with protein boosts, superfoods, and vegan alternatives.",
    color: "bg-orange-50"
  },
  {
    icon: <Heart className="w-8 h-8 text-red-600" />,
    title: "Community Focused",
    description: "Proudly serving Sunrise, FL. We love giving back through local events and partnerships.",
    color: "bg-red-50"
  }
];

export default function Features() {
  return (
    <section id="about" className="py-24 bg-[#F9F7F2]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[#BE0101] font-bold text-sm uppercase tracking-widest mb-2 block">
            Why Choose Recharge?
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
            BLENDED WITH LOVE, <br /> SERVED WITH JOY.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-black/5"
            >
              <div className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mb-6`}>
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed font-medium">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Mission Statement */}
        <div className="mt-24 bg-[#1A1A1A] rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-black text-white mb-8 leading-tight">
              "Our mission is to provide an unforgettable experience while helping you achieve a healthier lifestyle."
            </h3>
            <div className="flex justify-center space-x-2">
              <CheckCircle className="text-[#BE0101] w-6 h-6" />
              <span className="text-gray-400 font-bold uppercase tracking-widest text-sm">
                Recharge Smoothies Team
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
