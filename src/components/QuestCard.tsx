import type { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export type BiomeTag = 'west' | 'east' | 'seam' | 'sea' | 'anywhere';

const TAG_STYLE: Record<BiomeTag, string> = {
  west: 'border-heat/60 text-heat',
  east: 'border-frost/60 text-frost',
  seam: 'border-brass/60 text-brass',
  sea: 'border-ice-deep/60 text-ice',
  anywhere: 'border-mist/50 text-mist',
};

/**
 * Side-quest accordion card. Controlled: the parent keeps `openId` so only
 * one quest is expanded at a time.
 */
export default function QuestCard({
  code,
  title,
  location,
  biome = 'anywhere',
  hook,
  beats,
  complications,
  rewards,
  children,
  open,
  onToggle,
}: {
  code: string;
  title: string;
  location: string;
  biome?: BiomeTag;
  hook: string;
  beats?: ReactNode;
  complications?: ReactNode;
  rewards?: ReactNode;
  children?: ReactNode;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border border-line bg-panel transition-colors hover:border-brass/70">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-start gap-4 px-5 py-4 text-left md:items-center"
      >
        <span className="mt-0.5 shrink-0 font-mono text-[0.85rem] tracking-[0.08em] text-brass md:mt-0">
          {code}
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="font-display text-lg text-bone md:text-xl">{title}</span>
            <span
              className={cn(
                'border px-2 py-0.5 font-mono text-[0.68rem] uppercase tracking-[0.14em]',
                TAG_STYLE[biome],
              )}
            >
              {location}
            </span>
          </span>
          <span className="mt-1 block font-body text-sm italic leading-relaxed text-mist">
            {hook}
          </span>
        </span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="h-4 w-4 shrink-0 text-brass" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="grid gap-5 border-t border-line/60 px-5 py-5 md:grid-cols-3">
              {beats && (
                <div>
                  <h4 className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-brass">Beats</h4>
                  <div className="mt-2 font-body text-[0.95rem] leading-relaxed text-bone-dim">{beats}</div>
                </div>
              )}
              {complications && (
                <div>
                  <h4 className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-brass">
                    Complications
                  </h4>
                  <div className="mt-2 font-body text-[0.95rem] leading-relaxed text-bone-dim">
                    {complications}
                  </div>
                </div>
              )}
              {rewards && (
                <div className="border-l-2 border-gold pl-4">
                  <h4 className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-gold">Rewards</h4>
                  <div className="mt-2 font-body text-[0.95rem] leading-relaxed text-bone-dim">{rewards}</div>
                </div>
              )}
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
