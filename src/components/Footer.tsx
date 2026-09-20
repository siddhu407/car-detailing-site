import { Droplets, MapPin, Phone, Clock, Lock, CreditCard, Wallet, Smartphone, ArrowRight } from 'lucide-react';

interface FooterProps {
  onOwnerLogin: () => void;
}

export default function Footer({ onOwnerLogin }: FooterProps) {
  return (
    <footer id="about" className="border-t border-ink-400/30 bg-ink-800">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-400 to-aqua-500">
                <Droplets className="h-5 w-5 text-ink-900" strokeWidth={2.5} />
              </div>
              <div>
                <span className="block font-display text-lg font-bold text-white">Dolphin Car Spa</span>
                <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-teal-400">
                  Ceramic Coating & Detailing Studio
                </span>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              Your trusted car care destination in Sunkadakatte, Bengaluru. From express washes to
              full ceramic coating — we treat every car like our own.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="flex items-center gap-1.5 rounded-lg border border-ink-400/40 bg-ink-700/50 px-3 py-1.5 text-xs text-slate-400">
                <CreditCard className="h-3.5 w-3.5 text-teal-400" /> Debit Cards
              </span>
              <span className="flex items-center gap-1.5 rounded-lg border border-ink-400/40 bg-ink-700/50 px-3 py-1.5 text-xs text-slate-400">
                <Wallet className="h-3.5 w-3.5 text-teal-400" /> Google Pay
              </span>
              <span className="flex items-center gap-1.5 rounded-lg border border-ink-400/40 bg-ink-700/50 px-3 py-1.5 text-xs text-slate-400">
                <Smartphone className="h-3.5 w-3.5 text-teal-400" /> NFC Payments
              </span>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">
              Visit Us
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li className="flex gap-2.5">
                <MapPin className="h-4 w-4 flex-shrink-0 text-teal-400" />
                <span>#178, Next to Bharat Gas Godown, Magadi Main Rd, Sunkadakatte, Bengaluru 560091</span>
              </li>
              <li className="flex gap-2.5">
                <Phone className="h-4 w-4 flex-shrink-0 text-teal-400" />
                <a href="tel:+919880492143" className="transition-colors hover:text-teal-400">
                  098804 92143
                </a>
              </li>
              <li className="flex gap-2.5">
                <Clock className="h-4 w-4 flex-shrink-0 text-teal-400" />
                <span>Open daily · 9:00 AM – 7:30 PM</span>
              </li>
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a href="#services" className="text-slate-400 transition-colors hover:text-teal-400">
                  Service Packages
                </a>
              </li>
              <li>
                <a href="#booking" className="text-slate-400 transition-colors hover:text-teal-400">
                  Book a Slot
                </a>
              </li>
              <li>
                <a href="#reviews" className="text-slate-400 transition-colors hover:text-teal-400">
                  Reviews
                </a>
              </li>
              <li>
                <button
                  onClick={onOwnerLogin}
                  className="flex items-center gap-1.5 text-slate-500 transition-colors hover:text-teal-400"
                >
                  <Lock className="h-3.5 w-3.5" />
                  Owner Login
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Big Owner Login banner */}
        <button
          onClick={onOwnerLogin}
          className="group mt-10 flex w-full items-center justify-between gap-4 overflow-hidden rounded-2xl border border-teal-400/30 bg-gradient-to-r from-ink-700 via-ink-700 to-teal-500/10 p-5 text-left transition-all hover:border-teal-400/60 hover:shadow-lg hover:shadow-teal-500/10 sm:p-6"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-teal-400/15 transition-colors group-hover:bg-teal-400/25">
              <Lock className="h-6 w-6 text-teal-400" />
            </div>
            <div>
              <p className="font-display text-base font-bold text-white sm:text-lg">
                Owner Login
              </p>
              <p className="mt-0.5 text-xs text-slate-400 sm:text-sm">
                Secure management dashboard — view orders, bookings & pickup requests
              </p>
            </div>
          </div>
          <div className="flex flex-shrink-0 items-center gap-2 rounded-xl bg-teal-400 px-5 py-3 font-display text-sm font-bold text-ink-900 transition-all group-hover:brightness-110 group-hover:shadow-md group-hover:shadow-teal-500/30">
            <span className="hidden sm:inline">Login</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </div>
        </button>

        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-ink-400/30 pt-6 sm:flex-row">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Dolphin Car Spa. All rights reserved.
          </p>
          <p className="text-xs text-slate-600">
            Sunkadakatte · Magadi Main Road · Bengaluru
          </p>
        </div>
      </div>
    </footer>
  );
}
