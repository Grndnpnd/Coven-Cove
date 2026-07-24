import { useEffect, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { TripleMoon } from './SeamDivider';

/**
 * DM-eyes-only spoiler gate. A wax-seal button over sealed content; clicking
 * cracks the seal and unfurls the truth. Open state persists per session when
 * an `id` is provided.
 */
export default function SealReveal({
  children,
  id,
  label = 'Sealed — DM eyes only. Break the seal.',
}: {
  children: ReactNode;
  id?: string;
  label?: string;
}) {
  const storageKey = id ? `coven-cove:seal:${id}` : null;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (storageKey && sessionStorage.getItem(storageKey) === 'open') setOpen(true);
  }, [storageKey]);

  const breakSeal = () => {
    setOpen(true);
    if (storageKey) sessionStorage.setItem(storageKey, 'open');
  };

  return (
    <div className="border border-line bg-panel-deep">
      <AnimatePresence mode="wait" initial={false}>
        {!open ? (
          <motion.button
            key="seal"
            onClick={breakSeal}
            exit={{ scale: 1.4, opacity: 0, rotate: 8 }}
            transition={{ duration: 0.35 }}
            className="flex w-full items-center gap-4 px-5 py-4 text-left"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-hag-dim/40 hag-glow">
              <TripleMoon className="h-6 w-6 text-hag" />
            </span>
            <span className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-mist">
              {label}
            </span>
          </motion.button>
        ) : (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            transition={{ height: { duration: 0.5, ease: 'easeInOut' }, opacity: { duration: 0.4, delay: 0.15 } }}
            className="overflow-hidden"
          >
            <div className="border-l-2 border-hag px-5 py-4 font-body text-[0.95rem] leading-relaxed text-bone-dim">
              <p className="mb-2 font-mono text-[0.72rem] uppercase tracking-[0.2em] text-hag">
                The seal is broken
              </p>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
