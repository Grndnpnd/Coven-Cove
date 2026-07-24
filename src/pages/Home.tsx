import { memo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Ship, Dices, Scale, Map, Download } from 'lucide-react';
import SectionKicker from '@/components/SectionKicker';
import SeamDivider from '@/components/SeamDivider';
import HagCard from '@/components/HagCard';
import SplitPanel from '@/components/SplitPanel';
import SeamWalk from '@/components/home/SeamWalk';
import { cn } from '@/lib/utils';

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ------------------------------------------------------------------ */
/* §1 — Hero: The Cove From the Sea                                    */
/* ------------------------------------------------------------------ */

/** Perpetual bobbing scroll cue — isolated + memoized. */
const ScrollCue = memo(function ScrollCue() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 60], [1, 0]);
  return (
    <motion.div
      style={{ opacity }}
      className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-brass"
    >
      <motion.div
        animate={{ y: [0, 7, 0], rotate: [-3, 3, -3] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Ship className="h-5 w-5" />
      </motion.div>
    </motion.div>
  );
});

function HeroWord({ word, delay, align }: { word: string; delay: number; align: 'right' | 'left' }) {
  return (
    <span
      aria-hidden
      className={cn(
        'flex whitespace-nowrap',
        align === 'right' ? 'justify-end' : 'justify-start',
      )}
    >
      {word.split('').map((c, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 24, rotate: 2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ delay: delay + i * 0.035, duration: 0.9, ease: EASE }}
        >
          {c}
        </motion.span>
      ))}
    </span>
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '60%']);

  return (
    <section
      ref={ref}
      className="relative -mt-16 flex min-h-[100dvh] items-end overflow-hidden"
      aria-label="Coven Cove, seen from the sea"
    >
      {/* background: ken-burns inside a parallax wrapper */}
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <img
          src="/assets/img/scenes/scene_coven_cove_from_the_sea.png"
          alt=""
          className="ken-burns h-full w-full object-cover"
        />
      </motion.div>
      {/* scrim only at the very bottom, never a full wash */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, rgba(18,10,31,0) 55%, rgba(18,10,31,0.75))' }}
        aria-hidden
      />
      {/* the seam — the page's spine */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.4, ease: 'easeInOut' }}
        className="absolute left-1/2 top-0 h-full w-[2px] origin-top -translate-x-1/2 bg-bone/85 shadow-[0_0_16px_rgba(159,214,63,0.4)]"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-[1400px] px-6 pb-24 lg:px-12">
        <div className="max-w-[720px]">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex items-center gap-4 font-mono text-[0.72rem] uppercase tracking-[0.28em] text-brass"
          >
            <span className="inline-block h-px w-6 bg-brass" aria-hidden />
            A Feywild Pirate-Cove Town · GM Guide · Party of Four, Levels 9–10
            <span className="inline-block h-px w-6 bg-brass" aria-hidden />
          </motion.p>

          <h1
            aria-label="Coven Cove"
            className="mt-6 font-display text-bone"
            style={{ fontSize: 'clamp(3rem, 9vw, 7.5rem)', lineHeight: 0.95, letterSpacing: '0.01em' }}
          >
            <span className="hidden grid-cols-2 gap-[3vw] md:grid">
              <HeroWord word="COVEN" delay={0.3} align="right" />
              <HeroWord word="COVE" delay={0.48} align="left" />
            </span>
            <span className="block text-center md:hidden">
              <HeroWord word="COVEN" delay={0.3} align="left" />
              <HeroWord word="COVE" delay={0.48} align="left" />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.8, ease: EASE }}
            className="mt-6 max-w-[54ch] border-l-2 border-brass pl-4 font-display text-lg italic leading-relaxed text-bone-dim md:text-xl"
          >
            A living harbor town split down the middle by a razor-straight seam of impossible
            geography, ruled by three granddaughters of Baba Yaga whose magic has gone silent —
            where the ships are born rather than built, and no ship has been born in over a year.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.7, ease: EASE }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <a
              href="#the-seam"
              className="border border-brass px-6 py-3 font-mono text-[0.72rem] uppercase tracking-[0.24em] text-brass transition-colors hover:bg-brass hover:text-ink"
            >
              Enter the Cove
            </a>
            <Link
              to="/the-three"
              className="link-hag px-2 py-3 font-mono text-[0.72rem] uppercase tracking-[0.24em] text-hag"
            >
              Meet the Three
            </Link>
          </motion.div>
        </div>
      </div>

      <ScrollCue />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* §3 — The Silence (the problem)                                      */
