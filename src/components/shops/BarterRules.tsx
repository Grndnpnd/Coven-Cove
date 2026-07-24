import { motion } from 'framer-motion';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

/** §3 — The Barter Rules Box (shops.md #rules; gm-guide §5, verbatim). */
export default function BarterRules() {
  return (
    <section id="rules" className="bg-abyss py-20 md:py-28" aria-label="The barter rules">
      <div className="mx-auto max-w-[1100px] px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="corner-ticks border border-line bg-panel"
        >
          <div className="border-b border-line bg-panel-deep px-6 py-5 md:px-10">
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-brass">
              Use at the table
            </p>
            <h2 className="mt-2 font-display text-3xl text-bone md:text-4xl">The Barter Rules</h2>
          </div>

          <ol className="grid gap-x-10 gap-y-8 px-6 py-8 md:grid-cols-2 md:px-10 md:py-10">
            <Rule n={1} title="Two prices, always" delay={0}>
              Every good and service has a gold price and a barter price, the barter price in
              staple units; mix and match.
            </Rule>
            <Rule n={2} title="Value check" delay={0.08}>
              Total the anchor values of offered barter. Meeting the price closes the deal. Within
              20% either way, <strong className="text-bone">haggle</strong>: opposed Charisma
              (Persuasion) vs. the proprietor’s Insight (most shopkeepers run +4 to +7); winner
              shifts the deal 10% their way.
            </Rule>
            <Rule n={3} title="Off-season penalty" delay={0.16}>
              <span className="mb-2 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 border border-line bg-panel-deep px-2 py-0.5 font-mono text-[0.72rem] text-frost">
                  <ArrowDown className="h-3 w-3" aria-hidden /> ice on the ice side · salt in the
                  salt market −20%
                </span>
                <span className="inline-flex items-center gap-1 border border-line bg-panel-deep px-2 py-0.5 font-mono text-[0.72rem] text-heat">
                  <ArrowUp className="h-3 w-3" aria-hidden /> ice to the Bleach · oil to the Rime
                  +20%
                </span>
              </span>
              Bartering across its own season is paying in small change; bartering across the seam
              is paying in lifeblood. The cove runs on this imbalance.
            </Rule>
            <Rule n={4} title="Favors as payment" delay={0.24}>
              A PC can offer a favor; the proprietor sets the tier. Owing a{' '}
              <em>shopkeeper</em> is safe; owing the <strong className="text-bone">chandler</strong>{' '}
              goes in the coven’s ledger; owing a <strong className="text-bone">hag</strong> is a
              campaign decision.
            </Rule>
            <Rule n={5} title="Moonmarks" delay={0.32}>
              Cannot be bought with gold — only earned, won (the seam has games), or given.
              Spending one is instantaneous and face-to-face; the chandler keeps the ledger and the
              coven reads it weekly.
            </Rule>
            <Rule n={6} title="Price norms" delay={0.4}>
              Gold prices are roughly PHB standard. Healing is scarce and priced accordingly (the
              midwife is the only reliable healer in town). On the seam, no lying about goods; off
              the seam, detected lies end trade with that shop for a tenday and{' '}
              <Link to="/encounters#tables" className="link-hag text-gold">
                start a rumor
              </Link>
              .
            </Rule>
          </ol>
        </motion.div>
      </div>
    </section>
  );
}

function Rule({
  n,
  title,
  delay,
  children,
}: {
  n: number;
  title: string;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      className="flex gap-4"
    >
      <span className="font-mono text-2xl leading-none text-brass/60">
        {String(n).padStart(2, '0')}
      </span>
      <div>
        <h3 className="font-display text-lg text-gold">{title}</h3>
        <div className="mt-1.5 font-body text-[0.95rem] leading-relaxed text-bone-dim">
          {children}
        </div>
      </div>
    </motion.li>
  );
}
