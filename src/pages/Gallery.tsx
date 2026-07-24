import { motion, useReducedMotion } from 'framer-motion';
import { Grid3x3, Images, Stamp } from 'lucide-react';
import SeamDivider from '@/components/SeamDivider';
import SectionKicker from '@/components/SectionKicker';
import GalleryBanner from '@/components/gallery/GalleryBanner';
import GalleryShowcase from '@/components/gallery/GalleryShowcase';
import FoundryPack from '@/components/gallery/FoundryPack';
import { GALLERY_ITEMS } from '@/components/gallery/gallery-data';

const TABLE_NOTES = [
  {
    icon: Images,
    title: 'Handouts',
    body: 'Scene images are sized for journal handouts. Show the party the cove-from-the-sea on arrival — first impressions are a bargain you only make once.',
  },
  {
    icon: Grid3x3,
    title: 'Battlemaps',
    body: 'The four maps are grid-friendly orthographic top-downs. Suggested 5 ft squares — Splitmarket 30×30, Frozen Dock 40×25, Dune Ambush 35×35, Drydock 30×40.',
  },
  {
    icon: Stamp,
    title: 'Tokens',
    body: 'Portraits crop cleanly to 1:1 for token stamps. The hags deserve the big rings.',
  },
];

/** /gallery — full art gallery with lightbox + the Foundry VTT pack. */
export default function Gallery() {
  const reduced = useReducedMotion();

  return (
    <>
      <GalleryBanner
        kicker="ASSETS · ART & FOUNDRY VTT PACK"
        title="THE WHOLE COVE, BOXED"
        flavor="Every portrait, scene, battlemap, and sigil — plus seven importable Foundry actors. Take it all. Once you deal with the coven, you don't bargain back."
      />

      {/* §2 — the gallery */}
      <section className="bg-ink">
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-12 lg:py-28">
          <SectionKicker>THE ART · ALL {GALLERY_ITEMS.length} PIECES</SectionKicker>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10 mt-4 text-center font-display-sc text-bone"
            style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)', letterSpacing: '0.04em' }}
          >
            Every inch of the seam, inked.
          </motion.h2>
          <GalleryShowcase items={GALLERY_ITEMS} />
        </div>
      </section>

      <SeamDivider />

      {/* §3 — the Foundry pack */}
      <section id="foundry" className="bg-abyss">
        <div className="mx-auto max-w-[1200px] px-6 py-20 lg:px-12 lg:py-28">
          <FoundryPack />
        </div>
      </section>

      <SeamDivider />

      {/* §4 — print & table notes */}
      <section className="bg-ink">
        <div className="mx-auto max-w-[1200px] px-6 py-20 lg:px-12 lg:py-24">
          <SectionKicker>AT THE TABLE</SectionKicker>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {TABLE_NOTES.map((n, i) => (
              <motion.article
                key={n.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="border border-line bg-panel p-6"
              >
                <n.icon className="h-5 w-5 text-brass" aria-hidden />
                <h3 className="mt-4 font-display text-xl text-bone">{n.title}</h3>
                <p className="mt-2 font-body text-[0.92rem] leading-relaxed text-bone-dim">
                  {n.body}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <SeamDivider />

      {/* §5 — closing colophon */}
      <section className="bg-abyss">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center px-6 py-20 text-center lg:py-24">
          <motion.img
            src="/assets/img/sigils/sigil_triple_moon_coven.png"
            alt="The triple-moon coven sigil"
            initial={{ opacity: 0, rotate: 0 }}
            whileInView={{ opacity: 1, rotate: reduced ? 0 : 360 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: reduced ? 0.4 : 2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="h-16 w-16 rounded-full object-cover hag-glow"
          />
          <motion.p
            initial={{ opacity: 0, color: '#9A8FB5' }}
            whileInView={{
              opacity: 1,
              color: reduced ? '#9A8FB5' : ['#9A8FB5', '#9FD63F', '#9A8FB5'],
            }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 2.2, delay: 0.4, times: [0, 0.5, 1] }}
            className="mt-8 max-w-[46ch] font-display text-xl italic leading-relaxed lg:text-2xl"
          >
            &ldquo;End of guide. Once you deal with the cove, you don&rsquo;t bargain back.&rdquo;
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-5 font-mono text-[0.72rem] uppercase tracking-[0.28em] text-mist"
          >
            COVEN COVE · A FEYWILD GM GUIDE & FOUNDRY PACK
          </motion.p>
        </div>
      </section>
    </>
  );
}
