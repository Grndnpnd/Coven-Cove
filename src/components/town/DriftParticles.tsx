import { memo, useMemo } from 'react';

/**
 * Faint biome particle layer (≤30 motes, transform-only CSS) for the Bleach
 * (sand) and Rime (snow) sections. Memoized so parent re-renders never reset
 * the drift loops. Reduced-motion users get static motes (index.css).
 */
const DriftParticles = memo(function DriftParticles({
  kind,
  count = 26,
}: {
  kind: 'sand' | 'snow';
  count?: number;
}) {
  const motes = useMemo(
    () =>
      Array.from({ length: Math.min(count, 30) }, (_, i) => ({
        id: i,
        left: (i * 37 + 11) % 100,
        top: (i * 53 + 7) % 100,
        size: kind === 'sand' ? 2 + ((i * 7) % 3) : 2 + ((i * 5) % 4),
        dur: 7 + ((i * 13) % 9),
        delay: -((i * 17) % 12),
      })),
    [kind, count],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {motes.map((m) => (
        <span
          key={m.id}
          className={kind === 'sand' ? 'sand-mote' : 'snow-flake'}
          style={{
            left: `${m.left}%`,
            top: `${m.top}%`,
            width: m.size,
            height: m.size,
            animationDuration: `${m.dur}s`,
            animationDelay: `${m.delay}s`,
          }}
        />
      ))}
    </div>
  );
});

export default DriftParticles;
