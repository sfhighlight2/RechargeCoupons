import React from 'react';
import { MapPin, Ticket } from 'lucide-react';

export default function MobileStickyBar() {
  const scrollToOffer = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('claim-offer-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50 lg:hidden shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
      <div className="flex gap-3">
        <a
          href="https://google.com/maps/place/recharge+smoothies/data=!4m2!3m1!1s0x88d906391e0767a5:0x9f88449ffabe3c26?sa=X&ved=1t:242&ictx=111"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-white text-[#1A1A1A] border-2 border-[#1A1A1A] font-bold py-3 rounded-xl active:scale-95 transition-transform text-sm"
        >
          <MapPin className="w-4 h-4" />
          Directions
        </a>
        <button
          onClick={scrollToOffer}
          className="flex-1 flex items-center justify-center gap-2 bg-[#BE0101] text-white font-bold py-3 rounded-xl shadow-lg active:scale-95 transition-transform text-sm"
        >
          <Ticket className="w-4 h-4" />
          Claim Deal
        </button>
      </div>
    </div>
  );
}
