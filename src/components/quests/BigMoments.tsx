import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SplitPanel from '@/components/SplitPanel';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/* The six big moments (gm-guide §9 "Big Moments", verbatim read-aloud) */
/* ------------------------------------------------------------------ */

type Visual =
  | { kind: 'image'; src: string; alt: string }
  | { kind: 'split' }
  | { kind: 'deep' }
  | { kind: 'gold' };

interface Moment {
  n: string;
  title: string;
  text: string;
  visual: Visual;
}

const MOMENTS: Moment[] = [
  {
    n: '01',
    title: 'The First Crossing',
    text: 'Splitmarket at noon. Heat like a hammer on the left, cold like a held breath on the right, and between them a line no wider than a knife-cut where a drunk sailor stands with one foot in each season, weeping with laughter, while the whole market applauds. Somewhere a wind-harp sings. Somewhere the coral keeps growing.',
    visual: { kind: 'split' },
  },
  {
    n: '02',
    title: 'The Cauldron on the Line',
    text: 'The Tide-Court interview: green light, bone jewelry, the cauldron’s surface showing the party’s own ship from below. Three voices that never interrupt each other, asking, in turn, what you’ve lost, what you can make, and what you’ve dreamed — and the small sound of bells.',
    visual: {
      kind: 'image',
      src: '/assets/img/scenes/scene_tide_court_interview.png',
      alt: 'Three hags around a scrying cauldron astride the seam in the Tide-Court interview hall',
    },
  },
  {
    n: '03',
    title: 'Drydock Seven Sings',
    text: 'Midnight in the Cradles. Six half-born ships hang silent in their cradles, and the seventh is humming along with Raspka, harmonizing in a voice like a keel being born, every chain in the yard swaying though the air is still, and the thing in the dark says, in Korvun’s voice: “Is it my turn yet?”',
    visual: {
      kind: 'image',
      src: '/assets/img/scenes/scene_mimic_ship_reveal.png',
      alt: 'A derelict galleon revealing a spine, maw and oar-limbs — the feral mimic-hulk mid-transformation',
    },
  },
  {
    n: '04',
    title: 'The Wall of Teeth',
    text: 'The Grinder Heart hits the seam and stops: a vertical wall of grinding white sand, thirty feet high, shredding itself against nothing, while on the east side snow falls in perfect peace — and shapes pace inside the storm-wall, parallel to the party, keeping up.',
    visual: {
      kind: 'image',
      src: '/assets/img/maps/battlemap_coral_dune_ambush.png',
      alt: 'Top-down battlemap of the coral dunes ambush site, bleached dunes against frozen ground',
    },
  },
  {
    n: '05',
    title: 'The Mountain Goes By',
    text: 'Clear water over the Gullet. The knot groans. Overhead, upside down and fifty fathoms deep, lit from inside by no fire the sea admits to, a corner of a storm-wracked mountain theater drifts past like a cloud — seats, stage, curtain, and in the seats, small shapes that turn to watch the party pass.',
    visual: { kind: 'deep' },
  },
  {
    n: '06',
    title: 'The Rekindling',
    text: 'Slack tide, the cauldron on the line, three granddaughters holding a new hourglass made of salt-towers, bathwater, and a freely-spoken storm. The light that answers is not green — it’s gold, one breath of the realm their mothers stole. Across the bay every dormant hulk in the Cradles draws its first true breath at once; the whole town feels it in their fillings; and the Three weep, which is somehow the most frightening thing yet.',
    visual: { kind: 'gold' },
  },
];

/* ------------------------------------------------------------------ */

