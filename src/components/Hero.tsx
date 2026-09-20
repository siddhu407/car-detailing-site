import { Sparkles, MapPin, Clock, Star, ArrowRight } from 'lucide-react';
import { formatPrice } from '@/data/services';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden brushed-metal">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-teal-500/10 blur-[120px]" />
        <div className="absolute -right-40 bottom-1/4 h-96 w-96 rounded-full bg-aqua-500/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col justify-center px-5 pb-16 pt-32 sm:px-8 lg:min-h-screen lg:flex-row lg:items-center lg:gap-12 lg:pt-24">
        {/* Left content */}
        <div className="flex-1 animate-slide-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-400/10 px-4 py-1.5">
            <Sparkles className="h-3.5 w-3.5 text-teal-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-teal-300">
              Bengaluru's Premium Detailing Studio
            </span>
          </div>

          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl lg:text-6xl">
            Your car deserves
            <br />
            <span className="text-gradient-teal">mirror-gloss perfection</span>
          </h1>

          <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-400 sm:text-lg">
            Professional ceramic coating, deep interior cleaning, and custom accessories.
            Trusted by 132+ happy car owners across Sunkadakatte and beyond.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#services"
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-400 to-aqua-500 px-6 py-3.5 font-display text-sm font-bold text-ink-900 shadow-lg shadow-teal-500/25 transition-all hover:shadow-teal-500/40 hover:brightness-110"
            >
              View Service Packages
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#booking"
              className="inline-flex items-center gap-2 rounded-xl border border-ink-400 bg-ink-700/50 px-6 py-3.5 font-display text-sm font-bold text-white transition-all hover:border-teal-400/50 hover:text-teal-400"
            >
              Book a Slot
            </a>
          </div>

          {/* Stats */}
          <div className="mt-10 flex flex-wrap gap-6">
            <div>
              <div className="flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-teal-400 text-teal-400" />
                <span className="font-display text-2xl font-bold text-white">4.6</span>
              </div>
              <p className="mt-0.5 text-xs text-slate-500">132 Google Reviews</p>
            </div>
            <div className="h-10 w-px bg-ink-400/50" />
            <div>
              <div className="font-display text-2xl font-bold text-white">8+</div>
              <p className="mt-0.5 text-xs text-slate-500">Years of Trust</p>
            </div>
            <div className="h-10 w-px bg-ink-400/50" />
            <div>
              <div className="font-display text-2xl font-bold text-white">From {formatPrice(399)}</div>
              <p className="mt-0.5 text-xs text-slate-500">Service Starting</p>
            </div>
          </div>
        </div>

        {/* Right visual card */}
        <div className="mt-12 flex-1 lg:mt-0">
          <div className="relative">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-teal-400/20 to-aqua-500/20 blur-xl" />
            <div className="relative overflow-hidden rounded-3xl border border-ink-400/60 bg-ink-700/80 shadow-2xl">
              <img
                src="https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                alt="Professional ceramic coating application on a luxury car at Dolphin Car Spa"
                className="h-72 w-full object-cover sm:h-96"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-transparent to-transparent" />

              {/* Floating info card */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl glass border border-ink-400/40 px-5 py-4">
                <div>
                  <p className="text-xs text-slate-400">Now Open</p>
                  <p className="flex items-center gap-1.5 text-sm font-semibold text-white">
                    <Clock className="h-3.5 w-3.5 text-teal-400" />
                    Closes 7:30 PM
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400">Visit Us</p>
                  <p className="flex items-center gap-1.5 text-sm font-semibold text-white">
                    <MapPin className="h-3.5 w-3.5 text-teal-400" />
                    Sunkadakatte
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
