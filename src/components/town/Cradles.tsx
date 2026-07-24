import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SectionKicker from '@/components/SectionKicker';

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

/**
 * §7 — The Shipyards & Drydocks: "the Cradles" (the-town.md §7). Full-width
 * 60vh parallax band, then text + drydock battlemap, the Drydock Seven
 * callout, and the dormant-hulk rules box.
 */
export default function Cradles() {
  const bandRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: bandRef, offset: ['start end', 'end start'] });
  const bandY = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);

  return (
    <div>
      {/* parallax band with overlaid title */}
      <div ref={bandRef} className="relative h-[60vh] min-h-[420px] overflow-hidden">
        <motion.img
          src="/assets/img/scenes/scene_silent_shipyard_dormant_hulks.png"
          alt="Seven drydocks at dusk, six half-born mimic-ship hulls hanging in cradles"
          style={{ y: reduced ? 0 : bandY }}
          className="absolute inset-0 h-[130%] w-full object-cover"
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(18,10,31,0.35), rgba(18,10,31,0.85))' }}
          aria-hidden
        />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1200px] px-6 pb-10 lg:px-12">
          <SectionKicker align="left">§4 · The Shipyards & Drydocks</SectionKicker>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="mt-4 font-display-sc text-bone"
            style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)', letterSpacing: '0.04em' }}
          >
            The Cradles
          </motion.h2>
        </div>
      </div>

      <div className="mx-auto mt-12 grid max-w-[1200px] gap-10 px-6 md:grid-cols-2 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="space-y-5 font-body text-[1.05rem] leading-[1.75] text-bone-dim"
        >
          <p>
            Northeast of the docks, where flat ice meets quarry-cut coral stone: seven drydocks,
            and in them the town’s grief. Six <span className="text-bone">dormant mimic-hulks</span>{' '}
            hang in cradles in stages of half-birth — a brigantine with too many ribs and a keel
            that breathes, a sleek cutter whose planking has lips, a half-grown hulk no bigger than
            a longboat that still, some nights, <span className="italic">whimpers</span>.
          </p>
          <p>
            They are not dead. The ritual stopped mid-word; they are paused, like Prismeer’s
            archfey was paused, and the resemblance is lost on no one.
          </p>

          {/* Drydock Seven callout */}
          <motion.div
            initial={{ opacity: 0, y: 24, boxShadow: '0 0 0px rgba(159,214,63,0)' }}
            whileInView={{
              opacity: 1,
              y: 0,
              boxShadow: [
                '0 0 0px rgba(159,214,63,0)',
                '0 0 28px rgba(159,214,63,0.35)',
                '0 0 6px rgba(159,214,63,0.08)',
                '0 0 28px rgba(159,214,63,0.35)',
                '0 0 6px rgba(159,214,63,0.08)',
                '0 0 28px rgba(159,214,63,0.35)',
                '0 0 16px rgba(159,214,63,0.22)',
              ],
            }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              opacity: { duration: 0.6, ease: EASE },
              y: { duration: 0.6, ease: EASE },
              boxShadow: { delay: 0.3, duration: 2.4, times: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 1] },
            }}
            className="border border-hag bg-panel-deep p-5"
          >
            <p className="flicker hag-text-glow font-mono text-[0.72rem] uppercase tracking-[0.28em] text-hag">
              Drydock Seven
            </p>
            <p className="mt-3 font-body text-[0.95rem] leading-relaxed text-bone-dim">
              The one that is waking: Raspka’s secret experiment, the feral hulk (§8, §10). Its
              chains are newer, its cradle reinforced. Raspka visits it alone and hums to it.
            </p>
            <Link
              to="/quests"
              className="link-hag mt-3 inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.2em] text-gold"
            >
              The Hull That Bit Back <ArrowRight className="h-3.5 w-3.5" /> Quests
            </Link>
          </motion.div>
        </motion.div>

        <div className="space-y-6">
          <motion.figure
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
            className="corner-ticks border border-line"
          >
            <img
              src="/assets/img/maps/battlemap_tide_court_drydock.png"
              alt="Top-down battlemap of the Tide-Court drydock"
              className="block w-full"
              loading="lazy"
            />
            <figcaption className="border-t border-line bg-panel-deep px-4 py-2.5 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-mist">
              Battlemap — the Tide-Court drydock
            </figcaption>
          </motion.figure>

          {/* dormant hulk rules box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
            className="corner-ticks border border-line bg-panel p-5"
          >
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-brass">
              Dormant Hulk — Rules at the Table
            </p>
            <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 font-mono text-[0.85rem] text-bone-dim">
              <div>
                <dt className="text-[0.68rem] uppercase tracking-[0.18em] text-brass">AC</dt>
                <dd>15</dd>
              </div>
              <div>
                <dt className="text-[0.68rem] uppercase tracking-[0.18em] text-brass">HP</dt>
                <dd>60 per 10 ft. of hull</dd>
              </div>
              <div>
                <dt className="text-[0.68rem] uppercase tracking-[0.18em] text-brass">Immune</dt>
                <dd>psychic damage</dd>
              </div>
              <div>
                <dt className="text-[0.68rem] uppercase tracking-[0.18em] text-brass">Reflex</dt>
                <dd>attackers take 7 (2d6) acid — pitch-blood spatters</dd>
              </div>
            </dl>
            <p className="mt-4 border-t border-line pt-3 font-body text-sm italic leading-relaxed text-mist">
              Waking one fully is the shipbirth ritual; waking one <span className="text-hag">wrongly</span>{' '}
              is Drydock Seven.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
