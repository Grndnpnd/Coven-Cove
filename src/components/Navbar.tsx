import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { Menu, X, MoonStar } from 'lucide-react';
import { cn } from '@/lib/utils';

const LINKS = [
  { to: '/the-three', label: 'The Three' },
  { to: '/the-town', label: 'The Town' },
  { to: '/shops', label: 'Shops' },
  { to: '/townsfolk', label: 'Townsfolk' },
  { to: '/quests', label: 'Quests' },
  { to: '/encounters', label: 'Encounters' },
  { to: '/gallery', label: 'Gallery' },
];

/** Fixed site navbar — 64px tall. Layout owns the matching top offset. */
export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();
  const navigate = useNavigate();

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 160);
  });

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <motion.header
        animate={{ y: hidden && !open ? '-100%' : '0%' }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="fixed inset-x-0 top-0 z-50 h-16 bg-[rgba(18,10,31,0.82)] backdrop-blur-md"
      >
        <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-6 lg:px-12">
          <Link to="/" className="group flex items-center gap-3">
            <img
              src="/assets/img/sigils/sigil_triple_moon_coven.png"
              alt="Triple-moon coven sigil"
              className="h-[34px] w-[34px] rounded-full object-cover hag-glow flicker"
            />
            <span className="font-display-sc text-xl tracking-[0.08em] text-bone group-hover:text-gold">
              COVEN COVE
            </span>
          </Link>

          <nav className="hidden items-center gap-6 xl:flex">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  cn(
                    'link-hag font-mono text-[0.72rem] uppercase tracking-[0.2em] transition-colors',
                    isActive ? 'active text-gold' : 'text-mist hover:text-bone',
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/shops#converter')}
              className="hidden items-center gap-2 border border-brass/60 px-3 py-1.5 font-mono text-[0.72rem] uppercase tracking-[0.2em] text-brass transition-colors hover:border-gold hover:text-gold md:flex"
            >
              <MoonStar className="h-3.5 w-3.5" />
              Barter Rates
            </button>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="text-bone xl:hidden"
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* 2px hard-split bottom border: coral west / ice east */}
        <div className="absolute inset-x-0 bottom-0 flex h-[2px]">
          <div className="w-1/2 bg-coral-deep" />
          <div className="w-1/2 bg-ice-deep" />
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-ink xl:hidden"
          >
            {/* vertical seam down the drawer center */}
            <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-bone/70 shadow-[0_0_14px_rgba(159,214,63,0.35)]" />
            <nav className="relative flex h-full flex-col items-center justify-center gap-7 pt-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
              >
                <NavLink to="/" className="font-display-sc text-2xl text-bone">
                  Home
                </NavLink>
              </motion.div>
              {LINKS.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.11 + i * 0.06 }}
                >
                  <NavLink
                    to={l.to}
                    className={({ isActive }) =>
                      cn(
                        'font-mono text-sm uppercase tracking-[0.28em]',
                        isActive ? 'text-gold' : 'text-mist hover:text-bone',
                      )
                    }
                  >
                    {l.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
