export type FolkCategory = 'Harbor & Yard' | 'Fleet' | 'Court & Guard' | 'Uncanny';

export interface Folk {
  id: string;
  name: string;
  kicker: string;
  category: FolkCategory;
  portrait?: string;
  flag?: string;
  role: string;
  description: string;
  stat: string;
  statLink?: { text: string; to: string };
  secret?: string;
  questLink?: { text: string; to: string };
}

/* The ten named folk, transcribed from gm-guide §7 / townsfolk.md §3. */
export const FOLK: Folk[] = [
  {
    id: 'brullo',
    name: 'Brullo Icekeel',
    kicker: 'walrus-folk · Harbormaster',
    category: 'Harbor & Yard',
    portrait: '/assets/img/portraits/portrait_brullo_icekeel.png',
    role: 'Runs the harbor from a booth built exactly on the seam.',
    description:
      'One tusk capped in brass, the other in ice-glass, so he can lean to either jurisdiction. Ledger-obsessed, incorruptible, deeply sentimental about ships — he names every hull that berths twice and grieves every hull that doesn’t come back.',
    stat: 'Commoner chassis, but STR 18 and a gaff-hook he uses like a veteran’s spear if the harbor is threatened.',
    secret:
      'He logs the Gullet’s drift-line daily on his own initiative and has noticed the fragments converging; he’ll show the right people.',
  },
  {
    id: 'korvun',
    name: 'Korvun Driftbrace',
    kicker: 'polar-bear-folk · Master Shipwright',
    category: 'Harbor & Yard',
    portrait: '/assets/img/portraits/portrait_korvun_driftbrace.png',
    role: 'Runs Three Keels Yard; gruff, exact, gentle with wood and worse with people.',
    description:
      'He midwifed forty-one living ships with the coven and none in a year, and it is eating him like rust.',
    stat: 'Knight chassis, carpenter’s maul as warhammer, expertise in shipwright’s tools, advantage on checks involving ships.',
    secret:
      'The cold-cellar twitching salvage; he suspects something is wrong in Drydock Seven, and loyalty to the court wars nightly with loyalty to the craft.',
  },
  {
    id: 'pem',
    name: 'Captain Pemmican “Pem” Blackbeak',
    kicker: 'pengkin corsair · Captain of the Drowned Carol',
    category: 'Fleet',
    portrait: '/assets/img/portraits/portrait_pem_blackbeak.png',
    role: 'In port for refit and — never said aloud — for orders.',
    description:
      'Second to Lord Goldbreast, captain of the ketch Drowned Carol. Three feet of immaculate plumage, a witch-hat cockade, courtly manners that make the cutlass more alarming, not less. Privately worried: the fleet has lost two ships this year to weather that followed them.',
    stat: 'Bandit captain with 30 ft. swim speed and advantage on saves vs. cold.',
    secret:
      'Standing orders to invite “persons of maritime interest” to the Tide-Court. The party qualifies by arrival.',
  },
  {
    id: 'trinket',
    name: 'Trinket',
    kicker: 'self-moving marionette · survivor of Prismeer',
    category: 'Uncanny',
    portrait: '/assets/img/portraits/portrait_trinket_the_marionette.png',
    role: 'Pays its keep at the Twain Tankard performing the same wordless play, nightly.',
    description:
      'A stagehand-puppet from Motherhorn, Endelyn’s theater in Yon — stormwood, brass joints, flaking paint, moved by no strings and nobody’s admitted magic. Trinket survived the collapse of Prismeer, fled through a falling curtain into a fisherman’s nets. Every night it stages the same wordless play: six little silhouettes crossing a felt sea while a paper palace folds itself flat. It has never agreed to perform for the Three, and they have never asked — which tells you they know exactly what it is.',
    stat: 'Noncombatant; cannot be destroyed by mundane means; advantage on Performance, disadvantage on being unnoticed.',
    secret:
      'Trinket saw the realm-wreckers take something from the folding palace — small enough to carry, heavy enough to need two of them. Its memory of their faces is perfect. Whether it shares is the campaign’s hinge.',
  },
  {
    id: 'barra',
    name: 'Captain Barra Coldvein',
    kicker: 'coral-born, shark-toothed · Tideguard captain',
    category: 'Court & Guard',
    role: 'Twenty guards, a courtyard, absolute neutrality.',
    description:
      'She enforces the seam’s peace, the coven’s writ, and nothing else. Terse, scarred, fair; well-liked the way a good lighthouse is liked.',
    stat: 'Veteran with the Tideguard template.',
    statLink: { text: 'Tideguard statblock → /encounters', to: '/encounters' },
    secret:
      'Her garrison’s wages are three months in arrears — the coven pays in moonmarks lately, and Barra is deciding what that means for her oath.',
  },
  {
    id: 'nixa',
    name: 'Nixa',
    kicker: 'seal-folk newborn · the child who woke wrong',
    category: 'Uncanny',
    role: 'Six weeks old; a healthy, cheerful pup, hidden at Womb & Wake.',
    description:
      'Hag-crafted folk wake knowing their name, nature, and place; Nixa woke with her name, her nature, and three shadows — one hers, one mimicking her a half-second late, one that isn’t anyone’s.',
    stat: 'None; she is a baby. The shadows are a plot device, not a monster.',
    questLink: { text: 'SQ6 · Wrong-Waking', to: '/quests' },
  },
  {
    id: 'silas',
    name: 'Silas Greywater',
    kicker: 'human sailor, dying · last of the Gull’s Promise',
    category: 'Uncanny',
    role: 'Sixty years afloat; lucid, dry-witted, unafraid, out of time.',
    description:
      'At Womb & Wake with salt-lung and something worse: he saw the realm-wreckers, twice, and whatever he looked at the second time is still looking back.',
    stat: 'Commoner; his mind is the treasure.',
    questLink: { text: 'SQ4 · The Last Chart of Silas Greywater', to: '/quests' },
  },
  {
    id: 'sovva',
    name: 'Churn-Mother Sovva',
    kicker: 'bound fey water-elder · the Gullet',
    category: 'Uncanny',
    role: 'Grandmother’s knot — and the knot is fraying.',
    description:
      'When she bothers with an appearance: a face the size of a longboat forming in the whirlpool’s wall, barnacles for brows. Bound before the coven existed, charged to hold a sunken splinter of Prismeer on the seabed. She is loyal to the knot, not the Three. Amused, lonely, hungry in a geological way; the best-informed creature in the cove about what passes over her water.',
    stat: 'Storm-giant durability with a water elemental’s Whelm, confined to the Gullet; she cannot leave and will not fight ships that come under parley.',
    secret:
      'She felt the stolen anchor pass west, and knows the knot will not hold another winter. She has not told the Three because nobody has asked her in a hundred years, and manners matter.',
  },
  {
    id: 'tom',
    name: 'Wicker Tom',
    kicker: 'effigy, ambiguous · Splitmarket',
    category: 'Uncanny',
    role: 'Once a tenday he says something aloud, and it comes true.',
    description:
      'A six-foot wicker figure hung with shells and old name-tags, standing at Splitmarket’s seam-line where a less cheerful town would put gallows. Nobody admits to maintaining him; his shell-necklaces change overnight; once a tenday he says something — aloud, in a voice like a hull settling — and it comes true. The town leaves salt on his west side, oil on his east. The cove’s id and the DM’s pressure valve: any portent you need, Tom can mutter.',
    stat: 'None. Don’t.',
  },
  {
    id: 'goldbreast',
    name: 'Lord Goldbreast',
    kicker: 'pengkin fleet-lord · off-screen unless wanted',
    category: 'Fleet',
    flag: '/assets/img/sigils/flag_witch_hat_penguin_jolly_roger.png',
    role: 'Three weeks east, hunting a prize that “flies no flag and leaves no wake-warmth.”',
    description:
      'Admiral of the pengkin corsair fleet, answers ultimately to the Three. A good act-four complication: he returns with a captured fragment and a prisoner who won’t stop describing the party.',
    stat: 'Pengkin veteran with a penguin-skull cutlass (+1 weapon that counts as a hag token; the coven always knows where it is).',
  },
];

