import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

/** Grid card for townsfolk — portrait, name, title kicker, one-line role. */
export default function NPCCard({
  name,
  title,
  role,
  portrait,
  delay = 0,
  className,
  onClick,
}: {
  name: string;
  title: string;
  role: string;
  portrait: string;
  delay?: number;
  className?: string;
  onClick?: () => void;
}) {
  const inner = (
    <>
      <div className="overflow-hidden">
        <img
          src={portrait}
          alt={name}
          className="aspect-[2/3] w-full object-cover grayscale-[0.35] transition-all duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
        />
      </div>
      <div className="p-4">
        <p className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-brass">{title}</p>
        <h3 className="mt-1 font-display text-lg text-bone">{name}</h3>
        <p className="mt-1.5 font-body text-sm leading-relaxed text-mist">{role}</p>
      </div>
    </>
  );

  const shared = cn(
    'group block border border-line bg-panel text-left transition-all duration-300 hover:-translate-y-1 hover:border-brass',
    className,
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {onClick ? (
        <button type="button" onClick={onClick} className={shared}>
          {inner}
        </button>
      ) : (
        <div className={shared}>{inner}</div>
      )}
    </motion.div>
  );
}