/** Image visual with ±10% scrub parallax. */
function ImageVisual({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  return (
    <div ref={ref} className="relative h-[38vh] overflow-hidden md:h-full">
      <motion.img
        src={src}
        alt={alt}
        style={{ y }}
        className="absolute inset-0 h-[124%] w-full object-cover"
      />
      <div className="absolute inset-0 bg-ink/25" aria-hidden />
    </div>
  );
}

/** Moment 1 — the seam itself, live: warm west / cold east, knife-cut between. */
function SplitVisual() {
  return (
    <div className="relative flex h-[38vh] items-center md:h-full">
      <SplitPanel
        className="h-full w-full border-0"
        west={
          <p className="font-display text-lg italic leading-relaxed text-heat">
            Heat like a hammer. Bleached coral sand, a wind-harp singing somewhere up the row.
          </p>
        }
        east={
          <p className="font-display text-lg italic leading-relaxed text-frost">
            Cold like a held breath. Snow falling in perfect peace, one step away.
          </p>
        }
      />
    </div>
  );
}

/** Moment 5 — deep water over the Gullet: ice-deep on ink, ring-ripple CSS. */
function DeepVisual() {
  return (
    <div className="relative h-[38vh] overflow-hidden bg-ink md:h-full">
      <div className="absolute inset-0 opacity-40" style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(74,143,176,0.25), transparent 65%)' }} aria-hidden />
      {[0, 1, 2].map((i) => (
        <span key={i} className="ring-ripple" style={{ animationDelay: `${i * 2.3}s` }} aria-hidden />
      ))}
      <p className="absolute bottom-6 left-1/2 w-full -translate-x-1/2 text-center font-mono text-[0.68rem] uppercase tracking-[0.28em] text-ice-deep">
        Fifty fathoms down · lit from inside
      </p>
    </div>
  );
}

/** Moment 6 — the site's single gold moment: one-time radial bloom on entry. */
function GoldVisual() {
  return (
    <div className="relative h-[38vh] overflow-hidden bg-ink md:h-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 0.25, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="absolute inset-0"
        style={{ background: 'radial-gradient(circle at 50% 50%, #D4AF6A, transparent 62%)' }}
        aria-hidden
      />
      <p className="absolute bottom-6 left-1/2 w-full -translate-x-1/2 text-center font-mono text-[0.68rem] uppercase tracking-[0.28em] text-gold">
        The light that answers is not green
      </p>
    </div>
  );
}

function Visual({ visual }: { visual: Visual }) {
  switch (visual.kind) {
    case 'image':
      return <ImageVisual src={visual.src} alt={visual.alt} />;
    case 'split':
      return <SplitVisual />;
    case 'deep':
      return <DeepVisual />;
    case 'gold':
      return <GoldVisual />;
  }
}

/** One cinematic moment panel: visual side + read-aloud scrim card side. */
function MomentPanel({ moment, flip }: { moment: Moment; flip: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  // ghost numeral drifts at half parallax speed
  const numeralY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);
  const gold = moment.visual.kind === 'gold';

  return (
    <div ref={ref} className="relative grid min-h-[70vh] overflow-hidden border-t border-line/60 md:grid-cols-2">
      <div className={cn('relative', flip && 'md:order-2')}>
        <Visual visual={moment.visual} />
      </div>

      <div className="relative flex items-center px-6 py-14 md:px-14">
        {/* huge ghosted moment number */}
        <motion.span
          style={{ y: numeralY }}
          className="pointer-events-none absolute -top-4 right-4 select-none font-display text-[9rem] leading-none text-bone/5 md:text-[13rem]"
          aria-hidden
        >
          {moment.n}
        </motion.span>

        <motion.div
          initial={{ opacity: 0, x: flip ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            'relative max-w-[52ch] border bg-ink/70 p-6 backdrop-blur-sm md:p-8',
            gold ? 'border-gold/40' : 'border-line',
          )}
        >
          <p className={cn('font-mono text-[0.72rem] uppercase tracking-[0.28em]', gold ? 'text-gold' : 'text-brass')}>
            Big Moment {moment.n}
          </p>
          <h3 className={cn('mt-3 font-display-sc text-2xl tracking-[0.04em] md:text-3xl', gold ? 'text-gold' : 'text-bone')}>
            {moment.title}
          </h3>
          <p className={cn('mt-4 font-display text-xl italic leading-relaxed', gold ? 'text-gold/90' : 'text-bone')}>
            {moment.text}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

/** QUESTS §4 — six alternating full-bleed read-aloud set pieces (framer-motion). */
export default function BigMoments() {
  return (
    <div>
      {MOMENTS.map((m, i) => (
        <MomentPanel key={m.n} moment={m} flip={i % 2 === 1} />
      ))}
    </div>
  );
}
