import type { StatAccent, StatblockCardProps } from '@/components/StatblockCard';

export interface HagProfile {
  id: string;
  numeral: string;
  name: string;
  epithet: string;
  alsoCalled?: string;
  accent: StatAccent;
  portrait: string;
  portraitAlt: string;
  lineage: string;
  appearance: string;
  personality: string;
  roleplayNotes: string[];
  goals: string[];
  interview: string;
  bargainDoctrine: string;
  bargainStyle: string;
  secrets: string[];
  statblock: StatblockCardProps;
  circleDeadNote: string;
  voiceLine: string;
}

export const HAGS: HagProfile[] = [
  {
    id: 'morgha',
    numeral: 'I',
    name: 'Morgha Brineshroud',
    epithet: 'Sea Hag of the Drowned Past — Daughter of Bavlorna Blightstraw',
    accent: 'hag',
    portrait: '/assets/img/portraits/portrait_morgha_brineshroud.png',
    portraitAlt: 'Morgha Brineshroud — a drowned green-gray sea hag with kelp hair and barnacle-crusted court rags',
    lineage:
      'Daughter of Bavlorna Blightstraw, the hoarding hag of Hither, the marsh-realm of fog and memory. Bavlorna stuffed and mounted what she could not keep alive; Morgha keeps everything that ever sank. She is the coven’s rememberer.',
    appearance:
      'A gaunt, drowned thing of the shore: greenish-gray skin loose as a drowned sail, black kelp hair that drips upward when she is angry, eyes like coins in bilge water — one barnacle-white, one sickly gold. Barnacles crust her rags like armor; sea-bone jewelry rattles when she moves. Her Illusory Appearance shows a weathered sea-widow in violet, heavy with rings — but the illusion leaves her shadow wet, and the drip is real.',
    personality:
      'Patient as erosion; tidal cadence, sentences coming in and going out. She gargles seawater from a belt flask whenever she is about to say something she considers generous, and holds silences for a full minute if it costs the other party composure. She never repeats herself. If you missed it, the tide took it.',
    roleplayNotes: [
      'She addresses people by their debts — “Ah. The one who owes the salt.”',
      'She asks what sailors have lost at sea, then whether they’d like it back — then prices the location, not the thing.',
      'Physical bit: she shells barnacles off her own arm and eats them like peanuts during interviews.',
    ],
    goals: [
      'Find what sank with Prismeer — especially her mother, whom she will not name as dead.',
      'Restore the circle.',
      'Keep the debt-ledger intact through the panic: the ledger is her power.',
    ],
    interview:
      'Anything dredged, fished up, or found floating — doors, teapots, taxidermy toads, mirrors, anything stamped with a moon. Also names: she is building a passenger list for a ship nobody admits to having seen.',
    bargainDoctrine: 'The tide takes a little at a time.',
    bargainStyle:
      'Never the big thing first: she collects debts in small installments — a name here, a lock of hair there, “one honest afternoon” — and only later does the debtor see what the installments added up to. Her contracts are the fairest-written of the three and the worst to be inside of.',
    secrets: [
      'In a wax-sealed jar on her belt: three fingers of Bavlorna’s bathwater — the last physical water of Prismeer, salvaged from a drowned fragment. A component of the New Hourglass ritual (§3). She has told no one, not even her sisters; she would die before spending it, and trade it only for her mother, alive.',
      'Her Hag Eye went dark when the circle died. She keeps it in a reliquary under her tongue — the real reason for the seawater-gargling: she is keeping it moist.',
      'She sleep-drowns in a brine vat beneath the court, and dreams of a door knocking from the inside.',
    ],
    statblock: {
      name: 'MORGHA BRINESHROUD',
      typeLine: 'Medium monstrosity, neutral evil',
      ac: '15 (barnacle crust)',
      hp: '82 (11d8 + 33)',
      speed: '30 ft., swim 40 ft.',
      abilities: { str: 16, dex: 13, con: 16, int: 14, wis: 14, cha: 15 },
      cr: '5',
      xp: '1,800',
      accent: 'hag',
      traits: [
        { name: 'Saves', text: 'Con +6, Wis +5' },
        { name: 'Skills', text: 'Deception +8, Insight +8, Perception +5' },
        { name: 'Senses', text: 'darkvision 60 ft., passive Perception 15' },
        { name: 'Languages', text: 'Aquan, Common, Giant, Sylvan' },
        { name: 'Proficiency', text: '+3' },
        { name: 'Amphibious', text: 'Morgha can breathe air and water.' },
        {
          name: 'Illusory Appearance',
          text: 'As a bonus action she covers herself with an illusion of a Medium humanoid. It ends if she dismisses it, dies, or a creature uses an action to inspect her and succeeds on a DC 14 Intelligence (Investigation) check. The illusion never hides her wet shadow.',
        },
        {
          name: 'Horrific Appearance',
          text: 'Any humanoid that starts its turn within 30 feet of Morgha’s true form and can see her must succeed on a DC 14 Wisdom save or be frightened for 1 minute (repeat at end of turn; on success, immune 24 hours). On a failure by 5 or more, the creature also drops to 0 hit points unless already frightened of her.',
        },
        {
          name: 'Brine Step',
          text: 'As a bonus action, Morgha teleports up to 30 feet to a space she can see containing standing water, ice, or barnacles.',
        },
      ],
      actions: [
        { name: 'Multiattack', text: 'Two claw attacks.' },
        {
          name: 'Claw',
          text: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) slashing.',
        },
        {
          name: 'Death Glare',
          text: 'One frightened creature Morgha can see within 30 feet must succeed on a DC 14 Wisdom save or drop to 0 hit points.',
        },
        {
          name: 'Salt-Smother (Recharge 5–6)',
          text: 'Brine in a 15-foot cone: DC 14 Constitution save, 18 (4d8) necrotic damage on a failure, half on success. On a failure the creature’s mouth fills with phantom seawater for 1 minute: no speech, no verbal components, no calling for help (repeat save at end of turn).',
        },
      ],
    },
    circleDeadNote:
      'While the circle is dead: no Shared Spellcasting, no Hag Eye. Everything above works. She is never more than a Brine Step from deep water, and the interview hall’s cauldron counts.',
    voiceLine: 'Ah. The one who owes the salt.',
  },
  {
    id: 'raspka',
    numeral: 'II',
    name: 'Raspka Irongrinn',
    epithet: 'Annis Hag of the Iron Present — Daughter of Skabatha of Thither',
    alsoCalled: 'Granny Threadbare',
    accent: 'heat',
    portrait: '/assets/img/portraits/portrait_raspka_irongrinn.png',
    portraitAlt: 'Raspka Irongrinn — an eight-foot annis hag with bark-and-forge skin, stitching a marionette',
    lineage:
      'Daughter of Skabatha of Thither — Nightshade in the old tales, Nighthall in the cove’s ledgers; a hag’s names are currency and Raspka spends both spellings when it suits her. Skabatha ruled the present-tense realm of labor, where lost children wound tin soldiers and wove for their keep. Raspka inherited the craft, the workshop cruelty, and the threads.',
    appearance:
      'Eight feet of iron-shod appetite: skin like bark left in a forge, a jaw built for biting through rope, fingers like ten cold chisels — and always mending something: a net, a doll, a sail, a wound, a person. Sailcloth rags stitched with copper wire; sea-bone beads strung on her own hair. The townsfolk call her Granny Threadbare to her face, because she insists, and because the alternative is worse.',
    personality:
      'Loud, practical, hands-on, jolly the way an avalanche is jolly. The only one of the Three who touches people — claps shoulders, pops a dislocated finger back in — and every touch is an assessment of tensile strength. She hums work-songs when she is about to do something terrible; the whole town has learned to listen for humming.',
    roleplayNotes: [
      'She judges everything by workmanship: compliment a PC’s well-kept gear and she warms; arrive with a rusty blade and she will take it away, sharpen it while talking, and charge for the sharpening.',
      'She speaks to the party’s equipment as much as to the party — “Good edge. Bad owner.”',
      'Her wind-up toys follow her on jerky little errands; the party should never be sure they aren’t alive.',
      'Physical bit: she threads a needle with her tongue while maintaining eye contact.',
    ],
    goals: [
      'Get the shipbirth working again by any means — the yards are her pride and her mother’s legacy.',
      'Keep the pirates provisioned and the shipwrights from rioting.',
      'Learn whether Skabatha forgot her on purpose (her mother was famous for forgetting things, and daughters).',
    ],
    interview:
      'Work sightings — anything made, crewed, or repaired strangely: a ship that patches its own sails, a crew of tin men, a floating workshop, children where children should not be. She pays best for objects, worst for stories — unlike her sisters.',
    bargainDoctrine: 'Fair trade, weighed twice.',
    bargainStyle:
      'The most honest broker of the Three: she wants both parties to walk away able to work, and her traps are all in the definition of “able.” Her favorite price is “a year’s maintenance” or “your hands, one afternoon a month.” She respects good haggling and despises anyone who pays asking price.',
    secrets: [
      'She has been secretly experimenting on the dormant mimic-hulk in Drydock Seven, feeding it her own blood and thread, trying to birth a ship without the circle. What is waking in there is not quite a ship and not quite a mimic. The feral hulk in the escalation arc is her fault, and she will sacrifice much to keep that quiet — including letting someone else be blamed.',
      'Her iron claws can cut most things. She has never once cut the gray thread tethering every hag-crafted folk of the cove to the coven. She has stopped trying, and started wondering who else could.',
      'She fears her mother’s forgetfulness is hereditary; she keeps a journal stitched inside her own left forearm, re-read each morning. The earliest entries are not in her handwriting.',
    ],
    statblock: {
      name: 'RASPKA IRONGRINN (GRANNY THREADBARE)',
      typeLine: 'Large fey, neutral evil',
      ac: '21 (iron-thread hide)',
      hp: '147 (14d10 + 70)',
      speed: '40 ft.',
      abilities: { str: 21, dex: 12, con: 20, int: 13, wis: 14, cha: 15 },
      cr: '9',
      xp: '5,000',
      accent: 'heat',
      traits: [
        { name: 'Saves', text: 'Con +9, Wis +6' },
        { name: 'Skills', text: 'Deception +6, Insight +6, Intimidation +6, Perception +6' },
        { name: 'Senses', text: 'darkvision 60 ft., passive Perception 16' },
        { name: 'Languages', text: 'Common, Giant, Sylvan' },
        { name: 'Proficiency', text: '+4' },
        {
          name: 'Innate Spellcasting',
          text: 'Charisma-based (spell save DC 14): 3/day each — disguise self (Small or Medium humanoid), fog cloud; 1/day — animate objects (her doll-toys only).',
        },
        {
          name: 'Puppet Strings',
          text: 'Her animated toys carry thread-tethers back to her claws. While any of them is within 30 feet, she can use her reaction when hit by an attack to make one of them the target instead.',
        },
      ],
      actions: [
        { name: 'Multiattack', text: 'Three attacks: one Bite and two Claws.' },
        {
          name: 'Bite',
          text: 'Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 16 (3d6 + 5) piercing.',
        },
        {
          name: 'Claw',
          text: 'Melee Weapon Attack: +9 to hit, reach 10 ft., one target. Hit: 14 (2d6 + 5) slashing, and the target is grappled (escape DC 15). Raspka can grapple up to two creatures.',
        },
        {
          name: 'Crushing Hug',
          text: 'Melee Weapon Attack: +9 to hit, one creature she is grappling. Hit: 36 (5d10 + 9) bludgeoning, and she can’t make Claw attacks until the hug ends. It ends if she releases the grapple or is forced to move.',
        },
        {
          name: 'Sew the Wound (Recharge 5–6)',
          text: 'She stitches her own wounds, regaining 22 (4d8 + 4) hit points. Alternatively she stitches a creature’s shadow to the ground (reach 10 ft.): DC 15 Strength save or restrained 1 minute (repeat at end of turn; shadowless creatures are immune, which she notes with great interest).',
        },
      ],
    },
    circleDeadNote:
      'While the circle is dead: no Shared Spellcasting, no Hag Eye, and — the wound that matters — no shipbirth ritual. Her animate objects is hers, not the circle’s, and she has been testing how far her own magic stretches toward the birth rite. The answer is loose in Drydock Seven.',
    voiceLine: 'Good edge. Bad owner.',
  },
  {
    id: 'veshka',
    numeral: 'III',
    name: 'Veshka Morozova',
    epithet: 'Bheur Hag of the Storm-Cast Future — Daughter of Endelyn Moongrave',
    accent: 'frost',
    portrait: '/assets/img/portraits/portrait_veshka_morozova.png',
    portraitAlt: 'Veshka Morozova — a glacier-blue bheur hag with an owl-feather crest and a masthead staff crowned with ship’s bells',
    lineage:
      'Daughter of Endelyn Moongrave, the theatrical hag of Yon, the storm-realm of mountains and coming doom, who staged her tragedies under an eclipse she feared was her own ending. Veshka inherited the theater, the winter, and the certainty that everything is a play in its final act.',
    appearance:
      'Tall, hook-backed, wrapped in a ragged aurora of violet and gray trailing behind her like a curtain that hasn’t noticed the play is over. Skin the blue-white of deep glacier ice, a crest of owl feathers through iron-gray hair, black frost on her lips. She carries the Masthead Staff — her graystaff, cut from a lightning-split mast-top, crowned with ship’s bells that ring only when someone in the room is about to lie. Drinks freeze when she reaches past them.',
    personality:
      'Veshka announces things: every entrance a first act, every stranger a casting decision. She calls the party “the newcomers” in the third person while looking directly at them. The most openly frightening of the Three and the most fragile — the silence hit her like a stage blackout mid-line. Under the theater is despair, and under the despair is appetite: bheur hags feed on despair, and hers has started looking self-catering.',
    roleplayNotes: [
      'She casts people — “You — the brooding one — you die in the second act. It’s the jaw.” Theater, until it isn’t; she is a genuine oracle and can no longer always tell the difference.',
      'She asks sailors about the sky, not the sea: lights, wrong stars, an eclipse at noon that only the watch saw.',
      'Her staff-bells ring at lies; she sometimes lies deliberately to hear them, and smiles.',
      'Physical bit: she applauds, alone, slowly, when a plan pleases her.',
    ],
    goals: [
      'Learn how the story ends — and whether Endelyn foresaw the collapse, because if her mother the oracle didn’t see it coming, then someone edited the script.',
      'Restore the circle if it restores the omens; if it can’t, she has begun hoarding components for a killing-winter ritual — her mother’s fallback genre — to bury the cove in one magnificent final scene rather than watch it dwindle.',
      'She has not decided. She is waiting for the party to help her decide.',
    ],
    interview:
      'Omens: dreams, wrong weather, stars out of place, prophecies heard in foreign ports, crews who all dreamed the same dream, an eclipse where none was charted. She pays in prophecy — genuine, specific, dangerous prophecy — the worst currency to be owed.',
    bargainDoctrine: 'Terms and conditions apply to the ending.',
    bargainStyle:
      'Veshka bargains in foresight: she offers to tell you how something ends; her price is a promise about what you’ll do when it does. Her contracts read like stage directions and enforce like curses. She is the most likely of the Three to give something valuable for free, because the script requires it, and the least likely to forgive improvisation.',
    secrets: [
      'Veshka alone has received one omen since the silence: a recurring vision of six silhouettes on a black ship whose wake freezes behind it, sailing toward something that knocks. She has told her sisters it is nightmares. She has told no one that in the latest vision, one silhouette turned and looked at her.',
      'The killing-winter ritual exists, three-quarters assembled in the ice cliffs east of town, and the cove’s own blubber-oil reserves are part of it. Grandaunt Ulla’s missing fisher crew (§8) stumbled onto a cache site.',
      'She believes — correctly — that the sunken splinter of Prismeer beneath the Gullet is a piece of Yon, a corner of her mother’s mountain, and that the thing bound to hold it down is straining. Some nights she goes to the cliff edge and listens to it.',
    ],
    statblock: {
      name: 'VESHKA MOROZOVA',
      typeLine: 'Medium fey, neutral evil',
      ac: '17 (natural armor)',
      hp: '136 (16d8 + 64)',
      speed: '30 ft.',
      abilities: { str: 13, dex: 16, con: 18, int: 12, wis: 15, cha: 18 },
      cr: '10',
      xp: '5,900',
      accent: 'frost',
      traits: [
        { name: 'Saves', text: 'Dex +7, Wis +6, Cha +8' },
        { name: 'Skills', text: 'Arcana +5, Deception +8, Perception +6, Stealth +7' },
        { name: 'Senses', text: 'darkvision 60 ft., passive Perception 16' },
        { name: 'Languages', text: 'Auran, Common, Giant, Sylvan' },
        { name: 'Proficiency', text: '+4' },
        {
          name: 'Ice Walk',
          text: 'Veshka can move across and climb icy surfaces without an ability check, and difficult terrain composed of ice or snow doesn’t cost her extra movement.',
        },
        {
          name: 'Masthead Staff (Graystaff Magic)',
          text: 'Her staff is a spellcasting focus. Its bells ring when a creature within 30 feet deliberately lies (only Veshka hears them unless she wills otherwise). While she holds it, her innate spellcasting expands as below; without it she loses the 1/day spells and ray of frost.',
        },
        {
          name: 'Innate Spellcasting',
          text: 'Charisma-based (spell save DC 16, +8 to hit): at will — ray of frost (2d8 + 4 cold and speed reduced 10 ft.); 3/day each — fog cloud, sleet storm; 1/day each (staff only) — ice storm, wall of ice, cone of cold.',
        },
        {
          name: 'Despairing Feast',
          text: 'When a creature Veshka can see fails a saving throw against one of her spells or abilities, she can use her reaction to feed on the despair, gaining 10 temporary hit points.',
        },
      ],
      actions: [
        { name: 'Multiattack', text: 'Two Graystaff attacks.' },
        {
          name: 'Graystaff',
          text: 'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 5 (1d8 + 1) bludgeoning plus 9 (2d8) cold.',
        },
        {
          name: 'Howling Dirge (Recharge 5–6)',
          text: 'Storm-keened prophecy in a 30-foot cone: DC 16 Wisdom save, 27 (5d8 + 4) psychic damage and frightened for 1 minute on a failure, half damage and no fear on success (repeat save at end of turn). A frightened creature sees its own death staged in the ice.',
        },
      ],
    },
    circleDeadNote:
      'While the circle is dead: no Shared Spellcasting, no Hag Eye, and — worst of all for Veshka — the omens have gone quiet. Prophecy ran through the circle like weather through a mountain pass; now she gets static, one recurring vision, and silence.',
    voiceLine: 'You — the brooding one — you die in the second act. It’s the jaw.',
  },
];

export const ACCENT_TEXT: Record<StatAccent, string> = {
  hag: 'text-hag',
  heat: 'text-heat',
  frost: 'text-frost',
  brass: 'text-brass',
};

export const ACCENT_BG: Record<StatAccent, string> = {
  hag: 'bg-hag',
  heat: 'bg-heat',
  frost: 'bg-frost',
  brass: 'bg-brass',
};

export const ACCENT_BORDER: Record<StatAccent, string> = {
  hag: 'border-hag',
  heat: 'border-heat',
  frost: 'border-frost',
  brass: 'border-brass',
};
