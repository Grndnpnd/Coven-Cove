import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ------------------------------------------------------------------ */
/* Act content (gm-guide §9, quests.md §2)                             */
/* ------------------------------------------------------------------ */

interface Act {
  numeral: string;
  title: string;
  goal: string;
  body?: string[];
  ladder?: { round: string; text: string }[];
  bullets?: { name: string; text: string }[];
  quote?: string;
  branches?: { letter: string; title: string; text: string }[];
}

const ACTS: Act[] = [
  {
    numeral: 'I',
    title: 'Arrival: The Panicked Town',
    goal: 'Beat goal: the party likes the cove — strange, alive, in trouble.',
    body: [
      'A harbor full of ships and a town full of waiting. Pirates without new hulls gamble too loud; shipwrights drink at noon; half-grown hulks hang in the cradles like unanswered questions.',
      'Establish the seam and the Flip (someone staggers; everyone laughs; it’s kind and it isn’t), the two-price economy (their first purchase teaches barter), and the interview machinery — Pem presents the party’s names to the harbormaster’s booth before they’ve finished tying off.',
      'And under the politeness, the panic: a berth brawl at the Tankard, Barra’s Tideguard peeling it apart with practiced gentleness.',
    ],
  },
  {
    numeral: 'II',
    title: 'The Summons: The Tide-Court Interview',
    goal: 'Stakes dial: helpful party → the Three invest · neutral → standard interview · disruptive → the Three contain.',
    body: [
      'Within two days (sooner if they make noise): the summons, green-lit, bone-sealed, polite as a knife. A three-round social set-piece, one round per hag; seam underfoot, cauldron on the line, triple-moon overhead.',
    ],
    ladder: [
      {
        round: 'R1 · Morgha',
        text: 'asks what they have lost, and what they’ve seen dredged or floating — she is mapping their honesty (Insight DC 15: she already knows half the answers).',
      },
      {
        round: 'R2 · Raspka',
        text: 'inspects their gear, ship, and workmanship — she is pricing them (a well-maintained party earns her favor; a sloppy one earns a sharpening bill).',
      },
      {
        round: 'R3 · Veshka',
        text: 'asks what they’ve dreamed — she is casting them, and her staff-bells ring at lies (a fully honest PC gets a real omen; a lying PC gets a staged one).',
      },
    ],
    quote:
      'You will hear things on the water. We buy what the sea tells you. Once you deal with the coven, you don’t bargain back.',
  },
  {
    numeral: 'III',
    title: 'Escalation',
    goal: 'Choose two; let one be self-inflicted.',
    bullets: [
      {
        name: 'Yard riot',
        text: 'a captain with a dying hull storms the Cradles demanding a birth slot; Korvun stands in the gate; Barra is outnumbered; the dormant hulks lean toward the shouting.',
      },
      {
        name: 'The feral hulk wakes',
        text: 'Drydock Seven, midnight, chain-song — contained quietly, publicly, or poorly; each defines Act IV’s tone.',
      },
      {
        name: 'The Wind Teeth come',
        text: 'SQ5 as scheduled programming; if the party provoked the coven, the storm coincides with their expulsion deadline — the Feywild has a sense of timing.',
      },
      {
        name: 'The ice gives',
        text: 'a thin-ice collapse at Icefast Quay during a fragment arrival — a rescue scene, and below, everyone sees the splinter-light for the first time.',
      },
    ],
  },
  {
    numeral: 'IV',
    title: 'Revelation: The Trail West',
    goal: 'Assemble the ladder — then the Tide-Court names its price.',
    body: [
      'The spiral chart, Sovva’s account, Trinket’s play, Veshka’s vision. The party now knows: Prismeer’s anchor was taken west; the fragments follow it; the knot at the Gullet frays.',
      'The Three are diminished, desperate, and one of them is hedging toward a killing winter.',
    ],
    quote:
      'Find them, or help us become whole again — and name your price from the ledger of granddaughters.',
  },
  {
    numeral: 'V',
    title: 'Resolution Branches',
    goal: 'Three endings. The ledger of granddaughters stays open.',
    branches: [
      {
        letter: 'A',
        title: 'The New Hourglass',
        text: 'The coven rekindles; the cove is saved and bound; the party sails west as the coven’s creditors.',
      },
      {
        letter: 'B',
        title: 'Inheritance of Ashes',
        text: 'The keel-crypt, the chained heart, the severing; the folk wake free; the cove becomes a free port with a shipbuilding problem and a future.',
      },
      {
        letter: 'C',
        title: 'The Fourth Chair',
        text: 'The anchor as collateral; the coven leashed; grandmother notices; sequel bait on the horizon like a black ship.',
      },
    ],
  },
];

/* ------------------------------------------------------------------ */

function useStaticFallback() {
  const [fallback, setFallback] = useState(true);
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const narrow = window.matchMedia('(max-width: 767px)');
    const update = () => setFallback(reduced.matches || narrow.matches);
    update();
    reduced.addEventListener('change', update);
    narrow.addEventListener('change', update);
    return () => {
      reduced.removeEventListener('change', update);
      narrow.removeEventListener('change', update);
    };
  }, []);
  return fallback;
}

