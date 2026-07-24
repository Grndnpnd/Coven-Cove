import { memo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SectionKicker from '@/components/SectionKicker';

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

/** Hanging-banner fabric sway — isolated + memoized perpetual animation. */
const FlagSway = memo(function FlagSway() {
  const reduce = useReducedMotion();
  return (
    <motion.div
      animate={reduce ? undefined : { skewY: [-0.5, 0.5, -0.5] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      className="border border-brass/70 bg-panel-deep p-2"
      style={{ transformOrigin: 'top center' }}
    >
      <img
        src="/assets/img/sigils/flag_witch_hat_penguin_jolly_roger.png"
        alt="The corsair fleet flag: a tattered black Jolly Roger bearing a penguin skull in a witch's hat"
        className="block w-full"
      />
    </motion.div>
  );
});

/** §5 — Fleet & flag continuity (townsfolk.md; gm-guide §12). */
export default function FleetFlag() {
  return (
    <section className="bg-abyss py-20 md:py-28" aria-label="Fleet and flag continuity">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <SectionKicker>§12 · Continuity</SectionKicker>
        <h2
          className="mt-4 text-center font-display-sc text-bone"
          style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)', letterSpacing: '0.04em' }}
        >
          The fleet answers to the Three
        </h2>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <FlagSway />
            <p className="mt-3 text-center font-mono text-[0.72rem] uppercase tracking-[0.18em] text-mist">
              Stitched by Raspka — she still has the pattern
            </p>
          </motion.div>

          <div>
            {[
              'The pengkin corsair fleet — seven ketches and a brig, out of Coven Cove — answers ultimately to the Three; Lord Goldbreast holds the coven’s writ and a hag-token cutlass that reports his berth.',
              'The fleet flag is a tattered black Jolly Roger bearing a penguin skull in a witch’s hat. The triple-moon is the coven’s own mark: stamped on moonmarks, glowing above the Tide-Court gate, tattooed (willingly) on Tideguard wrists.',
              'In other ports, the cove’s raiders are whispered to “answer to the Three.” In the cove, this is not a whisper — it is a tax schedule.',
            ].map((para, i) => (
              <motion.p
                key={para.slice(0, 24)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: EASE }}
                className="mt-4 font-body text-[1.05rem] leading-[1.8] text-bone-dim first:mt-0"
              >
                {para}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
