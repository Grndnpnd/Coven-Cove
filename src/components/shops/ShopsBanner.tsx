import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import SectionKicker from '@/components/SectionKicker';
import { TripleMoon } from '@/components/SeamDivider';

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

/** Word-level kinetic split; a trailing comma renders as a brass ornament. */
function SplitTitle({ title }: { title: string }) {
  const words = title.split(' ');
  return (
    <>
      {words.map((word, wi) => {
        const hasComma = word.endsWith(',');
        const core = hasComma ? word.slice(0, -1) : word;
        return (
          <span key={wi} aria-hidden className="inline-block whitespace-nowrap">
            <motion.span
              className="inline-block"
              initial={{ opacity: 0, y: 26, rotate: 2 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ delay: 0.25 + wi * 0.12, duration: 0.8, ease: EASE }}
            >
              {core}
            </motion.span>
            {hasComma && (
              <motion.span
                className="inline-block text-brass"
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.25 + wi * 0.12 + 0.35, duration: 0.4, ease: EASE }}
              >
                ,
              </motion.span>
            )}
            {wi < words.length - 1 && <span>&nbsp;</span>}
          </span>
        );
      })}
    </>
  );
}

/** Faint coin that flips once behind the H1 (shops.md §1). */
function CoinFlip() {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.35, 0.12], rotateX: [0, 360] }}
      transition={{ delay: 1.1, duration: 1, ease: 'easeInOut' }}
      className="pointer-events-none absolute -top-6 right-4 hidden text-gold md:block"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-gold/60">
        <TripleMoon className="h-9 w-9" />
      </div>
    </motion.div>
  );
}

/**
 * Shops banner — same contract as the shared PageBanner (full-bleed art, ink
 * scrim, seam descending) with the page-specific word-level split and the
 * coin-flip flourish from shops.md §1.
 */
export default function ShopsBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);

  return (
    <div ref={ref} className="relative -mt-16 flex h-[52vh] min-h-[380px] items-end overflow-hidden">
      <motion.img
        src="/assets/img/scenes/scene_twain_tankard.png"
        alt=""
        style={{ y: bgY }}
        className="absolute inset-0 h-[120%] w-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, rgba(18,10,31,0.6), rgba(18,10,31,0.85))' }}
        aria-hidden
      />
      <div className="relative mx-auto w-full max-w-[1200px] px-6 pb-12 lg:px-12">
        <SectionKicker align="left">§5–6 · The Economy, Shops &amp; Services</SectionKicker>
        <div className="relative">
          <CoinFlip />
          <h1
            className="mt-4 font-display-sc text-bone"
            style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)', letterSpacing: '0.04em', lineHeight: 1 }}
            aria-label="Two prices, always"
          >
            <SplitTitle title="TWO PRICES, ALWAYS" />
          </h1>
        </div>
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 0.9, duration: 1, ease: 'easeInOut' }}
          className="mt-4 h-10 w-[2px] origin-top bg-bone/80 shadow-[0_0_12px_rgba(159,214,63,0.4)]"
          aria-hidden
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mt-4 max-w-[54ch] border-l-2 border-brass pl-4 font-display text-lg italic leading-relaxed text-mist"
        >
          Every good and service has a gold price and a barter price. A wise party learns all four
          currencies by the second day.
        </motion.p>
      </div>
    </div>
  );
}
