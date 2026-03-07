import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const categories = [
  {
    title: "Smoothies",
    description: "Blended with real fruit, natural juices, and powerful boosts.",
    image: "/smoothie.jpg",
    color: "bg-orange-50",
    textColor: "text-orange-900",
    accentColor: "bg-orange-500"
  },
  {
    title: "Wraps",
    description: "Fresh ingredients wrapped in a soft tortilla for a perfect meal.",
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=2864&auto=format&fit=crop",
    color: "bg-green-50",
    textColor: "text-green-900",
    accentColor: "bg-green-600"
  },
  {
    title: "Acai Bowls",
    description: "Organic acai topped with fresh fruit, granola, and honey.",
    image: "/acai-bowl.png",
    color: "bg-purple-50",
    textColor: "text-purple-900",
    accentColor: "bg-purple-500"
  }
];

export default function MenuSection() {
  return (
    <section id="menu" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            FUEL YOUR BODY
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our menu of energizing smoothies and wholesome eats.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />

              <img
                src={category.image}
                alt={category.title}
                className="w-full h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />

              <div className="absolute bottom-0 left-0 right-0 p-8 z-20 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <h3 className="text-3xl font-bold text-white mb-2">{category.title}</h3>
                <p className="text-white/90 mb-4 font-medium">{category.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href="#hero"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-[#BE0101] rounded-full hover:bg-[#940101] hover:shadow-lg hover:-translate-y-1"
          >
            CLAIM OFFER
          </a>
        </div>
      </div>
    </section>
  );
}
