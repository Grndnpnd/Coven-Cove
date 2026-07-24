import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import Navbar from './Navbar';
import Footer from './Footer';

/**
 * App shell (nested-route pattern: renders <Outlet/>).
 * Owns the 64px top offset matching the fixed Navbar — pages must NOT add
 * their own nav-height padding (full-bleed heroes opt out inside the page).
 * Also owns site-wide Lenis smooth scrolling.
 */
export default function Layout() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1.0, anchors: true });
    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'instant' as ScrollBehavior });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <div className="min-h-[100dvh] bg-ink text-bone">
      <Navbar />
      <main className="pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
