import { motion } from 'motion/react';
import { useState } from 'react';

const menuCategories = [
  {
    id: 'smoothies',
    title: 'Smoothies',
    description: 'Blended with real fruit, natural juices, and powerful boosts.',
    items: [
      { name: 'Green Machine', description: 'Spinach, Kale, Mango, Pineapple, Banana, Apple Juice', price: '$8.95' },
      { name: 'Berry Blast', description: 'Strawberry, Blueberry, Raspberry, Banana, Almond Milk', price: '$8.95' },
      { name: 'Tropical Paradise', description: 'Mango, Pineapple, Banana, Coconut Water', price: '$8.95' },
      { name: 'Protein Power', description: 'Banana, Peanut Butter, Chocolate Protein, Almond Milk', price: '$9.95' },
      { name: 'Sunrise Citrus', description: 'Orange, Pineapple, Mango, Strawberry', price: '$8.95' },
      { name: 'Acai Energy', description: 'Acai, Banana, Strawberry, Blueberry, Apple Juice', price: '$9.95' },
    ]
  },
  {
    id: 'wraps',
    title: 'Wraps',
    description: 'Fresh ingredients wrapped in a soft tortilla for a perfect meal.',
    items: [
      { name: 'Chicken Caesar', description: 'Grilled Chicken, Romaine, Parmesan, Caesar Dressing', price: '$10.95' },
      { name: 'Veggie Delight', description: 'Hummus, Spinach, Cucumber, Tomato, Red Onion, Feta', price: '$9.95' },
      { name: 'Turkey Club', description: 'Turkey, Bacon, Lettuce, Tomato, Mayo', price: '$11.95' },
      { name: 'Spicy Tuna', description: 'Tuna Salad, Jalapenos, Sriracha Mayo, Lettuce', price: '$10.95' },
    ]
  },
  {
    id: 'flatbreads',
    title: 'Flatbreads',
    description: 'Crispy, savory, and topped with premium ingredients.',
    items: [
      { name: 'Margherita', description: 'Tomato Sauce, Mozzarella, Fresh Basil', price: '$11.95' },
      { name: 'BBQ Chicken', description: 'BBQ Sauce, Grilled Chicken, Red Onion, Cilantro', price: '$12.95' },
      { name: 'Pesto Veggie', description: 'Pesto, Spinach, Tomato, Artichoke, Feta', price: '$11.95' },
    ]
  },
  {
    id: 'bowls',
    title: 'Acai Bowls',
    description: 'Thick smoothie base topped with granola and fresh fruit.',
    items: [
      { name: 'Classic Acai', description: 'Acai Base, Granola, Banana, Strawberry, Honey', price: '$11.95' },
      { name: 'Nutty Professor', description: 'Acai Base, Granola, Banana, Peanut Butter, Cacao Nibs', price: '$12.95' },
      { name: 'Tropical Bowl', description: 'Pitaya Base, Granola, Mango, Pineapple, Coconut Flakes', price: '$12.95' },
    ]
  }
];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('smoothies');

  return (
    <div className="pt-20 bg-[#F9F7F2] min-h-screen">
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 tracking-tighter">
              OUR MENU.
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our delicious selection of healthy eats and treats.
            </p>
          </div>

          {/* Category Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-16 sticky top-24 z-30 bg-[#F9F7F2]/90 backdrop-blur-md py-4 rounded-full">
            {menuCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wide transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-[#BE0101] text-white shadow-lg scale-105'
                    : 'bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-black/5'
                }`}
              >
                {category.title}
              </button>
            ))}
          </div>

          {/* Menu Items */}
          <div className="max-w-4xl mx-auto">
            {menuCategories.map((category) => (
              activeCategory === category.id && (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-black text-gray-900 mb-2">{category.title}</h2>
                    <p className="text-gray-600">{category.description}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {category.items.map((item, index) => (
                      <div 
                        key={index} 
                        className="bg-white p-6 rounded-2xl shadow-sm border border-black/5 hover:shadow-md transition-shadow duration-300 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                            <span className="text-[#BE0101] font-bold">{item.price}</span>
                          </div>
                          <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                        </div>
                        <button className="mt-4 w-full py-2 border border-[#BE0101] text-[#BE0101] font-bold rounded-lg text-sm hover:bg-[#BE0101] hover:text-white transition-colors uppercase tracking-wide">
                          Add to Order
                        </button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )
            ))}
          </div>

          <div className="mt-16 text-center">
             <a
              href="https://order.online/store/recharge-smoothies-cafe-sunrise-337075/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-[#1A1A1A] rounded-full hover:bg-[#BE0101] hover:shadow-lg hover:-translate-y-1"
            >
              ORDER ONLINE FOR PICKUP
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
