import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SeamDivider from './SeamDivider';

const LINKS = [
  { to: '/the-three', label: 'The Three' },
  { to: '/the-town', label: 'The Town' },
  { to: '/shops', label: 'Shops & Economy' },
  { to: '/townsfolk', label: 'Townsfolk' },
  { to: '/quests', label: 'Quests & Story' },
  { to: '/encounters', label: 'Encounters & Tables' },
  { to: '/gallery', label: 'Gallery & Foundry Pack' },
];

export default function Footer() {
  return (
    <footer className="bg-ink">
      <SeamDivider />
      <div className="mx-auto grid max-w-[1200px] gap-10 px-6 py-14 md:grid-cols-3 lg:px-12">
        <div>
          <div className="flex items-center gap-3">
            <img
              src="/assets/img/sigils/sigil_triple_moon_coven.png"
              alt="Triple-moon coven sigil"
              className="h-9 w-9 rounded-full object-cover"
            />
            <span className="font-display-sc text-lg tracking-[0.08em] text-bone">COVEN COVE</span>
          </div>
          <p className="mt-4 max-w-xs font-body text-sm leading-relaxed text-mist">
            Coven Cove — a Feywild pirate-cove town, GM guide &amp; asset pack.
            Everything is a bargain; every bargain has teeth.
          </p>
        </div>
        <div>
          <h3 className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-brass">
            The Guide
          </h3>
          <ul className="mt-4 space-y-2">
            {LINKS.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="link-hag font-body text-sm text-bone-dim hover:text-bone"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-brass">
            Foundry Pack
          </h3>
          <p className="mt-4 font-body text-sm leading-relaxed text-mist">
            Seven importable actors and their statblocks — the Three, the Tideguard,
            the feral mimic-hulk, and more — are bundled as Foundry VTT JSON.
          </p>
          <Link
            to="/gallery#foundry"
            className="link-hag mt-3 inline-block font-mono text-[0.72rem] uppercase tracking-[0.2em] text-gold"
          >
            Get the downloads →
          </Link>
        </div>
      </div>
      <div className="border-t border-line/60 px-6 py-6 text-center">
        <motion.p
          initial={{ opacity: 0.4 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.9 }}
          transition={{ duration: 1.2 }}
          className="flicker font-mono text-[0.72rem] tracking-[0.12em] text-mist"
        >
          “Once you deal with the coven, you don’t bargain back.”
        </motion.p>
      </div>
    </footer>
  );
}
