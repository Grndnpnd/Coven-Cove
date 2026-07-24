import { memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SectionKicker from '@/components/SectionKicker';
import SeamDivider from '@/components/SeamDivider';
import SealReveal from '@/components/SealReveal';
import ThreeBanner from '@/components/three/ThreeBanner';
import HagChapter from '@/components/three/HagChapter';
import DeadCircleDiagram from '@/components/three/DeadCircleDiagram';
import ClueLadder from '@/components/three/ClueLadder';
import RestorationPaths from '@/components/three/RestorationPaths';
import { HAGS } from '@/components/three/hags';
import { cn } from '@/lib/utils';

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

/** Sigil with a 60s rotation + 4s hag-green pulse — isolated perpetual motion. */
const SigilMoon = memo(function SigilMoon() {
  return (
    <motion.div
      animate={{
        boxShadow: [
          '0 0 18px rgba(159,214,63,0.12)',
          '0 0 34px rgba(159,214,63,0.28)',
          '0 0 18px rgba(159,214,63,0.12)',
        ],
      }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      className="rounded-full"
    >
      <motion.img
        src="/assets/img/sigils/sigil_triple_moon_coven.png"
        alt="The triple-moon coven sigil"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        className="h-[280px] w-[280px] rounded-full object-cover"
      />
    </motion.div>
  );
});

/* ------------------------------------------------------------------ */
/* §2 — The Tide-Court (shared identity)                               */
/* ------------------------------------------------------------------ */

const ERA_CHIPS = [
  { hag: 'Morgha', era: 'the drowned past', mother: 'Bavlorna of Hither', text: 'text-hag', border: 'border-hag/50' },
  { hag: 'Raspka', era: 'the iron present', mother: 'Skabatha of Thither', text: 'text-heat', border: 'border-heat/50' },
  { hag: 'Veshka', era: 'the storm-cast future', mother: 'Endelyn of Yon', text: 'text-frost', border: 'border-frost/50' },
];

function TideCourt() {
  return (
    <section className="bg-ink py-24 md:py-32">
      <div className="mx-auto grid max-w-[1200px] gap-12 px-6 md:grid-cols-12 lg:px-12">
        <div className="md:col-span-7">
          <SectionKicker align="left">§2 · Shared Identity</SectionKicker>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="mt-4 font-display-sc text-bone"
            style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)', letterSpacing: '0.04em' }}
          >
            The Tide-Court
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="mt-8 max-w-[68ch] space-y-6 font-body text-[1.05rem] leading-[1.75] text-bone-dim"
          >
            <p className="drop-cap">
              The Three rule from the Tide-Court, a crooked fortress of driftwood, sea-bone, and
              barnacle-crusted towers perched on the rock spur where the seam meets the sea.
              Tattered violet sails snap from its spires; sickly-green light burns in the windows;
              above the gate glows the triple-moon sigil — three crescents nested mouth-to-mouth
              around a hollow center, an hourglass made of moons.
            </p>
            <p>
              They are never all three abroad at once, and receive visitors together or not at all,
              always on neutral ground: the interview hall is built astride the seam, the scrying
              cauldron on the line. Everything about them is theater, and everything about the
              theater is a threat assessment.
            </p>
            <p>
              <span className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-brass">
                Shared visual identity —{' '}
              </span>
              barnacle-crusted rags worn like court robes; jewelry of carved sea-bone, knotted gut,
              and hag-teeth; greenish light that leaks from under their collars when interested and
              gutters when displeased; the triple-moon worked into everything. Each hag carries her
              mother’s mark — how a lore-wise party can place her.
            </p>
          </motion.div>

          {/* the rule */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
            className="corner-ticks mt-10 border border-line bg-panel p-6 md:p-7"
          >
            <p className="font-display text-xl italic leading-relaxed text-gold md:text-2xl">
              “Once you deal with the coven, you don’t bargain back.”
            </p>
            <p className="mt-3 font-body text-[0.95rem] leading-relaxed text-bone-dim">
              They honor the letter of every agreement with horrible precision and interpret the
              spirit with horrible creativity. They never lie. They have never needed to.
            </p>
          </motion.div>

          {/* past / present / future */}
          <div className="mt-10">
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-brass">
              Past · Present · Future — the inheritance split
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {ERA_CHIPS.map((chip, i) => (
                <motion.div
                  key={chip.hag}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
                  className={cn('border bg-panel-deep px-4 py-3', chip.border)}
                >
                  <p className={cn('font-mono text-[0.72rem] uppercase tracking-[0.2em]', chip.text)}>
                    {chip.hag} → {chip.era}
                  </p>
                  <p className="mt-1 font-body text-sm italic text-mist">{chip.mother}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* sigil aside */}
        <motion.aside
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, ease: EASE }}
          className="flex flex-col items-center justify-center md:col-span-5"
        >
          <SigilMoon />
          <p className="mt-6 max-w-[34ch] text-center font-body text-sm italic leading-relaxed text-mist">
            three crescents nested mouth-to-mouth around a hollow center — an hourglass made of
            moons.
          </p>
        </motion.aside>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* §6 — The Three Together: Broken Coven Magic                         */
/* ------------------------------------------------------------------ */

const BROKEN_BULLETS = [
  {
    title: 'No coven spell pool.',
    text: 'The Three cannot counterspell, scry, or curse as a coven. Their intelligence network is entirely human: sailors, the tide-scribe, the chandler’s ledger. This is why they interview. This is why they need the party.',
  },
  {
    title: 'The Hag Eye is blind.',
    text: 'It lives under Morgha’s tongue. If the party ever sees it, they are either very trusted or about to be very dead.',
  },
  {
    title: 'The shipbirth ritual fails.',
    text: 'It required the circle (§3, §4). No ship has been born in over a year.',
  },
  {
    title: 'Individual magic is untouched.',
    text: 'Each hag remains fully dangerous alone.',
  },
];

function BrokenCovenMagic() {
  return (
    <section className="bg-abyss py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <SectionKicker>§2 · The Three Together</SectionKicker>
        <H2>What Broken Coven Magic Means at the Table</H2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mx-auto mt-10 max-w-[78ch] font-body text-[1.05rem] leading-[1.75] text-bone-dim"
        >
          <p>
            Under standard 5e hag rules, three hags within 30 feet of each other gain{' '}
            <span className="text-bone">Shared Spellcasting</span> (a coven pool:{' '}
            <span className="italic">bestow curse, counterspell, polymorph, scrying, contact other
            plane, eyebite</span>) and craft a <span className="text-bone">Hag Eye</span>. All of
            that is <span className="text-hag">dead</span> in Coven Cove:
          </p>
          <ul className="mt-8 space-y-5">
            {BROKEN_BULLETS.map((b) => (
              <li key={b.title} className="flex gap-3">
                <span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rotate-45 bg-hag" aria-hidden />
                <span>
                  <span className="font-display italic text-bone">{b.title}</span> {b.text}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>

        <DeadCircleDiagram />

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mx-auto mt-12 max-w-[78ch] border-l-2 border-hag pl-4 font-body text-[1.05rem] leading-[1.75] text-bone-dim"
        >
          If the circle is ever restored (§3), all three immediately regain Shared Spellcasting as
          a standard hag coven, plus the shipbirth rite — and the cove’s balance of power shifts
          overnight.
        </motion.p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* §7 — The DM's Truth (sealed chapter)                                */
/* ------------------------------------------------------------------ */

const WORKING_BROKEN: { working: string; broken: string }[] = [
  {
    working: 'Each hag’s individual innate magic and spells',
    broken: 'Shared Spellcasting (coven spell pool)',
  },
  {
    working: 'Bargains and contracts (enforced by older fey contract-law and the seam’s neutrality)',
    broken: 'The Hag Eye (blind; under Morgha’s tongue)',
  },
  {
    working: 'The hag-crafted folk already made',
    broken: 'The shipbirth ritual — no new living ships',
  },
  {
    working: 'The seam’s neutrality (an older working, grandmother’s)',
    broken: 'New hag-craft awakenings — new-made folk wake wrong (§8)',
  },
  {
    working: 'Veshka’s staff, Morgha’s glare, Raspka’s hands',
    broken: 'The prophecy-channel — static and one recurring vision',
  },
];

const KSF = [
  {
    title: 'Know',
    text: 'The collapse and the silence are one event; the wreckers went to sea; Prismeer is scattered across the ocean as floating fragments; the Gullet offshore guards a sunken splinter of it.',
  },
  {
    title: 'Suspect',
    text: 'The wreckers took something — the anchor itself, the heart of the hourglass, the held breath — and the fragments follow it like filings after a magnet; that their mothers are dead; that one mother escaped.',
  },
  {
    title: 'Fear',
    text: 'Their mothers’ ghosts coming home wrong; Baba Yaga’s eventual attention (grandmother does not send condolences, she sends reckonings); the hag-crafted folk noticing the loyalty-warp has gone slack; the town learning they are diminished; each other.',
  },
];

function DmTruth() {
  return (
    <section className="bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <SectionKicker>§3 · The Broken Coven</SectionKicker>
        <H2>The Silence, Explained</H2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mt-12"
        >
          <SealReveal
            id="dm-truth"
            label="§3 · The DM’s Truth — What Happened. Sealed, DM eyes only. Break the seal."
          >
            <div className="space-y-5">
              {[
                'Prismeer — the domain of delight ruled by the archfey Zybilna — was held in a stolen equilibrium by the Hourglass Coven: Bavlorna, Skabatha, and Endelyn froze their benefactor in time inside her own Palace of Heart’s Desire and split her realm into three temporal estates: Hither (the past), Thither (the present), Yon (the future). Their power was anchored in that frozen moment.',
                'A party of adventurers crossed into Prismeer and broke it — unfroze the archfey and collapsed the three estates into one another like a house of cards in a hurricane. Then, instead of staying for the grateful ruins, they took to the sea. Nobody in the cove knows why. That is the question the arc hangs on.',
                'The Three are the Hourglass Coven’s daughters and heirs. Their circle was never anchored to their own bodies — it was anchored, through their mothers, to the frozen moment itself: the held breath of Prismeer’s hourglass. When the realm collapsed, the chain parted, and every coven working on the far end of it — shared spellcasting, the Hag Eye, the shipbirth rite, and subtler things like the loyalty-warp stitched into the hag-crafted folk — went dark at the same instant, mid-ritual, in front of the whole shipyard.',
              ].map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.05, duration: 0.5 }}
                >
                  {p}
                </motion.p>
              ))}

              {/* Working / Broken */}
              <div className="mt-6 overflow-hidden border border-line">
                <div className="grid grid-cols-2 bg-panel-deep">
                  <p className="px-4 py-2.5 font-mono text-[0.72rem] uppercase tracking-[0.28em] text-hag">
                    Working
                  </p>
                  <p className="border-l border-line px-4 py-2.5 font-mono text-[0.72rem] uppercase tracking-[0.28em] text-mist">
                    Broken
                  </p>
                </div>
                {WORKING_BROKEN.map((row, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 + i * 0.05, duration: 0.4 }}
                    className={cn(
                      'grid grid-cols-2 border-t border-line',
                      i % 2 === 0 ? 'bg-panel' : 'bg-panel-deep',
                    )}
                  >
                    <p className="flex items-start gap-2 px-4 py-3 font-body text-[0.95rem] leading-relaxed text-bone-dim">
                      <span className="mt-0.5 text-hag">✓</span>
                      {row.working}
                    </p>
                    <p className="border-l border-line px-4 py-3 font-body text-[0.95rem] leading-relaxed text-mist line-through decoration-mist/60">
                      {row.broken}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Know / Suspect / Fear */}
              <div className="mt-6 grid gap-4 md:grid-cols-3" style={{ perspective: 800 }}>
                {KSF.map((card, i) => (
                  <motion.div
                    key={card.title}
                    initial={{ rotateX: 90, opacity: 0 }}
                    animate={{ rotateX: 0, opacity: 1 }}
                    transition={{ delay: 0.7 + i * 0.12, duration: 0.6, ease: EASE }}
                    style={{ transformOrigin: 'top' }}
                    className="border border-line bg-panel p-5"
                  >
                    <p className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-brass">
                      {card.title}
                    </p>
                    <p className="mt-3 font-body text-sm leading-relaxed text-bone-dim">
                      {card.text}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </SealReveal>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function TheThree() {
  return (
    <>
      {/* §1 — banner */}
      <ThreeBanner />

      {/* §2 — the Tide-Court */}
      <TideCourt />

      {/* §§3–5 — the hag chapters */}
      {HAGS.map((hag, i) => (
        <div key={hag.id} className={i % 2 === 0 ? 'bg-abyss' : 'bg-ink'}>
          <SeamDivider />
          <div className="py-24 md:py-32">
            <HagChapter hag={hag} flip={i % 2 === 1} />
          </div>
        </div>
      ))}

      <SeamDivider />

      {/* §6 — broken coven magic */}
      <BrokenCovenMagic />

      <SeamDivider />

      {/* §7 — the DM's truth */}
      <DmTruth />

      <SeamDivider />

      {/* §8 — the investigation arc */}
      <section className="bg-abyss py-24 md:py-32">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <SectionKicker>§3 · The Investigation Arc</SectionKicker>
          <H2>The Clue Ladder</H2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8 }}
            className="mx-auto mt-6 max-w-[60ch] text-center font-body text-sm italic leading-relaxed text-mist"
          >
            Six rungs from a panicked harbor to a heading west. Escalate roughly thus:
          </motion.p>
          <ClueLadder />
        </div>
      </section>

      <SeamDivider />

      {/* §9 — restoration paths */}
      <section id="restoration" className="bg-ink py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <SectionKicker>§3 · Restoration Paths</SectionKicker>
          <H2>Three Ways the Story Ends</H2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8 }}
            className="mx-auto mt-6 max-w-[60ch] text-center font-body text-sm italic leading-relaxed text-mist"
          >
            The act-five branches. All three are real choices with real costs.
          </motion.p>
          <RestorationPaths />
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
              to="/the-town"
              className="link-hag flex items-center gap-3 font-mono text-[0.72rem] uppercase tracking-[0.28em] text-coral-deep hover:text-heat"
            >
              Where they rule <ArrowRight className="h-4 w-4" /> The Town
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <Link
              to="/encounters#tables"
              className="link-hag flex items-center gap-3 font-mono text-[0.72rem] uppercase tracking-[0.28em] text-ice-deep hover:text-frost"
            >
              What they buy <ArrowRight className="h-4 w-4" /> The Tables
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
