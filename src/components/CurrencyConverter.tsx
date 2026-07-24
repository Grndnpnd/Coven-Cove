import { useMemo, useState } from 'react';
import { Minus, Plus, Scale } from 'lucide-react';
import { cn } from '@/lib/utils';
import { STAPLES } from './PriceTable';

/**
 * Barter converter: gold ⇄ staples with anchor values, an off-season toggle
 * (±20%), and the ±20% haggle window. Live computation (gm-guide §5).
 */
export default function CurrencyConverter({ className }: { className?: string }) {
  const [gold, setGold] = useState('0');
  const [counts, setCounts] = useState<Record<string, number>>({ S: 0, I: 0, C: 0, O: 0, V: 0 });
  const [offSeason, setOffSeason] = useState<'neutral' | 'penalty' | 'premium'>('neutral');

  const goldNum = Math.max(0, Number(gold) || 0);
  const stapleBase = useMemo(
    () => STAPLES.reduce((sum, s) => sum + (counts[s.code] ?? 0) * s.gp, 0),
    [counts],
  );
  const modifier = offSeason === 'penalty' ? 0.8 : offSeason === 'premium' ? 1.2 : 1;
  const stapleValue = stapleBase * modifier;
  const total = goldNum + stapleValue;

  const bump = (code: string, d: number) =>
    setCounts((c) => ({ ...c, [code]: Math.max(0, (c[code] ?? 0) + d) }));

  return (
    <div className={cn('corner-ticks border border-line bg-panel p-6 md:p-8', className)}>
      <div className="flex items-center gap-3">
        <Scale className="h-5 w-5 text-brass" />
        <h3 className="font-display text-2xl text-bone">The Barter Converter</h3>
      </div>
      <p className="mt-2 font-body text-sm italic leading-relaxed text-mist">
        Total the anchor values; meet the price to close the deal. The cove runs on the
        off-season imbalance.
      </p>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div>
          <label className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-brass">
            Gold (gp)
          </label>
          <input
            type="number"
            min={0}
            value={gold}
            onChange={(e) => setGold(e.target.value)}
            className="mt-2 w-full border border-line bg-panel-deep px-3 py-2 font-mono text-lg text-gold outline-none focus:border-brass"
          />
          <div className="mt-5 space-y-2">
            {STAPLES.map((s) => (
              <div key={s.code} className="flex items-center gap-3">
                <span
                  className={cn(
                    'w-24 border-l-2 bg-panel-deep px-2 py-1 font-mono text-[0.72rem] text-bone-dim',
                    s.side === 'warm' && 'border-heat',
                    s.side === 'cold' && 'border-frost',
                    s.side === 'brass' && 'border-brass',
                  )}
                >
                  {s.code} · {s.gp}gp
                </span>
                <button
                  type="button"
                  onClick={() => bump(s.code, -1)}
                  aria-label={`Remove one ${s.name}`}
                  className="border border-line p-1 text-mist hover:border-brass hover:text-bone"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-8 text-center font-mono text-[0.95rem] text-bone">
                  {counts[s.code] ?? 0}
                </span>
                <button
                  type="button"
                  onClick={() => bump(s.code, 1)}
                  aria-label={`Add one ${s.name}`}
                  className="border border-line p-1 text-mist hover:border-brass hover:text-bone"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
                <span className="ml-auto font-mono text-[0.72rem] text-mist">{s.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-line pt-5 md:border-l md:border-t-0 md:pl-6 md:pt-0">
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-brass">
            Off-season
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {(
              [
                ['penalty', 'Off-side (−20%)'],
                ['neutral', 'In season'],
                ['premium', 'Lifeblood (+20%)'],
              ] as const
            ).map(([v, label]) => (
              <button
                key={v}
                type="button"
                onClick={() => setOffSeason(v)}
                className={cn(
                  'border px-2.5 py-1 font-mono text-[0.72rem] tracking-[0.06em] transition-colors',
                  offSeason === v
                    ? 'border-hag bg-hag/10 text-hag'
                    : 'border-line text-mist hover:border-brass hover:text-bone',
                )}
              >
                {label}
              </button>
            ))}
          </div>
          <p className="mt-2 font-body text-xs italic text-mist">
            Ice on the ice side is small change; ice to the Bleach is lifeblood.
          </p>

          <dl className="mt-6 space-y-2 font-mono text-[0.85rem]">
            <div className="flex justify-between text-bone-dim">
              <dt>Gold offered</dt>
              <dd className="text-gold">{goldNum.toFixed(0)} gp</dd>
            </div>
            <div className="flex justify-between text-bone-dim">
              <dt>Staples (adjusted)</dt>
              <dd className="text-coral">{stapleValue.toFixed(1)} gp</dd>
            </div>
            <div className="flex justify-between border-t border-line pt-2 text-bone">
              <dt className="uppercase tracking-[0.14em] text-brass">Anchor total</dt>
              <dd className="text-gold-bright">{total.toFixed(1)} gp</dd>
            </div>
          </dl>

          <div className="mt-5 border-l-2 border-hag-dim pl-3">
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-hag">
              Haggle window (±20%)
            </p>
            <p className="mt-1 font-mono text-[0.85rem] text-bone-dim">
              {(total * 0.8).toFixed(1)} – {(total * 1.2).toFixed(1)} gp
            </p>
            <p className="mt-1 font-body text-xs italic text-mist">
              Within the window: opposed Persuasion vs. the proprietor’s Insight; winner shifts
              10%.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
