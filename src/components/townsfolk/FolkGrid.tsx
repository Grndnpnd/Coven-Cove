import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import SealReveal from '@/components/SealReveal';
import SectionKicker from '@/components/SectionKicker';
import Nameplate from './Nameplate';
import type { Folk, FolkCategory } from './data';
import { FOLK, FILTERS } from './data';
import { cn } from '@/lib/utils';

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

function FolkCard({ folk, index }: { folk: Folk; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{
        layout: { type: 'spring', stiffness: 300, damping: 32 },
        duration: 0.5,
        delay: index * 0.07,
        ease: EASE,
      }}
      className={cn(
        'group border border-line bg-panel transition-colors hover:border-brass',
        open && 'border-brass',
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="block w-full text-left"
      >
        {folk.portrait ? (
          <div className="overflow-hidden">
            <img
              src={folk.portrait}
              alt={folk.name}
              className="aspect-[2/3] w-full object-cover grayscale-[0.5] transition-all duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
            />
          </div>
        ) : folk.flag ? (
          <div className="overflow-hidden bg-panel-deep">
            <img
              src={folk.flag}
              alt="The corsair fleet flag — Lord Goldbreast's stand-in portrait"
              className="aspect-[3/2] w-full object-cover grayscale-[0.5] transition-all duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
            />
          </div>
        ) : (
          <Nameplate name={folk.name} />
        )}
        <div className="flex items-start justify-between gap-3 p-4">
          <div>
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-brass">
              {folk.kicker}
            </p>
            <h3 className="mt-1 font-display text-lg text-bone">{folk.name}</h3>
            <p className="mt-1.5 font-body text-sm leading-relaxed text-mist">{folk.role}</p>
          </div>
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.3 }}
            className="mt-1 shrink-0 border border-line p-1 text-brass"
            aria-hidden
          >
            <Plus className="h-4 w-4" />
          </motion.span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ height: { duration: 0.45, ease: 'easeInOut' }, opacity: { duration: 0.3 } }}
            className="overflow-hidden"
          >
            <div className="space-y-4 border-t border-line/60 p-4">
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.35 }}
                className="font-body text-[0.95rem] leading-relaxed text-bone-dim"
              >
                {folk.description}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.16, duration: 0.35 }}
                className="border border-line bg-panel-deep p-3"
              >
                <p className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-brass">
                  Stat note
                </p>
                <p className="mt-1 font-mono text-[0.82rem] leading-relaxed text-bone-dim">
                  {folk.stat}
                </p>
                {folk.statLink && (
                  <Link
                    to={folk.statLink.to}
                    className="link-hag mt-2 inline-block font-mono text-[0.72rem] uppercase tracking-[0.14em] text-gold"
                  >
                    {folk.statLink.text}
                  </Link>
                )}
              </motion.div>
              {folk.questLink && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.35 }}
                >
                  <Link
                    to={folk.questLink.to}
                    className="link-hag font-mono text-[0.72rem] uppercase tracking-[0.14em] text-gold"
                  >
                    {folk.questLink.text} →
                  </Link>
                </motion.div>
              )}
              {folk.secret && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.24, duration: 0.35 }}
                >
                  <SealReveal id={`folk-${folk.id}-secret`}>
                    <p>{folk.secret}</p>
                  </SealReveal>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/** §3 — The Named Folk: filterable, expandable character grid. */
export default function FolkGrid() {
  const [filter, setFilter] = useState<'All' | FolkCategory>('All');
  const visible = FOLK.filter((f) => filter === 'All' || f.category === filter);

  return (
    <section className="bg-abyss py-20 md:py-28" aria-label="The named folk">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <SectionKicker>§7 · The Named Folk</SectionKicker>
        <h2
          className="mt-4 text-center font-display-sc text-bone"
          style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)', letterSpacing: '0.04em' }}
        >
          People of the cove
        </h2>
        <p className="mx-auto mt-4 max-w-[62ch] text-center font-body text-[1.05rem] leading-[1.75] text-bone-dim">
          Stat notes where relevant; most cove-folk are noncombatants, and the cove works hard to
          keep it that way.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={cn(
                'border px-3 py-1.5 font-mono text-[0.72rem] uppercase tracking-[0.14em] transition-colors',
                filter === f
                  ? 'border-hag bg-hag/10 text-hag'
                  : 'border-line text-mist hover:border-brass hover:text-bone',
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-10 grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((folk, i) => (
              <FolkCard key={folk.id} folk={folk} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
