import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { navLinks } from '../data/siteContent';
import BrandLogo from './BrandLogo';

const linkBase = 'rounded-full px-3.5 py-2 text-sm font-black tracking-[-0.01em] transition';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/20 bg-ink/95 shadow-[0_16px_40px_rgba(0,0,0,0.22)] backdrop-blur-xl">
      <nav className="container-page flex h-20 items-center justify-between">
        <BrandLogo />

        <div className="hidden items-center gap-1 rounded-full bg-white/10 p-1 ring-1 ring-white/10 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              className={({ isActive }) =>
                `${linkBase} ${
                  isActive
                    ? 'bg-white text-ink shadow-sm'
                    : 'text-white/90 hover:bg-white/20 hover:text-white'
                }`
              }
              end={link.href === '/'}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <NavLink
          to="/quote"
          className={({ isActive }) =>
            [
              'hidden items-center justify-center rounded-full px-5 py-2.5 text-sm font-black transition lg:inline-flex',
              isActive
                ? 'bg-white text-ink shadow-sm ring-4 ring-limebrand/30'
                : 'bg-limebrand text-ink hover:-translate-y-0.5 hover:brightness-105',
            ].join(' ')
          }
        >
          Get a Quote
        </NavLink>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white lg:hidden"
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-ink lg:hidden">
          <div className="container-page flex flex-col gap-2 py-5">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) =>
                  `rounded-2xl px-4 py-3 text-sm font-black transition ${
                    isActive
                      ? 'bg-white text-ink'
                      : 'text-white/90 hover:bg-white/10 hover:text-white'
                  }`
                }
                end={link.href === '/'}
              >
                {link.label}
              </NavLink>
            ))}

            <NavLink
              to="/quote"
              className={({ isActive }) =>
                [
                  'mt-2 flex items-center justify-center rounded-2xl px-5 py-4 text-sm font-black transition',
                  isActive
                    ? 'bg-white text-ink ring-4 ring-limebrand/30'
                    : 'bg-limebrand text-ink',
                ].join(' ')
              }
            >
              Get a Quote
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
}