import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import SectionKicker from '@/components/SectionKicker';

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const SILENCE_CARDS = [
  {
    title: 'The loyalty-warp is slack',
    body: 'Existing folk keep their names, natures, and habits — but the warm certainty is now merely habit and faith, not magic. Most haven’t noticed.',
  },
  {
    title: 'New craft wakes wrong',
    body: 'Anything made since the silence wakes with residue of the snapped warp attached — Nixa’s third shadow. The Three have stopped making folk. Officially: resources. Actually: fear.',
  },
  {
    title: 'The hulks are the same knot, bigger',
    body: 'The shipbirth was hag-craft on a giant mimic instead of a pup. Drydock Seven is what a hulk looks like when the birth-line snaps mid-word.',
  },
  {
    title: 'If the circle returns / if the anchor breaks',
    body: 'Every birth-line tightens at once, like a fleet taking up anchor — relief? / The lines dissolve over one dawn — the folk wake free, mostly.',
  },
];

/** Brass birth-line: a vertical thread with a knot at sternum height, drawn on scroll. */
function BirthLine() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 40%'] });
  const pathLength = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0, 1]);

  return (
    <div ref={ref} className="absolute -left-10 top-1 hidden h-full w-6 lg:block">
      <svg
        viewBox="0 0 24 220"
        className="h-full w-6 text-brass"
        aria-hidden
      >
      <motion.path
        d="M12 0 V220"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        style={{ pathLength }}
      />
      {/* the knot, at sternum height */}
      <motion.circle
        cx="12"
        cy="88"
        r="4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        initial={{ opacity: 0, scale: 0.4 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        style={{ transformOrigin: '12px 88px' }}
      />
      <motion.circle
        cx="12"
        cy="88"
        r="1.6"
        fill="currentColor"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ delay: 0.7, duration: 0.3 }}
      />
      </svg>
    </div>
  );
}

/** §2 — Hag-craft primer (townsfolk.md; gm-guide §12). */
export default function HagCraftPrimer() {
  return (
    <section className="bg-ink py-20 md:py-28" aria-label="Hag-craft primer">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <SectionKicker>§12 · Hag-Craft</SectionKicker>
        <h2
          className="mt-4 text-center font-display-sc text-bone"
          style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)', letterSpacing: '0.04em' }}
        >
          How the folk are made
        </h2>

        <div className="relative mx-auto mt-10 max-w-[72ch]">
          <BirthLine />
          <p className="drop-cap font-body text-[1.1rem] leading-[1.8] text-bone-dim">
            Hag-craft takes raw stock — a seal-pup, a walrus, a penguin, an otter, a fox, a
            branching coral colony, once a vat of tallow — and works it for a season in the
            cauldron-light: stretched, taught, sung over, and finished with a{' '}
            <strong className="text-bone">birth-line</strong>, a thread of the circle’s magic
            knotted into the new person at the sternum, carrying name, nature, and place — a warm,
            unreasoning loyalty to the Three and the cove, as natural as blinking.
          </p>
          <p className="mt-5 font-body text-[1.1rem] leading-[1.8] text-bone-dim">
            The folk know this. Most are <em>content</em> with it: it is the only nature they have,
            and “made” is not an insult in Coven Cove — it’s a birthday. But the birth-line was the
            circle’s knot, and the circle is dead.
          </p>
        </div>

        <p className="mx-auto mt-14 max-w-[72ch] font-mono text-[0.72rem] uppercase tracking-[0.28em] text-brass">
          What the silence means
        </p>
        <div className="mx-auto mt-4 grid max-w-[1100px] gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {SILENCE_CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.09, ease: EASE }}
              className="border border-line bg-panel p-5"
            >
              <h3 className="font-display text-lg leading-snug text-gold">{card.title}</h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-bone-dim">{card.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
