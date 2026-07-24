import type { PriceRow } from '@/components/PriceTable';

export type Biome = 'seam' | 'bleach' | 'rime' | 'docks';

export interface Shop {
  n: number;
  slug: string;
  name: string;
  shortName: string;
  type: string;
  location: string;
  biome: Biome;
  scene?: string;
  portrait?: string;
  portraitAlt?: string;
  proprietor: string;
  about: string[];
  hook?: string;
  hookLink?: { text: string; to: string };
  secret?: string;
}

/* All ten shops, transcribed from gm-guide §6 (dual-currency tables verbatim). */
export const SHOPS: Shop[] = [
  {
    n: 1,
    slug: 'twain-tankard',
    name: 'The Twain Tankard',
    shortName: 'Twain Tankard',
    type: 'tavern',
    location: 'straddling the seam',
    biome: 'seam',
    scene: '/assets/img/scenes/scene_twain_tankard.png',
    proprietor:
      'Mira Tallowfin (otter-folk, cold side; quick, warm, remembers every face) & Hessk (coral-born, hot side; slow, deliberate, never blinks)',
    about: [
      'The seam runs through the common room, splitting the bar down the middle. West side is the Sweat — sand floor, open hearth, cold drinks charged by the melt; east side is the Shiver — ice floor, hide booths, hot drinks charged by the coal.',
    ],
    hook: 'Married, fiercely in love: every evening the proprietors meet at the seam-line for one drink passed hand to hand across the border of the world. The town finds this unbearably romantic.',
    secret:
      'In the cellar wall, exactly on the line, is a door on no floorplan, locked with a flip-coin seal. It predates the tavern. Mira pays moonmarks for not asking about it; Hessk says only: “It was grandmother’s. We keep the hearth warm over it. That’s the whole lease.” (DM: it connects to the keel-crypt; use or seal as suits your campaign.)',
  },
  {
    n: 2,
    slug: 'three-keels-yard',
    name: 'Three Keels Yard',
    shortName: 'Three Keels',
    type: 'mimic-wright shipyard',
    location: 'the Cradles',
    biome: 'docks',
    portrait: '/assets/img/portraits/portrait_korvun_driftbrace.png',
    portraitAlt: 'Korvun Driftbrace, polar-bear-folk master shipwright',
    proprietor: 'Master shipwright Korvun Driftbrace (polar-bear-folk)',
    about: [
      'The yard does ordinary work — Feywild oak and ice-nails are honest trades — and extraordinary waiting. Korvun midwifed forty-one living ships with the coven and none in a year, and it is eating him like rust.',
    ],
    hook: 'Ordinary work, extraordinary waiting — the berth on the new-hull waiting list is the longest queue in town, and it is not for sale at any gold price.',
    secret:
      'Korvun pays double for salvage from living wrecks — mimic-ships lost at sea — and asks no questions. He is stockpiling mimic flesh for the day the ritual works again, and some of what he’s bought still twitches in the cold-cellar. He will deny this with his mouth and confirm it with his eyes.',
  },
  {
    n: 3,
    slug: 'tithe-candle',
    name: 'The Tithe Candle',
    shortName: 'Tithe Candle',
    type: 'chandlery & bargain-brokerage',
    location: 'on the seam',
    biome: 'seam',
    portrait: '/assets/img/portraits/portrait_sevra_waxwork.png',
    portraitAlt: 'Widow Sevra Waxwork, tallow-born chandler',
    proprietor:
      'Widow Sevra Waxwork (tallow-born — a hag-crafted person poured rather than grown, the only one of her kind; serene, luminous, smells of honey and wick-smoke)',
    about: [
      'Half chandlery, half bank: the coven’s moonmark ledger lives here, and every favor in town crosses this counter.',
    ],
    hook: 'Every favor in town crosses this counter, and the coven reads the ledger weekly. Sevra will tell a trusted party what the ledger is telling her.',
    secret:
      'Favors owed to the Three are being called at triple last year’s rate — the coven is cashing in, hoarding obligations like grain before a siege. She does not know why. (DM: Raspka’s experiment is expensive, and Morgha is assembling a ransom.)',
  },
  {
    n: 4,
    slug: 'blue-cistern',
    name: 'The Blue Cistern',
    shortName: 'Blue Cistern',
    type: 'water dealer',
    location: 'the Bleach',
    biome: 'bleach',
    proprietor:
      'Boss Ebb Caskfather (coral-born; a big pink-branching man with a voice like a full barrel and the only truly neutral smile in the desert quarter)',
    about: [
      'Water is the west side’s life; he sells it by the measure, the skin, and the season.',
    ],
    hook: 'Water is vanishing from the night cisterns. Ebb is being bled and can’t afford to look weak; he’ll hire the party quietly and pay in cistern shares — the closest thing the Bleach has to land ownership.',
    hookLink: { text: 'SQ2 · The Thirst Ledger', to: '/quests' },
  },
  {
    n: 5,
    slug: 'greywake-fishery',
    name: 'The Greywake Fishery & Rendering Works',
    shortName: 'Greywake Fishery',
    type: 'ice-fishery & rendering works',
    location: 'the Rime',
    biome: 'rime',
    scene: '/assets/img/scenes/scene_greywake_fishery.png',
    proprietor:
      'Matriarch Grandaunt Ulla Blubberwife (walrus-folk; eight hundred pounds of authority, sings to the rendering pots)',
    about: ['The fishery feeds the east side and lights the whole town.'],
    hook: 'One of her crews is two days overdue on the ice. Ulla wants them found before the coven offers to help — coven help comes with coven prices, and she is one deep favor from the fishery being the coven’s outright.',
    hookLink: { text: 'SQ3 · Greywake’s Missing', to: '/quests' },
  },
  {
    n: 6,
    slug: 'shivering-kiln',
    name: 'The Shivering Kiln',
    shortName: 'Shivering Kiln',
    type: 'coral-glass smithy',
    location: 'the Bleach, seam’s west shoulder',
    biome: 'bleach',
    scene: '/assets/img/scenes/scene_shivering_kiln.png',
    portrait: '/assets/img/portraits/portrait_zizi_emberglass.png',
    portraitAlt: 'Zizi Emberglass, coral-born smith',
    proprietor:
      'Smith Zizi Emberglass (coral-born; grown from pink branching coral around a kiln-heart that glows when she laughs, which is often, and when she’s furious, which is terrifying)',
    about: [
      'The kiln eats crushed coral sand and exhales glass; the seam’s heat differential is the bellows.',
    ],
    secret:
      'Zizi has noticed what no one else has: coral-glass blown since the silence resonates near realm-fragments — it hums one low note. A wind-harp in the party’s rigging becomes a fragment-detector. She’ll trade the discovery for escort into the coral flats.',
  },
  {
    n: 7,
    slug: 'inked-tide',
    name: 'The Inked Tide',
    shortName: 'Inked Tide',
    type: 'cartographer & tide-scribe',
    location: 'on the seam, east shoulder',
    biome: 'seam',
    scene: '/assets/img/scenes/scene_inked_tide.png',
    proprietor:
      'Inkmother Saelith (octopus-folk, reef-born; eight-armed, soft-spoken, writes with three hands and drinks tea with a fourth)',
    about: [
      'The coven’s listening post and the campaign’s rumor hub: she buys sailors’ tales, verifies them against her archive, and plots sightings on the great chart behind her counter — the one with the slow spiral converging on the Gullet, kept covered with a cloth when the coven isn’t visiting.',
    ],
    secret:
      'Saelith has begun buying back her own sold charts — someone is using the sighting-map to hunt fragments ahead of the coven. She’s right (DM choice: agents on the realm-wreckers’ trail, or Veshka’s private game). The best hook-dispenser in the guide; visit her every session.',
  },
  {
    n: 8,
    slug: 'womb-and-wake',
    name: 'Womb & Wake',
    shortName: 'Womb & Wake',
    type: 'healer & midwife to the hag-crafted',
    location: 'the Rime, near the seam',
    biome: 'rime',
    portrait: '/assets/img/portraits/portrait_yllva_snowmilk.png',
    portraitAlt: 'Yllva Snowmilk, arctic fox-folk midwife',
    proprietor:
      'Yllva Snowmilk (arctic fox-folk; soft, exact, utterly unshockable; the only person in town the Three knock for)',
    about: ['She heals outlanders too, at outlander prices, without a word about it.'],
    secret:
      'Yllva hides two patients: Silas Greywater, a dying sailor with a story (“The Last Chart”), and Nixa, a newborn hag-crafted child who woke wrong (“Wrong-Waking”). Yllva is the moral center of the town; to know what the silence costs, sit with her for an hour.',
  },
  {
    n: 9,
    slug: 'foundling-flotsam',
    name: 'The Foundling Flotsam',
    shortName: 'Foundling Flotsam',
    type: 'salvage & pawn',
    location: 'Keelrow, west docks',
    biome: 'docks',
    portrait: '/assets/img/portraits/portrait_pinny_squall.png',
    portraitAlt: 'Broker Pinny Squall, seal-folk pawnbroker',
    proprietor:
      'Broker Pinny Squall (seal-folk; sleek, whiskered, a smile like a hooked line; sleeps on a counter of other people’s treasures)',
    about: ['Buys anything the sea gives up; sells most of it back to someone.'],
    secret:
      'In the back, under three locks and a damp cloth: the door. Fished up six months ago, oak banded in iron, warm to the touch, and it knocks from the inside — politely, once, whenever someone new enters. Pinny will sell it for 500 gp or, frankly, for anyone to please take it out of his shop. It is a fragment of Prismeer (a pantry door from some minor estate; what’s behind it is the DM’s, but it should not be opened indoors).',
  },
  {
    n: 10,
    slug: 'salt-rook',
    name: 'The Salt Rook',
    shortName: 'Salt Rook',
    type: 'salt merchant & pickler',
    location: 'the Bleach market row',
    biome: 'bleach',
    proprietor:
      'Marn Saltbeard (seal-folk, old, solar-evaporation magnate; a small gray king in a rocking chair)',
    about: [
      'Salt is the desert side’s crop — raked from evaporation pans on the coral flats — and the Rime’s preservation line.',
    ],
    hook: 'Marn’s pan-crews have seen hourglass-sand glinting out on the flats — where it falls, the salt grows wrong, in perfect conical towers overnight. He’ll sell the location for a pan-share’s weight in favors, or give it free if the towers get charted by Saelith before the coven takes them.',
    hookLink: { text: 'SQ7 · Sands of the Hourglass', to: '/quests' },
  },
];

