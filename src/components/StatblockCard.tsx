import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export type StatAccent = 'hag' | 'heat' | 'frost' | 'brass';

export interface StatblockAbility {
  str: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number;
}

export interface StatblockEntry {
  name: string;
  text: string;
}

export interface StatblockCardProps {
  name: string;
  typeLine: string;
  ac: string;
  hp: string;
  speed: string;
  abilities: StatblockAbility;
  traits?: StatblockEntry[];
  actions?: StatblockEntry[];
  cr: string;
  xp: string;
  accent?: StatAccent;
  className?: string;
}

const ACCENT_BAR: Record<StatAccent, string> = {
  hag: 'bg-hag',
  heat: 'bg-heat',
  frost: 'bg-frost',
  brass: 'bg-brass',
};

const fmtMod = (score: number) => {
  const m = Math.floor((score - 10) / 2);
  return `${score} (${m >= 0 ? '+' : ''}${m})`;
};

function TaperedRule({ delay = 0 }: { delay?: number }) {
  return (
    <motion.svg
      viewBox="0 0 200 6"
      preserveAspectRatio="none"
      className="h-[6px] w-full text-brass"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
      style={{ transformOrigin: 'left' }}
      aria-hidden
    >
      <polygon points="0,3 100,0 200,3 100,6" fill="currentColor" />
    </motion.svg>
  );
}

/** 5e-styled, cove-themed statblock — the site's signature component. */
export default function StatblockCard({
  name,
  typeLine,
  ac,
  hp,
  speed,
  abilities,
  traits = [],
  actions = [],
  cr,
  xp,
  accent = 'brass',
  className,
}: StatblockCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'corner-ticks relative border border-line bg-panel',
        className,
      )}
    >
      <div className={cn('h-[3px] w-full', ACCENT_BAR[accent])} aria-hidden />
      <div className="p-6 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="font-display text-2xl text-gold md:text-3xl">{name}</h3>
            <p className="mt-1 font-body text-sm italic text-mist">{typeLine}</p>
          </div>
          <div className="shrink-0 border border-hag px-2.5 py-1 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-hag">
            CR {cr} · {xp} XP
          </div>
        </div>

        <div className="mt-4"><TaperedRule delay={0.4} /></div>

        <dl className="mt-4 space-y-1.5 font-mono text-[0.85rem] text-bone-dim">
          <div className="flex gap-2">
            <dt className="text-[0.72rem] uppercase tracking-[0.14em] text-brass">AC</dt>
            <dd>{ac}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-[0.72rem] uppercase tracking-[0.14em] text-brass">HP</dt>
            <dd>{hp}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-[0.72rem] uppercase tracking-[0.14em] text-brass">Speed</dt>
            <dd>{speed}</dd>
          </div>
        </dl>

        <div className="mt-4"><TaperedRule /></div>
        <div className="grid grid-cols-6 gap-1 py-3 text-center">
          {(['str', 'dex', 'con', 'int', 'wis', 'cha'] as const).map((k) => (
            <div key={k}>
              <div className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-brass">
                {k}
              </div>
              <div className="mt-1 font-mono text-[0.85rem] text-bone-dim">
                {fmtMod(abilities[k])}
              </div>
            </div>
          ))}
        </div>
        <TaperedRule />

        {traits.length > 0 && (
          <div className="mt-5 space-y-3">
            {traits.map((t) => (
              <p key={t.name} className="font-body text-[0.95rem] leading-relaxed text-bone-dim">
                <span className="mr-1 text-hag-dim">❧</span>
                <span className="font-display italic text-bone">{t.name}.</span> {t.text}
              </p>
            ))}
          </div>
        )}

        {actions.length > 0 && (
          <div className="mt-6">
            <h4 className="font-display-sc text-lg tracking-[0.04em] text-bone">Actions</h4>
            <div className="mt-1"><TaperedRule /></div>
            <div className="mt-4 space-y-3">
              {actions.map((a) => (
                <p key={a.name} className="font-body text-[0.95rem] leading-relaxed text-bone-dim">
                  <span className="mr-1 text-hag-dim">❧</span>
                  <span className="font-display italic text-bone">{a.name}.</span> {a.text}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.article>
  );
}
