import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Download, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface GalleryItem {
  src: string;
  caption: string;
  category: 'Scenes' | 'Portraits' | 'Maps' | 'Sigils';
  /** e.g. "16:9 · 2K" */
  dimensions?: string;
  use?: string;
}

const FILTERS = ['All', 'Scenes', 'Portraits', 'Maps', 'Sigils'] as const;

/** Masonry-ish gallery (CSS columns) with category filter tabs and lightbox. */
export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('All');
  const [active, setActive] = useState<GalleryItem | null>(null);

  const shown = useMemo(
    () => (filter === 'All' ? items : items.filter((i) => i.category === filter)),
    [filter, items],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setActive(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={cn(
              'border px-3 py-1.5 font-mono text-[0.72rem] uppercase tracking-[0.18em] transition-colors',
              filter === f
                ? 'border-hag bg-hag/10 text-hag'
                : 'border-line text-mist hover:border-brass hover:text-bone',
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
        {shown.map((item) => (
          <motion.button
            key={item.src}
            layoutId={`gallery-${item.src}`}
            type="button"
            onClick={() => setActive(item)}
            className="group relative mb-5 block w-full cursor-pointer overflow-hidden border border-line text-left"
          >
            <img
              src={item.src}
              alt={item.caption}
              loading="lazy"
              className="w-full transition-transform [transition-duration:600ms] ease-out group-hover:scale-[1.03]"
            />
            <span className="absolute inset-x-0 bottom-0 translate-y-full bg-ink/85 px-4 py-3 transition-transform duration-300 group-hover:translate-y-0">
              <span className="block font-body text-sm text-bone">{item.caption}</span>
              <span className="mt-0.5 block font-mono text-[0.68rem] uppercase tracking-[0.16em] text-brass">
                {item.category}
              </span>
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/90 p-4 md:p-10"
          >
            <motion.figure
              layoutId={`gallery-${active.src}`}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-full w-full max-w-4xl border border-line bg-panel"
            >
              <img
                src={active.src}
                alt={active.caption}
                className="max-h-[70vh] w-full object-contain"
              />
              <figcaption className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-5 py-4">
                <div>
                  <p className="font-body text-[0.95rem] text-bone">{active.caption}</p>
                  <p className="mt-1 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-mist">
                    {active.category}
                    {active.dimensions && ` · ${active.dimensions}`}
                    {active.use && ` · ${active.use}`}
                  </p>
                </div>
                <a
                  href={active.src}
                  download
                  className="inline-flex items-center gap-2 border border-brass px-3 py-1.5 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-brass hover:border-gold hover:text-gold"
                >
                  <Download className="h-3.5 w-3.5" /> Download
                </a>
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
