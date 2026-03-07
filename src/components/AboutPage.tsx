import { motion } from 'motion/react';
import { Leaf, Sliders, Heart, CheckCircle, Award, Users, Star } from 'lucide-react';

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

const stats = [
  { label: "Smoothies Blended", value: "50k+", icon: <Star className="w-6 h-6 text-yellow-500" /> },
  { label: "Happy Customers", value: "10k+", icon: <Users className="w-6 h-6 text-blue-500" /> },
  { label: "Years Serving", value: "5+", icon: <Award className="w-6 h-6 text-purple-500" /> },
];

export default function AboutPage() {
  return (
    <div className="pt-20 bg-[#F9F7F2] min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-gray-900 mb-6 tracking-tighter"
          >
            OUR STORY.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Recharge Smoothies Cafe was born from a simple idea: healthy food should taste amazing. 
            We started with a blender and a dream to bring fresh, nutritious options to our community in Sunrise, FL.
          </motion.p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-y border-black/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-100">
            {stats.map((stat, index) => (
              <div key={index} className="py-4 md:py-0">
                <div className="flex items-center justify-center mb-2 space-x-2">
                  {stat.icon}
                  <span className="text-4xl font-black text-gray-900">{stat.value}</span>
                </div>
                <span className="text-gray-500 font-bold uppercase tracking-widest text-sm">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-black/5 text-center"
              >
                <div className={`w-20 h-20 mx-auto rounded-full ${feature.color} flex items-center justify-center mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed font-medium">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-24 bg-[#1A1A1A] text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="grid-dark" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-dark)" />
            </svg>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight max-w-4xl mx-auto">
            "Our mission is to provide an unforgettable experience while helping you achieve a healthier lifestyle."
          </h2>
          <div className="flex justify-center items-center space-x-2">
            <CheckCircle className="text-[#BE0101] w-6 h-6" />
            <span className="text-gray-400 font-bold uppercase tracking-widest text-sm">
              The Recharge Promise
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