export const FILTERS: Array<'All' | FolkCategory> = [
  'All',
  'Harbor & Yard',
  'Fleet',
  'Court & Guard',
  'Uncanny',
];

/* Name lists, verbatim from gm-guide §12. */
export const NAME_LISTS: Array<{ lineage: string; names: string[] }> = [
  { lineage: 'Seal-folk', names: ['Pinny', 'Marn', 'Sula', 'Tess Kelp-Tide', 'Brindle', 'Corva', 'Nixa', 'Hullow', 'Maera', 'Finnick Shallowsong'] },
  { lineage: 'Polar-bear-folk', names: ['Korvun', 'Iska', 'Brunoar', 'Tallis Whitekeel', 'Severn', 'Old Marsha', 'Den-Mother Ilva'] },
  { lineage: 'Walrus-folk', names: ['Brullo', 'Ulla', 'Grandaunt Pesska', 'Two-Tusk Ren', 'Halla Blubbersong', 'Odo Icekeel'] },
  { lineage: 'Pengkin', names: ['Pemmican', 'Lord Goldbreast', 'Wink', 'Sarsaparilla', 'Bosun Flack', 'Tuppence', 'Elder Cray'] },
  { lineage: 'Otter-folk', names: ['Mira', 'Teague', 'Liss', 'Barto Crackshell', 'Fenny'] },
  { lineage: 'Arctic fox-folk', names: ['Yllva', 'Rusk', 'Snowmilk clan (the whole clan takes the name)', 'Aelir', 'Veska-Not-The-Hag (she insists)'] },
  { lineage: 'Coral-born & oddities', names: ['Hessk', 'Ebb', 'Zizi', 'Ostra', 'Barra', 'Pink-Mother Sef', 'Widow Sevra Waxwork (tallow-born, sui generis)'] },
  { lineage: 'Outlander sailors', names: ['Silas Greywater', 'Captain Drem Vo', 'the Widow Farsalt', 'Nine-Finger Jago'] },
];
