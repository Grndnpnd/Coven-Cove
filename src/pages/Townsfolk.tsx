import { Link } from 'react-router-dom';
import SeamDivider from '@/components/SeamDivider';
import TownsfolkBanner from '@/components/townsfolk/TownsfolkBanner';
import HagCraftPrimer from '@/components/townsfolk/HagCraftPrimer';
import FolkGrid from '@/components/townsfolk/FolkGrid';
import NameLists from '@/components/townsfolk/NameLists';
import FleetFlag from '@/components/townsfolk/FleetFlag';

/** §6 — Footer CTA strip. */
function FooterCta() {
  return (
    <div className="bg-ink pb-20">
      <SeamDivider />
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-center gap-4 px-6 pt-12 text-center md:flex-row md:gap-12 lg:px-12">
        <Link
          to="/quests"
          className="link-hag font-display text-xl text-bone transition-colors hover:text-gold"
        >
          Give them something to do → /quests
        </Link>
        <Link
          to="/the-three"
          className="link-hag font-display text-xl text-bone transition-colors hover:text-gold"
        >
          Meet their landlords → /the-three
        </Link>
      </div>
    </div>
  );
}

export default function Townsfolk() {
  return (
    <>
      <TownsfolkBanner />
      <HagCraftPrimer />
      <SeamDivider />
      <FolkGrid />
      <SeamDivider />
      <NameLists />
      <SeamDivider />
      <FleetFlag />
      <FooterCta />
    </>
  );
}
