import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import SectionKicker from '@/components/SectionKicker';

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

/**
 * The Town banner (the-town.md §1): the top-down map blurred to "cartography
 * in fog", sharpening 8px→3px on load, then stopping. Kinetic H1 splits at
 * word level: ONE COVE, TWO SEASONS.
 */
export default function TownBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);

  const words = ['ONE', 'COVE,', 'TWO', 'SEASONS'];

  return (
    <div ref={ref} className="relative -mt-16 flex h-[48vh] min-h-[440px] items-end overflow-hidden">
      <motion.div style={{ y: reduced ? 0 : bgY }} className="absolute inset-0">
        <motion.img
          src="/assets/img/maps/map_coven_cove_topdown.png"
          alt=""
          initial={reduced ? false : { filter: 'blur(8px)' }}
          animate={{ filter: 'blur(3px)' }}
          transition={{ duration: 2, ease: 'easeOut' }}
          className="h-[120%] w-full object-cover"
        />
      </motion.div>
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, rgba(18,10,31,0.55), rgba(18,10,31,0.85))' }}
        aria-hidden
      />
      <div className="relative mx-auto w-full max-w-[1200px] px-6 pb-12 lg:px-12">
        <SectionKicker align="left">§4 · Geography & Districts</SectionKicker>
        <h1
          className="mt-4 font-display-sc text-bone"
          style={{ fontSize: 'clamp(2.2rem, 6vw, 4.2rem)', letterSpacing: '0.04em', lineHeight: 1.05 }}
          aria-label="One Cove, Two Seasons"
        >
          {words.map((w, i) => (
            <motion.span
              key={i}
              aria-hidden
              className="mr-[0.28em] inline-block"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.14, duration: 0.8, ease: EASE }}
            >
              {w}
            </motion.span>
          ))}
        </h1>
        {/* the seam descends from the H1 */}
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
          className="mt-4 max-w-[58ch] border-l-2 border-brass pl-4 font-display text-lg italic leading-relaxed text-mist"
        >
          “Through the exact middle of everything runs the Seam: perfectly straight, no transition
          whatsoever. One step, bleached coral desert. Next step, glacial tundra.”
        </motion.p>
      </div>
    </div>
  );
}
