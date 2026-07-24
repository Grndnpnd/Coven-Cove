import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Check, Copy, Download, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { GalleryCategory, GalleryItem } from './gallery-data';

const FILTERS: Array<'All' | GalleryCategory> = ['All', 'Scenes', 'Portraits', 'Maps', 'Sigils'];

/** Copies the asset path to the clipboard (for VTT scene/token config). */
function copyPath(path: string) {
  if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(path).catch(() => {});
  const ta = document.createElement('textarea');
  ta.value = path;
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand('copy');
  } catch {
    /* clipboard unavailable */
  }
  document.body.removeChild(ta);
  return Promise.resolve();
}

/**
 * The page's gallery grid + lightbox (gallery.md §2). Extends the shared
 * GalleryGrid pattern with live filter counts, sigil mattes, map badges,
 * layout-spring re-flow, and a Copy-path lightbox action.
 */
export default function GalleryShowcase({ items }: { items: GalleryItem[] }) {
  const reduced = useReducedMotion();
  const [filter, setFilter] = useState<'All' | GalleryCategory>('All');
  const [active, setActive] = useState<GalleryItem | null>(null);
  const [copied, setCopied] = useState(false);

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: items.length };
    for (const f of FILTERS.slice(1)) c[f] = items.filter((i) => i.category === f).length;
    return c;
  }, [items]);

  const shown = useMemo(
    () => (filter === 'All' ? items : items.filter((i) => i.category === filter)),
    [filter, items],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setActive(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Lock body scroll while the lightbox is open.
  useEffect(() => {
    document.body.style.overflow = active ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [active]);

  const onCopy = (path: string) => {
    void copyPath(path).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    });
  };

  return (
    <div>
      {/* filter tabs — pill group, mono, live counts */}
      <div className="mb-8 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={cn(
              'rounded-full border px-4 py-1.5 font-mono text-[0.72rem] uppercase tracking-[0.18em] transition-colors',
              filter === f
                ? 'border-hag bg-hag/10 text-hag hag-glow'
                : 'border-line text-mist hover:border-brass hover:text-bone',
            )}
          >
            {f} <span className="opacity-70">({counts[f]})</span>
          </button>
        ))}
      </div>

      {/* masonry-ish grid (CSS columns 3/2/1) */}
      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
        <AnimatePresence mode="popLayout">
          {shown.map((item, i) => (
            <motion.button
              key={item.src}
              layoutId={`gallery-${item.src}`}
              layout
              type="button"
              onClick={() => setActive(item)}
              initial={{ opacity: 0, y: reduced ? 0 : 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{
                delay: reduced ? 0 : Math.min(i, 12) * 0.04,
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
                layout: { type: 'spring', stiffness: 300, damping: 30 },
              }}
              className={cn(
                'group relative mb-5 block w-full cursor-pointer break-inside-avoid overflow-hidden border border-line text-left',
                item.category === 'Sigils' && 'corner-ticks',
              )}
            >
              {item.category === 'Sigils' ? (
                <span className="block bg-panel p-10">
                  <img
                    src={item.src}
                    alt={item.title}
                    loading="lazy"
                    className="w-full transition-transform [transition-duration:600ms] ease-out group-hover:scale-[1.03]"
                  />
                </span>
              ) : (
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  className="w-full transition-transform [transition-duration:600ms] ease-out group-hover:scale-[1.03]"
                />
              )}
              {item.category === 'Maps' && (
                <span className="absolute left-2 top-2 border border-brass/70 bg-ink/85 px-2 py-0.5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-brass">
                  grid-friendly
                </span>
              )}
              <span className="absolute inset-x-0 bottom-0 translate-y-full bg-ink/85 px-4 py-3 transition-transform duration-300 group-hover:translate-y-0">
                <span className="block font-display text-base text-bone">{item.title}</span>
                <span className="mt-0.5 inline-block border border-brass/50 px-1.5 py-0.5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-brass">
                  {item.category}
                </span>
              </span>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {/* lightbox — shared-element zoom, Esc/backdrop/X closes */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/90 p-4 md:p-10"
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
          >
            <motion.figure
              layoutId={`gallery-${active.src}`}
              transition={
                reduced ? { duration: 0.15 } : { type: 'spring', stiffness: 260, damping: 28 }
              }
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-h-full w-full max-w-5xl flex-col overflow-y-auto border border-line bg-panel"
            >
              <img
                src={active.src}
                alt={active.title}
                className={cn(
                  'max-h-[85vh] w-full object-contain',
                  active.category === 'Sigils' && 'bg-panel-deep p-8',
                )}
              />
              <figcaption className="flex flex-wrap items-center justify-between gap-4 border-t border-line px-5 py-4">
                <div className="min-w-0">
                  <p className="font-display text-lg text-bone">{active.title}</p>
                  <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                    <span className="inline-block border border-brass/50 px-1.5 py-0.5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-brass">
                      {active.category}
                    </span>
                    <span className="font-body text-[0.85rem] italic text-mist">{active.use}</span>
                  </p>
                  <p className="mt-1.5 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-mist">
                    {active.dimensions} · PNG
                  </p>
                </div>
                <div className="flex shrink-0 flex-wrap items-center gap-2">
                  <motion.a
                    href={active.src}
                    download
                    whileTap={{ scale: 0.94 }}
                    className="inline-flex items-center gap-2 border border-brass px-3 py-1.5 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-brass hover:border-gold hover:text-gold"
                  >
                    <Download className="h-3.5 w-3.5" /> Download PNG
                  </motion.a>
                  <motion.button
                    type="button"
                    onClick={() => onCopy(active.src)}
                    whileTap={{ scale: 0.94 }}
                    className={cn(
                      'inline-flex items-center gap-2 border px-3 py-1.5 font-mono text-[0.72rem] uppercase tracking-[0.16em]',
                      copied
                        ? 'border-hag text-hag'
                        : 'border-line text-mist hover:border-brass hover:text-bone',
                    )}
                  >
                    {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied ? 'Copied' : 'Copy path'}
                  </motion.button>
                </div>
              </figcaption>
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Close"
                className="absolute right-3 top-3 border border-line bg-ink/80 p-1.5 text-mist hover:text-bone"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
