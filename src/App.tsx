import TopBar from './components/TopBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import MenuSection from './components/MenuSection';
import Features from './components/Features';
import Location from './components/Location';
import Footer from './components/Footer';
import Testimonials from './components/Testimonials';
import FruitScroll from './components/FruitScroll';
import ThankYouPage from './components/ThankYouPage';
import MobileStickyBar from './components/MobileStickyBar';
import FAQ from './components/FAQ';
import BackToTop from './components/BackToTop';
import { motion, useScroll, useSpring } from 'motion/react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function HomePage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <MenuSection />
      <Features />
      <Testimonials />
      <Location />
      <FAQ />
      <MobileStickyBar />
    </>
  );
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <Router>
      <ScrollToTop />
      <div className="bg-[#F9F7F2] min-h-screen font-sans text-[#1A1A1A] selection:bg-[#BE0101] selection:text-white relative">
        {/* Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-[#BE0101] origin-left z-[100]"
          style={{ scaleX }}
        />

        <FruitScroll />
        <div className="fixed top-0 left-0 right-0 z-50 flex flex-col">
          <TopBar />
          <Navbar />
        </div>
        
        <main className="relative z-10">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/thank-you" element={<ThankYouPage />} />
          </Routes>
        </main>

        <Footer />
        <BackToTop />
      </div>
    </Router>
  );
}
