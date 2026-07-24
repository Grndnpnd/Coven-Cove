import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SHOPS } from './data';
import { cn } from '@/lib/utils';

/**
 * §5 — Sticky shop index rail: scroll-snap strip of mono chips, one per shop,
 * with scroll-spy active state (layoutId underline). Sticky under the 64px nav.
 */
export default function ShopRail() {
  const [active, setActive] = useState<string>(SHOPS[0].slug);

  useEffect(() => {
    const sections = SHOPS.map((s) => document.getElementById(s.slug)).filter(
      (el): el is HTMLElement => el !== null,
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: '-30% 0px -60% 0px' },
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Shop index"
      className="sticky top-16 z-40 border-y border-line bg-ink/85 backdrop-blur-md"
    >
      <div className="no-scrollbar flex snap-x snap-mandatory gap-1 overflow-x-auto px-4 py-2 md:justify-center">
        {SHOPS.map((s, i) => (
          <motion.a
            key={s.slug}
            href={`#${s.slug}`}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 * i, duration: 0.4 }}
            className={cn(
              'relative shrink-0 snap-start px-3 py-1.5 font-mono text-[0.72rem] uppercase tracking-[0.12em] transition-colors',
              active === s.slug ? 'text-gold' : 'text-mist hover:text-bone',
            )}
          >
            {String(s.n).padStart(2, '0')} {s.shortName}
            {active === s.slug && (
              <motion.span
                layoutId="shop-rail-underline"
                className="absolute inset-x-2 bottom-0 h-[2px] bg-hag"
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              />
            )}
          </motion.a>
        ))}
      </div>
    </nav>
  );
}
