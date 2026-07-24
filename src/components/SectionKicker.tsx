import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

/** Mono uppercase eyebrow label flanked by brass dashes, above every H2. */
export default function SectionKicker({
  children,
  align = 'center',
  className,
}: {
  children: ReactNode;
  align?: 'center' | 'left';
  className?: string;
}) {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.5 }}
      className={cn(
        'flex items-center gap-4 font-mono text-[0.72rem] uppercase tracking-[0.28em] text-brass',
        align === 'center' && 'justify-center',
        className,
      )}
    >
      <span className="inline-block h-px w-6 bg-brass" aria-hidden />
      <span>{children}</span>
      <span className="inline-block h-px w-6 bg-brass" aria-hidden />
    </motion.p>
  );
}
