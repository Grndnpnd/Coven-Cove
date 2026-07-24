import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import SplitPanel from '@/components/SplitPanel';
import SectionKicker from '@/components/SectionKicker';

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const SEAM_LAWS = [
  {
    title: 'The seam weighs truth',
    text: 'On the seam, deliberate lies about the terms or quality of goods will not come out of the speaker’s mouth (as zone of truth, DC 15, applying only to statements of bargain). Haggling about value is free; lying about substance is impossible.',
  },
  {
    title: 'Seam-sworn bargains bind',
    text: 'A deal struck with both parties on the seam, witnessed and sealed (a coin flipped across the line is traditional), carries a minor geas: the breaker’s hag-light brand itches, and the Three know within a day. Enforcement is social, economic, and — for repeat offenders — veterinary.',
  },
  {
    title: 'Crossing the Flip',
    text: 'First crossing each day: DC 12 Wisdom save or disoriented until the end of your next turn (heat-shock and frost-shock simultaneously). Locals cross without noticing; sailors stagger. The town’s favorite free entertainment.',
  },
  {
    title: 'Violence on the seam',
    text: 'The cove’s one capital offense short of cheating the coven. The Tideguard drags offenders off the line before dealing with them.',
  },
];

/** §3 — The Seam: Splitmarket, neutral ground (the-town.md §3). */
export default function Splitmarket() {
  const imgRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <div>
      <SectionKicker>§4 · The Seam — Neutral Ground</SectionKicker>
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="mt-4 text-center font-display-sc text-bone"
        style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)', letterSpacing: '0.04em' }}
      >
        Splitmarket
      </motion.h2>

      {/* battlemap spanning the layout seam, parallax ±30px */}
      <div ref={imgRef} className="corner-ticks relative mt-10 overflow-hidden border border-line">
        <motion.img
          src="/assets/img/maps/battlemap_splitmarket_square.png"
          alt="Battlemap of Splitmarket square — coral flagstones west, black ice east"
          style={{ y: reduced ? 0 : imgY }}
          className="h-[110%] w-full scale-[1.08] object-cover"
          loading="lazy"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, ease: EASE }}
        className="mt-10"
      >
        <SplitPanel
          westTitle="The Square"
          eastTitle="Seam-Law — Rules at the Table"
          west={
            <div className="space-y-4">
              <p>
                The market square sits astride the seam: west half bleached coral flagstones
                shimmering with heat, east half black ice flagstones smoking with cold, mixed
                stalls built to straddle. Neutral ground, protected by a working older than the
                coven.
              </p>
              <p>
                <span className="text-bone">Wicker Tom</span> — a six-foot wicker figure hung with
                shells and old name-tags — stands at the seam-line, where a less cheerful town
                would put gallows. Nobody admits to maintaining him; once a tenday he says
                something aloud, in a voice like a hull settling, and it comes true.
              </p>
            </div>
          }
          east={
            <ol className="space-y-4">
              {SEAM_LAWS.map((law, i) => (
                <motion.li
                  key={law.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
                  className="group flex gap-4 border border-line bg-panel-deep/60 p-4"
                  style={{ perspective: 400 }}
                >
                  <motion.span
                    className="flex h-8 w-8 shrink-0 items-center justify-center border border-brass font-mono text-[0.85rem] text-brass"
                    whileHover={{ rotateX: 360 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                    aria-hidden
                  >
                    {i + 1}
                  </motion.span>
                  <div>
                    <p className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-frost">
                      {law.title}
                    </p>
                    <p className="mt-1.5 font-body text-sm leading-relaxed text-bone-dim">
                      {law.text}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ol>
          }
        />
      </motion.div>
    </div>
  );
}
