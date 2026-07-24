import SectionKicker from '@/components/SectionKicker';

/** Route stub — page agents replace these with full pages. */
function Stub({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="flex min-h-[60dvh] flex-col items-center justify-center gap-4 px-6 text-center">
      <SectionKicker>{kicker}</SectionKicker>
      <h1 className="font-display-sc text-4xl text-bone md:text-5xl">{title}</h1>
      <p className="max-w-[50ch] font-body text-sm italic leading-relaxed text-mist">
        This chapter is being inked. Check back once the tide turns.
      </p>
    </div>
  );
}

export const TheThree = () => <Stub kicker="§2 · The Coven" title="The Three" />;
export const TheTown = () => <Stub kicker="§4 · Geography" title="The Town" />;
export const Shops = () => <Stub kicker="§5–6 · Economy" title="Shops & Economy" />;
export const Townsfolk = () => <Stub kicker="§7 · People" title="Townsfolk of Note" />;
export const Quests = () => <Stub kicker="§8–9 · Story" title="Quests & Story" />;
export const Encounters = () => <Stub kicker="§10–11 · Tables" title="Encounters & Tables" />;
export const Gallery = () => <Stub kicker="Assets · Foundry" title="Gallery & Foundry Pack" />;
