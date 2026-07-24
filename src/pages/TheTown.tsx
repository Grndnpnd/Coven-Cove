import { memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, MoonStar, Landmark, DoorOpen, Skull } from 'lucide-react';
import SectionKicker from '@/components/SectionKicker';
import SeamDivider from '@/components/SeamDivider';
import SealReveal from '@/components/SealReveal';
import TownBanner from '@/components/town/TownBanner';
import TownMap from '@/components/town/TownMap';
import Splitmarket from '@/components/town/Splitmarket';
import Bleach from '@/components/town/Bleach';
import Rime from '@/components/town/Rime';
import Cradles from '@/components/town/Cradles';

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

function H2({ children }: { children: string }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.8, ease: EASE }}
      className="mt-4 text-center font-display-sc text-bone"
      style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)', letterSpacing: '0.04em' }}
    >
      {children}
    </motion.h2>
  );
}

/* ------------------------------------------------------------------ */
/* §6 — The Docks & Frozen Harbor                                      */
/* ------------------------------------------------------------------ */

function Docks() {
  return (
    <div className="grid items-center gap-10 md:grid-cols-2">
      <motion.figure
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: EASE }}
        className="corner-ticks border border-line"
      >
        <img
          src="/assets/img/maps/battlemap_frozen_dock.png"
          alt="Top-down battlemap of the Icefast Quay frozen dock"
          className="block w-full"
          loading="lazy"
        />
        <figcaption className="border-t border-line bg-panel-deep px-4 py-2.5 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-mist">
          Battlemap — Icefast Quay
        </figcaption>
      </motion.figure>

      <div>
        <SectionKicker align="left">§4 · The Docks & Frozen Harbor</SectionKicker>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mt-4 font-display-sc text-bone"
          style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)', letterSpacing: '0.04em' }}
        >
          Keelrow & Icefast Quay
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
          className="mt-8 space-y-5 font-body text-[1.05rem] leading-[1.75] text-bone-dim"
        >
          <p>
            The waterfront runs the whole south edge. <span className="text-heat">Keelrow</span>{' '}
            (west): sand-dredged timber piers over pale coral flats, kept clear by tide-scows and
            push-broom crews. <span className="text-frost">Icefast Quay</span> (east): a working
            dock built <span className="italic">on</span> the frozen harbor — ships winched in on
            runners and cradled in ice, masts wrapped in hide.
          </p>
          <p>
            The seam runs out between them, visible on the water: floating coral grit to starboard,
            skinning ice to port, a straight line fishermen cross at a run.
          </p>
        </motion.div>

        {/* Harbormaster thumb */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          className="mt-8"
        >
          <Link
            to="/townsfolk"
            className="group flex items-center gap-4 border border-line bg-panel-deep p-4 transition-colors hover:border-brass"
          >
            <img
              src="/assets/img/portraits/portrait_brullo_icekeel.png"
              alt="Harbormaster Brullo Icekeel"
              className="h-16 w-16 shrink-0 border border-line object-cover object-top"
              loading="lazy"
            />
            <div>
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-brass">
                Harbormaster — §7
              </p>
              <p className="mt-1 font-body text-[0.95rem] leading-relaxed text-bone-dim">
                <span className="text-bone">Brullo Icekeel</span> works from a booth built, of
                course, exactly on the line.
              </p>
            </div>
            <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-mist transition-transform group-hover:translate-x-1 group-hover:text-gold" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* §8 — The Stronghold: the Tide-Court (cutaway tiers)                 */
/* ------------------------------------------------------------------ */

const TIERS = [
  {
    icon: MoonStar,
    name: 'The Spires',
    text: 'Driftwood, sea-bone, barnacle-crusted towers; tattered violet sails as vanes and warnings; sickly-green window light; the glowing triple-moon above the gate.',
  },
  {
    icon: Landmark,
    name: 'The Interview Hall',
    text: 'Coral flagstone west, black ice east; the scrying cauldron sits exactly on the seam — and so do the Three.',
  },
  {
    icon: DoorOpen,
    name: 'The Keel Stair',
    text: 'Beneath the hall, the way down is a stair of ship-keels.',
  },
  {
    icon: Skull,
    name: 'The Keel-Crypt',
    text: 'Reliquary of the court: Morgha’s brine vat, Raspka’s thread-journal wall, Veshka’s omen-theater — and one thing more, under seal.',
    sealed: true,
  },
];

function TideCourt() {
  return (
    <div className="mx-auto max-w-[820px]">
      <SectionKicker>§4 · The Stronghold</SectionKicker>
      <H2>The Tide-Court</H2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8 }}
        className="mx-auto mt-6 max-w-[64ch] text-center font-body text-sm italic leading-relaxed text-mist"
      >
        Perched on the rock spur where the seam meets the sea — read top to bottom, gate to crypt.
      </motion.p>

      <div className="relative mt-12">
        {/* connecting line */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.6, ease: 'easeInOut' }}
          className="absolute bottom-6 left-1/2 top-6 w-[2px] origin-top -translate-x-1/2 bg-line"
          aria-hidden
        />
        <ol className="relative space-y-6">
          {TIERS.map((tier, i) => (
            <motion.li
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: EASE }}
              className="corner-ticks relative border border-line bg-panel p-5 md:p-6"
            >
              <div className="flex items-center gap-3">
                <tier.icon className="h-4 w-4 shrink-0 text-brass" />
                <p className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-brass">
                  {String(i + 1).padStart(2, '0')} · {tier.name}
                </p>
              </div>
              <p className="mt-3 font-body text-[0.95rem] leading-relaxed text-bone-dim">
                {tier.text}
              </p>
              {tier.sealed && (
                <div className="mt-4">
                  <SealReveal id="keel-crypt-heart" label="The crypt’s last item — sealed, DM eyes only.">
                    The chained husk of the dead hourglass-heart hangs here in grandmother’s
                    knotwork (§3). Destroying it is Path B — the Inheritance of Ashes.
                  </SealReveal>
                </div>
              )}
            </motion.li>
          ))}
        </ol>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="mt-8 border-l-2 border-brass pl-4 font-body text-[0.95rem] leading-relaxed text-bone-dim"
      >
        The Tideguard garrison is twenty strong and answers to the court, not the town.
      </motion.p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* §9 — The Bay & the Gullet                                           */
