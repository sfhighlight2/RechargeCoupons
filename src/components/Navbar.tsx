import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-[#F9F7F2]/90 backdrop-blur-md border-b border-black/5 relative z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <img src="/logo.png" alt="Recharge Smoothies Cafe" className="h-16 w-auto drop-shadow-md" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
