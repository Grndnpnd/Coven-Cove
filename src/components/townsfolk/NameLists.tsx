import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Dices } from 'lucide-react';
import SectionKicker from '@/components/SectionKicker';
import { NAME_LISTS } from './data';

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

interface Rolled {
  lineage: string;
  name: string;
  key: number;
}

/** §4 — Name lists appendix + the random-name toy (townsfolk.md). */
export default function NameLists() {
  const [rolled, setRolled] = useState<Rolled | null>(null);

  const roll = () => {
    const list = NAME_LISTS[Math.floor(Math.random() * NAME_LISTS.length)];
    const name = list.names[Math.floor(Math.random() * list.names.length)];
    setRolled({ lineage: list.lineage, name, key: Date.now() });
  };

  return (
    <section className="bg-ink py-20 md:py-28" aria-label="Names by lineage">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <SectionKicker>§12 · Appendix</SectionKicker>
        <h2
          className="mt-4 text-center font-display-sc text-bone"
          style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)', letterSpacing: '0.04em' }}
        >
          Names, by lineage
        </h2>

        {/* random name toy */}
        <div className="mx-auto mt-8 flex max-w-[640px] flex-col items-center gap-4 border border-line bg-panel px-6 py-6">
          <motion.button
            type="button"
            onClick={roll}
            whileTap={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 border border-brass px-4 py-2 font-mono text-[0.72rem] uppercase tracking-[0.2em] text-brass transition-colors hover:bg-hag/10 hover:text-hag"
          >
            <Dices className="h-4 w-4" aria-hidden />
            Random name
          </motion.button>
          <div className="flex min-h-[64px] items-center text-center">
            <AnimatePresence mode="wait">
              {rolled ? (
                <motion.p
                  key={rolled.key}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <span className="font-display text-2xl text-gold md:text-3xl">{rolled.name}</span>
                  <span className="ml-3 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-mist">
                    {rolled.lineage}
                  </span>
                </motion.p>
              ) : (
                <motion.p
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="font-body text-sm italic text-mist"
                >
                  Every made person wakes knowing their name. Roll to wake one.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {NAME_LISTS.map((list, i) => (
            <motion.div
              key={list.lineage}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
              className="bg-panel p-5"
            >
              <h3 className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-brass">
                {list.lineage}
              </h3>
              <p className="mt-2 font-body text-[0.95rem] leading-[1.8] text-bone-dim">
                {list.names.join(', ')}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
