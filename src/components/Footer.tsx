import { Link } from 'react-router-dom';
import { BUSINESS } from '../config';

export default function Footer({ padForStickyBar = false }: { padForStickyBar?: boolean }) {
  return (
    <footer className={`bg-ink-900 text-white/80 ${padForStickyBar ? 'pb-24 lg:pb-0' : ''}`}>
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-start md:justify-between lg:px-8">
        <div>
          <img src="/img/logo.webp" alt="Recharge Smoothies Cafe" width={480} height={270} loading="lazy" className="h-14 w-auto" />
          <p className="mt-4 text-[15px]">Blended with love, served with joy.</p>
        </div>
        <address className="text-[15px] not-italic leading-relaxed">
          {BUSINESS.street}
          <br />
          {BUSINESS.cityLine}
          <br />
          <a href={BUSINESS.phoneHref} className="underline decoration-white/30 underline-offset-4 hover:text-white">
            {BUSINESS.phoneDisplay}
          </a>
        </address>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col gap-3 border-t border-white/10 px-4 py-6 text-[13px] text-white/60 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
        <p>&copy; {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.</p>
        <nav aria-label="Legal" className="flex gap-5">
          <Link to="/privacy" className="hover:text-white">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-white">
            SMS Terms
          </Link>
        </nav>
      </div>
    </footer>
  );
}
