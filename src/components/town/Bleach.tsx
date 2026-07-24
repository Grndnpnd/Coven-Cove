import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SectionKicker from '@/components/SectionKicker';
import DriftParticles from '@/components/town/DriftParticles';

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const WIND_TEETH = [
  {
    name: 'Grit Wind',
    tag: 'Common',
    text: 'Lightly obscured beyond 30 ft.; DC 13 Constitution hourly or 1 level of exhaustion; exposed skin takes 1 slashing per 10 minutes.',
  },
  {
    name: 'Shred Gale',
    tag: 'Storm',
    text: 'Heavily obscured beyond 10 ft.; 1d4 slashing per minute exposed; DC 15 Constitution hourly or exhaustion; coral-glass goggles and blubber-oil skin seal negate the damage.',
  },
  {
    name: 'Grinder Heart',
    tag: 'Once a Season',
    text: '2d6 slashing per round exposed; unattended nonmagical objects take 6 (2d6) per round; treat the leading edge as a Wind-Teeth Swarm for the hour it passes.',
    link: { to: '/encounters', label: 'Wind-Teeth Swarm → Encounters' },
  },
];

/**
 * §4 — The Bleach, the west's chapter (the-town.md §4): both halves warm,
 * the seam sitting at the section's right edge as "the end of the world".
 */
export default function Bleach() {
  return (
    <div className="relative">
      <DriftParticles kind="sand" />

      <div className="relative">
        <SectionKicker>§4 · West Side — Coral Desert Quarter</SectionKicker>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mt-4 text-center font-display-sc text-bone"
          style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)', letterSpacing: '0.04em' }}
        >
          The Bleach
        </motion.h2>

        <div className="relative mt-10 flex">
          <div className="grid grow overflow-hidden border border-line md:grid-cols-2">
            {/* content — warm */}
            <div className="bg-[#2A1E26] p-6 md:p-8">
              <p className="mb-3 font-mono text-[0.72rem] uppercase tracking-[0.2em] text-heat">
                The Quarter
              </p>
              <div className="space-y-4 font-body text-[1.05rem] leading-[1.75] text-bone-dim">
                <p>
                  Bleached-white crushed-coral sand, brutal hot dry days. Raised boardwalk streets;
                  thick-walled coral-block buildings with coral-glass windscreens angled like
                  squinting eyes. The Bleach holds the cistern quarter, the glass kilns, the salt
                  market, and the boarding houses favored by outlander crews.
                </p>
                <blockquote className="border-l-2 border-heat py-1 pl-4">
                  <p className="font-display text-xl italic leading-relaxed text-heat md:text-2xl">
                    “The coral always grows.”
                  </p>
                  <p className="mt-2 font-body text-sm italic leading-relaxed text-mist">
                    The west-sider motto, half blessing and half diagnosis. It does — slowly, onto
                    everything left still: hulls, boots, graves, grudges.
                  </p>
                </blockquote>
              </div>
            </div>

            {/* hazard stack — also warm (the west's chapter) */}
            <div className="bg-[#241820] p-6 md:p-8">
              <p className="mb-3 font-mono text-[0.72rem] uppercase tracking-[0.2em] text-heat">
                Hazard — Wind Teeth (shredding coral-sand storm)
              </p>
              <p className="mb-4 font-body text-sm italic text-mist">
                Coral sand rides the wind sharp as ground glass:
              </p>
              <div className="space-y-4">
                {WIND_TEETH.map((h, i) => (
                  <motion.div
                    key={h.name}
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.7, delay: i * 0.12, ease: EASE }}
                    className="border border-line bg-panel-deep/70 p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-display text-lg text-coral">{h.name}</p>
                      <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: [0, 1, 0.35, 1] }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + i * 0.12, duration: 0.5 }}
                        className="border border-heat/60 px-2 py-0.5 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-heat"
                      >
                        {h.tag}
                      </motion.span>
                    </div>
                    <p className="mt-2 font-mono text-[0.85rem] leading-relaxed text-bone-dim">
                      {h.text}
                    </p>
                    {h.link && (
                      <Link
                        to={h.link.to}
                        className="link-hag mt-2 inline-block font-mono text-[0.72rem] uppercase tracking-[0.18em] text-gold"
                      >
                        {h.link.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* the seam at the section's right edge — end of the world */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="hidden w-[2px] shrink-0 origin-top bg-bone/80 shadow-[0_0_12px_rgba(159,214,63,0.4)] md:block"
            aria-hidden
          />
        </div>
      </div>
    </div>
  );
}
