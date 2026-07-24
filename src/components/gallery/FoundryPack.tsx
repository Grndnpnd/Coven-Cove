import { useState } from 'react';
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Check, Download } from 'lucide-react';
import { cn } from '@/lib/utils';
import SectionKicker from '@/components/SectionKicker';

interface FoundryActor {
  creature: string;
  role: string;
  cr: string;
  slug: string;
}

/** The seven importable actors (foundry/README.md + gallery.md §3). */
const ACTORS: FoundryActor[] = [
  { creature: 'Morgha Brineshroud', role: 'Sea hag of the Drowned Past', cr: 'CR 5 (1,800)', slug: 'morgha-brineshroud' },
  { creature: 'Raspka Irongrinn (Granny Threadbare)', role: 'Annis hag of the Iron Present', cr: 'CR 9 (5,000)', slug: 'raspka-irongrinn' },
  { creature: 'Veshka Morozova', role: 'Bheur hag of the Storm-Cast Future', cr: 'CR 10 (5,900)', slug: 'veshka-morozova' },
  { creature: 'Feral Mimic-Hulk ("the Seventh Born")', role: 'Drydock Seven encounter', cr: 'CR 9 (5,000)', slug: 'feral-mimic-hulk' },
  { creature: 'Wind-Teeth Swarm', role: 'Coral-sand storm hazard', cr: 'CR 4 (1,100)', slug: 'wind-teeth-swarm' },
  { creature: 'Rime-Woken Fisher', role: 'Frost-side ambush unit', cr: 'CR 2 (450)', slug: 'rime-woken-fisher' },
  { creature: 'Tideguard', role: 'Hag-crafted town guard', cr: 'CR 3 (700)', slug: 'tideguard' },
];

/** Download anchor with tap-scale and a brief Download→Check swap on click. */
function FileLink({ href, label }: { href: string; label: string }) {
  const [done, setDone] = useState(false);
  return (
    <motion.a
      href={href}
      download
      whileTap={{ scale: 0.94 }}
      onClick={() => {
        setDone(true);
        window.setTimeout(() => setDone(false), 1200);
      }}
      className={cn(
        'inline-flex items-center gap-1.5 border px-2.5 py-1 font-mono text-[0.7rem] uppercase tracking-[0.14em] transition-colors',
        done ? 'border-hag text-hag' : 'border-brass/60 text-brass hover:border-gold hover:text-gold',
      )}
    >
      {done ? <Check className="h-3.5 w-3.5" /> : <Download className="h-3.5 w-3.5" />}
      {label}
    </motion.a>
  );
}

const METHOD_1_STEPS = [
  <>Copy the <code className="font-mono text-gold">foundry/actors/</code> files somewhere you can reach from your machine.</>,
  <>In your world, open the <strong className="text-bone">Actors</strong> sidebar tab.</>,
  <>Drag a <code className="font-mono text-gold">.json</code> file into the Actors sidebar, <em>or</em> click an actor&rsquo;s sheet header menu &rarr; <strong className="text-bone">Import Data</strong> and select the file. (You can also right-click the Actors sidebar &rarr; Import Data, depending on core version.)</>,
  <>Open the imported actor and check it over: ability scores, HP, AC, CR, skills, traits, weapons (with attack/damage activities), save-based features (Salt-Smother, Howling Dirge, Splinter Volley), and the hags&rsquo; innate spell entries.</>,
];

const METHOD_1_NOTES = [
  'The JSON targets the dnd5e 4.x data model with conservative fields; anything the system doesn\u2019t recognize is ignored on import, and omitted fields fall back to system defaults.',
  'Recharge abilities (Salt-Smother, Howling Dirge, Sew the Wound, Splinter Volley) carry "(Recharge 5\u20136)" in the feature name; roll the recharge die (d6, recharges on 5\u20136) at the start of the creature\u2019s turns, or set up uses/recovery to taste.',
  'Save DCs on features are flat values taken from the guide (e.g. Veshka\u2019s features are DC 16 as printed, even though her computed spell DC would be higher).',
  'The hags\u2019 innate spells are included as spell items with their per-day limits in the descriptions; no spell-slot automation is assumed.',
  'No active effects are included; conditional riders (grapples, pushes, speed reductions, frightened) are in the item/feature descriptions for the GM to apply.',
];

const METHOD_2_STEPS = [
  <>Install and enable the <strong className="text-bone">5e Statblock Importer</strong> module (by Aioros) in your world. It adds a button at the bottom of the <strong className="text-bone">Actors</strong> sidebar tab.</>,
  <>Open a markdown file from <code className="font-mono text-gold">foundry/statblocks/</code>, or copy the creature&rsquo;s statblock out of the guide (&sect;2 for the hags, &sect;10 for the encounter creatures). The importer expects plain text in standard WotC layout, so paste the statblock text itself, not markdown syntax &mdash; if you paste from the <code className="font-mono text-gold">.md</code> files, strip the <code className="font-mono text-gold">#</code>, <code className="font-mono text-gold">**</code>, and <code className="font-mono text-gold">*</code> markers.</>,
  <>Click <strong className="text-bone">Parse</strong>, verify the highlighted fields match the guide, then <strong className="text-bone">Import</strong>. A new NPC actor appears in the sidebar.</>,
  <>The importer resolves known SRD spells if you have the system&rsquo;s Spells (SRD) compendium installed; custom features come in as feature items. Review imported values against the guide before play.</>,
];

const PACK_TREE = `assets/
  tokens/            actor tokens (referenced by the actor JSONs)
  maps/              4 battlemaps + town map (grid-friendly)
  scenes/            8 establishing & shop scenes (handouts / journals)
  portraits/         13 character portraits
  sigils/            triple-moon sigil + fleet flag
foundry/
  actors/            7 × importable actor JSON (dnd5e 4.x)
  statblocks/        7 × markdown statblocks`;

