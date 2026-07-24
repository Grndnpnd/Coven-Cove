import { useRef } from 'react';
import type { ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SealReveal from '@/components/SealReveal';
import StatblockCard from '@/components/StatblockCard';
import { cn } from '@/lib/utils';
import type { HagProfile } from './hags';
import { ACCENT_TEXT, ACCENT_BG, ACCENT_BORDER } from './hags';

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

function Block({
  title,
  index,
  children,
}: {
  title: string;
  index: number;
  children: ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: EASE }}
    >
      <h4 className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-brass">{title}</h4>
      <div className="mt-3 font-body text-[1.05rem] leading-[1.75] text-bone-dim">{children}</div>
    </motion.section>
  );
}

function DiamondList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rotate-45 bg-hag" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * One hag's full chapter (the-three.md §§3–5): ghost numeral, alternating
 * portrait side, sourcebook sub-sections, sealed secrets, statblock, voice line.
 */
export default function HagChapter({ hag, flip }: { hag: HagProfile; flip: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const ghostY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const portrait = (
    <div className={cn('relative md:col-span-5', flip && 'md:order-2')}>
      <motion.div
        initial={{ opacity: 0, x: flip ? 60 : -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 1, ease: EASE }}
        className="sticky top-24"
      >
        <motion.div
          initial={{ clipPath: flip ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)' }}
          whileInView={{ clipPath: 'inset(0 0% 0 0%)' }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1, delay: 0.1, ease: EASE }}
          className={cn('corner-ticks border border-line bg-panel-deep')}
        >
          <img
            src={hag.portrait}
            alt={hag.portraitAlt}
            className="aspect-[2/3] w-full object-cover"
            loading="lazy"
          />
          <div className={cn('h-[3px] w-full', ACCENT_BG[hag.accent])} aria-hidden />
        </motion.div>
      </motion.div>
    </div>
  );

  return (
    <section ref={ref} className="relative overflow-hidden" aria-label={hag.name}>
      {/* ghost numeral drifting up through the chapter */}
      <motion.span
        style={{ y: ghostY }}
        className={cn(
          'pointer-events-none absolute top-6 select-none font-display leading-none text-bone/[0.05]',
          flip ? 'right-2 lg:right-10' : 'left-2 lg:left-10',
        )}
        aria-hidden
      >
        <span style={{ fontSize: 'clamp(10rem, 24vw, 20rem)' }}>{hag.numeral}</span>
      </motion.span>

      <div className="relative mx-auto max-w-[1200px] px-6 lg:px-12">
        {/* chapter header */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <p className={cn('font-mono text-[0.72rem] uppercase tracking-[0.28em]', ACCENT_TEXT[hag.accent])}>
            {hag.epithet}
          </p>
          <h3
            className="mt-3 font-display text-bone"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', lineHeight: 1.05 }}
          >
            {hag.name}
          </h3>
          <div className={cn('mt-3 h-[3px] w-24', ACCENT_BG[hag.accent])} aria-hidden />
          {hag.alsoCalled && (
            <p className="mt-3 font-body text-sm italic text-mist">
              also called “{hag.alsoCalled}” — to her face, because she insists
            </p>
          )}
        </motion.header>

        <div className="mt-10 grid gap-10 md:grid-cols-12 md:gap-12">
          {portrait}
          <div className={cn('space-y-10 md:col-span-7', flip && 'md:order-1')}>
            <Block title="Lineage" index={0}>
              <p>{hag.lineage}</p>
            </Block>
            <Block title="Appearance" index={1}>
              <p>{hag.appearance}</p>
            </Block>
            <Block title="Personality & Voice" index={2}>
              <p>{hag.personality}</p>
            </Block>
            <Block title="Roleplaying Notes" index={3}>
              <DiamondList items={hag.roleplayNotes} />
            </Block>
            <Block title="Goals" index={4}>
              <DiamondList items={hag.goals} />
            </Block>

            {/* The Interview — inset panel */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
              className="border border-line bg-panel-deep p-5 md:p-6"
            >
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-hag">
                The Interview — What She Wants From Sailors
              </p>
              <p className="mt-3 font-body text-[1.05rem] leading-[1.75] text-bone-dim">
                {hag.interview}
              </p>
            </motion.div>

            {/* Bargain style — italic-bordered callout */}
            <motion.blockquote
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.45, ease: EASE }}
              className={cn('border-l-2 py-1 pl-5', ACCENT_BORDER[hag.accent])}
            >
              <p className={cn('font-display text-xl italic', ACCENT_TEXT[hag.accent])}>
                {hag.bargainDoctrine}
              </p>
              <p className="mt-2 font-body text-[0.95rem] italic leading-relaxed text-mist">
                {hag.bargainStyle}
              </p>
            </motion.blockquote>

            {/* Secrets — sealed */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
            >
              <SealReveal id={`hag-secrets-${hag.id}`} label={`${hag.name} — Secrets. Sealed, DM eyes only. Break the seal.`}>
                <ul className="space-y-3">
                  {hag.secrets.map((s, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rotate-45 bg-hag" aria-hidden />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </SealReveal>
            </motion.div>
          </div>
        </div>

        {/* statblock — full width below the profile grid */}
        <div className="mt-14">
          <StatblockCard {...hag.statblock} />
          <p className="mt-3 font-mono text-[0.85rem] leading-relaxed text-mist">
            <span className={ACCENT_TEXT[hag.accent]}>◆</span> {hag.circleDeadNote}
          </p>
        </div>

        {/* voice line */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 1 }}
          className="mx-auto mt-12 max-w-[46ch] text-center font-display text-2xl italic leading-relaxed text-mist md:text-3xl"
        >
          “{hag.voiceLine}”
        </motion.p>
      </div>
    </section>
  );
}
