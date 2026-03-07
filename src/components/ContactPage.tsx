import { motion } from 'motion/react';
import { MapPin, Clock, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="pt-20 bg-[#F9F7F2] min-h-screen">
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 tracking-tighter">
              GET IN TOUCH.
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Have a question about our menu? Want to cater an event? We'd love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Contact Info */}
            <div className="space-y-12">
              <div className="space-y-8">
                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[#BE0101]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-1">Location</h4>
                    <p className="text-gray-600">2102 North University Dr. Suite B.<br />Sunrise, FL 33322</p>
                    <a
                      href="https://google.com/maps/place/recharge+smoothies/data=!4m2!3m1!1s0x88d906391e0767a5:0x9f88449ffabe3c26?sa=X&ved=1t:242&ictx=111"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#BE0101] font-bold text-sm mt-2 inline-block hover:underline"
                    >
                      Get Directions &rarr;
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-[#940101]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-1">Hours</h4>
                    <ul className="text-gray-600 space-y-1 text-sm">
                      <li className="flex justify-between w-48"><span>Mon – Fri:</span> <span>9:00 AM – 9:00 PM</span></li>
                      <li className="flex justify-between w-48"><span>Saturday:</span> <span>9:00 AM – 7:00 PM</span></li>
                      <li className="flex justify-between w-48"><span>Sunday:</span> <span>10:00 AM – 6:00 PM</span></li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-1">Contact</h4>
                    <p className="text-gray-600 mb-1"><a href="tel:9549990332" className="hover:text-[#BE0101] transition-colors">(954) 999-0332</a></p>
                    <p className="text-gray-600"><a href="mailto:info@rechargesmoothies.com" className="hover:text-[#BE0101] transition-colors">info@rechargesmoothies.com</a></p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 pt-4">
                <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#BE0101] hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#1DA1F2] hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-xl border border-black/5">
              <h3 className="text-3xl font-bold text-gray-900 mb-8">Send us a message</h3>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Name</label>
                    <input type="text" id="name" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#BE0101] focus:border-transparent transition-all" placeholder="John Doe" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Email</label>
                    <input type="email" id="email" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#BE0101] focus:border-transparent transition-all" placeholder="john@example.com" />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Message</label>
                  <textarea id="message" rows={4} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#BE0101] focus:border-transparent transition-all" placeholder="How can we help you?"></textarea>
                </div>
                <button type="submit" className="w-full px-8 py-4 bg-[#BE0101] text-white font-bold rounded-xl hover:bg-[#940101] transition-colors shadow-lg hover:shadow-[#BE0101]/25 uppercase tracking-wide">
                  Send Message
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
