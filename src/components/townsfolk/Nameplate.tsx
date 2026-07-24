import { TripleMoon } from '@/components/SeamDivider';
import { cn } from '@/lib/utils';

/**
 * Ornamental nameplate for shops/NPCs with no portrait art: the name in
 * IM Fell English on a panel with a triple-moon watermark (never a
 * placeholder image box).
 */
export default function Nameplate({
  name,
  kicker,
  className,
}: {
  name: string;
  kicker?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'relative flex aspect-[2/3] w-full flex-col items-center justify-center overflow-hidden border border-line bg-panel-deep p-6 text-center',
        className,
      )}
    >
      <TripleMoon className="absolute h-2/3 w-2/3 text-line/50" aria-hidden />
      <div className="relative">
        {kicker && (
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-brass">
            {kicker}
          </p>
        )}
        <p className="mt-2 font-display text-2xl leading-snug text-bone">{name}</p>
      </div>
    </div>
  );
}
