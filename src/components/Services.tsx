import { Check } from 'lucide-react';
import { SERVICES, formatPrice } from '@/data/services';
import { useCart } from '@/context/CartContext';

export default function Services() {
  const { items, addItem } = useCart();

  return (
    <section id="services" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-400">
            Service Packages
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
            Compact, transparent pricing
          </h2>
          <p className="mt-3 text-slate-400">
            Pick the services your car needs. Add them to your cart and check out in under a minute.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, idx) => {
            const inCart = items.some((i) => i.id === service.id);
            return (
              <div
                key={service.id}
                className="group relative flex items-center gap-4 rounded-2xl border border-ink-400/50 bg-ink-700/40 p-4 transition-all hover:border-teal-400/40 hover:bg-ink-600/40 hover:shadow-lg hover:shadow-teal-500/5"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <img
                  src={service.image}
                  alt={service.name}
                  className="h-16 w-16 flex-shrink-0 rounded-xl object-cover ring-1 ring-ink-400/50"
                  loading="lazy"
                />

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-teal-400">
                      {service.category}
                    </span>
                  </div>
                  <h3 className="mt-0.5 truncate font-display text-sm font-bold text-white">
                    {service.name}
                  </h3>
                  <p className="mt-1 font-display text-lg font-bold text-teal-400">
                    {formatPrice(service.price)}
                  </p>
                </div>

                <button
                  onClick={() => addItem(service)}
                  disabled={inCart}
                  className={`flex h-9 flex-shrink-0 items-center gap-1.5 rounded-lg px-3 text-xs font-bold transition-all ${
                    inCart
                      ? 'cursor-default bg-teal-400/15 text-teal-400'
                      : 'bg-teal-400 text-ink-900 hover:brightness-110 hover:shadow-md hover:shadow-teal-500/20'
                  }`}
                >
                  {inCart ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      Added
                    </>
                  ) : (
                    'Add to Cart'
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
