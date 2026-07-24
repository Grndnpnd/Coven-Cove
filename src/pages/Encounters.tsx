import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { animate, motion, useInView, useScroll, useTransform } from 'framer-motion';
import PageBanner from '@/components/PageBanner';
import SeamDivider from '@/components/SeamDivider';
import SectionKicker from '@/components/SectionKicker';
import StatblockCard from '@/components/StatblockCard';
import type { StatblockCardProps } from '@/components/StatblockCard';
import TableRoller from '@/components/TableRoller';
import SealReveal from '@/components/SealReveal';
import { cn } from '@/lib/utils';
import '@/components/encounters/encounters.css';

/* ------------------------------------------------------------------ */
/* §2 — CR guidance strip (gm-guide §10)                               */
/* ------------------------------------------------------------------ */

function CountUp({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  useEffect(() => {
    const el = ref.current;
    if (!inView || !el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = `${value.toLocaleString('en-US')}${suffix}`;
      return;
    }
    const controls = animate(0, value, {
      duration: 0.8,
      ease: 'easeOut',
      onUpdate: (v) => {
        el.textContent = `${Math.round(v).toLocaleString('en-US')}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, value, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

const CR_CELLS: { label: string; xp: number; sub: string }[] = [
  { label: 'Medium', xp: 9000, sub: 'for four characters, level 9' },
  { label: 'Hard', xp: 14000, sub: 'for four characters, level 9' },
  { label: 'Deadly', xp: 20000, sub: 'for four characters, level 9' },
];

function CrGuidance() {
  return (
    <section className="bg-abyss py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <SectionKicker>§10 · CR Guidance</SectionKicker>
        <h2
          className="mt-4 text-center font-display-sc text-bone"
          style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)', letterSpacing: '0.04em' }}
        >
          Priced for a Party of Four
        </h2>

        <div className="mx-auto mt-12 grid max-w-[1000px] grid-cols-2 border border-line bg-panel-deep lg:grid-cols-4">
          {CR_CELLS.map((cell, i) => (
            <motion.div
              key={cell.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="border-b border-r border-line/60 p-5 last:border-r-0 lg:border-b-0"
            >
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-brass">
                {cell.label}
              </p>
              <p className="mt-2 font-mono text-2xl tabular-nums text-gold">
                ≈ <CountUp value={cell.xp} /> <span className="text-sm text-mist">XP</span>
              </p>
              <p className="mt-1 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-mist">
                {cell.sub}
              </p>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 3 * 0.08 }}
            className="border-b border-r border-line/60 p-5 last:border-r-0 lg:border-b-0"
          >
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-hag">Note</p>
            <p className="mt-2 font-body text-[0.9rem] leading-relaxed text-bone-dim">
              Lone monsters underperform their CR at this level — every encounter lists its
              support cast.
            </p>
          </motion.div>
        </div>

        <p className="mx-auto mt-8 max-w-[74ch] text-center font-body text-[0.98rem] leading-relaxed text-bone-dim">
          The Three (CR 5 / 9 / 10) are not presented as a fight. If the party starts one in the
          Tide-Court, remember the Tideguard (20 × CR 3), the terrain (the hags chose it), and
          the town (everyone’s livelihood is leverage). That fight should feel like declaring
          war on a weather system.
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* §3 — creature chapters (statblocks verbatim from gm-guide §10)      */
/* ------------------------------------------------------------------ */

type FramingHeader =
  | { kind: 'image'; src: string; alt: string }
  | { kind: 'swirl' }
  | { kind: 'sigil' };

interface Creature {
  id: string;
  statblock: StatblockCardProps;
  header: FramingHeader;
  framing: ReactNode;
}

/** Art header with parallax-lite (±6%). */
function FramingArt({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);
  return (
    <div ref={ref} className="relative aspect-video overflow-hidden border-b border-line">
      <motion.img
        src={src}
        alt={alt}
        style={{ y }}
        className="absolute inset-0 h-[116%] w-full object-cover"
      />
    </div>
  );
}

function FramingHeaderView({ header }: { header: FramingHeader }) {
  if (header.kind === 'image') return <FramingArt src={header.src} alt={header.alt} />;
  if (header.kind === 'swirl') {
    return (
      <div className="relative aspect-video overflow-hidden border-b border-line">
        <div className="sand-swirl absolute -inset-[35%]" aria-hidden />
        <p className="absolute bottom-4 left-1/2 w-full -translate-x-1/2 text-center font-mono text-[0.68rem] uppercase tracking-[0.28em] text-heat">
          The wind has teeth in it
        </p>
      </div>
    );
  }
  return (
    <div className="relative flex aspect-video items-center justify-center overflow-hidden border-b border-line bg-panel-deep">
      <img
        src="/assets/img/sigils/sigil_triple_moon_coven.png"
        alt="Triple-moon coven sigil — tattooed on every Tideguard wrist"
        className="h-3/5 opacity-40"
        style={{ filter: 'brightness(0) sepia(1) saturate(4) hue-rotate(2deg) brightness(0.85)' }}
      />
      <p className="absolute bottom-4 left-1/2 w-full -translate-x-1/2 text-center font-mono text-[0.68rem] uppercase tracking-[0.28em] text-brass">
        The triple-moon wrist-tattoo · willingly taken
      </p>
    </div>
  );
}

const CREATURES: Creature[] = [
  {
    id: 'mimic-hulk',
    statblock: {
      name: 'Feral Mimic-Hulk',
      typeLine: '“The Seventh Born” — Huge monstrosity (shapechanger), unaligned',
      ac: '15 (barnacled hull)',
      hp: '172 (15d12 + 75)',
      speed: '20 ft., swim 30 ft.',
      abilities: { str: 24, dex: 8, con: 20, int: 5, wis: 12, cha: 6 },
      traits: [
        { name: 'Skills', text: 'Stealth +3 (advantage in its cradle or among hulls).' },
        { name: 'Damage Immunities', text: 'acid; psychic. Condition Immunities prone.' },
        { name: 'Senses', text: 'darkvision 60 ft., passive Perception 11.' },
        { name: 'Languages', text: 'understands the work-songs sung to it; speaks only in borrowed voices. Proficiency +4.' },
        { name: 'Shapechanger', text: 'As an action it reshapes between its true form (a galleon with a spine) and a convincing derelict hull. A creature that touches it or inspects it closely can make a DC 17 Intelligence (Investigation) check to notice it breathing.' },
        { name: 'False Appearance', text: 'In hull form it is indistinguishable from an ordinary (if lovely) derelict at more than arm’s length.' },
        { name: 'Adhesive Pitch', text: 'Its decks and maw exude pitch. A creature or object that hits it with a melee attack, or starts its turn grappled by it, is stuck: DC 17 Strength check to free. It can release anything it chooses. It does not choose often.' },
        { name: 'Borrowed Voice', text: 'It perfectly mimics any voice it has heard for at least a minute. It uses this constantly, mostly kindly.' },
      ],
      actions: [
        { name: 'Multiattack', text: 'One Maw and one Oar-Sweep.' },
        { name: 'Maw', text: 'Melee Weapon Attack: +11 to hit, reach 10 ft., one target. Hit: 29 (4d10 + 7) piercing, and a Large or smaller target is grappled (escape DC 17). While grappling this way it can’t use Maw on another target.' },
        { name: 'Oar-Sweep', text: 'Melee Weapon Attack: +11 to hit, reach 15 ft., up to three targets in a line. Hit: 16 (2d8 + 7) bludgeoning and pushed 10 ft.' },
        { name: 'Splinter Volley (Recharge 5–6)', text: '20-foot cone of hull splinters: DC 18 Dexterity save, 27 (6d8) piercing on a failure, half on success, attended by a sound like a ship’s bell.' },
      ],
      cr: '9',
      xp: '5,000',
      accent: 'brass',
    },
    header: {
      kind: 'image',
      src: '/assets/img/scenes/scene_mimic_ship_reveal.png',
      alt: 'A derelict galleon revealing a spine, maw and oar-limbs — the feral mimic-hulk mid-transformation',
    },
    framing: (
      <>
        <p>
          Alone it’s a Hard-ish solo with poor action economy — so run the yard as terrain:
          swinging cradles, pitch pools (2d6 acid), the other hulks reacting to every hit.
        </p>
        <p className="border-l-2 border-hag pl-4 font-display text-lg italic leading-relaxed text-hag">
          “It does not want to die; it wants to be born.”
        </p>
        <p>
          Speaking to it mid-fight — Persuasion or Performance DC 15, advantage with a
          work-song — can stand it down.
        </p>
      </>
    ),
  },
  {
    id: 'wind-teeth',
    statblock: {
      name: 'Wind-Teeth Swarm',
      typeLine: 'Sand-shred hazard-stat — Medium swarm of Tiny fey grit-motes, unaligned',
      ac: '12',
      hp: '55 (10d8 + 10)',
      speed: '0 ft., fly 50 ft. (hover)',
      abilities: { str: 3, dex: 15, con: 12, int: 2, wis: 10, cha: 2 },
      traits: [
        { name: 'Damage Resistances', text: 'bludgeoning, piercing, slashing.' },
        { name: 'Damage Vulnerabilities', text: 'cold (water and ice knock the teeth out of the wind).' },
        { name: 'Condition Immunities', text: 'charmed, frightened, grappled, paralyzed, petrified, prone, restrained, stunned.' },
        { name: 'Senses', text: 'blindsight 60 ft., passive Perception 10.' },
        { name: 'Swarm', text: 'It can occupy another creature’s space and move through 1-inch openings; it can’t regain hit points.' },
        { name: 'Abrasion', text: 'A creature starting its turn in the swarm’s space takes 7 (2d6) slashing, and nonmetallic armor worn takes a cumulative –1 AC penalty (max –3) until repaired. Unattended rope, sailcloth, and leather in the space take 7 damage per round.' },
        { name: 'Riding the Gale', text: 'In a Shred Gale or Grinder Heart its speed doubles and Abrasion becomes 10 (3d6).' },
      ],
      cr: '4',
      xp: '1,100',
      accent: 'brass',
    },
    header: { kind: 'swirl' },
    framing: (
      <>
        <p>
          One swarm in a Shred Gale is a Medium encounter with teeth; two swarms in the Grinder
          Heart (SQ5) is the wall-of-teeth moment.
        </p>
        <p>
          Cold damage, <em>gust of wind</em>, and shelter are the answers.
        </p>
        <p className="border-l-2 border-heat pl-4 font-display text-lg italic leading-relaxed text-heat">
          “Swords are a prayer.”
        </p>
      </>
    ),
  },
  {
    id: 'rime-woken',
    statblock: {
      name: 'Rime-Woken Fisher',
      typeLine: 'Frost-side ambush unit — Medium undead, neutral evil',
      ac: '12 (frozen hide)',
      hp: '45 (6d8 + 18)',
      speed: '25 ft.',
      abilities: { str: 15, dex: 10, con: 16, int: 6, wis: 10, cha: 5 },
      traits: [
        { name: 'Damage Immunities', text: 'cold, poison. Condition Immunities exhaustion, poisoned.' },
        { name: 'Senses', text: 'darkvision 60 ft., passive Perception 10.' },
        { name: 'Languages', text: 'understands the fisher-cant it spoke.' },
        { name: 'Hoarfrost Grip', text: 'A creature hit by its Claw has its speed halved until the end of its next turn as rime crawls up the limb.' },
        { name: 'Dead of the Ice', text: 'Advantage on Stealth on ice or snow; takes no penalties from thin ice (it knows where it died).' },
      ],
      actions: [
        { name: 'Multiattack', text: 'Two Claw attacks.' },
        { name: 'Claw', text: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) slashing plus 7 (2d6) cold.' },
      ],
      cr: '2',
      xp: '450',
      accent: 'brass',
    },
    header: {
      kind: 'image',
      src: '/assets/img/maps/battlemap_frozen_dock.png',
      alt: 'Top-down battlemap of the Icefast Quay frozen dock',
    },
    framing: (
      <>
        <p>
          “Greywake’s Missing” return leg (SQ3): 5 rime-woken fishers + 2 ice mephits (MM) rising
          out of paper ice at dusk ≈ 3,150 XP before multipliers — a solid Medium-Hard with
          ambush, and the thin-ice terrain is the real monster.
        </p>
        <p className="border-l-2 border-frost pl-4 font-display text-lg italic leading-relaxed text-frost">
          They wear Greywake colors; Ulla will want them brought home gently.
        </p>
      </>
    ),
  },
  {
    id: 'tideguard',
    statblock: {
      name: 'Tideguard',
      typeLine: 'Hag-crafted town guard — Medium humanoid (hag-crafted), lawful neutral',
      ac: '14 (patchwork scale)',
      hp: '58 (9d8 + 18)',
      speed: '30 ft., swim 20 ft.',
      abilities: { str: 16, dex: 12, con: 14, int: 10, wis: 12, cha: 10 },
      traits: [
        { name: 'Skills', text: 'Athletics +5, Insight +3, Perception +3.' },
        { name: 'Senses', text: 'passive Perception 13.' },
        { name: 'Languages', text: 'Common, Sylvan, harbor-cant. Proficiency +2.' },
        { name: 'Seam-Sense', text: 'Within Coven Cove, the Tideguard can’t be surprised, and instinctively knows which side of the seam it stands on in total darkness.' },
        { name: 'Hag-Crafted', text: 'Advantage on saves against being charmed or frightened while it can see the triple-moon sigil.' },
      ],
      actions: [
        { name: 'Multiattack', text: 'Two attacks.' },
        { name: 'Harpoon', text: 'Melee or Ranged Weapon Attack: +5 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 8 (1d10 + 3) piercing. On a thrown hit, the Tideguard can pull a Large or smaller creature 10 feet toward it.' },
        { name: 'Belaying Club', text: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) bludgeoning.' },
        { name: 'Keep the Peace (Reaction)', text: 'When a creature within 5 feet makes an attack against a target other than the Tideguard, the Tideguard can impose disadvantage on the roll by interposing shield, body, or gaff.' },
      ],
      cr: '3',
      xp: '700',
      accent: 'brass',
    },
    header: { kind: 'sigil' },
    framing: (
      <>
        <p>
          Tideguard operate in fours with a sergeant (Barra: <strong className="text-bone">veteran</strong>).
          A police action, not a warband — they grapple, interpose, harpoon ankles, and drag
          offenders off the seam.
        </p>
        <p>
          Four of them ≈ 2,800 XP:{' '}
          <em>a Medium encounter the party cannot win socially, even by winning.</em>
        </p>
        <SealReveal id="tideguard-truth" label="DM note — sealed. DM eyes only.">
          While the circle is dead, the Hag-Crafted trait is <em>habit and faith</em>, not
          magic — the town doesn’t know that, and Barra isn’t saying.
        </SealReveal>
      </>
    ),
  },
];

function CreatureChapter({ creature, index }: { creature: Creature; index: number }) {
  return (
    <section className={cn('py-20 md:py-28', index % 2 === 0 ? 'bg-ink' : 'bg-abyss')}>
      <div className="mx-auto grid max-w-[1200px] items-start gap-8 px-6 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-7">
          <StatblockCard {...creature.statblock} />
        </div>
        <motion.div
          initial={{ opacity: 0, x: 48 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="border border-line bg-panel lg:col-span-5"
        >
          <FramingHeaderView header={creature.header} />
          <div className="space-y-4 p-6 font-body text-[0.95rem] leading-relaxed text-bone-dim md:p-7">
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-brass">
              Encounter framing
            </p>
            {creature.framing}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* §4 — dice tables (gm-guide §11, verbatim)                           */
/* ------------------------------------------------------------------ */

const RUMORS_D10 = [
  'The Three haven’t shared a spell in a year. They sit close in the court like cold people at a dead fire. (True.)',
  'A fished-up door in the pawnshop knocks from the inside. If you knock back, it gets polite. (True; and worse.)',
  'Newborns of the crafted folk are waking wrong — three shadows, borrowed names, no names at all. (One is true; the midwife hides it.)',
  'The Granny of the yard feeds her own blood to a hulk in Drydock Seven, and it calls her mother in Korvun’s voice. (Half true. It has no word for mother.)',
  'The Gullet is a drain and the sea is what it’s draining. When it finishes, the cove will be on dry land. (Folk cosmology; the knot-fraying part is real.)',
  'The wreckers who broke the hag-realm sail a black ship whose wake freezes in summer. They took the realm’s held breath west with them. (True.)',
  'Veshka Morozova applauds the night before a ship is lost. (False. She applauds the night after. She simply knows first.)',
  'The pengkin fleet answers to the Three, and Lord Goldbreast wears a hag-token cutlass that tells the coven where he sleeps. (True.)',
  'If you bury a name in the coral flats, the coral grows a person-shaped tower over it by spring. The coral always grows. (True enough to mind.)',
  'Grandmother — the grandmother — has a hut that walks, and one day it will come walking out of the seam-mist to ask her granddaughters what they’ve done with the family silver. (Aspirational. Terrifying. Roll a d6; on a 1, everyone in earshot goes quiet at once.)',
];

const DESERT_D8 = [
  'Pan-crew in distress: salt-rakers chased off the flats by a wind-harp’s warning that only theirs is singing. Storm in 2 hours.',
  'Wind-teeth ambush: a Wind-Teeth Swarm (§10) boils out of a dune hollow, drawn by exposed metal.',
  'Coral accretion event: a beached skiff half-swallowed by fast-growing coral; salvage rights vs. the “coral always grows” taboo — and something inside the coral taps back.',
  'Water caravan: Ebb’s guards escorting ice-melt from the docks; they pay for extra swords on the seam-shadow hour (ties to quest 2).',
  'A lost outlander crew deep in heat-mirage, following a lighthouse that doesn’t exist. (It exists — on the wrong side of the seam, fifty miles off, and they can see it anyway. Feywild.)',
  'Salt-tower bloom: overnight conical towers (quest 7’s lesser cousins); Zizi’s glass hums; the coven hasn’t heard. First come, first harvested.',
  'Coral-born pilgrimage: a dozen coral-born walking into the dunes to “grow still” for a season. Legal, sane, delighted to explain at length. One is Ostra’s nephew and talks about the hidden cistern if fed.',
  'Grinder Heart outrunner: the storm itself (§4), 4d6 hours out. Run or dig.',
];

const FROST_D8 = [
  'Thin-ice rescue: a fisher-child on cracking green ice; the rescue is easy, the reason she’s out there — following a light under the ice — is not.',
  'Rime-woken pair: two rime-woken fishers (§10) hauling an empty net along the cliff base, still working their old ground.',
  'Icefall: the frozen cliffs calve; DC 14 Dexterity or 22 (4d10) bludgeoning; the newly exposed ice-face has a door-shaped seam in it. It always has.',
  'Pengkin press-gang (polite): off-duty corsairs recruiting for a “completely legal” salvage run near the Gullet. Nobody who goes is ever pressed about the details.',
  'Blubber-oil deal gone sideways: two fishery crews disputing a rendering claim; Barra requests neutral witnesses. A petty-favor economy tutorial.',
  'The storm-lady’s lights: foxfire over the ice cliffs at night — Veshka’s cache sentries (ties to quest 3). Follow, flee, or file away.',
  'Hoarfrost ambush: 1d4 + 2 rime-woken + an ice mephit scouting ahead, drawn to camp-heat.',
  'A calm, white, perfect day: nothing happens. The party will be more frightened than at any other entry. (Roll again in an hour; on an 8, keep it. The Feywild rewards patience with dread.)',
];

const SIGHTINGS_D6 = [
  'A door floating upright in open water, in calm seas, knocking from the inside. Politely. Once per new witness. ★',
  'A rain of tin soldiers over a becalmed sea — hundreds, miniature, each one mid-march, sinking in perfect formation. ★',
  'A fog island that repeats one day: crews who land live the same morning twice and leave with two identical lunches. ★',
  'The same six people seen crewing a black ship in three ports at once — and in a fourth port, six people who remembered being them. ★',
  'An eclipse at noon that no almanac lists and no land saw — only one watch, on one ship — and the moon that ate the sun had a face like a theater mask. ★',
  'A wake that freezes: a black ship’s wake skinning with ice in summer water, holding the line for an hour after she passes, straight as a seam. ★',
];

const SIGHTING_KEYS = [
  'Fragment of Prismeer.',
  'A shed piece of Thither’s workshop-realm.',
  'A splinter of Hither, the realm of before.',
  'The realm-wreckers, or their echo; decide for your campaign.',
  'Yon, saying goodnight.',
  'The stolen anchor’s drag; the party’s heading.',
];

function DiceTables() {
  const tables: { kicker: string; title: string; rows: string[]; die: 6 | 8 | 10; extra?: ReactNode }[] = [
    {
      kicker: 'd10 · heard in the Tankard — half are true',
      title: 'Rumors of the Coven Cove',
      rows: RUMORS_D10,
      die: 10,
    },
    {
      kicker: 'd8 · the Bleach & coral flats',
      title: 'Desert-Side Encounters',
      rows: DESERT_D8,
      die: 8,
    },
    {
      kicker: 'd8 · the Rime & ice',
      title: 'Frost-Side Encounters',
      rows: FROST_D8,
      die: 8,
    },
    {
      kicker: 'd6 · the coven’s raw intelligence — feed the investigation',
      title: 'Odd Things Sailors Have Seen',
      rows: SIGHTINGS_D6,
      die: 6,
      extra: (
        <SealReveal id="sightings-key" label="★ DM truth key — sealed. DM eyes only.">
          <ol className="list-decimal space-y-1.5 pl-5 marker:font-mono marker:text-[0.8rem] marker:text-hag">
            {SIGHTING_KEYS.map((k) => (
              <li key={k}>{k}</li>
            ))}
          </ol>
        </SealReveal>
      ),
    },
  ];

  return (
    <section id="tables" className="bg-abyss py-24 md:py-32">
      <div className="mx-auto max-w-[1000px] px-6 lg:px-12">
        <SectionKicker>§11 · Tables</SectionKicker>
        <h2
          className="mt-4 text-center font-display-sc text-bone"
          style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)', letterSpacing: '0.04em' }}
        >
          Roll or Choose
        </h2>
        <p className="mx-auto mt-4 max-w-[62ch] text-center font-body text-[1.05rem] italic leading-relaxed text-mist">
          Roll or choose. Half the rumors are true.
        </p>

        <div className="mt-14 space-y-16">
          {tables.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="mb-3 font-mono text-[0.72rem] uppercase tracking-[0.28em] text-brass">
                {t.kicker}
              </p>
              <TableRoller rows={t.rows} die={t.die} title={t.title} />
              {t.extra && <div className="mt-4">{t.extra}</div>}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function FooterCta() {
  return (
    <>
      <SeamDivider />
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-center gap-5 px-6 py-14 text-center md:flex-row md:gap-14 lg:px-12">
        <Link
          to="/the-town"
          className="link-hag font-mono text-[0.78rem] uppercase tracking-[0.2em] text-bone-dim transition-colors hover:text-gold"
        >
          Where these fights happen → The Town
        </Link>
        <Link
          to="/gallery#foundry"
          className="link-hag font-mono text-[0.78rem] uppercase tracking-[0.2em] text-bone-dim transition-colors hover:text-gold"
        >
          Tokens & maps for the table → Foundry Pack
        </Link>
      </div>
    </>
  );
}

/** /encounters — §10 statblocks & CR guidance + §11 dice tables. */
export default function Encounters() {
  return (
    <div>
      <PageBanner
        image="/assets/img/maps/battlemap_tide_court_drydock.png"
        kicker="§10–11 · Encounters, Statblocks & Tables"
        title="WHEN THE PARTY OPTS IN"
        flavor="The cove is social-first. These exist for when escalation demands it — and that fight in the Tide-Court should feel like declaring war on a weather system."
      />

      <CrGuidance />

      <SeamDivider />

      {/* §3 — creature chapters */}
      <div className="bg-ink pt-24 md:pt-32">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <SectionKicker>§10 · Beyond the Three</SectionKicker>
          <h2
            className="mt-4 text-center font-display-sc text-bone"
            style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)', letterSpacing: '0.04em' }}
          >
            The Opposition
          </h2>
          <p className="mx-auto mt-4 max-w-[62ch] text-center font-body text-[1.05rem] leading-relaxed text-bone-dim">
            Four statblocks, each with its support cast and its terrain. Nothing here wants a
            fair fight.
          </p>
        </div>
      </div>
      {CREATURES.map((c, i) => (
        <CreatureChapter key={c.id} creature={c} index={i} />
      ))}

      <SeamDivider />

      <DiceTables />

      <FooterCta />
    </div>
  );
}
