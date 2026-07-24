import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SectionKicker from '@/components/SectionKicker';

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const TRIPTYCH = [
  '/assets/img/portraits/portrait_brullo_icekeel.png',
  '/assets/img/portraits/portrait_pem_blackbeak.png',
  '/assets/img/portraits/portrait_trinket_the_marionette.png',
];

/** Word-level kinetic split for the H1. */
function SplitTitle({ title }: { title: string }) {
  const words = title.split(' ');
  return (
    <>
      {words.map((word, wi) => (
        <span key={wi} aria-hidden className="inline-block whitespace-nowrap">
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, y: 26, rotate: 2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ delay: 0.25 + wi * 0.12, duration: 0.8, ease: EASE }}
          >
            {word}
          </motion.span>
          {wi < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </>
  );
}

/**
 * Townsfolk banner — PageBanner contract with a slow-crossfading portrait
 * triptych (6s cadence, transform+opacity only) per townsfolk.md §1.
 */
export default function TownsfolkBanner() {
  const reduce = useReducedMotion();
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setFrame((f) => (f + 1) % TRIPTYCH.length), 6000);
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <div className="relative -mt-16 flex h-[52vh] min-h-[380px] items-end overflow-hidden">
      {TRIPTYCH.map((src, i) => (
        <motion.img
          key={src}
          src={src}
          alt=""
          initial={false}
          animate={{ opacity: i === frame ? 1 : 0 }}
          transition={{ duration: 1.6, ease: 'easeInOut' }}
          className="absolute inset-0 h-full w-full object-cover object-top brightness-[0.5]"
          aria-hidden={i !== frame}
        />
      ))}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, rgba(18,10,31,0.7), rgba(18,10,31,0.88))' }}
        aria-hidden
      />
      <div className="relative mx-auto w-full max-w-[1200px] px-6 pb-12 lg:px-12">
        <SectionKicker align="left">§7 · Townsfolk of Note</SectionKicker>
        <h1
          className="mt-4 font-display-sc text-bone"
          style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)', letterSpacing: '0.04em', lineHeight: 1 }}
          aria-label="The made people"
        >
          <SplitTitle title="THE MADE PEOPLE" />
        </h1>
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
          The Three people their cove the way their mothers peopled realms: by making. “Made” is
          not an insult in Coven Cove — it’s a birthday.
        </motion.p>
      </div>
    </div>
  );
}
