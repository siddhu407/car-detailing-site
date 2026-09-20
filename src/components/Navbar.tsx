import { useState, useEffect } from 'react';
import { ShoppingCart, Droplets, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface NavbarProps {
  onOwnerLogin: () => void;
}

export default function Navbar({ onOwnerLogin }: NavbarProps) {
  const { count, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Book a Slot', href: '#booking' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'About', href: '#about' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass border-b border-ink-500/50 py-3' : 'py-5'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#home" className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-400 to-aqua-500 shadow-lg shadow-teal-500/20">
            <Droplets className="h-5 w-5 text-ink-900" strokeWidth={2.5} />
          </div>
          <div className="leading-tight">
            <span className="block font-display text-lg font-bold text-white">Dolphin</span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-teal-400">
              Car Spa
            </span>
          </div>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-300 transition-colors hover:text-teal-400"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={openCart}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-ink-400/60 bg-ink-700/50 text-slate-200 transition-all hover:border-teal-400/50 hover:text-teal-400"
            aria-label="Open cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-teal-400 px-1 text-[11px] font-bold text-ink-900">
                {count}
              </span>
            )}
          </button>

          <button
            className="md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="mt-3 border-t border-ink-500/40 md:hidden">
          <div className="flex flex-col gap-1 px-5 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-ink-600 hover:text-teal-400"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileOpen(false);
                onOwnerLogin();
              }}
              className="rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-500 transition-colors hover:bg-ink-600 hover:text-slate-300"
            >
              Owner Login
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