/** One act card — shared by the pinned timeline and the static fallback. */
function ActCard({ act, pinned = false }: { act: Act; pinned?: boolean }) {
  return (
    <article
      className={cn(
        'relative shrink-0 overflow-hidden border border-line bg-panel p-7 md:p-10',
        pinned ? 'flex h-[66vh] min-h-[430px] w-[70vw] max-w-[880px] flex-col overflow-y-auto' : 'w-full',
      )}
    >
      <span
        className="act-numeral pointer-events-none absolute -top-8 right-2 select-none font-display text-[10rem] leading-none text-bone/5 md:text-[14rem]"
        aria-hidden
      >
        {act.numeral}
      </span>

      <p className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-brass">
        Act {act.numeral}
      </p>
      <h3 className="relative mt-2 font-display text-bone" style={{ fontSize: '2.2rem', lineHeight: 1.1 }}>
        {act.title}
      </h3>
      <p className="relative mt-3 font-display text-[1.05rem] italic leading-relaxed text-gold">
        {act.goal}
      </p>

      {act.body?.map((p) => (
        <p key={p.slice(0, 24)} className="relative mt-4 max-w-[62ch] font-body text-[0.98rem] leading-relaxed text-bone-dim">
          {p}
        </p>
      ))}

      {act.ladder && (
        <ol className="relative mt-5 space-y-3 border-l-2 border-brass/50 pl-4">
          {act.ladder.map((r) => (
            <li key={r.round} className="font-body text-[0.95rem] leading-relaxed text-bone-dim">
              <span className="font-mono text-[0.78rem] uppercase tracking-[0.14em] text-brass">{r.round}</span>{' '}
              {r.text}
            </li>
          ))}
        </ol>
      )}

      {act.bullets && (
        <ul className="relative mt-5 space-y-3">
          {act.bullets.map((b) => (
            <li key={b.name} className="font-body text-[0.95rem] leading-relaxed text-bone-dim">
              <span className="font-display italic text-bone">{b.name}.</span> {b.text}
            </li>
          ))}
        </ul>
      )}

      {act.quote && (
        <p className="relative mt-5 border-l-2 border-hag pl-4 font-display text-lg italic leading-relaxed text-hag">
          “{act.quote}”
        </p>
      )}

      {act.branches && (
        <div className="relative mt-5 grid gap-4 md:grid-cols-3">
          {act.branches.map((b) => (
            <Link
              key={b.letter}
              to="/the-three#restoration"
              className="group border border-line bg-panel-deep p-4 transition-colors hover:border-brass/70"
            >
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-hag">
                Path {b.letter}
              </p>
              <p className="mt-1.5 font-display text-lg text-bone group-hover:text-gold">
                {b.title}
              </p>
              <p className="mt-2 font-body text-[0.85rem] leading-relaxed text-bone-dim">{b.text}</p>
            </Link>
          ))}
        </div>
      )}
    </article>
  );
}

/**
 * QUESTS §2 — pinned horizontal five-act timeline. GSAP + ScrollTrigger live
 * ONLY in this component (library isolation). Mobile / prefers-reduced-motion
 * get a static vertical stack of the same act cards.
 */
export default function ActTimeline() {
  const fallback = useStaticFallback();
  const scopeRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      if (fallback || !scopeRef.current || !trackRef.current) return;
      const track = trackRef.current;
      const dist = () => Math.max(0, track.scrollWidth - window.innerWidth);
      let last = 0;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scopeRef.current,
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.min(ACTS.length - 1, Math.floor(self.progress * ACTS.length));
            if (idx !== last) {
              last = idx;
              setActive(idx);
            }
          },
        },
      });
      // panels slide horizontally…
      tl.to(track, { x: () => -dist(), ease: 'none' }, 0);
      // …while ghost numerals drift slower (depth parallax)
      tl.to(gsap.utils.toArray('.act-numeral'), { x: () => dist() * 0.12, ease: 'none' }, 0);
    },
    { scope: scopeRef, dependencies: [fallback] },
  );

  if (fallback) {
    return (
      <div className="mx-auto grid max-w-[1200px] gap-6 px-6 pb-24 lg:px-12">
        {ACTS.map((act) => (
          <ActCard key={act.numeral} act={act} />
        ))}
      </div>
    );
  }

  return (
    <div ref={scopeRef} className="relative flex h-[100dvh] items-center overflow-hidden">
      {/* horizontal track of act panels */}
      <div
        ref={trackRef}
        className="flex w-max items-center gap-10 pl-[15vw] pr-[15vw]"
      >
        {ACTS.map((act) => (
          <ActCard key={act.numeral} act={act} pinned />
        ))}
      </div>

      {/* progress rail: five brass nodes filling hag-green as panels pass */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-3" aria-hidden>
        {ACTS.map((act, i) => (
          <div key={act.numeral} className="flex items-center gap-3">
            {i > 0 && <span className="h-px w-8 bg-brass/40" />}
            <span
              className={cn(
                'block h-2.5 w-2.5 rounded-full border border-brass transition-colors duration-500',
                i <= active ? 'bg-hag shadow-[0_0_10px_rgba(159,214,63,0.7)]' : 'bg-transparent',
              )}
            />
            <span
              className={cn(
                'font-mono text-[0.62rem] uppercase tracking-[0.2em] transition-colors duration-500',
                i <= active ? 'text-hag' : 'text-mist',
              )}
            >
              {act.numeral}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
