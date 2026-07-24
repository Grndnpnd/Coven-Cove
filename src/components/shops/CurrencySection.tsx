import { memo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Coins, Package, Eye, Moon } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import SectionKicker from '@/components/SectionKicker';
import { STAPLES } from '@/components/PriceTable';
import { cn } from '@/lib/utils';

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

/** Slow-rotating triple-moon watermark behind the moonmark card (8% opacity). */
const SigilWatermark = memo(function SigilWatermark() {
  const reduce = useReducedMotion();
  return (
    <motion.img
      src="/assets/img/sigils/sigil_triple_moon_coven.png"
      alt=""
      aria-hidden
      animate={reduce ? undefined : { rotate: 360 }}
      transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
      className="pointer-events-none absolute -bottom-8 -right-8 h-40 w-40 opacity-[0.08]"
    />
  );
});

interface CurrencyCard {
  num: string;
  name: string;
  icon: LucideIcon;
  body: string;
}

const CARDS: CurrencyCard[] = [
  {
    num: '01',
    name: 'Gold',
    icon: Coins,
    body: 'Outlander gold, honest and boring, accepted everywhere at a slight sniff of disdain.',
  },
  {
    num: '02',
    name: 'Staple Barter',
    icon: Package,
    body: 'Tangible goods with anchor values — the cove’s small change and its lifeblood.',
  },
  {
    num: '03',
    name: 'Secrets',
    icon: Eye,
    body: 'Verified sightings, charts, names. Worth what it’s worth once; the cove always knows if you’ve sold elsewhere. Fresh checkable oddity: 25–100 gp equiv.; a confirmed realm-fragment sighting: a favor.',
  },
  {
    num: '04',
    name: 'Favors & Moonmarks',
    icon: Moon,
    body: 'Bone tokens stamped with the triple-moon, redeemable through the chandler; anchor 25 gp but not money — standing.',
  },
];

const FAVOR_LADDER = [
  { tier: 'petty', note: '~10gp', hag: false },
  { tier: 'ledger', note: '~100gp', hag: false },
  { tier: 'deep', note: 'do not take deep favors from the coven', hag: true },
];

/** §2 — The Four Currencies (shops.md). */
export default function CurrencySection() {
  return (
    <section className="bg-ink py-20 md:py-28" aria-label="The four currencies">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <SectionKicker>§5 · The Economy</SectionKicker>
        <h2
          className="mt-4 text-center font-display-sc text-bone"
          style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)', letterSpacing: '0.04em' }}
        >
          Four currencies, one ledger
        </h2>
        <p className="mx-auto mt-4 max-w-[62ch] text-center font-body text-[1.05rem] leading-[1.75] text-bone-dim">
          Coven Cove runs on four currencies; a wise party learns all four by the second day.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
              className="relative overflow-hidden border border-line bg-panel p-6"
            >
              {card.num === '04' && <SigilWatermark />}
              <div className="flex items-start justify-between">
                <span className="font-mono text-3xl text-brass/50">{card.num}</span>
                <card.icon className="h-5 w-5 text-brass" aria-hidden />
              </div>
              <h3 className="mt-4 font-display text-xl text-gold">{card.name}</h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-bone-dim">{card.body}</p>

              {card.num === '02' && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {STAPLES.map((s, si) => (
                    <motion.span
                      key={s.code}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.4, delay: 0.3 + si * 0.06 }}
                      className={cn(
                        'border-l-2 bg-panel-deep px-2 py-1 font-mono text-[0.68rem] tracking-[0.04em] text-bone-dim',
                        s.side === 'warm' && 'border-heat',
                        s.side === 'cold' && 'border-frost',
                        s.side === 'brass' && 'border-brass',
                      )}
                    >
                      <span className="text-bone">{s.code}</span> {s.name} {s.gp}gp
                    </motion.span>
                  ))}
                </div>
              )}

              {card.num === '04' && (
                <ol className="mt-4 space-y-1.5 border-t border-line/60 pt-3">
                  {FAVOR_LADDER.map((rung) => (
                    <li key={rung.tier} className="flex items-baseline gap-2 font-mono text-[0.72rem]">
                      <span className={cn('uppercase tracking-[0.14em]', rung.hag ? 'flicker text-hag' : 'text-brass')}>
                        {rung.tier}
                      </span>
                      <span className={cn(rung.hag ? 'flicker text-hag' : 'text-mist')}>
                        {rung.note}
                      </span>
                    </li>
                  ))}
                </ol>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