/* ------------------------------------------------------------------ */

const COVEN_STATE = [
  { label: 'Shared Spellcasting', works: false },
  { label: 'The Hag Eye', works: false },
  { label: 'The shipbirth ritual', works: false },
  { label: 'Bargains & contract law', works: true },
  { label: 'The hag-crafted folk', works: true },
  { label: 'The seam’s neutrality', works: true },
];

const MOON_NODES = [
  { name: 'Morgha', angle: -90 },
  { name: 'Raspka', angle: 30 },
  { name: 'Veshka', angle: 150 },
];

function DeadCovenDiagram() {
  const [hovered, setHovered] = useState<string | null>(null);
  const R = 82;
  const pts = MOON_NODES.map((n) => ({
    ...n,
    x: 110 + R * Math.cos((n.angle * Math.PI) / 180),
    y: 110 + R * Math.sin((n.angle * Math.PI) / 180),
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
      className="corner-ticks border border-line bg-panel p-6"
    >
      <svg viewBox="0 0 220 220" className="mx-auto w-full max-w-[340px]">
        {pts.map((a, i) => {
          const b = pts[(i + 1) % pts.length];
          const mx = (a.x + b.x) / 2;
          const my = (a.y + b.y) / 2;
          // broken mid-path: two dashed segments with a gap between
          const g = 0.12;
          return (
            <g key={a.name} className="coven-line">
              <line
                x1={a.x} y1={a.y}
                x2={a.x + (b.x - a.x) * (0.5 - g)} y2={a.y + (b.y - a.y) * (0.5 - g)}
                stroke="#B98A3E" strokeWidth="1.2" strokeDasharray="5 5" opacity="0.7"
              />
              <line
                x1={mx + (b.x - a.x) * g} y1={my + (b.y - a.y) * g}
                x2={b.x} y2={b.y}
                stroke="#B98A3E" strokeWidth="1.2" strokeDasharray="5 5" opacity="0.7"
              />
            </g>
          );
        })}
        {pts.map((p) => (
          <g
            key={p.name}
            onMouseEnter={() => setHovered(p.name)}
            onMouseLeave={() => setHovered(null)}
            className="cursor-pointer"
          >
            <circle cx={p.x} cy={p.y} r="16" fill="#1B1132" stroke="#9FD63F" strokeWidth="1.4" />
            <circle
              cx={p.x} cy={p.y} r="20" fill="none" stroke="#9FD63F" strokeWidth="1"
              opacity={hovered === p.name ? 0.9 : 0}
              style={{ transition: 'opacity 0.3s' }}
            />
            <path
              d={`M ${p.x} ${p.y - 9} a 9 9 0 1 0 0.01 0 Z M ${p.x} ${p.y - 6} a 6 6 0 1 1 -0.01 0 Z`}
              fill="#9FD63F" fillRule="evenodd" opacity="0.9"
            />
            <text
              x={p.x} y={p.y + 34} textAnchor="middle"
              fill={hovered === p.name ? '#9FD63F' : '#9A8FB5'}
              fontSize="10" fontFamily="IBM Plex Mono, monospace" letterSpacing="2"
              style={{ textTransform: 'uppercase', transition: 'fill 0.3s' }}
            >
              {p.name.toUpperCase()}
            </text>
          </g>
        ))}
      </svg>
      <p className="mt-4 text-center font-mono text-[0.72rem] uppercase tracking-[0.2em] text-mist">
        The circle, one year silent
      </p>
    </motion.div>
  );
}

function TheSilence() {
  return (
    <section className="bg-abyss py-24 md:py-32">
      <div className="mx-auto grid max-w-[1200px] gap-12 px-6 md:grid-cols-12 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="md:col-span-7"
        >
          <SectionKicker align="left">§1 · The Canon Spine</SectionKicker>
          <h2 className="mt-4 font-display-sc text-bone" style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)', letterSpacing: '0.04em' }}>
            One year ago, the magic stopped.
          </h2>
          <p className="drop-cap mt-6 max-w-[68ch] font-body text-[1.05rem] leading-[1.75] text-bone-dim">
            Mid-ritual, in front of the whole shipyard, the circle went dark. The half-born hull
            from that night still hangs in Drydock Seven, and it is getting restless. Their
            mothers’ realm, Prismeer, was collapsed by adventurers who then took to the sea — and
            the Three believe the collapse and the silence are one event with one author. Since
            that day: no shared spellcasting, no Hag Eye, no shipbirth ritual.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-2 border border-line bg-panel-deep p-5">
            {COVEN_STATE.map((r) => (
              <div key={r.label} className="flex items-center gap-2.5 font-mono text-[0.8rem]">
                <span
                  className={cn(
                    'inline-block w-[3px] self-stretch',
                    r.works ? 'bg-hag' : 'bg-mist/50',
                  )}
                  aria-hidden
                />
                <span className={r.works ? 'text-bone-dim' : 'text-mist line-through decoration-mist/60'}>
                  {r.label}
                </span>
                <span className={cn('ml-auto', r.works ? 'text-hag' : 'text-mist')}>
                  {r.works ? '✓' : '✕'}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
        <div className="md:col-span-5">
          <DeadCovenDiagram />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* §4 — The Three (teaser triptych)                                    */
/* ------------------------------------------------------------------ */

const HAGS = [
  {
    name: 'MORGHA BRINESHROUD',
    lineage: 'Sea Hag of the Drowned Past',
    essence: 'She keeps everything that ever sank. She prices the location, not the thing.',
    portrait: '/assets/img/portraits/portrait_morgha_brineshroud.png',
    accent: 'hag' as const,
  },
  {
    name: 'RASPKA IRONGRINN',
    lineage: 'Annis Hag of the Iron Present',
    essence: 'Granny Threadbare mends everything she touches, and every touch is an assessment of tensile strength.',
    portrait: '/assets/img/portraits/portrait_raspka_irongrinn.png',
    accent: 'heat' as const,
  },
  {
    name: 'VESHKA MOROZOVA',
    lineage: 'Bheur Hag of the Storm-Cast Future',
    essence: 'Every entrance a first act; every stranger a casting decision. Her bells ring when you lie.',
    portrait: '/assets/img/portraits/portrait_veshka_morozova.png',
    accent: 'frost' as const,
  },
];

function TheThree() {
  return (
    <section className="bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <SectionKicker>§2 · The Coven</SectionKicker>
        <h2
          className="mt-4 text-center font-display-sc text-bone"
          style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)', letterSpacing: '0.04em' }}
        >
          Three granddaughters of Baba Yaga.
        </h2>
        <p className="mx-auto mt-4 max-w-[62ch] text-center font-body text-[1.05rem] leading-[1.75] text-mist">
          Daughters of the Hourglass Coven — past, present, and future — ruling from a crooked
          fortress where the seam meets the sea. They receive visitors together or not at all.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {HAGS.map((h, i) => (
            <HagCard key={h.name} {...h} delay={i * 0.12} />
          ))}
        </div>
        <motion.p
          initial={{ opacity: 0.3 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 1.1 }}
          className="flicker mt-12 text-center font-display text-xl italic text-gold md:text-2xl"
        >
          “Once you deal with the coven, you don’t bargain back.”
        </motion.p>
        <p className="mt-4 text-center">
          <Link
            to="/the-three"
            className="link-hag font-mono text-[0.72rem] uppercase tracking-[0.24em] text-brass hover:text-gold"
          >
            Read their full profiles &amp; statblocks →
          </Link>
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* §5 — The Town Split (districts preview)                             */
/* ------------------------------------------------------------------ */

const TOWN_TEASERS = [
  {
    title: 'Splitmarket',
    body: 'The seam weighs truth; first crossing each day, sailors stagger — the town’s favorite free entertainment.',
  },
  {
    title: 'The Bleach',
    body: 'Coral-block buildings, the cistern quarter, wind-teeth storms; motto: the coral always grows.',
  },
  {
    title: 'The Rime',
    body: 'Ice-cut streets, the fishery, blubber-oil lamps; locals read ice by color.',
  },
];

const MAP_DOTS = [
  { id: 'splitmarket', x: 50, y: 38, label: 'Splitmarket' },
  { id: 'bleach', x: 27, y: 48, label: 'The Bleach' },
  { id: 'rime', x: 73, y: 48, label: 'The Rime' },
];

function TownSplit() {
  return (
    <section className="bg-abyss py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <SectionKicker>§4 · Geography</SectionKicker>
        <h2
          className="mt-4 text-center font-display-sc text-bone"
          style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)', letterSpacing: '0.04em' }}
        >
          One cove. Two apocalypses of weather.
        </h2>

        <div className="corner-ticks relative mx-auto mt-12 max-w-[1000px] border border-line">
          <motion.img
            src="/assets/img/maps/map_coven_cove_topdown.png"
            alt="Top-down map of Coven Cove"
            initial={{ clipPath: 'inset(8% 8% 8% 8%)' }}
            whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="block w-full"
          />
          {MAP_DOTS.map((d, i) => (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.6 + i * 0.1, duration: 0.4 }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${d.x}%`, top: `${d.y}%` }}
            >
              <Link to="/the-town" aria-label={d.label} className="group block">
                <span className="absolute inset-0 -m-2 animate-ping rounded-full border border-brass/70 [animation-duration:2s]" />
                <span className="block h-3 w-3 rounded-full border-2 border-brass bg-hag hag-glow transition-transform group-hover:scale-125" />
                <span className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap border border-line bg-ink/90 px-2 py-1 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-bone opacity-0 transition-opacity group-hover:opacity-100">
                  {d.label}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {TOWN_TEASERS.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
            >
              <SplitPanel
                seam={false}
                west={
                  <div>
                    <p className="mb-2 font-display text-lg text-bone">{t.title}</p>
                    <p className="font-body text-sm leading-relaxed text-bone-dim">{t.body}</p>
                  </div>
                }
                east={
                  <div className="hidden md:block">
                    <p className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-mist">
                      {i === 0 ? 'Neutral ground' : i === 1 ? 'West · coral desert' : 'East · frozen quarter'}
                    </p>
                  </div>
                }
              />
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-center">
          <Link
            to="/the-town"
            className="link-hag font-mono text-[0.72rem] uppercase tracking-[0.24em] text-brass hover:text-gold"
          >
            Walk the districts →
          </Link>
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* §6 — Adventure Hooks                                                */
/* ------------------------------------------------------------------ */

const HOOKS = [
  {
    n: '01',
    title: 'A Keel for the Asking',
    body: 'The party’s ship needs more than carpentry — or they have heard that one cove builds living ships that heal their own hulls. There is a waiting list, a dead ritual, and a price that isn’t gold.',
    starts: 'starts at: the docks',
  },
  {
    n: '02',
    title: 'The Drowned Letter',
    body: 'A corpse in a salt-crusted barrel, a tide-scrip, hourglass sand under its fingernails: “Tell the Three of Coven Cove what we saw off the Bone Shoals. They pay in favors.”',
    starts: 'starts at: anywhere',
  },
  {
    n: '03',
    title: 'Debt Called Due',
    body: 'A PC’s old bargain-mark itches; a pengkin corsair ketch under a tattered black flag politely delivers a summons to the Tide-Court. Refusing is allowed. The mark itches when they do.',
    starts: 'starts at: a PC’s past',
  },
  {
    n: '04',
    title: 'Chasing the Wreckers',
    body: 'Impossible weather, floating doors, a wake that freezes behind a black ship; every thread on the open sea leads through Coven Cove — the Three have been collecting those threads for a year.',
    starts: 'starts at: off-campaign',
  },
];

function HookCard({ hook, i }: { hook: (typeof HOOKS)[number]; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
      className="group border border-line bg-panel p-6 transition-colors hover:border-brass"
    >
      <motion.span
        className="inline-block font-mono text-lg text-brass [transform-style:preserve-3d]"
        whileHover={{ rotateX: 360 }}
        transition={{ duration: 0.6 }}
      >
        {hook.n}
      </motion.span>
      <h3 className="mt-2 font-display text-xl text-bone md:text-2xl">{hook.title}</h3>
      <p className="mt-3 font-body text-[0.95rem] leading-relaxed text-bone-dim">{hook.body}</p>
      <p className="mt-4 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-mist">
        {hook.starts}
      </p>
    </motion.div>
  );
}

function AdventureHooks() {
  return (
    <section className="bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <SectionKicker>§1 · Hooks</SectionKicker>
        <h2
          className="mt-4 text-center font-display-sc text-bone"
          style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)', letterSpacing: '0.04em' }}
        >
          Four ways to drop anchor.
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {HOOKS.map((h, i) => (
            <HookCard key={h.n} hook={h} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* §7 — The Campaign at a Glance                                       */
/* ------------------------------------------------------------------ */

const ACTS = [
  { numeral: 'I', title: 'The Panicked Town', line: 'A harbor full of ships and a town full of waiting.' },
  { numeral: 'II', title: 'The Tide-Court Interview', line: 'A three-round social set-piece, one round per hag.' },
  { numeral: 'III', title: 'Escalation', line: 'Choose two; let one be self-inflicted.' },
  { numeral: 'IV', title: 'The Trail West', line: 'The ladder assembled; the campaign’s bargain offered.' },
  { numeral: 'V', title: 'Resolution Branches', line: 'Rekindle, sever, or leash the coven.' },
];

function ActsStrip() {
  return (
    <section className="bg-abyss py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <SectionKicker>§9 · Story</SectionKicker>
        <h2
          className="mt-4 text-center font-display-sc text-bone"
          style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)', letterSpacing: '0.04em' }}
        >
          Five acts, three endings.
        </h2>
        <div className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2">
          {ACTS.map((a, i) => (
            <motion.div
              key={a.numeral}
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, delay: i * 0.09, ease: EASE }}
              className="group relative w-[240px] shrink-0 snap-start overflow-hidden border border-line bg-panel p-6 transition-colors hover:border-brass"
            >
              <span
                className="pointer-events-none absolute -right-3 -top-6 font-display text-[7rem] leading-none text-brass/15 transition-colors duration-500 group-hover:text-hag/25"
                aria-hidden
              >
                {a.numeral}
              </span>
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.24em] text-brass">
                Act {a.numeral}
              </p>
              <h3 className="relative mt-2 font-display text-xl text-bone">{a.title}</h3>
              <p className="relative mt-2 font-body text-sm leading-relaxed text-mist">{a.line}</p>
            </motion.div>
          ))}
          {/* easter egg: the three endings */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, delay: ACTS.length * 0.09, ease: EASE }}
            className="flex w-[150px] shrink-0 snap-start items-center justify-center border border-dashed border-brass/50"
          >
            <Link
              to="/the-three#restoration"
              className="flex flex-col items-center gap-2 font-display text-2xl text-brass hover:text-gold"
              aria-label="Restoration paths A, B, C"
            >
              <span className="flex gap-3">
                <span>A</span>
                <span>·</span>
                <span>B</span>
                <span>·</span>
                <span>C</span>
              </span>
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-mist">
                three endings
              </span>
            </Link>
          </motion.div>
        </div>
        <p className="mt-10 text-center">
          <Link
            to="/quests"
            className="link-hag font-mono text-[0.72rem] uppercase tracking-[0.24em] text-brass hover:text-gold"
          >
            Read the act structure →
          </Link>
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* §8 — Toolkit strip                                                  */
/* ------------------------------------------------------------------ */

const TOOLS = [
  { icon: Dices, kicker: 'd10 · d8 · d6', title: 'Dice Tables', to: '/encounters#tables', line: 'Roll rumors & encounters.' },
  { icon: Scale, kicker: 'gold ⇄ staples', title: 'Barter Converter', to: '/shops#converter', line: 'Off-season math, live.' },
  { icon: Map, kicker: '26 assets', title: 'Battlemaps & Portraits', to: '/gallery', line: 'The full art pack, lightboxed.' },
  { icon: Download, kicker: '7 actors', title: 'Foundry VTT Pack', to: '/gallery#foundry', line: 'Importable JSON statblocks.' },
];

function ToolkitStrip() {
  return (
    <section className="bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <SectionKicker>The Toolkit</SectionKicker>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TOOLS.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
            >
              <Link
                to={t.to}
                className="group block h-full border border-line bg-panel p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brass"
              >
                <t.icon className="h-6 w-6 text-brass transition-colors group-hover:text-hag" />
                <p className="mt-4 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-mist">
                  {t.kicker}
                </p>
                <h3 className="mt-1 font-display text-lg text-bone">{t.title}</h3>
                <p className="mt-1.5 font-body text-sm leading-relaxed text-bone-dim">{t.line}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* §9 — Closing banner                                                 */
/* ------------------------------------------------------------------ */

const CLOSING_QUOTE = 'You will hear things on the water. We buy what the sea tells you.';

function ClosingBanner() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section ref={ref} className="relative flex h-[50vh] min-h-[360px] items-center overflow-hidden">
      <motion.img
        src="/assets/img/scenes/scene_tide_court_interview.png"
        alt=""
        style={{ y: bgY }}
        className="absolute inset-0 h-[116%] w-full object-cover"
      />
      <div className="absolute inset-0 bg-ink/75" aria-hidden />
      <div className="relative mx-auto max-w-[860px] px-6 text-center">
        <blockquote
          className="font-display italic text-bone"
          style={{ fontSize: 'clamp(1.4rem, 3vw, 2.2rem)', lineHeight: 1.4 }}
          aria-label={CLOSING_QUOTE}
        >
          {CLOSING_QUOTE.split(' ').map((w, i) => (
            <motion.span
              key={i}
              aria-hidden
              className="inline-block"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
            >
              {w}
              {' '}
            </motion.span>
          ))}
        </blockquote>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-4 font-mono text-[0.72rem] uppercase tracking-[0.24em] text-mist"
        >
          — the Three, to every crew that docks
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 1.05, duration: 0.6, ease: EASE }}
          className="mt-8"
        >
          <Link
            to="/the-three"
            className="inline-block border border-brass px-6 py-3 font-mono text-[0.72rem] uppercase tracking-[0.24em] text-brass transition-colors hover:bg-brass hover:text-ink"
          >
            Open the Guide
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export default function Home() {
  return (
    <>
      <Hero />
      <div id="the-seam" className="scroll-mt-16">
        <SeamWalk />
      </div>
      <SeamDivider />
      <TheSilence />
      <SeamDivider />
      <TheThree />
      <SeamDivider />
      <TownSplit />
      <SeamDivider />
      <AdventureHooks />
      <SeamDivider />
      <ActsStrip />
      <SeamDivider />
      <ToolkitStrip />
      <SeamDivider />
      <ClosingBanner />
    </>
  );
}
