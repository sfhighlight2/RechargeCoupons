import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, MapPin, Phone, Clock, FileText, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function ThankYouPage() {
  const location = useLocation();
  const firstName = location.state?.firstName;

  return (
    <div className="min-h-screen bg-[#F9F7F2] pt-32 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[#1A1A1A] mb-4 tracking-tight uppercase">
            {firstName ? `${firstName}, You're In!` : "You're In!"}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Thanks for signing up! Your deal is on its way to your inbox.
            Come visit us to redeem it!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-[2rem] shadow-xl border border-black/5 p-8"
          >
            <h2 className="text-2xl font-black text-[#1A1A1A] mb-6 uppercase tracking-tight">
              Visit Us
            </h2>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#BE0101]" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Location</h4>
                  <p className="text-gray-600">2101 North University Dr. Suite B<br />Sunrise, FL 33322</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-[#940101]" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Hours</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li className="flex justify-between w-40"><span>Mon – Fri:</span> <span>9am – 9pm</span></li>
                    <li className="flex justify-between w-40"><span>Saturday:</span> <span>9am – 7pm</span></li>
                    <li className="flex justify-between w-40"><span>Sunday:</span> <span>10am – 6pm</span></li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Contact</h4>
                  <p className="text-gray-600"><a href="tel:9549990332" className="hover:text-[#BE0101]">(954) 999-0332</a></p>
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href="tel:9549990332"
                className="flex items-center justify-center px-6 py-3 bg-[#1A1A1A] text-white font-bold rounded-xl hover:bg-black transition-colors"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </a>
              <a
                href="https://google.com/maps/place/recharge+smoothies/data=!4m2!3m1!1s0x88d906391e0767a5:0x9f88449ffabe3c26?sa=X&ved=1t:242&ictx=111"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-6 py-3 bg-[#BE0101] text-white font-bold rounded-xl hover:bg-[#940101] transition-colors"
              >
                <MapPin className="w-4 h-4 mr-2" />
                Get Directions
              </a>
            </div>

            <div className="mt-4">
              <a
                href="https://order.online/store/recharge-smoothies-cafe-sunrise-337075/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full px-6 py-3 bg-white border-2 border-[#BE0101] text-[#BE0101] font-bold rounded-xl hover:bg-[#BE0101] hover:text-white transition-colors"
              >
                <FileText className="w-4 h-4 mr-2" />
                View Our Menu
              </a>
            </div>
          </motion.div>

          {/* Map Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="h-full min-h-[400px] bg-[#1A1A1A] rounded-[2rem] overflow-hidden shadow-xl border border-black/5"
          >
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
          </motion.div>
        </div>

        <div className="mt-12 text-center">
          <Link to="/" className="text-gray-500 hover:text-[#BE0101] font-bold inline-flex items-center transition-colors">
            <ArrowRight className="w-4 h-4 mr-1 rotate-180" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
