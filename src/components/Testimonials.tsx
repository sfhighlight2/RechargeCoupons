import { motion } from 'motion/react';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah M.",
    role: "Regular Customer",
    quote: "The best smoothies in Sunrise! The Green Machine is my daily go-to. Always fresh and the staff is super friendly.",
    rating: 5
  },
  {
    name: "James L.",
    role: "Fitness Enthusiast",
    quote: "I love that they don't use syrups or fillers. Just real fruit and quality protein. Perfect post-workout fuel.",
    rating: 5
  },
  {
    name: "Emily R.",
    role: "Local Mom",
    quote: "My kids are obsessed with the Berry Blast! It's great to have a healthy treat option nearby that they actually enjoy.",
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-[#BE0101] font-bold text-sm uppercase tracking-widest mb-2 block">
            What Our Customers Say
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
            LOVED BY LOCALS.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#F9F7F2] p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300 relative"
            >
              <Quote className="absolute top-8 right-8 w-12 h-12 text-[#BE0101]/10" />
              
              <div className="flex items-center space-x-1 mb-6 text-[#BE0101]">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>

              <p className="text-gray-600 text-lg font-medium italic mb-8 relative z-10">
                "{testimonial.quote}"
              </p>

              <div className="flex items-center space-x-4">
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500 uppercase tracking-wide">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
