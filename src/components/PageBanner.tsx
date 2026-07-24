import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SectionKicker from './SectionKicker';

/**
 * Interior-page banner: 40–52vh scene art with an ink scrim, kicker, kinetic
 * H1 (character split), italic flavor line, and the 2px seam descending.
 * The hero opts out of Layout's nav offset so art runs under the navbar.
 */
export default function PageBanner({
  image,
  kicker,
  title,
  flavor,
}: {
  image: string;
  kicker: string;
  title: string;
  flavor: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);

  const chars = title.split('');

  return (
    <div ref={ref} className="relative -mt-16 flex h-[52vh] min-h-[380px] items-end overflow-hidden">
      <motion.img
        src={image}
        alt=""
        style={{ y: bgY }}
        className="absolute inset-0 h-[120%] w-full object-cover"
      />
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
          {chars.map((c, i) => (
            <motion.span
              key={i}
              aria-hidden
              className="inline-block"
              initial={{ opacity: 0, y: 24, rotate: 2 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ delay: 0.2 + i * 0.035, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {c === ' ' ? ' ' : c}
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
          className="mt-4 max-w-[54ch] border-l-2 border-brass pl-4 font-display text-lg italic leading-relaxed text-mist"
        >
          {flavor}
        </motion.p>
      </div>
    </div>
  );
}
