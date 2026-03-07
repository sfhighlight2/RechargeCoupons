import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="text-center md:text-left mb-8 md:mb-0">
            <img src="/logo.png" alt="Recharge Smoothies Cafe" className="h-20 w-auto mb-4 mx-auto md:mx-0 drop-shadow-lg" />
            <p className="text-gray-400 text-lg max-w-md mx-auto md:mx-0">
              Blended with love, served with joy.
            </p>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Recharge Smoothies Cafe. All rights reserved.</p>
          <p className="mt-4 md:mt-0 flex items-center">
            Made with <Heart className="w-3 h-3 text-red-500 mx-1 fill-current" /> in Sunrise, FL
          </p>
        </div>
      </div>
    </footer>
  );
}
