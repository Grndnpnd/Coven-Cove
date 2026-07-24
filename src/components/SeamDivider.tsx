import { motion } from 'framer-motion';

/** Triple-moon glyph (three nested crescents around a hollow center). */
export function TripleMoon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M12 2a6.5 6.5 0 0 0 0 13 5 5 0 0 1 0-13Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M12 9a6.5 6.5 0 0 0 0 13 5 5 0 0 1 0-13Z"
        stroke="currentColor"
        strokeWidth="1.4"
        transform="rotate(120 12 12)"
      />
      <path
        d="M12 9a6.5 6.5 0 0 0 0 13 5 5 0 0 1 0-13Z"
        stroke="currentColor"
        strokeWidth="1.4"
        transform="rotate(240 12 12)"
      />
    </svg>
  );
}

/**
 * The site's standard section divider: a 2px rule that is coral-brass on its
 * left half, ice-silver on its right half, meeting at a triple-moon mark.
 * The two halves draw inward from the edges on scroll-in.
 */
export default function SeamDivider() {
  return (
    <div className="relative flex h-10 w-full items-center" aria-hidden>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.85 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        className="h-[2px] flex-1 origin-left bg-coral-deep"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.85 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="mx-3 text-brass transition-shadow hover:drop-shadow-[0_0_8px_rgba(159,214,63,0.7)]"
      >
        <TripleMoon className="h-[18px] w-[18px]" />
      </motion.div>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.85 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        className="h-[2px] flex-1 origin-right bg-ice-deep"
      />
    </div>
  );
}
