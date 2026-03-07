import { MapPin, Clock, Phone, Instagram, Facebook, Twitter } from 'lucide-react';

export default function Location() {
  return (
    <section id="location" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Contact Info */}
          <div className="space-y-12">
            <div>
              <span className="text-[#BE0101] font-bold text-sm uppercase tracking-widest mb-2 block">
                Visit Us
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-8">
                FIND YOUR RECHARGE.
              </h2>
              <p className="text-xl text-gray-600 font-medium leading-relaxed max-w-md">
                We're located in the heart of Sunrise, FL. Stop by for a quick pick-me-up or a healthy meal.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-[#BE0101]" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-1">Location</h4>
                  <p className="text-gray-600">2101 North University Dr. Suite B.<br />Sunrise, FL 33322</p>
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

          {/* Map */}
          <div className="relative h-full min-h-[400px]">
            <div className="bg-[#1A1A1A] rounded-[2rem] overflow-hidden shadow-2xl h-full border border-black/5">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3581.526662095697!2d-80.2583704!3d26.1520731!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d906391e0767a5%3A0x9f88449ffabe3c26!2s2101%20N%20University%20Dr%20Ste%20B%2C%20Sunrise%2C%20FL%2033322!5e0!3m2!1sen!2sus!4v1709845678901!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '400px' }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Recharge Smoothies Cafe Location"
              ></iframe>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
