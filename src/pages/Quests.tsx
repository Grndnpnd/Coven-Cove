import { useState } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageBanner from '@/components/PageBanner';
import SeamDivider from '@/components/SeamDivider';
import SectionKicker from '@/components/SectionKicker';
import QuestCard from '@/components/QuestCard';
import type { BiomeTag } from '@/components/QuestCard';
import SealReveal from '@/components/SealReveal';
import ActTimeline from '@/components/quests/ActTimeline';
import BigMoments from '@/components/quests/BigMoments';
import '@/components/quests/quests.css';

/* ------------------------------------------------------------------ */
/* The eight side quests (gm-guide §8, quests.md §3)                   */
/* ------------------------------------------------------------------ */

interface Quest {
  code: string;
  title: string;
  location: string;
  biome: BiomeTag;
  hook: string;
  beats: ReactNode;
  complications: ReactNode;
  rewards: ReactNode;
  badge?: { label: string; className: string };
}

const Numbered = ({ items }: { items: ReactNode[] }) => (
  <ol className="list-decimal space-y-2 pl-5 marker:font-mono marker:text-[0.8rem] marker:text-brass">
    {items.map((it, i) => (
      <li key={i}>{it}</li>
    ))}
  </ol>
);

const Bulleted = ({ items }: { items: ReactNode[] }) => (
  <ul className="space-y-2">
    {items.map((it, i) => (
      <li key={i} className="flex gap-2">
        <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-brass" aria-hidden />
        <span>{it}</span>
      </li>
    ))}
  </ul>
);

const RewardList = ({ items }: { items: ReactNode[] }) => (
  <ul className="space-y-2">
    {items.map((it, i) => (
      <li key={i} className="flex gap-2">
        <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-gold" aria-hidden />
        <span>{it}</span>
      </li>
    ))}
  </ul>
);

const MAIN_ARC = {
  label: 'Main-arc key',
  className: 'border-hag/60 bg-ink text-hag',
};
const PATH_A = {
  label: 'Path A component',
  className: 'border-hag/60 bg-ink text-hag',
};
const ESCALATION = {
  label: 'Escalation set-piece',
  className: 'border-heat/60 bg-ink text-heat',
};

