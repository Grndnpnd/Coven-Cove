import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { StatAccent } from './StatblockCard';

const ACCENT_BAR: Record<StatAccent, string> = {
  hag: 'bg-hag',
  heat: 'bg-heat',
  frost: 'bg-frost',
  brass: 'bg-brass',
};

/** Large feature card for one of the Three — portrait, lineage, essence. */
export default function HagCard({
  name,
  lineage,
  essence,
  portrait,
  accent,
  href = '/the-three',
  delay = 0,
  className,
}: {
  name: string;
  lineage: string;
  essence: string;
  portrait: string;
  accent: StatAccent;
  href?: string;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      <Link
        to={href}
        className="group block border border-line bg-panel transition-all duration-300 hover:-translate-y-1 hover:border-brass"
      >
        <div className={cn('h-[3px] w-full transition-all duration-300 group-hover:h-[6px]', ACCENT_BAR[accent])} />
        <div className="overflow-hidden">
          <motion.img
            src={portrait}
            alt={name}
            initial={{ filter: 'grayscale(0.6)' }}
            whileInView={{ filter: 'grayscale(0)' }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.2 }}
            className="aspect-[2/3] w-full object-cover transition-all [transition-duration:400ms] group-hover:-translate-y-1.5 group-hover:scale-[1.02] group-hover:grayscale-0"
          />
        </div>
        <div className="p-5">
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-brass">{lineage}</p>
          <h3 className="mt-1.5 font-display text-xl text-bone md:text-2xl">{name}</h3>
          <p className="mt-2 font-body text-[0.95rem] italic leading-relaxed text-mist">{essence}</p>
        </div>
      </Link>
    </motion.div>
  );
}