/* Dual-currency price tables, verbatim from gm-guide §6. */
export const PRICE_TABLES: Record<string, PriceRow[]> = {
  'twain-tankard': [
    { item: 'Bunk, common room', gold: '5 sp', barter: '1 S or 1 I' },
    { item: 'Private seam-suite (the bed straddles the line)', gold: '2 gp', barter: '1 C' },
    { item: 'Meal, sailor’s standard / Rimefolk feast', gold: '1 sp / 5 gp', barter: '— / 2 O' },
    { item: 'Ice-wine, glass', gold: '6 sp', barter: '1 S' },
    { item: 'Information, general (Mira’s ear)', gold: '1 gp', barter: 'a story she hasn’t heard' },
  ],
  'three-keels-yard': [
    { item: 'Hull repair, per 10 ft. of hull', gold: '50 gp', barter: '2 C + 2 V' },
    { item: 'Refit: ice-strake runners', gold: '200 gp', barter: '10 O + 4 V' },
    { item: 'Refit: coral-glass windscreens (Shred Gale protection)', gold: '150 gp', barter: '8 C' },
    { item: 'Crew of caulkers, per day', gold: '5 gp', barter: '2 V + 1 S' },
    { item: 'Berth on the new-hull waiting list', gold: 'not for sale', barter: '3 moonmarks and the coven’s yes' },
    { item: 'Consultation: “what’s wrong with our ship”', gold: '25 gp', barter: 'a secret he can sell upward' },
  ],
  'tithe-candle': [
    { item: 'Tallow candles, dozen', gold: '1 sp', barter: '—' },
    { item: 'Hag-light candles, dozen (burn green; vermin and lesser undead dislike the light)', gold: '5 gp', barter: '1 O' },
    { item: 'Storm-candle (burns 8 hours even in Grinder Heart winds)', gold: '10 gp', barter: '2 O' },
    { item: 'Moonmark redemption (introduction, queue-jump, minor curse-lift)', gold: '1 moonmark', barter: '—' },
    { item: 'Favor registration (seam-sworn record of a third-party debt)', gold: '5 gp', barter: '1 V' },
    { item: 'Purchase of a debt (buy someone’s favor owed to another)', gold: 'face value +20%', barter: 'she takes secrets' },
  ],
  'blue-cistern': [
    { item: 'Water, per gallon / barrel (50 gal)', gold: '1 sp / 8 gp', barter: '— / 4 S or 2 I' },
    { item: 'Waterskin, sealed & charmed against evaporation', gold: '15 gp', barter: '1 C' },
    { item: 'Cistern share (a family’s monthly draw)', gold: '20 gp', barter: '2 C + 2 S' },
    { item: 'Ice-melt service (you bring ice, he returns water, keeps 10%)', gold: 'free', barter: 'the 10%' },
    { item: 'Emergency draw (drought days, no questions)', gold: 'triple', barter: 'triple, and a favor: petty' },
  ],
  'greywake-fishery': [
    { item: 'Blubber-oil, gallon', gold: '10 gp', barter: '2 S (they always need salt)' },
    { item: 'Seal-meat, smoked, week’s rations', gold: '5 sp', barter: '1 S' },
    { item: 'Ice-fishing charter (half-day, with crew)', gold: '5 gp', barter: '2 S + 1 V' },
    { item: 'Skin-seal service (oil treatment vs. Shred Gale / deep freeze, 3 days)', gold: '2 gp', barter: '1 O (they reprocess it)' },
    { item: 'Lamp-oil consecrated by Veshka’s court (burns true in fey fog)', gold: '25 gp/gal', barter: '2 O + a favor: petty' },
  ],
  'shivering-kiln': [
    { item: 'Coral-glass pane', gold: '15 gp', barter: '3 S or 1 O + 1 S' },
    { item: 'Goggles, wind-teeth rated', gold: '10 gp', barter: '1 C trade-in + 1 S' },
    { item: 'Bottles, flasks, ship-lamps (dozen)', gold: '5 gp', barter: '1 S' },
    { item: 'Wind-harp (sings before storms)', gold: '30 gp', barter: '2 C + a secret' },
    { item: 'Custom lens work (spyglass, scrying-glass blanks)', gold: '100 gp+', barter: '5 C + a favor: ledger' },
  ],
  'inked-tide': [
    { item: 'Local charts, cove and bay', gold: '25 gp', barter: '1 C + 1 V' },
    { item: 'Charts, Feywild coast (marked with fragment sightings)', gold: '100 gp', barter: '5 C, or one verified new sighting' },
    { item: 'Sale of an oddity tale (she pays)', gold: 'pays 25–100 gp equiv.', barter: 'pays in moonmarks for the good ones' },
    { item: 'Copying & translation (Sylvan, Aquan, Giant, pirate cant)', gold: '1 gp/page; 5 gp/document', barter: '1 V; 1 O' },
    { item: 'The great chart: one honest look', gold: 'not for sale', barter: 'a favor: deep (hers, not the coven’s — Saelith keeps her own book)' },
  ],
  'womb-and-wake': [
    { item: 'Treatment, wounds (as cure wounds, 2nd level)', gold: '20 gp', barter: '1 C + 1 O' },
    { item: 'Treatment, disease/poison (as lesser restoration)', gold: '40 gp', barter: '2 C or 1 C + 2 O' },
    { item: 'Remove curse', gold: '90 gp', barter: '4 C, or 2 C + a favor: ledger' },
    { item: 'Hag-craft midwifery & attunement (for crafted folk)', gold: 'sliding', barter: 'the coven subsidizes; she never says so' },
    { item: 'Frostbite & wind-shred surgery', gold: '15 gp', barter: '1 O + 1 S' },
  ],
  'foundling-flotsam': [
    { item: 'Salvage sale (the party sells: junk, weapons, curios)', gold: 'pays 40% value', barter: 'pays 50% in staples' },
    { item: 'Pawn (item held 30 days, reclaim at +25%)', gold: '50% value', barter: '—' },
    { item: 'Second-hand rope, sailcloth, fittings', gold: '50% PHB', barter: '1 V per 10 gp' },
    { item: '“Found” charts, logbooks, love-letters', gold: '5–50 gp', barter: 'secrets preferred' },
    { item: 'Curios cabinet (DM’s toybox: fey trinkets, odd salvage)', gold: '10–500 gp', barter: 'moonmarks for the strange ones' },
  ],
  'salt-rook': [
    { item: 'Salt-brick (5 gp anchor)', gold: '5 gp', barter: '1 I (he buys ice at premium)' },
    { item: 'Pickling & preservation (per barrel)', gold: '2 gp', barter: '1 S trade-in' },
    { item: 'Salt-charm against rust-rot (ship’s stores)', gold: '10 gp', barter: '2 I' },
    { item: 'Pan-share (seasonal stake in the pans)', gold: '100 gp', barter: '8 C' },
    { item: 'Smuggler’s-grade salt (untaxed, no ledger entry)', gold: '3 gp', barter: 'and a favor: petty' },
  ],
};
