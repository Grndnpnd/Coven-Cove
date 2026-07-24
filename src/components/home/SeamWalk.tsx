import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface Caption {
  side: 'west' | 'east' | 'center';
  color: string;
  text: string;
}

const CAPTIONS: Caption[] = [
  {
    side: 'west',
    color: 'text-heat',
    text: 'One step: bleached coral desert. Sand made of crushed coral that shreds what it touches.',
  },
  {
    side: 'east',
    color: 'text-frost',
    text: 'Next step: glacial tundra. Perpetual deep-freeze, black ice, frozen cliffs.',
  },
  {
    side: 'center',
    color: 'text-bone',
    text: 'Between them: nothing. No transition. It simply is, the way a cut simply is.',
  },
  {
    side: 'center',
    color: 'text-hag',
    text: 'Nobody made the seam. Grandmother found it. That is the only explanation ever offered.',
  },
];

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

/** Drifting sand motes / snowflakes — CSS-only, transform-only. */
function Particles({ kind }: { kind: 'sand' | 'snow' }) {
  const motes = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: kind === 'sand' ? 2 + Math.random() * 2 : 2 + Math.random() * 3,
        dur: 7 + Math.random() * 9,
        delay: -Math.random() * 12,
      })),
    [kind],
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {motes.map((m) => (
        <span
          key={m.id}
          className={kind === 'sand' ? 'sand-mote' : 'snow-flake'}
          style={{
            left: `${m.left}%`,
            top: `${m.top}%`,
            width: m.size,
            height: m.size,
            animationDuration: `${m.dur}s`,
            animationDelay: `${m.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

/**
 * HOME §2 — pinned scroll set-piece. A sailor marker walks the seam while
 * captions swap on the active side; at the end the panel flips temperature.
 * GSAP lives ONLY in this component (library isolation); fallback is static.
 */
export default function SeamWalk() {
  const fallback = useStaticFallback();
  const scopeRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);
  const seamRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useGSAP(
    () => {
      if (fallback || !scopeRef.current) return;
      let lastIdx = 0;
      let lastFlip = false;
      ScrollTrigger.create({
        trigger: scopeRef.current,
        start: 'top top',
        end: '+=180%',
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          if (markerRef.current) {
            markerRef.current.style.top = `${6 + p * 86}%`;
          }
          if (seamRef.current) {
            const passed = Math.min(3, Math.floor(p * 4));
            seamRef.current.style.boxShadow = `0 0 ${8 + passed * 8}px rgba(159,214,63,${0.3 + passed * 0.15})`;
          }
          const idx = Math.min(CAPTIONS.length - 1, Math.floor(p * CAPTIONS.length));
          if (idx !== lastIdx) {
            lastIdx = idx;
            setActiveIdx(idx);
          }
          const flip = p > 0.965;
          if (flip !== lastFlip) {
            lastFlip = flip;
            setFlipped(flip);
          }
        },
      });
    },
    { scope: scopeRef, dependencies: [fallback] },
  );

  if (fallback) {
    return (
      <section className="relative grid md:grid-cols-2">
        <div className="relative bg-[#2A1E26] p-8 md:p-14">
          <Particles kind="sand" />
          <p className="relative font-body text-lg italic leading-relaxed text-heat">
            {CAPTIONS[0].text}
          </p>
        </div>
        <div className="relative bg-[#16222E] p-8 md:p-14">
          <Particles kind="snow" />
          <p className="relative font-body text-lg italic leading-relaxed text-frost">
            {CAPTIONS[1].text}
          </p>
        </div>
        <div
          className="absolute left-0 top-1/2 h-[3px] w-full bg-bone/80 shadow-[0_0_14px_rgba(159,214,63,0.4)] md:left-1/2 md:top-0 md:h-full md:w-[3px]"
          aria-hidden
        />
        <div className="bg-abyss px-8 py-10 md:col-span-2">
          {CAPTIONS.slice(2).map((c) => (
            <p
              key={c.text}
              className={cn(
                'mx-auto max-w-[60ch] py-2 text-center font-body text-lg italic leading-relaxed',
                c.color,
              )}
            >
              {c.text}
            </p>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={scopeRef} className="relative h-[100dvh] overflow-hidden">
      <div className="grid h-full grid-cols-2">
        {/* West — the Bleach */}
        <div
          className={cn(
            'relative transition-colors [transition-duration:250ms]',
            flipped ? 'bg-[#16222E]' : 'bg-[#2A1E26]',
          )}
        >
          <Particles kind={flipped ? 'snow' : 'sand'} />
          <div
            className={cn(
              'absolute bottom-[18%] left-[10%] max-w-[36ch] transition-all duration-300',
              activeIdx === 0 ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0',
            )}
          >
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-heat">
              The Bleach · West
            </p>
            <p className="mt-3 font-body text-xl italic leading-relaxed text-bone">
              {CAPTIONS[0].text}
            </p>
          </div>
        </div>
        {/* East — the Rime */}
        <div
          className={cn(
            'relative transition-colors [transition-duration:250ms]',
            flipped ? 'bg-[#2A1E26]' : 'bg-[#16222E]',
          )}
        >
          <Particles kind={flipped ? 'sand' : 'snow'} />
          <div
            className={cn(
              'absolute bottom-[18%] right-[10%] max-w-[36ch] text-right transition-all duration-300',
              activeIdx === 1 ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0',
            )}
          >
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-frost">
              The Rime · East
            </p>
            <p className="mt-3 font-body text-xl italic leading-relaxed text-bone">
              {CAPTIONS[1].text}
            </p>
          </div>
        </div>
      </div>

      {/* The seam — a 3px knife-cut */}
      <div
        ref={seamRef}
        className="absolute left-1/2 top-0 h-full w-[3px] -translate-x-1/2 bg-bone/90"
        style={{ boxShadow: '0 0 8px rgba(159,214,63,0.3)' }}
        aria-hidden
      />

      {/* The sailor marker — "you" */}
      <div
        ref={markerRef}
        className="absolute left-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
        style={{ top: '6%' }}
      >
        <div className="flex flex-col items-center gap-1.5">
          <span className="block h-4 w-4 rounded-full border-2 border-ink bg-brass shadow-[0_0_12px_rgba(185,138,62,0.8)]" />
          <span className="bg-ink/80 px-1.5 py-0.5 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-brass">
            you
          </span>
        </div>
      </div>

      {/* Center captions */}
      <div className="pointer-events-none absolute inset-x-0 top-[12%] flex justify-center px-6">
        {CAPTIONS.slice(2).map((c, i) => (
          <p
            key={c.text}
            className={cn(
              'absolute max-w-[56ch] text-center font-body text-xl italic leading-relaxed transition-all duration-300 md:text-2xl',
              c.color,
              activeIdx === i + 2 ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0',
            )}
          >
            {c.text}
          </p>
        ))}
      </div>
    </section>
  );
}
