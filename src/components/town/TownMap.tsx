import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ArrowDown, AlertTriangle } from 'lucide-react';

export interface District {
  id: string;
  x: number;
  y: number;
  label: string;
  kicker: string;
  summary: string;
  image?: string;
  imageAlt?: string;
  hazards: string[];
  anchor: string;
}

export const DISTRICTS: District[] = [
  {
    id: 'splitmarket',
    x: 50,
    y: 38,
    label: 'Splitmarket',
    kicker: '§4 · The Seam — Neutral Ground',
    summary:
      'The market square sits astride the seam: west half bleached coral flagstones shimmering with heat, east half black ice flagstones smoking with cold, mixed stalls built to straddle. Neutral ground, protected by a working older than the coven. Wicker Tom stands at the seam-line, where a less cheerful town would put gallows.',
    image: '/assets/img/maps/battlemap_splitmarket_square.png',
    imageAlt: 'Battlemap of Splitmarket square astride the seam',
    hazards: ['Seam-law'],
    anchor: '#splitmarket',
  },
  {
    id: 'bleach',
    x: 24,
    y: 35,
    label: 'The Bleach',
    kicker: '§4 · West Side — Coral Desert Quarter',
    summary:
      'Bleached-white crushed-coral sand and brutal hot dry days. Raised boardwalk streets; thick-walled coral-block buildings with coral-glass windscreens angled like squinting eyes. The Bleach holds the cistern quarter, the glass kilns, the salt market, and the boarding houses favored by outlander crews. The west-sider motto, half blessing and half diagnosis: the coral always grows.',
    hazards: ['Wind Teeth'],
    anchor: '#bleach',
  },
  {
    id: 'rime',
    x: 75,
    y: 42,
    label: 'The Rime',
    kicker: '§4 · East Side — Frozen Quarter',
    summary:
      'Frozen tundra backing into mountains: glacial ice sheets, frozen cliffs, streets cut into blue ice and roofed with hide and snow. The Rime holds the fishery and blubber-oil rendering, the ice-harvesters’ rowhouses, the frozen half of the harbor, and the Rimefolk — mostly hag-crafted cold-bloods who find the west side genuinely distressing.',
    hazards: ['Deep Freeze', 'Thin Ice'],
    anchor: '#rime',
  },
  {
    id: 'docks',
    x: 24,
    y: 81,
    label: 'Keelrow & Icefast Quay',
    kicker: '§4 · The Docks & Frozen Harbor',
    summary:
      'Keelrow (west): sand-dredged timber piers over pale coral flats, kept clear by tide-scows and push-broom crews. Icefast Quay (east): a working dock built on the frozen harbor — ships winched in on runners and cradled in ice, masts wrapped in hide. The seam runs out between them, visible on the water; Harbormaster Brullo Icekeel works from a booth built exactly on the line.',
    image: '/assets/img/maps/battlemap_frozen_dock.png',
    imageAlt: 'Battlemap of the Icefast Quay frozen dock',
    hazards: ['Thin ice at the quay'],
    anchor: '#docks',
  },
  {
    id: 'cradles',
    x: 72,
    y: 13,
    label: 'The Cradles',
    kicker: '§4 · The Shipyards & Drydocks',
    summary:
      'Northeast of the docks, where flat ice meets quarry-cut coral stone: seven drydocks, and in them the town’s grief. Six dormant mimic-hulks hang in cradles in stages of half-birth — not dead; the ritual stopped mid-word, and they are paused the way Prismeer’s archfey was paused. Drydock Seven holds the one that is waking.',
    image: '/assets/img/scenes/scene_silent_shipyard_dormant_hulks.png',
    imageAlt: 'Six half-born mimic-ship hulls hanging in cradles at dusk',
    hazards: ['Dormant hulks', 'Drydock Seven'],
    anchor: '#cradles',
  },
  {
    id: 'tide-court',
    x: 50,
    y: 76,
    label: 'The Tide-Court',
    kicker: '§4 · The Stronghold',
    summary:
      'Perched on the rock spur where the seam meets the sea: driftwood, sea-bone, barnacle-crusted towers; tattered violet sails; sickly-green window light; the glowing triple-moon above the gate. The interview hall’s floor is coral flagstone west, black ice east; the scrying cauldron sits exactly on the seam, and so do the Three.',
    hazards: ['The Tideguard'],
    anchor: '#tide-court',
  },
  {
    id: 'gullet',
    x: 38,
    y: 92,
    label: 'The Gullet',
    kicker: '§4 · The Bay — Two Miles Offshore',
    summary:
      'The bay splits like everything else — coral flats west, ice east. Just west of the seam-line’s extension stands the Gullet: a whirlpool a quarter-mile across — slow, patient, permanent. Locals refuse to sail near it and do not elaborate beyond spitting.',
    hazards: ['The draw'],
    anchor: '#gullet',
  },
];

