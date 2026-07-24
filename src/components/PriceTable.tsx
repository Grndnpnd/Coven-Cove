import { Coins, Package } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface PriceRow {
  item: string;
  gold: string;
  barter: string;
}

/** The five barter staples with anchor values (gm-guide §5). */
export const STAPLES = [
  { code: 'S', name: 'salt-brick', gp: 5, side: 'warm' },
  { code: 'I', name: 'ice-core', gp: 5, side: 'cold' },
  { code: 'C', name: 'coral-glass', gp: 15, side: 'warm' },
  { code: 'O', name: 'blubber-oil', gp: 10, side: 'cold' },
  { code: 'V', name: 'salvage-talent', gp: 10, side: 'brass' },
] as const;

export function StapleLegend() {
  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {STAPLES.map((s) => (
        <span
          key={s.code}
          className={cn(
            'border-l-2 bg-panel-deep px-2.5 py-1 font-mono text-[0.72rem] tracking-[0.06em] text-bone-dim',
            s.side === 'warm' && 'border-heat',
            s.side === 'cold' && 'border-frost',
            s.side === 'brass' && 'border-brass',
          )}
          title={s.name}
        >
          <span className="text-bone">{s.code}</span> {s.name} {s.gp}gp
        </span>
      ))}
    </div>
  );
}

/** Dual-currency table: Item · Gold · Barter, with staple legend chips above. */
export default function PriceTable({
  rows,
  showLegend = true,
  className,
}: {
  rows: PriceRow[];
  showLegend?: boolean;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {showLegend && <StapleLegend />}
      <div className="overflow-x-auto border border-line">
        <table className="w-full min-w-[480px] border-collapse text-left">
          <thead>
            <tr className="bg-panel-deep font-mono text-[0.72rem] uppercase tracking-[0.14em] text-mist">
              <th className="px-4 py-3 font-medium">Item / Service</th>
              <th className="px-4 py-3 font-medium">
                <span className="inline-flex items-center gap-1.5">
                  <Coins className="h-3.5 w-3.5 text-gold" /> Gold
                </span>
              </th>
              <th className="px-4 py-3 font-medium">
                <span className="inline-flex items-center gap-1.5">
                  <Package className="h-3.5 w-3.5 text-coral" /> Barter
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr
                key={r.item}
                className={cn(
                  'group border-t border-line/50 transition-shadow hover:shadow-[inset_2px_0_0_0_#9FD63F]',
                  i % 2 === 0 ? 'bg-panel' : 'bg-panel-deep',
                )}
              >
                <td className="px-4 py-2.5 font-body text-[0.95rem] text-bone-dim group-hover:text-bone">
                  {r.item}
                </td>
                <td className="whitespace-nowrap px-4 py-2.5 font-mono text-[0.85rem] text-gold">
                  {r.gold}
                </td>
                <td className="whitespace-nowrap px-4 py-2.5 font-mono text-[0.85rem] text-coral">
                  {r.barter}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
