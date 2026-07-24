import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import PriceTable from '@/components/PriceTable';
import SealReveal from '@/components/SealReveal';
import SplitPanel from '@/components/SplitPanel';
import Nameplate from '@/components/townsfolk/Nameplate';
import type { Shop, Biome } from './data';
import { PRICE_TABLES } from './data';
import { cn } from '@/lib/utils';

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

/** Biome-tinted type/location pill: seam = hard warm|cold split swatch. */
function BiomePill({ biome, type, location }: { biome: Biome; type: string; location: string }) {
  return (
    <span className="inline-flex items-center gap-2 border border-line bg-panel-deep px-3 py-1 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-mist">
      {biome === 'seam' ? (
        <span className="flex h-3 w-3" aria-hidden>
          <span className="w-1/2 bg-heat" />
          <span className="w-1/2 bg-frost" />
        </span>
      ) : (
        <span
          aria-hidden
          className={cn(
            'h-3 w-3',
            biome === 'bleach' && 'bg-heat',
            biome === 'rime' && 'bg-frost',
            biome === 'docks' && 'bg-brass',
          )}
        />
      )}
      {type} · {location}
    </span>
  );
}

/** 16:9 scene art card with parallax-lite scrub (y ±20px). */
function SceneArt({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [20, -20]);

  return (
    <div ref={ref} className="corner-ticks mb-10 overflow-hidden border border-line">
      <motion.img
        src={src}
        alt={alt}
        style={{ y }}
        className="aspect-video w-full scale-[1.06] object-cover"
      />
    </div>
  );
}

/** §§6.1–6.10 — one shop block: header row, optional art, 3-col grid. */
export default function ShopSection({ shop, index }: { shop: Shop; index: number }) {
  const rows = PRICE_TABLES[shop.slug];

  return (
    <section
      id={shop.slug}
      className={cn('scroll-mt-28 py-16 md:py-24', index % 2 === 0 ? 'bg-ink' : 'bg-abyss')}
      aria-label={shop.name}
    >
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        {/* header row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-8 flex flex-wrap items-center gap-4"
        >
          <motion.span
            initial={{ scale: 0.6, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="border border-brass/60 px-2.5 py-1 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-brass"
          >
            Shop {String(shop.n).padStart(2, '0')}
          </motion.span>
          <h2 className="font-display text-[2rem] leading-tight text-bone">{shop.name}</h2>
          <BiomePill biome={shop.biome} type={shop.type} location={shop.location} />
        </motion.div>

        {shop.scene && <SceneArt src={shop.scene} alt={`${shop.name} — ${shop.type}`} />}

        <div className="grid gap-8 lg:grid-cols-12">
          {/* About — 4 cols */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="lg:col-span-4"
          >
            <p className="mb-3 font-mono text-[0.72rem] uppercase tracking-[0.2em] text-brass">
              About
            </p>
            {shop.portrait && (
              <img
                src={shop.portrait}
                alt={shop.portraitAlt ?? shop.proprietor}
                className="float-right mb-3 ml-4 aspect-[2/3] w-24 border border-line object-cover md:w-28"
              />
            )}
            <p className="font-body text-[1.05rem] leading-[1.75] text-bone-dim">
              <strong className="text-bone">{shop.proprietor}.</strong>
            </p>
            {shop.about.map((para) => (
              <p key={para.slice(0, 24)} className="mt-3 font-body text-[1.05rem] leading-[1.75] text-bone-dim">
                {para}
              </p>
            ))}
            {!shop.scene && !shop.portrait && (
              <Nameplate
                name={shop.name}
                kicker={`${shop.type} · ${shop.location}`}
                className="mt-6 aspect-auto py-10"
              />
            )}
          </motion.div>

          {/* PriceTable — 5 cols */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
            className="lg:col-span-5"
          >
            <p className="mb-3 font-mono text-[0.72rem] uppercase tracking-[0.2em] text-brass">
              Prices — gold &amp; barter
            </p>
            <PriceTable rows={rows} />
          </motion.div>

          {/* Hook & Secret — 3 cols */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.24, ease: EASE }}
            className="lg:col-span-3"
          >
            <p className="mb-3 font-mono text-[0.72rem] uppercase tracking-[0.2em] text-brass">
              Hook &amp; secret
            </p>
            <div className="space-y-4">
              {shop.hook && (
                <div className="border border-line bg-panel p-5">
                  <p className="font-body text-[0.95rem] leading-relaxed text-bone-dim">
                    {shop.hook}
                  </p>
                  {shop.hookLink && (
                    <Link
                      to={shop.hookLink.to}
                      className="link-hag mt-3 inline-block font-mono text-[0.72rem] uppercase tracking-[0.14em] text-gold"
                    >
                      {shop.hookLink.text} →
                    </Link>
                  )}
                </div>
              )}
              {shop.secret && (
                <SealReveal id={`shop-${shop.n}-secret`}>
                  <p>{shop.secret}</p>
                </SealReveal>
              )}
            </div>
          </motion.div>
        </div>

        {/* The Twain Tankard's split common room: Sweat west / Shiver east */}
        {shop.slug === 'twain-tankard' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="mt-10"
          >
            <SplitPanel
              westTitle="The Sweat — west floor"
              eastTitle="The Shiver — east floor"
              west={
                <p>
                  Sand floor, open hearth, cold drinks charged by the melt. Hessk’s side: slow,
                  deliberate, never blinks.
                </p>
              }
              east={
                <p>
                  Ice floor, hide booths, hot drinks charged by the coal. Mira’s side: quick, warm,
                  remembers every face.
                </p>
              }
            />
          </motion.div>
        )}
      </div>
    </section>
  );
}