const QUESTS: Quest[] = [
  {
    code: 'SQ-01',
    title: 'The Hull That Bit Back',
    location: 'Drydock Seven',
    biome: 'seam',
    hook: 'Korvun hires the party — off the court’s books — to “inspect” Drydock Seven at night and confirm what the night-crews hear: chain-song, whimpering, and once, a voice asking “is it my turn yet?”',
    beats: (
      <Numbered
        items={[
          'Survey the Cradles — the dormant hulks lean, minutely, toward ship-talk.',
          'Drydock Seven — the feral hulk has eaten its watch-lanterns and lures with lights.',
          'Decide: report to Korvun, to Raspka (who will try to hire silence), or contain it.',
        ]}
      />
    ),
    complications: (
      <Bulleted
        items={[
          'Raspka arrives mid-inspection, humming.',
          'The hulk imitates the party’s voices by dawn.',
          'If provoked it fights (§10) — and every blow rings through the other cradles like a struck bell.',
        ]}
      />
    ),
    rewards: (
      <RewardList
        items={[
          '300 gp from Korvun — or 1 moonmark and Raspka’s favor (she never forgets a discretion).',
          'The yard’s labor for the party’s own repairs.',
        ]}
      />
    ),
  },
  {
    code: 'SQ-02',
    title: 'The Thirst Ledger',
    location: 'The Bleach',
    biome: 'west',
    hook: 'Ebb Caskfather’s night cisterns are losing water — hundreds of gallons, no broken seals, no wet sand.',
    beats: (
      <Numbered
        items={[
          'Stakeout — the thefts happen at the exact seam-shadow hour.',
          'The culprit: a collective of boarding-house families siphoning to a hidden emergency cistern, led by a coral-born grandmother, Ostra, terrified the winter fleet will price them out.',
          'Resolve: expose (law, evictions), conceal (Ebb’s wrath), or broker — Ostra’s folk work the evaporation pans to cover the draw; Marn gets crews, Ebb gets water, the families get amnesty.',
        ]}
      />
    ),
    complications: (
      <Bulleted
        items={[
          'The hidden cistern is already hairline-cracked — three hundred gallons are soaking toward the seam.',
          'Someone took a cut before Ostra’s people got it: the damp trail leads to the Twain Tankard’s cellar door.',
        ]}
      />
    ),
    rewards: (
      <RewardList
        items={[
          '150 gp or a cistern share (20 gp/month in good graces).',
          'Ebb’s favor (petty).',
          'The Bleach’s gratitude — lodging half-price, rumor rolls at advantage.',
        ]}
      />
    ),
  },
  {
    code: 'SQ-03',
    title: 'Greywake’s Missing',
    location: 'The Rime',
    biome: 'east',
    hook: 'Grandaunt Ulla’s best crew — six walrus-folk fishers — is two days overdue from the ice.',
    beats: (
      <Numbered
        items={[
          'Track them across the harbor ice — thin-ice hazards active.',
          'Find the camp: orderly, abandoned, a hole cut in the ice too square to be natural.',
          <SealReveal key="sq3-cache" id="sq3-cache" label="Beneath the ice — sealed. DM eyes only.">
            A cache of black-frosted oil casks and bone charms: <strong className="text-bone">Veshka’s killing-winter stockpile</strong>, which the crew stumbled onto.
          </SealReveal>,
          'The crew sealed themselves in an ice cave when “the storm-lady’s lights” came looking.',
        ]}
      />
    ),
    complications: (
      <Bulleted
        items={[
          'The crew saw too much — tell Ulla (it spreads), tell the Three (Morgha will want them interviewed), or carry a secret the staff-bells could ring out of you.',
          <>
            A frost-side ambush (§10) hits the return leg — see{' '}
            <Link to="/encounters" className="link-hag text-hag">Encounters</Link>.
          </>,
        ]}
      />
    ),
    rewards: (
      <RewardList
        items={[
          '200 gp from Ulla; blubber-oil at cost forever (5 gp/gal).',
          'Ulla’s favor (petty — walrus-folk favors are sturdy).',
          'If the party conceals the cache: Veshka knows within a tenday, and her regard is a strange and valuable thing.',
        ]}
      />
    ),
  },
  {
    code: 'SQ-04',
    title: 'The Last Chart of Silas Greywater',
    location: 'Womb & Wake',
    biome: 'east',
    hook: 'Yllva asks the party to sit with a dying sailor — he refuses to sell his story to the tide-scribe; she thinks it should go to someone who’ll use it.',
    beats: (
      <Numbered
        items={[
          'The interview — Silas tells it once, whole: the Gull’s Promise becalmed in fog that repeated one day.',
          'A black ship passing them twice from the same direction; six figures on her deck, the wake freezing behind her in summer water.',
          'A year later, the black ship’s lantern turning toward him across two miles of open sea, “as if it remembered.”',
          'Then his chart — course-marks in his own hand — and, whenever the party next returns, his death, peaceful if they listened kindly.',
        ]}
      />
    ),
    complications: (
      <Bulleted
        items={[
          'The Three will learn the party took the interview.',
          'Repeating Silas’s story to the coven is selling it, which Silas forbade — honor him and earn Yllva’s deep trust, or sell him and earn 2 moonmarks and the midwife’s permanent frost.',
        ]}
      />
    ),
    rewards: (
      <RewardList
        items={[
          'Silas’s chart — a verified sighting worth 100 gp at the Inked Tide if betrayed, or the party’s own first solid heading if not.',
          'Yllva’s favor (ledger).',
          'A letter to his daughter in some other port.',
        ]}
      />
    ),
  },
  {
    code: 'SQ-05',
    title: 'When the Wind Teeth Come',
    location: 'The Bleach',
    biome: 'west',
    badge: ESCALATION,
    hook: 'Zizi’s wind-harps all sing at once; the west horizon goes white to the zenith — a Shred Gale with a Grinder Heart is four hours out, the storm of the season.',
    beats: (
      <Numbered
        items={[
          'Hardening — board the boarding-houses, reef windscreens, move pan-salt under cover: a 4-hour skill challenge with the party split up.',
          'The crossing — someone is always on the wrong side: escort Ostra’s families or a pan-crew through the rising Gale.',
          'The Grinder Heart’s passage — one hour of shelter-shaking hell; the Wind-Teeth Swarm probes for openings, and Drydock Seven sings across town in answer.',
        ]}
      />
    ),
    complications: (
      <Bulleted
        items={[
          'The coral-glass kilns cannot cool or Zizi loses the season — someone must feed the kiln mid-storm.',
          'During the Grinder Heart, the sandstorm stops dead at the seam — a vertical wall of grinding white — and things move in it.',
        ]}
      />
    ),
    rewards: (
      <RewardList
        items={[
          '250 gp pooled from Bleach merchants; 2 moonmarks (the coven notices who stands up in weather).',
          'The west side’s lasting loyalty.',
          'Zizi’s storm-glass set (goggles + wind-harp) for the party’s ship.',
          <>
            Battlemap:{' '}
            <a href="/assets/img/maps/battlemap_coral_dune_ambush.png" className="link-hag text-hag">
              coral dune ambush
            </a>{' '}
            · also in the <Link to="/gallery" className="link-hag text-hag">Gallery</Link>.
          </>,
        ]}
      />
    ),
  },
  {
    code: 'SQ-06',
    title: 'Wrong-Waking',
    location: 'Womb & Wake',
    biome: 'east',
    hook: 'Yllva, desperate, asks for help with Nixa — the newborn whose third shadow isn’t anyone’s. The coven must not know.',
    beats: (
      <Numbered
        items={[
          'Examination — the third shadow is residue: a scrap of the old loyalty-warp with no coven at the other end, coiled in the child like a snapped anchor chain.',
          'Research — Trinket recognizes the warp’s stitch-pattern as Skabatha’s workshop knot; Korvun recognizes the tension as a birth-line like the hulks’.',
          'Resolution — Yllva’s slow surgery (weeks, safe); remove curse at 5th level or higher (fast, but the residue lets go of something on its way out — DM’s omen); or bringing it to the Three (safe for Nixa, catastrophic for secrecy).',
        ]}
      />
    ),
    complications: (
      <Bulleted
        items={[
          'Whatever is chosen, the party learns the truth of hag-craft (§12): the folk are made, the warp made them loyal, the warp is slack — and every crafted person in town is carrying the same slack chain.',
          'Nixa just woke up facing it.',
        ]}
      />
    ),
    rewards: (
      <RewardList
        items={[
          'Yllva’s favor (deep — her only one this decade).',
          'Healing at cost forever.',
          'The definitive in-fiction briefing on hag-craft, which re-frames every later scene with the Three.',
        ]}
      />
    ),
  },
  {
    code: 'SQ-07',
    title: 'Sands of the Hourglass',
    location: 'The Coral Flats',
    biome: 'west',
    badge: PATH_A,
    hook: 'Marn’s pan-crews report salt growing in perfect conical towers overnight, out on the flats where nothing grows. Zizi’s glass hums. The coven doesn’t know yet.',
    beats: (
      <Numbered
        items={[
          'Crossing the flats — dune hardships and a coral dune ambush (§10); something has been grazing the towers.',
          'The site — a ten-foot circle where a handful of hourglass sand fell and the world is trying to grow Prismeer around it: the towers are Hither’s mangroves, Thither’s woods, Yon’s peaks, all trying on salt.',
          'The harvest — the sand can only be taken by someone who gives a true memory of home, aloud, to the flats.',
        ]}
      />
    ),
    complications: (
      <Bulleted
        items={[
          'A coven agent arrives mid-harvest: a Tideguard detachment under orders, or Pem Blackbeak under polite orders — fight, deal, or share; each routes differently into act three.',
          'The flats remember the memory spoken; the PC who paid may meet it again.',
        ]}
      />
    ),
    rewards: (
      <RewardList
        items={[
          'The hourglass sand — priceless to the right buyer; the Three would pay anything, which is exactly the lever the party now holds.',
          '100 gp in salt-tower salvage.',
          'Marn’s pan-share dividend.',
        ]}
      />
    ),
  },
  {
    code: 'SQ-08',
    title: 'Parley at the Gullet',
    location: 'The Bay',
    biome: 'sea',
    badge: MAIN_ARC,
    hook: 'Every thread ends here — Brullo’s drift-logs, Saelith’s spiral chart, Silas’s course-marks, the fragments’ stubborn drift. The Gullet is the bay’s bottom, and something is in it.',
    beats: (
      <Numbered
        items={[
          'The approach — no local crew will go; the party sails their own ship, or Korvun rigs ice-strakes for a shore-crawl across the frozen east bay.',
          'The parley — Sovva rises if hailed in any courtly manner (she has waited a hundred years for manners): three questions answered honestly for a story she’s never heard, three more for a promise.',
          'The payload — the sunken splinter of Yon below; the stolen anchor that passed west; the fraying knot; and her price for strengthening it: to be remembered when the coven is whole again, or released if it is broken.',
        ]}
      />
    ),
    complications: (
      <Bulleted
        items={[
          'The whirlpool’s draw is real — DC 15 vehicles (water) check each round within a quarter-mile; failure costs 100 feet of drift inward.',
          'A fragment arrives during the parley — the sea shudders, the knot groans, and through clear deep water a corner of a mountain theater drifts by overhead, upside down, still lit.',
        ]}
      />
    ),
    rewards: (
      <RewardList
        items={[
          'The campaign’s heading west.',
          'Sovva as an informant.',
          '2 moonmarks if the Three learn the party went and lived; a vial of splinter-water if Path A is in play.',
        ]}
      />
    ),
  },
];

