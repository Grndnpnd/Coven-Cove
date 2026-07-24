import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import SealReveal from '@/components/SealReveal';
import { cn } from '@/lib/utils';

interface Rung {
  title: string;
  text: string;
  sealed?: boolean;
}

const RUNGS: Rung[] = [
  {
    title: 'The cove interviews everyone.',
    text: 'The party sees the machinery: the tide-scribe buying tales, the chandler logging debts, sailors traded moonmarks for sightings. The town is a listening post wearing an economy.',
  },
  {
    title: 'Fragments exist.',
    text: 'A fished-up door knocks from the inside in the salvage-pawn shop (§6). Silas Greywater, dying at the midwife’s, saw a ship crewed by “the same six people in three ports at once” (§8).',
  },
  {
    title: 'The fragments are going somewhere.',
    text: 'Plotted on the tide-scribe’s charts (purchase or quest reward), sightings form a slow spiral centered on the Gullet.',
  },
  {
    title: 'The Gullet holds a splinter of Yon.',
    text: 'Parley with Churn-Mother Sovva (§8) reveals a sunken corner of Endelyn’s mountain below — and that her binding, grandmother’s knot, is straining as fragments arrive.',
  },
  {
    title: 'The wreckers took the anchor west.',
    text: 'Sovva felt it pass: “Six shadows in a black ship, dragging the held breath of a realm behind them like a drowned sail. The sea freezes where they sleep.” The party’s next heading — and the Three will pay anything for it.',
  },
  {
    title: 'Optional late reveal.',
    text: 'Veshka’s vision and Silas’s account conflict in one detail — six silhouettes, or five-and-a-ghost. Seed for your next arc; the wreckers stay off-screen by design. If your party is the wreckers’ campaign, the Three will recognize them instantly and the interview becomes a knife edge.',
    sealed: true,
  },
];

/**
 * The investigation clue ladder (the-three.md §8): six rungs alternating
 * sides of a central brass rail that draws downward with scroll.
 */
export default function ClueLadder() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.75', 'end 0.55'],
  });
  const railScale = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  return (
    <div ref={ref} className="relative mx-auto mt-14 max-w-[900px]">
      {/* central rail — draws downward with scroll */}
      <motion.div
        style={{ scaleY: railScale }}
        className="absolute left-4 top-0 h-full w-[2px] origin-top bg-brass md:left-1/2 md:-translate-x-1/2"
        aria-hidden
      />

      <ol className="space-y-12">
        {RUNGS.map((rung, i) => {
          const left = i % 2 === 0;
          return (
            <li key={i} className="relative md:grid md:grid-cols-2 md:gap-16">
              {/* node on the rail */}
              <motion.span
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.4, ease: 'backOut' }}
                className="absolute left-4 top-1 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border border-brass bg-ink font-mono text-[0.72rem] text-brass md:left-1/2"
                aria-hidden
              >
                {i + 1}
              </motion.span>
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 16 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className={cn(
                  'ml-12 md:ml-0',
                  left ? 'md:col-start-1 md:pr-4 md:text-right' : 'md:col-start-2 md:pl-4',
                )}
              >
                {rung.sealed ? (
                  <SealReveal id="clue-ladder-rung-6" label="Rung 6 — Sealed, DM eyes only. Break the seal.">
                    <p className="font-display text-lg text-gold">{rung.title}</p>
                    <p className="mt-2 font-body text-[0.95rem] leading-relaxed">{rung.text}</p>
                  </SealReveal>
                ) : (
                  <>
                    <h4 className="font-display text-xl text-gold">{rung.title}</h4>
                    <p className="mt-2 font-body text-[0.95rem] leading-relaxed text-bone-dim">
                      {rung.text}
                    </p>
                  </>
                )}
              </motion.div>
            </li>
          );
        })}
      </ol>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.8 }}
        className="mt-12 border-l-2 border-brass pl-4 font-body text-sm italic leading-relaxed text-mist"
      >
        Drip-feed one clue per tavern night, shop visit, or interview; the{' '}
        <Link to="/encounters#tables" className="link-hag text-gold">
          d6 sightings table
        </Link>{' '}
        is your raw stock.
      </motion.p>
    </div>
  );
}
