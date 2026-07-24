import { memo } from 'react';
import type { ComponentType, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Hourglass, Droplet, CloudLightning } from 'lucide-react';
import { cn } from '@/lib/utils';

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

/** Slow independent float for the giant path letters — isolated + memoized. */
const FloatingLetter = memo(function FloatingLetter({
  letter,
  delay,
  className,
}: {
  letter: string;
  delay: number;
  className: string;
}) {
  return (
    <motion.span
      animate={{ y: [-4, 4, -4] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay }}
      className={cn('inline-block font-display leading-none', className)}
      style={{ fontSize: 'clamp(4rem, 7vw, 6rem)' }}
      aria-hidden
    >
      {letter}
    </motion.span>
  );
});

interface PathCard {
  letter: string;
  title: string;
  subtitle: string;
  mechanism: ReactNode;
  ingredients?: { icon: ComponentType<{ className?: string }>; name: string; text: string }[];
  consequences: string[];
  accentText: string;
  accentBorder: string;
  accentBg: string;
  tag?: string;
}

const PATHS: PathCard[] = [
  {
    letter: 'A',
    title: 'The New Hourglass',
    subtitle: 'Restore the coven',
    mechanism:
      'Re-anchor the circle to a new held moment. Three components, each seeded in play, cast into the cauldron on the seam at slack tide, all three hags on the line.',
    ingredients: [
      {
        icon: Hourglass,
        name: 'Sand of the Old Glass',
        text: 'An hourglass-sand fragment in the coral flats — quest “Sands of the Hourglass”. The past.',
      },
      {
        icon: Droplet,
        name: 'Water of the Old Realm',
        text: 'Morgha’s hidden jar of Bavlorna’s bathwater, or a vial from the sunken splinter. The present.',
      },
      {
        icon: CloudLightning,
        name: 'Storm of the Old Future',
        text: 'A freely-given prophecy spoken at the ritual — only Veshka can provide it, so she must choose the coven over her killing winter. A roleplay gate, not a fetch gate.',
      },
    ],
    consequences: [
      'Coven magic returns overnight; shipbirth resumes within a tenday.',
      'The town is saved — and bound deeper than ever.',
      'The party enters the coven’s ledger as creditors of the circle itself — the most valuable and dangerous entry in the book.',
    ],
    accentText: 'text-gold',
    accentBorder: 'border-gold',
    accentBg: 'bg-gold',
  },
  {
    letter: 'B',
    title: 'Inheritance of Ashes',
    subtitle: 'Break it for good',
    mechanism:
      'Sever the dead anchor: descend to the keel-crypt beneath the Tide-Court, where the husk of the old hourglass-heart hangs in grandmother’s knotwork, and destroy it — brute force, dispel magic at 9th level, a forging ritual, or Baba Yaga’s own method.',
    consequences: [
      'The Three dwindle permanently to solitary monsters.',
      'The loyalty-warp dissolves — each crafted person wakes one dawn wholly their own, from hymns to hysteria.',
      'The shipbirth dies forever, unless a consent-based rite is invented; Coven Cove survives as a free port and must learn ordinary shipbuilding.',
      'The Three will not forgive. Two will hunt. One will applaud, slowly, alone.',
    ],
    accentText: 'text-heat',
    accentBorder: 'border-heat',
    accentBg: 'bg-heat',
  },
  {
    letter: 'C',
    title: 'The Fourth Chair',
    subtitle: 'Bargain between',
    mechanism:
      'Re-anchor the circle to something the party controls: their own living ship, a held true name, a locked chest aboard containing the new hourglass. The coven works again — but the anchor is collateral and the party holds the chain.',
    consequences: [
      'Shipbirth resumes; the Three are restored but leashed — and will scheme forever to slip it.',
      'The party becomes a power in Feywild politics whether they want to or not.',
      'Somewhere far away, in a hut that walks, grandmother notices a new knot in her family’s thread.',
    ],
    accentText: 'text-frost',
    accentBorder: 'border-frost',
    accentBg: 'bg-frost',
    tag: 'The ending that generates the most sequel',
  },
];

/** Restoration paths A · B · C (the-three.md §9). */
export default function RestorationPaths() {
  return (
    <div className="mt-12 grid gap-8 lg:grid-cols-3">
      {PATHS.map((p, i) => (
        <motion.article
          key={p.letter}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, delay: i * 0.12, ease: EASE }}
          whileHover="hover"
          className="corner-ticks group relative flex flex-col border border-line bg-panel"
        >
          {/* accent floods the top border on hover */}
          <motion.div
            variants={{ hover: { scaleX: 1 } }}
            initial={{ scaleX: 0.25 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className={cn('h-[3px] w-full origin-left', p.accentBg)}
            aria-hidden
          />
          <div className="flex grow flex-col p-6 md:p-7">
            <motion.div variants={{ hover: { y: -8 } }} transition={{ duration: 0.35 }}>
              <FloatingLetter letter={p.letter} delay={i * 1.6} className={p.accentText} />
            </motion.div>
            <h4 className="mt-2 font-display text-2xl text-bone">{p.title}</h4>
            <p className={cn('mt-1 font-mono text-[0.72rem] uppercase tracking-[0.28em]', p.accentText)}>
              Path {p.letter} — {p.subtitle}
            </p>

            <p className="mt-5 font-body text-[0.95rem] leading-relaxed text-bone-dim">
              {p.mechanism}
            </p>

            {p.ingredients && (
              <ul className="mt-5 space-y-3 border-t border-line pt-5">
                {p.ingredients.map((ing) => (
                  <li key={ing.name} className="flex gap-3">
                    <ing.icon className={cn('mt-1 h-4 w-4 shrink-0', p.accentText)} />
                    <div>
                      <p className="font-mono text-[0.85rem] text-bone">{ing.name}</p>
                      <p className="mt-1 font-body text-sm leading-relaxed text-mist">{ing.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-5 border-t border-line pt-5">
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-brass">
                Consequences
              </p>
              <ul className="mt-3 space-y-2.5">
                {p.consequences.map((c, j) => (
                  <li key={j} className="flex gap-3 font-body text-[0.95rem] leading-relaxed text-bone-dim">
                    <span className={cn('mt-[0.55em] h-1.5 w-1.5 shrink-0 rotate-45', p.accentBg)} aria-hidden />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            {p.tag && (
              <p className="mt-auto pt-5 font-mono text-[0.72rem] uppercase tracking-[0.2em] text-hag">
                ◆ {p.tag}
              </p>
            )}
          </div>
        </motion.article>
      ))}
    </div>
  );
}