function MethodCard({
  title,
  blurb,
  steps,
  notes,
  noteLabel,
  from,
}: {
  title: string;
  blurb: string;
  steps: ReactNode[];
  notes: string[];
  noteLabel: string;
  from: 'left' | 'right';
}) {
  return (
    <motion.article
      initial={{ opacity: 0, x: from === 'left' ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="corner-ticks border border-line bg-panel p-6 lg:p-8"
    >
      <h3 className="font-display text-xl text-bone lg:text-2xl">{title}</h3>
      <p className="mt-2 font-body text-[0.95rem] italic leading-relaxed text-mist">{blurb}</p>
      <ol className="mt-5 space-y-3">
        {steps.map((s, i) => (
          <li key={i} className="flex gap-3">
            <span className="mt-0.5 font-mono text-[0.85rem] font-medium text-brass">{i + 1}.</span>
            <span className="font-body text-[0.95rem] leading-relaxed text-bone-dim">{s}</span>
          </li>
        ))}
      </ol>
      <p className="mt-6 font-mono text-[0.72rem] uppercase tracking-[0.2em] text-brass">{noteLabel}</p>
      <ul className="mt-3 space-y-2.5 border-t border-line/60 pt-4">
        {notes.map((n, i) => (
          <li key={i} className="flex gap-3">
            <span className="mt-[0.45em] h-1 w-1 shrink-0 bg-hag-dim" aria-hidden />
            <span className="font-body text-[0.88rem] leading-relaxed text-mist">{n}</span>
          </li>
        ))}
      </ul>
    </motion.article>
  );
}

/** The Foundry VTT pack: actor table, two import methods, asset layout. */
export default function FoundryPack() {
  return (
    <div>
      <SectionKicker>FOUNDRY VTT v12+ · dnd5e 4.x</SectionKicker>
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mt-4 text-center font-display-sc text-bone"
        style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)', letterSpacing: '0.04em' }}
      >
        Seven actors, ready to import.
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="mx-auto mt-4 max-w-[68ch] text-center font-body text-[1.05rem] leading-relaxed text-bone-dim"
      >
        Statblocks and importable actor data for a party of four at levels 9–10. Everything
        traces to the guide — no stats were invented. Requires Foundry VTT v12 or later and
        the dnd5e system 4.x.
      </motion.p>

      {/* actor table — styled like PriceTable */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mt-12 overflow-x-auto border border-line"
      >
        <table className="w-full min-w-[720px] border-collapse text-left">
          <thead>
            <tr className="bg-panel-deep font-mono text-[0.72rem] uppercase tracking-[0.14em] text-mist">
              <th className="px-4 py-3 font-medium">Creature</th>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 font-medium">CR (XP)</th>
              <th className="px-4 py-3 font-medium">Files</th>
            </tr>
          </thead>
          <tbody>
            {ACTORS.map((a, i) => (
              <motion.tr
                key={a.slug}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className={cn(
                  'group border-t border-line/50 transition-shadow hover:shadow-[inset_2px_0_0_0_#9FD63F]',
                  i % 2 === 0 ? 'bg-panel' : 'bg-panel-deep',
                )}
              >
                <td className="px-4 py-3 font-display text-[1.05rem] text-bone group-hover:text-gold">
                  {a.creature}
                </td>
                <td className="px-4 py-3 font-body text-[0.92rem] italic text-mist">{a.role}</td>
                <td className="whitespace-nowrap px-4 py-3 font-mono text-[0.85rem] text-gold">
                  {a.cr}
                </td>
                <td className="px-4 py-3">
                  <span className="flex flex-wrap gap-2">
                    <FileLink href={`/foundry/actors/${a.slug}.json`} label="actor JSON" />
                    <FileLink href={`/foundry/statblocks/${a.slug}.md`} label="statblock MD" />
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* install guide — two method cards */}
      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        <MethodCard
          title="Method 1 — Import the actor JSON"
          blurb="Recommended. The actors ship pre-wired; Foundry's own importer does the rest."
          steps={METHOD_1_STEPS}
          notes={METHOD_1_NOTES}
          noteLabel="Import notes"
          from="left"
        />
        <MethodCard
          title="Method 2 — 5e Statblock Importer module"
          blurb="Paste-from-markdown, via the importer module by Aioros. A good cross-check or fallback for older system versions — Method 1 preserves the exact attack/damage wiring."
          steps={METHOD_2_STEPS}
          notes={[
            'The markdown files in statblocks/ follow the standard WotC statblock layout and can be read as-is at the table, even without the module.',
            'Pasting from the guide\u2019s blockquote statblocks needs no cleanup, but add the Saving Throws line position and ability line as the parser expects.',
          ]}
          noteLabel="Notes"
          from="right"
        />
      </div>

      {/* asset layout card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mt-14 border border-l-2 border-line border-l-brass bg-panel-deep p-6 lg:p-8"
      >
        <p className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-brass">
          Pack layout
        </p>
        <pre className="mt-4 overflow-x-auto font-mono text-[0.85rem] leading-relaxed text-bone-dim">
          {PACK_TREE}
        </pre>
        <p className="mt-5 border-t border-line/60 pt-4 font-body text-[0.92rem] leading-relaxed text-mist">
          Token images point at <code className="font-mono text-gold">assets/tokens/&lt;name&gt;.png</code>;
          until re-pointed, tokens show the default silhouette — re-point on the actor&rsquo;s
          Prototype Token at any time. Portraits in this gallery can be used directly as token art.
        </p>
      </motion.div>
    </div>
  );
}
