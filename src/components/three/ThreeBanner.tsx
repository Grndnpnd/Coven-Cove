import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SectionKicker from '@/components/SectionKicker';

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

/**
 * The Three banner (the-three.md §1): 40vh Tide-Court interview art,
 * scrim 0.55→0.9, kinetic char-split H1, and the 2px seam descending 120px
 * from the H1 with a hag-green glow at its tip. Page-local variant of the
 * shared PageBanner (tighter height, deeper scrim, longer seam).
 */
export default function ThreeBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);

  const title = 'THE THREE';

  return (
    <div ref={ref} className="relative -mt-16 flex h-[40vh] min-h-[480px] items-end overflow-hidden">
      <motion.img
        src="/assets/img/scenes/scene_tide_court_interview.png"
        alt=""
        style={{ y: bgY }}
        className="absolute inset-0 h-[120%] w-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, rgba(18,10,31,0.55), rgba(18,10,31,0.9))' }}
        aria-hidden
      />
      <div className="relative mx-auto w-full max-w-[1200px] px-6 pb-10 lg:px-12">
        <SectionKicker align="left">§2 · The Coven</SectionKicker>
        <h1
          className="mt-4 font-display-sc text-bone"
          style={{ fontSize: 'clamp(2.6rem, 7vw, 5rem)', letterSpacing: '0.04em', lineHeight: 1 }}
          aria-label={title}
        >
          {title.split('').map((c, i) => (
            <motion.span
              key={i}
              aria-hidden
              className="inline-block"
              initial={{ opacity: 0, y: 24, rotate: 2 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ delay: 0.2 + i * 0.04, duration: 0.7, ease: EASE }}
            >
              {c === ' ' ? ' ' : c}
            </motion.span>
          ))}
        </h1>
        {/* the seam descends 120px from the H1, hag-green glow at its tip */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 0.9, duration: 1.2, ease: 'easeInOut' }}
          className="relative mt-3 h-[80px] w-[2px] origin-top bg-bone/80 md:h-[120px]"
          aria-hidden
        >
          <span className="absolute -left-[3px] bottom-0 h-2 w-2 rounded-full bg-hag shadow-[0_0_16px_rgba(159,214,63,0.8)]" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mt-5 max-w-[54ch] border-l-2 border-brass pl-4 font-display text-lg italic leading-relaxed text-mist"
        >
          “Granddaughters of Baba Yaga. Daughters of the Hourglass Coven. Power brokers, not a
          boss fight.”
        </motion.p>
      </div>
    </div>
  );
}