/**
 * Interactive town map (the-town.md §2): pulse markers over the top-down map,
 * a right-side drawer per district, legend chips, and the italic footnote.
 * Page-local extension of the shared MapHotspot pattern — the drawer adds the
 * § kicker, hazard chip row, and a "Read below" anchor per the-town.md.
 */
export default function TownMap() {
  const [active, setActive] = useState<District | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="relative">
      <div className="corner-ticks relative border border-line bg-ink p-2 md:p-3">
        <div className="relative overflow-hidden">
          <motion.img
            src="/assets/img/maps/map_coven_cove_topdown.png"
            alt="Top-down map of Coven Cove: the seam splitting desert and frozen quarters"
            initial={{ clipPath: 'inset(6% 6% 6% 6%)' }}
            whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="block w-full"
          />
          {DISTRICTS.map((d, i) => (
            <motion.button
              key={d.id}
              type="button"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: 1.0 + i * 0.1, duration: 0.4, ease: 'backOut' }}
              onClick={() => setActive(d)}
              aria-label={`Open district: ${d.label}`}
              className="group absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer p-2"
              style={{ left: `${d.x}%`, top: `${d.y}%` }}
            >
              <span
                className="absolute inset-0 animate-ping rounded-full border border-brass/70 [animation-duration:2s]"
                style={{ animationDelay: `${i * 0.3}s` }}
                aria-hidden
              />
              <span className="relative block h-2.5 w-2.5 rounded-full border-2 border-brass bg-hag hag-glow transition-transform group-hover:scale-125" />
              <span className="pointer-events-none absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap border border-line bg-ink/90 px-2 py-1 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-bone opacity-0 transition-opacity group-hover:opacity-100">
                {d.label}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* legend */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-3 font-mono text-[0.72rem] uppercase tracking-[0.18em]">
        <span className="border border-line bg-panel-deep px-3 py-1.5 text-brass">● on the seam</span>
        <span className="border border-line bg-panel-deep px-3 py-1.5 text-coral-deep">● the Bleach (west)</span>
        <span className="border border-line bg-panel-deep px-3 py-1.5 text-ice-deep">● the Rime (east)</span>
      </div>
      <p className="mx-auto mt-4 max-w-[64ch] text-center font-body text-sm italic leading-relaxed text-mist">
        The seam runs north into the hinterland and south into the bay — pale coral flats to
        starboard, skinning ice to port. Fishermen cross the line at a run.
      </p>

      {/* district drawer */}
      <AnimatePresence>
        {active && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActive(null)}
              className="fixed inset-0 z-[60] bg-ink/40"
            />
            <motion.aside
              initial={{ x: 380 }}
              animate={{ x: 0 }}
              exit={{ x: 380 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed right-0 top-0 z-[70] h-full w-[380px] max-w-[92vw] overflow-y-auto border-l border-line bg-panel"
              role="dialog"
              aria-label={active.label}
            >
              <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4">
                <div>
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-brass">
                    {active.kicker}
                  </p>
                  <h3 className="mt-1 font-display text-2xl text-gold">{active.label}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  aria-label="Close"
                  className="mt-1 shrink-0 text-mist hover:text-bone"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              {active.image && (
                <img src={active.image} alt={active.imageAlt ?? active.label} className="w-full object-cover" />
              )}
              <div className="space-y-5 p-5">
                <p className="font-body text-[0.95rem] leading-relaxed text-bone-dim">
                  {active.summary}
                </p>
                <div>
                  <p className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-hag">
                    Hazards
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {active.hazards.map((h) => (
                      <a
                        key={h}
                        href={active.anchor}
                        onClick={() => setActive(null)}
                        className="flex items-center gap-1.5 border border-hag-dim/60 bg-panel-deep px-2.5 py-1 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-hag transition-colors hover:border-hag"
                      >
                        <AlertTriangle className="h-3 w-3" />
                        {h}
                      </a>
                    ))}
                  </div>
                </div>
                <a
                  href={active.anchor}
                  onClick={() => setActive(null)}
                  className="link-hag inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.2em] text-gold"
                >
                  Read below <ArrowDown className="h-3.5 w-3.5" />
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