/* ------------------------------------------------------------------ */

/** Slow-rotating whirlpool rings — isolated perpetual motion. */
const WhirlpoolRings = memo(function WhirlpoolRings() {
  return (
    <motion.svg
      viewBox="0 0 400 400"
      animate={{ rotate: 360 }}
      transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      className="h-full w-full"
      aria-hidden
    >
      {[60, 95, 130, 160].map((r) => (
        <circle key={r} cx="200" cy="200" r={r} fill="none" stroke="#B98A3E" strokeWidth="1.5" />
      ))}
      <circle
        cx="200"
        cy="200"
        r="188"
        fill="none"
        stroke="#B98A3E"
        strokeWidth="1.5"
        strokeDasharray="10 14"
      />
      <circle cx="200" cy="200" r="26" fill="none" stroke="#9FD63F" strokeWidth="1.5" />
    </motion.svg>
  );
});

function Gullet() {
  return (
    <div className="relative">
      {/* whirlpool graphic behind/right of text */}
      <div className="pointer-events-none absolute -right-10 top-1/2 hidden h-[420px] w-[420px] -translate-y-1/2 opacity-15 lg:block">
        <WhirlpoolRings />
      </div>

      <div className="relative mx-auto max-w-[70ch]">
        <SectionKicker align="left">§4 · The Bay</SectionKicker>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mt-4 font-display-sc text-bone"
          style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)', letterSpacing: '0.04em' }}
        >
          The Gullet
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mt-8 space-y-5 font-body text-[1.05rem] leading-[1.75] text-bone-dim"
        >
          <p>
            The bay splits like everything else — coral flats west, ice east. Two miles offshore,
            just west of the seam-line’s extension: <span className="text-bone">the Gullet</span>,
            a standing whirlpool a quarter-mile across — slow, patient, permanent.
          </p>
          <p>Locals refuse to sail near it and do not elaborate beyond spitting.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
          className="mt-8"
        >
          <SealReveal id="gullet-truth" label="The truth of the Gullet — sealed, DM eyes only.">
            <p>
              It is grandmother’s knot, a bound working holding a sunken splinter of Prismeer on
              the seabed, and <span className="text-bone">Churn-Mother Sovva</span> is its keeper
              and prisoner both. Since the silence, fragments drift into the bay faster every
              month — and they drift <span className="italic">toward</span> the Gullet, against
              wind and tide.
            </p>
            <Link
              to="/quests"
              className="link-hag mt-3 inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.2em] text-gold"
            >
              Parley at the Gullet <ArrowRight className="h-3.5 w-3.5" /> Quests
            </Link>
          </SealReveal>
        </motion.div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function TheTown() {
  return (
    <>
      {/* §1 — banner */}
      <TownBanner />

      {/* §2 — the interactive map */}
      <section className="bg-ink py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <SectionKicker>§4 · The Interactive Map</SectionKicker>
          <H2>The Cove at a Glance</H2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8 }}
            className="mx-auto mt-6 max-w-[60ch] text-center font-body text-sm italic leading-relaxed text-mist"
          >
            Seven districts. One impossible line. Touch a marker to open its file.
          </motion.p>
          <div className="mt-12">
            <TownMap />
          </div>
        </div>
      </section>

      <SeamDivider />

      {/* §3 — Splitmarket */}
      <section id="splitmarket" className="bg-abyss py-24 md:py-32">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <Splitmarket />
        </div>
      </section>

      <SeamDivider />

      {/* §4 — the Bleach */}
      <section id="bleach" className="bg-ink py-24 md:py-32">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <Bleach />
        </div>
      </section>

      <SeamDivider />

      {/* §5 — the Rime */}
      <section id="rime" className="bg-abyss py-24 md:py-32">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <Rime />
        </div>
      </section>

      <SeamDivider />

      {/* §6 — the docks */}
      <section id="docks" className="bg-ink py-24 md:py-32">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <Docks />
        </div>
      </section>

      <SeamDivider />

      {/* §7 — the Cradles */}
      <section id="cradles" className="bg-abyss py-24 md:py-32">
        <Cradles />
      </section>

      <SeamDivider />

      {/* §8 — the Tide-Court */}
      <section id="tide-court" className="bg-ink py-24 md:py-32">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <TideCourt />
        </div>
      </section>

      <SeamDivider />

      {/* §9 — the bay & the Gullet */}
      <section id="gullet" className="overflow-hidden bg-abyss py-24 md:py-32">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <Gullet />
        </div>
      </section>

      {/* §10 — footer CTA */}
      <SeamDivider />
      <section className="bg-ink py-16 md:py-20">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-8 px-6 md:flex-row lg:px-12">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <Link
              to="/townsfolk"
              className="link-hag flex items-center gap-3 font-mono text-[0.72rem] uppercase tracking-[0.28em] text-coral-deep hover:text-heat"
            >
              Who lives here <ArrowRight className="h-4 w-4" /> Townsfolk
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <Link
              to="/shops"
              className="link-hag flex items-center gap-3 font-mono text-[0.72rem] uppercase tracking-[0.28em] text-ice-deep hover:text-frost"
            >
              What you can buy <ArrowRight className="h-4 w-4" /> Shops
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
