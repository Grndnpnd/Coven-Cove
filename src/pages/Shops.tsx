import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SeamDivider from '@/components/SeamDivider';
import SectionKicker from '@/components/SectionKicker';
import CurrencyConverter from '@/components/CurrencyConverter';
import ShopsBanner from '@/components/shops/ShopsBanner';
import CurrencySection from '@/components/shops/CurrencySection';
import BarterRules from '@/components/shops/BarterRules';
import ShopRail from '@/components/shops/ShopRail';
import ShopSection from '@/components/shops/ShopSection';
import { SHOPS } from '@/components/shops/data';

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

/** §4 — The Chandler's Abacus (interactive converter). */
function ConverterSection() {
  return (
    <section id="converter" className="scroll-mt-28 bg-ink py-20 md:py-28" aria-label="Currency converter">
      <div className="mx-auto max-w-[1100px] px-6 lg:px-12">
        <SectionKicker>§5 · Barter, computed</SectionKicker>
        <h2
          className="mt-4 text-center font-display-sc text-bone"
          style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)', letterSpacing: '0.04em' }}
        >
          The Chandler’s Abacus
        </h2>
        <p className="mx-auto mt-4 max-w-[54ch] text-center font-body text-[1.05rem] italic leading-[1.75] text-mist">
          Total anchor values, apply the off-season, see the haggle window.
        </p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mt-12"
        >
          <CurrencyConverter />
        </motion.div>
      </div>
    </section>
  );
}

/** §7 — Footer CTA strip. */
function FooterCta() {
  return (
    <div className="bg-ink pb-20">
      <SeamDivider />
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-center gap-4 px-6 pt-12 text-center md:flex-row md:gap-12 lg:px-12">
        <Link
          to="/townsfolk"
          className="link-hag font-display text-xl text-bone transition-colors hover:text-gold"
        >
          Who runs these counters → /townsfolk
        </Link>
        <Link
          to="/encounters#tables"
          className="link-hag font-display text-xl text-bone transition-colors hover:text-gold"
        >
          Roll a rumor you overheard → /encounters
        </Link>
      </div>
    </div>
  );
}

export default function Shops() {
  return (
    <>
      <ShopsBanner />
      <CurrencySection />
      <SeamDivider />
      <BarterRules />
      <SeamDivider />
      <ConverterSection />
      <ShopRail />
      {SHOPS.map((shop, i) => (
        <ShopSection key={shop.slug} shop={shop} index={i} />
      ))}
      <FooterCta />
    </>
  );
}
