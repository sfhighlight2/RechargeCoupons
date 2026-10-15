import { Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BUSINESS } from '../config';

export default function SiteHeader({ homePath = '/' }: { homePath?: string }) {
  return (
    <header className="relative z-20">
      <div className="mx-auto flex h-[80px] max-w-6xl items-center justify-between px-4 sm:h-[88px] sm:px-6 lg:px-8">
        <Link to={homePath} aria-label="Recharge Smoothies Cafe home" className="shrink-0">
          <img src="/img/logo.webp" alt="Recharge Smoothies Cafe" width={480} height={270} className="h-[68px] w-auto sm:h-[72px]" />
        </Link>
        <a
          href={BUSINESS.phoneHref}
          className="inline-flex h-11 items-center gap-2 rounded-full px-3 text-sm font-semibold text-ink-900 transition-colors hover:bg-ink-900/5 sm:px-4"
        >
          <Phone aria-hidden className="size-4 text-red-600" />
          <span className="hidden sm:inline">{BUSINESS.phoneDisplay}</span>
          <span className="sm:hidden">Call</span>
        </a>
      </div>
    </header>
  );
}