/* ------------------------------------------------------------------ */

function FooterCta() {
  return (
    <>
      <SeamDivider />
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-center gap-5 px-6 py-14 text-center md:flex-row md:gap-14 lg:px-12">
        <Link
          to="/townsfolk"
          className="link-hag font-mono text-[0.78rem] uppercase tracking-[0.2em] text-bone-dim transition-colors hover:text-gold"
        >
          Who you’ll meet along the way → Townsfolk
        </Link>
        <Link
          to="/encounters"
          className="link-hag font-mono text-[0.78rem] uppercase tracking-[0.2em] text-bone-dim transition-colors hover:text-gold"
        >
          What stands in the way → Encounters
        </Link>
      </div>
    </>
  );
}

/** /quests — §8 side quests + §9 act structure & big moments. */
export default function Quests() {
  const [openId, setOpenId] = useState<string | null>('SQ-01');

  return (
    <div>
      {/* §1 — banner; wrapper adds the "breathing hull" scale loop via quests.css */}
      <div className="banner-breathe">
        <PageBanner
          image="/assets/img/scenes/scene_mimic_ship_reveal.png"
          kicker="§8–9 · Side Quests & Story Beats"
          title="EIGHT JOBS, THREE ENDINGS"
          flavor="Combat is opt-in; the structure survives a party that never draws steel. Most threads feed the clue ladder."
        />
      </div>

      {/* §2 — the act structure: GSAP pinned horizontal timeline (isolated) */}
      <section className="bg-ink pt-24 md:pt-32">
        <div className="mx-auto max-w-[1200px] px-6 pb-14 lg:px-12">
          <SectionKicker>§9 · Story Beats</SectionKicker>
          <h2
            className="mt-4 text-center font-display-sc text-bone"
            style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)', letterSpacing: '0.04em' }}
          >
            The Five Acts
          </h2>
          <p className="mx-auto mt-4 max-w-[62ch] text-center font-body text-[1.05rem] leading-relaxed text-bone-dim">
            Assumes 5–8 sessions in and around the cove. Scroll on: the campaign slides past,
            act by act.
          </p>
        </div>
        <ActTimeline />
      </section>

      <SeamDivider />

      {/* §3 — the eight side quests (QuestCard accordion) */}
      <section className="bg-abyss py-24 md:py-32">
        <div className="mx-auto max-w-[1000px] px-6 lg:px-12">
          <SectionKicker>§8 · Side Quests</SectionKicker>
          <h2
            className="mt-4 text-center font-display-sc text-bone"
            style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)', letterSpacing: '0.04em' }}
          >
            The Eight Jobs
          </h2>
          <p className="mx-auto mt-4 max-w-[62ch] text-center font-body text-[1.05rem] leading-relaxed text-bone-dim">
            Eight session-ready jobs — hook, beats, complications, rewards. Most feed the clue
            ladder; two are keys to the main arc.
          </p>

          <div className="mt-14 space-y-4">
            {QUESTS.map((q, i) => (
              <motion.div
                key={q.code}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                {q.badge && (
                  <span
                    className={`absolute -top-2.5 right-4 z-10 border px-2 py-0.5 font-mono text-[0.62rem] uppercase tracking-[0.18em] ${q.badge.className}`}
                  >
                    {q.badge.label}
                  </span>
                )}
                <QuestCard
                  code={q.code}
                  title={q.title}
                  location={q.location}
                  biome={q.biome}
                  hook={q.hook}
                  beats={q.beats}
                  complications={q.complications}
                  rewards={q.rewards}
                  open={openId === q.code}
                  onToggle={() => setOpenId(openId === q.code ? null : q.code)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SeamDivider />

      {/* §4 — big moments (set-piece gallery) */}
      <section className="bg-ink pt-24 md:pt-32">
        <div className="mx-auto max-w-[1200px] px-6 pb-16 lg:px-12">
          <SectionKicker>§9 · Big Moments</SectionKicker>
          <h2
            className="mt-4 text-center font-display-sc text-bone"
            style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)', letterSpacing: '0.04em' }}
          >
            Six Set Pieces, Read Aloud
          </h2>
          <p className="mx-auto mt-4 max-w-[62ch] text-center font-body text-[1.05rem] leading-relaxed text-bone-dim">
            Boxed text for the moments the table will remember. Read them slow.
          </p>
        </div>
        <BigMoments />
        <div className="py-16" />
      </section>

      <FooterCta />
    </div>
  );
}
