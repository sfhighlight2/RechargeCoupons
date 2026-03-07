import { motion } from 'motion/react';
import { Instagram } from 'lucide-react';

const posts = [
  {
    image: "https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?q=80&w=1000&auto=format&fit=crop",
    caption: "Start your day with a burst of energy! 🍊 #RechargeSmoothies #SunriseFL",
    likes: 124
  },
  {
    image: "https://images.unsplash.com/photo-1628557044797-f21a177c37ec?q=80&w=1000&auto=format&fit=crop",
    caption: "Our new Acai Bowls are a hit! Come try one today. 🫐 #AcaiBowl #HealthyEating",
    likes: 205
  },
  {
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop",
    caption: "Fresh ingredients, always. That's the Recharge promise. 🥬 #LocalProduce #Fresh",
    likes: 189
  },
  {
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1000&auto=format&fit=crop",
    caption: "Wrap it up! Our Chicken Caesar Wrap is the perfect lunch. 🌯 #LunchTime #Wraps",
    likes: 156
  }
];

export default function SocialFeed() {
  return (
    <section className="py-24 bg-[#F9F7F2] relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <span className="text-[#BE0101] font-bold text-sm uppercase tracking-widest mb-2 block">
              Follow Us @RechargeSmoothies
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
              JOIN THE COMMUNITY.
            </h2>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center px-6 py-3 border-2 border-black text-sm font-bold rounded-full text-black hover:bg-black hover:text-white transition-colors uppercase tracking-wide"
          >
            <Instagram className="w-4 h-4 mr-2" />
            Follow on Instagram
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {posts.map((post, index) => (
            <motion.a
              key={index}
              href="#"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative aspect-square overflow-hidden rounded-2xl cursor-pointer"
            >
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 text-center">
                <p className="text-white text-sm font-medium line-clamp-3">
                  {post.caption}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
            <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 border-2 border-black text-sm font-bold rounded-full text-black hover:bg-black hover:text-white transition-colors uppercase tracking-wide"
          >
            <Instagram className="w-4 h-4 mr-2" />
            Follow on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
