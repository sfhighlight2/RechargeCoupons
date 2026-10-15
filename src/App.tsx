import { useEffect, useMemo, useRef, type ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useSearchParams } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import { OFFERS, resolveOffer, type Offer } from './config';
import { trackPageView } from './lib/tracking';
import SiteHeader from './components/SiteHeader';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Favorites from './components/Favorites';
import Features from './components/Features';
import FruitRibbon from './components/motion/FruitRibbon';
import BlendStory from './components/motion/BlendStory';
import Reviews from './components/Reviews';
import Visit from './components/Visit';
import FAQ from './components/FAQ';
import FinalCta from './components/FinalCta';
import Footer from './components/Footer';
import MobileStickyCta from './components/MobileStickyCta';
import ExitIntent from './components/ExitIntent';
import ThankYouPage from './components/ThankYouPage';
import LegalPage from './components/LegalPage';

function setMeta({ title, description, noindex }: { title: string; description?: string; noindex?: boolean }) {
  document.title = title;
  if (description) document.querySelector('meta[name="description"]')?.setAttribute('content', description);
  let robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
  if (noindex) {
    if (!robots) {
      robots = document.createElement('meta');
      robots.name = 'robots';
      document.head.appendChild(robots);
    }
    robots.content = 'noindex';
  } else {
    robots?.remove();
  }
}

/** Scroll to top and fire a Meta PageView on client-side route changes (the first one fires from index.html). */
function RouteEffects() {
  const { pathname, hash } = useLocation();
  const first = useRef(true);
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
    if (first.current) {
      first.current = false;
      return;
    }
    trackPageView();
  }, [pathname]);
  return null;
}

function LandingPage({ base }: { base: Offer }) {
  const [params] = useSearchParams();
  const offer = useMemo(() => resolveOffer(base, params), [base, params]);

  useEffect(() => {
    setMeta({ title: base.metaTitle, description: base.metaDescription, noindex: offer !== base });
  }, [base, offer]);

  return (
    <>
      <SiteHeader homePath={base.path} />
      <main>
        <Hero offer={offer} />
        <FruitRibbon />
        <HowItWorks offer={offer} />
        <BlendStory offer={offer} />
        <Favorites offer={offer} />
        <Features />
        <Reviews />
        <Visit />
        <FAQ />
        <FinalCta offer={offer} />
      </main>
      <Footer padForStickyBar />
      <MobileStickyCta offer={offer} />
      <ExitIntent offer={offer} />
    </>
  );
}

function SimplePage({ title, noindex, children }: { title: string; noindex?: boolean; children: ReactNode }) {
  useEffect(() => setMeta({ title, noindex }), [title, noindex]);
  return (
    <>
      <SiteHeader />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Router>
        <RouteEffects />
        <Routes>
          <Route path="/" element={<LandingPage base={OFFERS.half} />} />
          <Route path="/bogo" element={<LandingPage base={OFFERS.bogo} />} />
          <Route
            path="/thank-you"
            element={
              <SimplePage title="You're in | Recharge Smoothies Cafe" noindex>
                <ThankYouPage />
              </SimplePage>
            }
          />
          <Route
            path="/privacy"
            element={
              <SimplePage title="Privacy Policy | Recharge Smoothies Cafe">
                <LegalPage kind="privacy" />
              </SimplePage>
            }
          />
          <Route
            path="/terms"
            element={
              <SimplePage title="SMS Terms | Recharge Smoothies Cafe">
                <LegalPage kind="terms" />
              </SimplePage>
            }
          />
          <Route path="*" element={<LandingPage base={OFFERS.half} />} />
        </Routes>
      </Router>
    </MotionConfig>
  );
}
