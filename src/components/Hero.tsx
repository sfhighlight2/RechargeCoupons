import { motion } from 'motion/react';
import { Star, Phone, MapPin } from 'lucide-react';
import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function Hero() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [offerTitle, setOfferTitle] = useState('Claim Your 50% Smoothie Coupon');
  const [heroTitle, setHeroTitle] = useState('50% OFF ANY SMOOTHIE');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    const offer = searchParams.get('offer');
    const title = searchParams.get('title');

    if (offer) {
      setOfferTitle(offer);
    }
    if (title) {
      setHeroTitle(title);
    }
  }, [searchParams]);

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, ''); // Remove non-digits
    let formatted = input;
    if (input.length > 0) {
      formatted = `(${input.substring(0, 3)}`;
    }
    if (input.length > 3) {
      formatted += `) ${input.substring(3, 6)}`;
    }
    if (input.length > 6) {
      formatted += `-${input.substring(6, 10)}`;
    }
    setPhone(formatted);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (phone.length < 14) {
      alert('Please enter a valid phone number');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }

    // In a real app, we would submit the data here
    navigate('/thank-you', { state: { firstName } });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-36 pb-12 overflow-hidden bg-[#F9F7F2]">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#BE0101]/5 -skew-x-12 transform origin-top-right z-0" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-[#940101]/5 rounded-full blur-3xl z-0" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6 lg:space-y-8 text-center lg:text-left"
        >
          <div className="inline-flex items-center space-x-2 bg-white border border-black/5 rounded-full px-4 py-2 shadow-sm mb-6">
            <span className="flex items-center text-[#BE0101] font-bold text-xs uppercase tracking-wider">
              <Star className="w-3 h-3 mr-1 fill-current" />
              Fresh Blended Smoothies
            </span>
          </div>

          {/* Social Proof */}
          <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
            <div className="flex -space-x-2">
              {[
                "https://i.pravatar.cc/100?img=5",
                "https://i.pravatar.cc/100?img=9",
                "https://i.pravatar.cc/100?img=12",
                "https://i.pravatar.cc/100?img=24"
              ].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="Happy Customer"
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
              ))}
            </div>
            <div className="flex flex-col">
              <div className="flex text-yellow-400 gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-xs font-bold text-gray-700">5.0 Stars from 1,550+ Reviews</span>
            </div>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black leading-tight tracking-tight text-[#1A1A1A]">
            {heroTitle}
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 max-w-lg mx-auto lg:mx-0 font-medium leading-relaxed">
            Handcrafted smoothies, fresh wraps, and acai bowls.
            Blended with love, served with joy, and packed with natural energy.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs font-bold text-gray-500 uppercase tracking-wider">
            <span className="flex items-center">
              <span className="w-1.5 h-1.5 bg-[#940101] rounded-full mr-1.5"></span>
              Fresh Fruit
            </span>
            <span className="flex items-center">
              <span className="w-1.5 h-1.5 bg-[#BE0101] rounded-full mr-1.5"></span>
              Natural Flavors
            </span>
            <span className="flex items-center">
              <span className="w-1.5 h-1.5 bg-[#940101] rounded-full mr-1.5"></span>
              Loved Locally
            </span>
          </div>
        </motion.div>

        {/* Form Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative"
        >
          <div id="claim-offer-form" className="bg-white p-8 rounded-[2rem] shadow-2xl border border-black/5 relative z-10">
            <h2 className="text-3xl font-black text-[#1A1A1A] mb-2 uppercase tracking-tight text-center">
              {offerTitle}
            </h2>
            <p className="text-gray-500 text-center mb-8 font-medium">
              Fill out the form to get your coupon instantly!
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-bold text-gray-700 uppercase tracking-wide mb-1">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#BE0101] focus:border-transparent transition-all"
                    placeholder="First"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-bold text-gray-700 uppercase tracking-wide mb-1">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#BE0101] focus:border-transparent transition-all"
                    placeholder="Last"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-700 uppercase tracking-wide mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#BE0101] focus:border-transparent transition-all"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-bold text-gray-700 uppercase tracking-wide mb-1">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  required
                  value={phone}
                  onChange={handlePhoneChange}
                  maxLength={14}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#BE0101] focus:border-transparent transition-all"
                  placeholder="(555) 555-5555"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#BE0101] text-white font-bold py-4 rounded-xl shadow-lg hover:bg-[#940101] hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 uppercase tracking-wider text-lg mt-4"
              >
                Claim Offer
              </button>

              <p className="text-[10px] text-gray-400 text-center leading-tight mt-4">
                By clicking "Claim Offer", you agree to receive marketing text messages from Recharge Smoothies at the number provided, including messages sent by autodialer. Consent is not a condition of any purchase. Message and data rates may apply. Message frequency varies. Reply HELP for help or STOP to cancel. View our Privacy Policy and Terms of Service.
              </p>
            </form>
          </div>

          {/* Decorative Elements behind form */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#BE0101] rounded-full mix-blend-multiply opacity-20 animate-blob"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#940101] rounded-full mix-blend-multiply opacity-20 animate-blob animation-delay-2000"></div>
        </motion.div>
      </div>
    </section>
  );
}
