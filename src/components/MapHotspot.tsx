import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

export interface Hotspot {
  id: string;
  /** position as % of map width/height */
  x: number;
  y: number;
  label: string;
  description: string;
  image?: string;
  hazards?: string;
}

/**
 * Town map with pulse markers; clicking a marker opens a right-side drawer
 * with district art, description, and hazards.
 */
export default function MapHotspot({
  mapSrc,
  hotspots,
  caption,
}: {
  mapSrc: string;
  hotspots: Hotspot[];
  caption?: string;
}) {
  const [active, setActive] = useState<Hotspot | null>(null);

  return (
    <div className="relative">
      <div className="corner-ticks relative border border-line">
        <motion.img
          src={mapSrc}
          alt="Top-down map of Coven Cove"
          initial={{ clipPath: 'inset(8% 8% 8% 8%)' }}
          whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="block w-full"
        />
        {hotspots.map((h, i) => (
          <motion.button
            key={h.id}
            type="button"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.6 + i * 0.1, duration: 0.4 }}
            onClick={() => setActive(h)}
            aria-label={h.label}
            className="group absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            style={{ left: `${h.x}%`, top: `${h.y}%` }}
          >
            <span className="absolute inset-0 -m-2 animate-ping rounded-full border border-brass/70 [animation-duration:2s]" />
            <span className="block h-3 w-3 rounded-full border-2 border-brass bg-hag hag-glow transition-transform group-hover:scale-125" />
            <span className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap border border-line bg-ink/90 px-2 py-1 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-bone opacity-0 transition-opacity group-hover:opacity-100">
              {h.label}
            </span>
          </motion.button>
        ))}
      </div>
      {caption && (
        <p className="mt-3 text-center font-mono text-[0.72rem] uppercase tracking-[0.18em] text-mist">
          {caption}
        </p>
      )}

      <AnimatePresence>
        {active && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActive(null)}
              className="fixed inset-0 z-[60] bg-ink/60"
            />
            <motion.aside
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              exit={{ x: 400 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed right-0 top-0 z-[70] h-full w-[380px] max-w-[92vw] overflow-y-auto border-l border-line bg-panel"
            >
              <div className="flex items-center justify-between border-b border-line px-5 py-4">
                <h3 className="font-display text-xl text-gold">{active.label}</h3>
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  aria-label="Close"
                  className="text-mist hover:text-bone"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              {active.image && (
                <img src={active.image} alt={active.label} className="w-full object-cover" />
              )}
              <div className="space-y-4 p-5">
                <p className="font-body text-[0.95rem] leading-relaxed text-bone-dim">
                  {active.description}
                </p>
                {active.hazards && (
                  <div className="border-l-2 border-hag-dim pl-3">
                    <p className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-hag">
                      Hazards
                    </p>
                    <p className="mt-1 font-body text-sm leading-relaxed text-mist">
                      {active.hazards}
                    </p>
                  </div>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
