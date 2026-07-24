export type GalleryCategory = 'Scenes' | 'Portraits' | 'Maps' | 'Sigils';

export interface GalleryItem {
  src: string;
  title: string;
  category: GalleryCategory;
  /** e.g. "16:9 · 2K" */
  dimensions: string;
  /** Intended-use line, e.g. "The Three — hag portrait, home teaser" */
  use: string;
}

/**
 * The full 26-piece art manifest (design.md §9 filenames + gallery.md
 * captions/intended-use), ordered scenes → portraits → maps → sigils.
 */
export const GALLERY_ITEMS: GalleryItem[] = [
  // ————— Scenes (8) —————
  {
    src: '/assets/img/scenes/scene_coven_cove_from_the_sea.png',
    title: 'The Cove From the Sea',
    category: 'Scenes',
    dimensions: '16:9 · 2K',
    use: 'Home hero establishing shot; arrival handout',
  },
  {
    src: '/assets/img/scenes/scene_tide_court_interview.png',
    title: 'The Tide-Court Interview',
    category: 'Scenes',
    dimensions: '16:9',
    use: 'The Three banner; the interview hall astride the seam',
  },
  {
    src: '/assets/img/scenes/scene_silent_shipyard_dormant_hulks.png',
    title: 'The Silent Shipyard',
    category: 'Scenes',
    dimensions: '16:9',
    use: 'The Town — the Cradles; dormant mimic-ship hulls',
  },
  {
    src: '/assets/img/scenes/scene_mimic_ship_reveal.png',
    title: 'The Seventh Born',
    category: 'Scenes',
    dimensions: '16:9',
    use: 'Encounters — Feral Mimic-Hulk; Quests big moment 3',
  },
  {
    src: '/assets/img/scenes/scene_twain_tankard.png',
    title: 'The Twain Tankard',
    category: 'Scenes',
    dimensions: '16:9',
    use: 'Shops — Twain Tankard; Home',
  },
  {
    src: '/assets/img/scenes/scene_shivering_kiln.png',
    title: 'The Shivering Kiln',
    category: 'Scenes',
    dimensions: '16:9',
    use: 'Shops — the Shivering Kiln coral-glass smithy',
  },
  {
    src: '/assets/img/scenes/scene_greywake_fishery.png',
    title: 'Greywake Rendering Works',
    category: 'Scenes',
    dimensions: '16:9',
    use: 'Shops — Greywake Fishery ice-fishery & blubber-oil works',
  },
  {
    src: '/assets/img/scenes/scene_inked_tide.png',
    title: 'The Inked Tide',
    category: 'Scenes',
    dimensions: '16:9',
    use: 'Shops — the Inked Tide cartographer',
  },
  // ————— Portraits (11) —————
  {
    src: '/assets/img/portraits/portrait_morgha_brineshroud.png',
    title: 'Morgha Brineshroud — Sea Hag of the Drowned Past',
    category: 'Portraits',
    dimensions: '2:3 · 1K',
    use: 'The Three — hag portrait; home teaser',
  },
  {
    src: '/assets/img/portraits/portrait_raspka_irongrinn.png',
    title: "Raspka Irongrinn — 'Granny Threadbare'",
    category: 'Portraits',
    dimensions: '2:3',
    use: 'The Three — hag portrait; home teaser',
  },
  {
    src: '/assets/img/portraits/portrait_veshka_morozova.png',
    title: 'Veshka Morozova — Bheur Hag of the Storm-Cast Future',
    category: 'Portraits',
    dimensions: '2:3',
    use: 'The Three — hag portrait; home teaser',
  },
  {
    src: '/assets/img/portraits/portrait_brullo_icekeel.png',
    title: 'Harbormaster Brullo Icekeel',
    category: 'Portraits',
    dimensions: '2:3',
    use: 'Townsfolk; Town — the docks',
  },
  {
    src: '/assets/img/portraits/portrait_korvun_driftbrace.png',
    title: 'Master Shipwright Korvun Driftbrace',
    category: 'Portraits',
    dimensions: '2:3',
    use: 'Townsfolk; Shops — Three Keels Yard',
  },
  {
    src: '/assets/img/portraits/portrait_pem_blackbeak.png',
    title: 'Captain Pem Blackbeak',
    category: 'Portraits',
    dimensions: '2:3',
    use: 'Townsfolk — pengkin corsair captain',
  },
  {
    src: '/assets/img/portraits/portrait_trinket_the_marionette.png',
    title: 'Trinket',
    category: 'Portraits',
    dimensions: '2:3',
    use: 'Townsfolk — the self-moving marionette stagehand',
  },
  {
    src: '/assets/img/portraits/portrait_pinny_squall.png',
    title: 'Broker Pinny Squall',
    category: 'Portraits',
    dimensions: '2:3',
    use: 'Shops — Foundling Flotsam; Townsfolk',
  },
  {
    src: '/assets/img/portraits/portrait_sevra_waxwork.png',
    title: 'Widow Sevra Waxwork',
    category: 'Portraits',
    dimensions: '2:3',
    use: 'Shops — the Tithe Candle',
  },
  {
    src: '/assets/img/portraits/portrait_zizi_emberglass.png',
    title: 'Zizi Emberglass',
    category: 'Portraits',
    dimensions: '2:3',
    use: 'Shops — the Shivering Kiln',
  },
  {
    src: '/assets/img/portraits/portrait_yllva_snowmilk.png',
    title: 'Yllva Snowmilk',
    category: 'Portraits',
    dimensions: '2:3',
    use: 'Shops — Womb & Wake; Townsfolk',
  },
  // ————— Maps (5) —————
  {
    src: '/assets/img/maps/map_coven_cove_topdown.png',
    title: 'Coven Cove — Town Map',
    category: 'Maps',
    dimensions: '16:9 · 2K',
    use: 'The Town — interactive map; Home',
  },
  {
    src: '/assets/img/maps/battlemap_splitmarket_square.png',
    title: 'Splitmarket Square',
    category: 'Maps',
    dimensions: '1:1–16:9',
    use: 'Town — Splitmarket; battlemap astride the seam',
  },
  {
    src: '/assets/img/maps/battlemap_frozen_dock.png',
    title: 'Icefast Quay',
    category: 'Maps',
    dimensions: '16:9',
    use: 'Town — docks; Encounters',
  },
  {
    src: '/assets/img/maps/battlemap_coral_dune_ambush.png',
    title: 'Coral Dune Ambush',
    category: 'Maps',
    dimensions: '16:9',
    use: 'Quests — SQ7; Encounters',
  },
  {
    src: '/assets/img/maps/battlemap_tide_court_drydock.png',
    title: 'Tide-Court Drydock',
    category: 'Maps',
    dimensions: '16:9',
    use: 'Town — the Cradles; Encounters',
  },
  // ————— Sigils (2) —————
  {
    src: '/assets/img/sigils/sigil_triple_moon_coven.png',
    title: 'The Triple-Moon Sigil',
    category: 'Sigils',
    dimensions: '1:1',
    use: 'Navbar, footer, dividers, favicon — the coven mark',
  },
  {
    src: '/assets/img/sigils/flag_witch_hat_penguin_jolly_roger.png',
    title: 'The Fleet Flag — Witch-Hat Penguin',
    category: 'Sigils',
    dimensions: '3:2',
    use: 'Townsfolk — Pem/Goldbreast; Quests — the corsair fleet flag',
  },
];
