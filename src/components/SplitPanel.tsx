import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { TripleMoon } from './SeamDivider';

/**
 * Two-up panel with the hard seam down its middle: warm west (#2A1E26) vs
 * frozen east (#16222E), a 2px knife-cut between, a triple-moon riding the
 * line. Never blend across the split.
 */
export default function SplitPanel({
  west,
  east,
  westTitle,
  eastTitle,
  seam = true,
  className,
}: {
  west: ReactNode;
  east: ReactNode;
  westTitle?: string;
  eastTitle?: string;
  seam?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'relative grid overflow-hidden border border-line md:grid-cols-2',
        className,
      )}
    >
      <div className="relative bg-[#2A1E26] p-6 md:p-8">
        {westTitle && (
          <p className="mb-3 font-mono text-[0.72rem] uppercase tracking-[0.2em] text-heat">
            {westTitle}
          </p>
        )}
        <div className="font-body text-[0.95rem] leading-relaxed text-bone-dim">{west}</div>
      </div>
      <div className="relative bg-[#16222E] p-6 md:p-8">
        {eastTitle && (
          <p className="mb-3 font-mono text-[0.72rem] uppercase tracking-[0.2em] text-frost">
            {eastTitle}
          </p>
        )}
        <div className="font-body text-[0.95rem] leading-relaxed text-bone-dim">{east}</div>
      </div>
      {seam && (
        <>
          {/* horizontal knife-cut on mobile, vertical on desktop */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="absolute left-0 top-1/2 h-[2px] w-full origin-left bg-bone/80 shadow-[0_0_12px_rgba(159,214,63,0.4)] md:hidden"
            aria-hidden
          />
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="absolute left-1/2 top-0 hidden h-full w-[2px] origin-top -translate-x-1/2 bg-bone/80 shadow-[0_0_12px_rgba(159,214,63,0.4)] md:block"
            aria-hidden
          />
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink p-1 text-brass"
            aria-hidden
          >
            <TripleMoon className="h-4 w-4" />
          </div>
        </>
      )}
    </div>
  );
}
