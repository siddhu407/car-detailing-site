import { ShoppingCart, X, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/data/services';

interface CartDrawerProps {
  onCheckout: () => void;
}

export default function CartDrawer({ onCheckout }: CartDrawerProps) {
  const { items, isOpen, closeCart, removeItem, total, count } = useCart();

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-ink-900/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <aside
        className={`fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col border-l border-ink-400/50 bg-ink-800 shadow-2xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-ink-400/40 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <ShoppingCart className="h-5 w-5 text-teal-400" />
            <h2 className="font-display text-lg font-bold text-white">
              Your Cart {count > 0 && `(${count})`}
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-ink-600 hover:text-white"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-ink-600/50">
                <ShoppingCart className="h-7 w-7 text-slate-600" />
              </div>
              <p className="mt-4 font-display text-sm font-semibold text-slate-300">
                Your cart is empty
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Add service packages to get started.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 rounded-xl border border-ink-400/40 bg-ink-700/50 p-3"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-12 w-12 rounded-lg object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-white">{item.name}</p>
                    <p className="text-xs text-teal-400">{formatPrice(item.price)}</p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-ink-600 hover:text-red-400"
                    aria-label="Remove item"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-ink-400/40 px-5 py-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Total</span>
              <span className="font-display text-2xl font-bold text-white">{formatPrice(total)}</span>
            </div>
            <button
              onClick={onCheckout}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-400 to-aqua-500 py-3.5 font-display text-sm font-bold text-ink-900 transition-all hover:brightness-110 hover:shadow-lg hover:shadow-teal-500/25"
            >
              Click to Continue
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
