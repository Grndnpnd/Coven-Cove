import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import SectionKicker from '@/components/SectionKicker';

/** The 4-scene crossfade strip (gallery.md §1), treated dark. */
const STRIP = [
  '/assets/img/scenes/scene_coven_cove_from_the_sea.png',
  '/assets/img/scenes/scene_tide_court_interview.png',
  '/assets/img/scenes/scene_silent_shipyard_dormant_hulks.png',
  '/assets/img/scenes/scene_twain_tankard.png',
];

/**
 * Gallery page banner: like the shared PageBanner (ink scrim, kinetic H1,
 * seam descending, parallax) but the background is a 4-image crossfade strip
 * (5s cycle) and the H1 splits at word level (gallery.md §1).
 */
export default function GalleryBanner({
  kicker,
  title,
  flavor,
}: {
  kicker: string;
  title: string;
  flavor: string;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => setFrame((f) => (f + 1) % STRIP.length), 5000);
    return () => window.clearInterval(id);
  }, [reduced]);

  const words = title.split(' ');
  let charCount = 0;

  return (
    <div ref={ref} className="relative -mt-16 flex h-[52vh] min-h-[380px] items-end overflow-hidden">
      <motion.div style={{ y: bgY }} className="absolute inset-0 h-[120%] w-full" aria-hidden>
        {STRIP.map((src, i) => (
          <motion.img
            key={src}
            src={src}
            alt=""
            initial={false}
            animate={{ opacity: i === frame ? 1 : 0 }}
            transition={{ duration: reduced ? 0 : 1.4, ease: 'easeInOut' }}
            className="absolute inset-0 h-full w-full object-cover brightness-[0.45]"
          />
        ))}
      </motion.div>
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, rgba(18,10,31,0.55), rgba(18,10,31,0.85))' }}
        aria-hidden
      />
      <div className="relative mx-auto w-full max-w-[1200px] px-6 pb-12 lg:px-12">
        <SectionKicker align="left">{kicker}</SectionKicker>
        <h1
          className="mt-4 font-display-sc text-bone"
          style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)', letterSpacing: '0.04em', lineHeight: 1 }}
          aria-label={title}
        >
          {words.map((word, wi) => {
            const start = charCount;
            charCount += word.length + 1;
            return (
              <motion.span
                key={wi}
                aria-hidden
                className="mr-[0.28em] inline-block last:mr-0"
                initial={{ opacity: 0, y: 24, rotate: 2 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{
                  delay: reduced ? 0 : 0.2 + start * 0.035,
                  duration: reduced ? 0 : 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {word}
              </motion.span>
            );
          })}
        </h1>
        {/* the seam descends from the H1 */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: reduced ? 0 : 0.9, duration: reduced ? 0 : 1, ease: 'easeInOut' }}
          className="mt-4 h-10 w-[2px] origin-top bg-bone/80 shadow-[0_0_12px_rgba(159,214,63,0.4)]"
          aria-hidden
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: reduced ? 0 : 0.7, duration: reduced ? 0 : 0.8 }}
          className="mt-4 max-w-[54ch] border-l-2 border-brass pl-4 font-display text-lg italic leading-relaxed text-mist"
        >
          {flavor}
        </motion.p>
      </div>
    </div>
  );
}
