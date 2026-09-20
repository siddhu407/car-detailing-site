import { useState } from 'react';
import { X, Loader as Loader2, CircleCheck as CheckCircle2, Car, User, Phone, Zap } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { supabase, type FulfillmentType } from '@/lib/supabase';
import { formatPrice } from '@/data/services';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FULFILLMENT_OPTIONS: { value: FulfillmentType; label: string; desc: string; icon: typeof Zap }[] = [
  { value: 'express', label: 'Express Wash', desc: 'Quick in-studio service', icon: Zap },
  { value: 'deep-clean', label: 'Deep Clean', desc: 'Full detailing at studio', icon: CheckCircle2 },
  { value: 'pickup', label: 'Pickup & Drop', desc: 'We come to you', icon: Car },
];

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { items, total, clearCart } = useCart();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [carNumber, setCarNumber] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [fulfillment, setFulfillment] = useState<FulfillmentType>('express');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !phone.trim() || !carNumber.trim() || !vehicleModel.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    if (!/^\d{10}$/.test(phone.replace(/\s/g, ''))) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }

    setLoading(true);
    const { error: dbError } = await supabase.from('car_orders').insert({
      client_name: name.trim(),
      phone: phone.trim(),
      car_number: carNumber.trim().toUpperCase(),
      vehicle_model: vehicleModel.trim(),
      items_json: items,
      fulfillment_type: fulfillment,
      status: 'pending',
    });
    setLoading(false);

    if (dbError) {
      setError('Could not place your order. Please try again.');
      return;
    }

    setSuccess(true);
    clearCart();
    setTimeout(() => {
      setSuccess(false);
      setName('');
      setPhone('');
      setCarNumber('');
      setVehicleModel('');
      setFulfillment('express');
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink-900/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-ink-400/50 bg-ink-700 shadow-2xl scrollbar-hide">
        <div className="flex items-center justify-between border-b border-ink-400/40 px-6 py-4">
          <h2 className="font-display text-lg font-bold text-white">Checkout</h2>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-ink-600 hover:text-white"
            aria-label="Close checkout"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {success ? (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-400/15">
              <CheckCircle2 className="h-8 w-8 text-teal-400" />
            </div>
            <h3 className="mt-4 font-display text-xl font-bold text-white">Order Placed!</h3>
            <p className="mt-2 text-sm text-slate-400">
              We'll call you shortly to confirm your booking.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-6 py-5">
            {/* Order summary */}
            <div className="rounded-xl border border-ink-400/40 bg-ink-600/40 p-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Order Summary
              </p>
              <div className="space-y-1.5">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-slate-300">{item.name}</span>
                    <span className="text-slate-400">{formatPrice(item.price)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex justify-between border-t border-ink-400/40 pt-3">
                <span className="font-display text-sm font-bold text-white">Total</span>
                <span className="font-display text-sm font-bold text-teal-400">
                  {formatPrice(total)}
                </span>
              </div>
            </div>

            {/* Fulfillment type */}
            <div className="mt-5">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                Service Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                {FULFILLMENT_OPTIONS.map((opt) => {
                  const Icon = opt.icon;
                  const active = fulfillment === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setFulfillment(opt.value)}
                      className={`rounded-xl border p-3 text-center transition-all ${
                        active
                          ? 'border-teal-400 bg-teal-400/10'
                          : 'border-ink-400/40 bg-ink-600/30 hover:border-ink-400'
                      }`}
                    >
                      <Icon
                        className={`mx-auto h-5 w-5 ${active ? 'text-teal-400' : 'text-slate-500'}`}
                      />
                      <p className={`mt-1.5 text-xs font-semibold ${active ? 'text-white' : 'text-slate-400'}`}>
                        {opt.label}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Contact details */}
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Jeevan Kumar"
                    className="w-full rounded-xl border border-ink-400/50 bg-ink-800/60 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-600 outline-none transition-colors focus:border-teal-400"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Phone
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="10-digit number"
                    className="w-full rounded-xl border border-ink-400/50 bg-ink-800/60 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-600 outline-none transition-colors focus:border-teal-400"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Car Number
                </label>
                <div className="relative">
                  <Car className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600" />
                  <input
                    type="text"
                    value={carNumber}
                    onChange={(e) => setCarNumber(e.target.value)}
                    placeholder="KA01 AB 1234"
                    className="w-full rounded-xl border border-ink-400/50 bg-ink-800/60 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-600 outline-none transition-colors focus:border-teal-400"
                  />
                </div>
              </div>

              <div className="col-span-2">
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Vehicle Model
                </label>
                <input
                  type="text"
                  value={vehicleModel}
                  onChange={(e) => setVehicleModel(e.target.value)}
                  placeholder="e.g. Maruti Swift VXi 2021"
                  className="w-full rounded-xl border border-ink-400/50 bg-ink-800/60 py-2.5 px-4 text-sm text-white placeholder-slate-600 outline-none transition-colors focus:border-teal-400"
                />
              </div>
            </div>

            {error && (
              <p className="mt-3 rounded-lg bg-red-500/10 px-3 py-2 text-xs font-medium text-red-400">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-400 to-aqua-500 py-3.5 font-display text-sm font-bold text-ink-900 transition-all hover:brightness-110 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Placing Order...
                </>
              ) : (
                'Confirm Order'
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
