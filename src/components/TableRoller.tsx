import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Dices } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Dice-rollable table: a die button that tumbles, then highlights and
 * scrolls to the matching row with a hag-green flash.
 */
export default function TableRoller({
  rows,
  die,
  title,
  className,
}: {
  rows: string[];
  die?: 6 | 8 | 10;
  title?: string;
  className?: string;
}) {
  const sides = die ?? (rows.length <= 6 ? 6 : rows.length <= 8 ? 8 : 10);
  const [rolled, setRolled] = useState<number | null>(null);
  const [rolling, setRolling] = useState(false);
  const rowRefs = useRef<(HTMLTableRowElement | null)[]>([]);

  const roll = () => {
    if (rolling) return;
    setRolling(true);
    const n = Math.floor(Math.random() * Math.min(sides, rows.length));
    window.setTimeout(() => {
      setRolled(n);
      setRolling(false);
      rowRefs.current[n]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 500);
  };

  return (
    <div className={className}>
      <div className="mb-3 flex items-center gap-4">
        {title && (
          <h3 className="font-display text-xl text-bone md:text-2xl">{title}</h3>
        )}
        <motion.button
          type="button"
          onClick={roll}
          animate={rolling ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="ml-auto inline-flex items-center gap-2 border border-brass px-3 py-1.5 font-mono text-[0.72rem] uppercase tracking-[0.2em] text-brass transition-colors hover:bg-hag hover:border-hag hover:text-ink"
        >
          <Dices className="h-3.5 w-3.5" />
          Roll d{sides}
        </motion.button>
      </div>
      <div className="overflow-x-auto border border-line">
        <table className="w-full min-w-[420px] border-collapse text-left">
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={i}
                ref={(el) => {
                  rowRefs.current[i] = el;
                }}
                className={cn(
                  'border-t border-line/50 transition-colors duration-500 first:border-t-0',
                  i % 2 === 0 ? 'bg-panel' : 'bg-panel-deep',
                  rolled === i && 'bg-hag/15 shadow-[inset_2px_0_0_0_#9FD63F]',
                )}
              >
                <td className="w-14 px-4 py-2.5 font-mono text-[0.85rem] text-brass">{i + 1}</td>
                <td
                  className={cn(
                    'px-4 py-2.5 font-body text-[0.95rem] leading-relaxed',
                    rolled === i ? 'text-bone' : 'text-bone-dim',
                  )}
                >
                  {row}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
