import { motion } from 'framer-motion';
import SectionKicker from '@/components/SectionKicker';
import DriftParticles from '@/components/town/DriftParticles';
import { cn } from '@/lib/utils';

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const ICE_LADDER = [
  {
    name: 'paper ice',
    note: 'milky, new',
    rule: 'Breaks under any load — DC 13 Dexterity save to catch the edge.',
    chip: 'bg-[#D9E8EE] text-[#16222E]',
  },
  {
    name: 'green ice',
    note: 'holds Small',
    rule: 'Breaks under Medium+ — DC 10 Dexterity to distribute weight.',
    chip: 'bg-[#A8CCC4] text-[#16222E]',
  },
  {
    name: 'blue ice',
    note: 'holds Medium + sledges',
    rule: 'Streets, sledge routes, working ice.',
    chip: 'bg-[#6FA8C4] text-[#101820]',
  },
  {
    name: 'black ice',
    note: 'siege-grade',
    rule: 'Icefast Quay is black ice dressed with planks.',
    chip: 'bg-[#16222E] text-ice border border-ice-deep/60',
  },
];

/**
 * §5 — The Rime, the east's chapter (the-town.md §5): mirror of the Bleach —
 * both halves cold, the seam at the section's left edge.
 */
export default function Rime() {
  return (
    <div className="relative">
      <DriftParticles kind="snow" />

      <div className="relative">
        <SectionKicker>§4 · East Side — Frozen Quarter</SectionKicker>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mt-4 text-center font-display-sc text-bone"
          style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)', letterSpacing: '0.04em' }}
        >
          The Rime
        </motion.h2>

        <div className="relative mt-10 flex">
          {/* the seam at the section's left edge */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="hidden w-[2px] shrink-0 origin-top bg-bone/80 shadow-[0_0_12px_rgba(159,214,63,0.4)] md:block"
            aria-hidden
          />

          <div className="grid grow overflow-hidden border border-line md:grid-cols-2">
            {/* content — cold */}
            <div className="bg-[#16222E] p-6 md:p-8">
              <p className="mb-3 font-mono text-[0.72rem] uppercase tracking-[0.2em] text-frost">
                The Quarter
              </p>
              <div className="space-y-4 font-body text-[1.05rem] leading-[1.75] text-bone-dim">
                <p>
                  Frozen tundra backing into mountains: glacial ice sheets, frozen cliffs, streets
                  cut into blue ice and roofed with hide and snow. Perpetual deep-freeze.
                </p>
                <p>
                  The Rime holds the fishery and blubber-oil rendering, the ice-harvesters’
                  rowhouses, the frozen half of the harbor, and the Rimefolk — mostly hag-crafted
                  cold-bloods who find the west side genuinely distressing.
                </p>
              </div>

              {/* Hazard 1 — Deep Freeze */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, ease: EASE }}
                className="mt-8 border border-line bg-panel-deep/70 p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="font-display text-lg text-ice">Deep Freeze</p>
                  <span className="border border-ice-deep/60 px-2 py-0.5 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-frost">
                    Constant
                  </span>
                </div>
                <p className="mt-2 font-mono text-[0.85rem] leading-relaxed text-bone-dim">
                  DMG extreme cold: DC 10 Constitution save each hour of exposure or 1 level of
                  exhaustion; within a mile of the ice cliffs the DC rises to 12 and unprotected
                  metal sticks to bare skin (1 cold damage and an action to pull free).
                </p>
                <p className="mt-2 font-mono text-[0.85rem] leading-relaxed text-frost">
                  Blubber-oil seal, Rimefolk clothing, or cold resistance negates.
                </p>
              </motion.div>
            </div>

            {/* Hazard 2 — Thin Ice ladder */}
            <div className="bg-[#101A24] p-6 md:p-8">
              <p className="mb-3 font-mono text-[0.72rem] uppercase tracking-[0.2em] text-frost">
                Hazard — Thin Ice (locals read ice by color)
              </p>
              <div className="space-y-3">
                {ICE_LADDER.map((step, i) => (
                  <motion.div
                    key={step.name}
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
                    className="flex items-stretch gap-4 border border-line bg-panel-deep/70 p-3"
                  >
                    <div
                      className={cn(
                        'flex w-28 shrink-0 flex-col items-center justify-center px-2 py-2 text-center',
                        step.chip,
                      )}
                    >
                      <span className="font-mono text-[0.72rem] uppercase tracking-[0.14em]">
                        {step.name}
                      </span>
                      <span className="mt-0.5 font-mono text-[0.62rem] opacity-80">{step.note}</span>
                    </div>
                    <p className="self-center font-mono text-[0.82rem] leading-relaxed text-bone-dim">
                      {step.rule}
                    </p>
                  </motion.div>
                ))}
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mt-4 border-l-2 border-ice-deep pl-3 font-mono text-[0.85rem] leading-relaxed text-frost"
              >
                Frigid water: DC 10 Constitution save each minute of immersion or 1 level of
                exhaustion.
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
