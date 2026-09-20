import { useState } from 'react';
import { Calendar, Clock, Car, User, Phone, Loader as Loader2, CircleCheck as CheckCircle2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { VEHICLE_TYPES, TIME_SLOTS, MONTHS } from '@/data/services';

export default function Booking() {
  const today = new Date();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [vehicleType, setVehicleType] = useState(VEHICLE_TYPES[0]);
  const [date, setDate] = useState('');
  const [time, setTime] = useState(TIME_SLOTS[0]);
  const [month, setMonth] = useState(MONTHS[today.getMonth()]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !phone.trim() || !date.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    if (!/^\d{10}$/.test(phone.replace(/\s/g, ''))) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }

    setLoading(true);
    const { error: dbError } = await supabase.from('car_slot_bookings').insert({
      client_name: name.trim(),
      phone: phone.trim(),
      vehicle_type: vehicleType,
      date: date.trim(),
      time,
      month,
      status: 'pending',
    });
    setLoading(false);

    if (dbError) {
      setError('Could not book your slot. Please try again.');
      return;
    }

    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setName('');
      setPhone('');
      setDate('');
      setTime(TIME_SLOTS[0]);
      setVehicleType(VEHICLE_TYPES[0]);
    }, 3000);
  };

  return (
    <section id="booking" className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-64 w-96 -translate-x-1/2 rounded-full bg-aqua-500/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-400">
            Slot Booking
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
            Book a slot in 30 seconds
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-slate-400">
            Choose your preferred date and time. We'll confirm via phone call.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-3xl border border-ink-400/50 bg-ink-700/40 shadow-2xl">
          <div className="grid lg:grid-cols-5">
            {/* Left visual */}
            <div className="relative hidden lg:col-span-2 lg:block">
              <img
                src="https://images.pexels.com/photos/3806249/pexels-photo-3806249.jpeg?auto=compress&cs=tinysrgb&w=600&h=700&fit=crop"
                alt="Car being washed at Dolphin Car Spa detailing studio"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-ink-700/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="font-display text-xl font-bold text-white">
                  Skip the wait. Reserve your bay.
                </h3>
                <p className="mt-2 text-sm text-slate-300">
                  Pre-booked slots get priority service — no queue, no delays.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="p-6 sm:p-8 lg:col-span-3">
              {success ? (
                <div className="flex h-full flex-col items-center justify-center py-16 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-400/15">
                    <CheckCircle2 className="h-8 w-8 text-teal-400" />
                  </div>
                  <h3 className="mt-4 font-display text-xl font-bold text-white">Slot Reserved!</h3>
                  <p className="mt-2 text-sm text-slate-400">
                    We'll call you to confirm your booking for {month} {date}, {time}.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600" />
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your name"
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
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Vehicle Type
                    </label>
                    <div className="relative">
                      <Car className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600" />
                      <select
                        value={vehicleType}
                        onChange={(e) => setVehicleType(e.target.value)}
                        className="w-full appearance-none rounded-xl border border-ink-400/50 bg-ink-800/60 py-2.5 pl-10 pr-4 text-sm text-white outline-none transition-colors focus:border-teal-400"
                      >
                        {VEHICLE_TYPES.map((v) => (
                          <option key={v} value={v} className="bg-ink-800">
                            {v}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Date
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600" />
                        <input
                          type="number"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          placeholder="e.g. 24"
                          min="1"
                          max="31"
                          className="w-full rounded-xl border border-ink-400/50 bg-ink-800/60 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-600 outline-none transition-colors focus:border-teal-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Month
                      </label>
                      <select
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        className="w-full appearance-none rounded-xl border border-ink-400/50 bg-ink-800/60 py-2.5 px-4 text-sm text-white outline-none transition-colors focus:border-teal-400"
                      >
                        {MONTHS.map((m) => (
                          <option key={m} value={m} className="bg-ink-800">
                            {m}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Preferred Time
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600" />
                      <select
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full appearance-none rounded-xl border border-ink-400/50 bg-ink-800/60 py-2.5 pl-10 pr-4 text-sm text-white outline-none transition-colors focus:border-teal-400"
                      >
                        {TIME_SLOTS.map((t) => (
                          <option key={t} value={t} className="bg-ink-800">
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {error && (
                    <p className="rounded-lg bg-red-500/10 px-3 py-2 text-xs font-medium text-red-400">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-400 to-aqua-500 py-3.5 font-display text-sm font-bold text-ink-900 transition-all hover:brightness-110 disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Booking...
                      </>
                    ) : (
                      'Book My Slot'
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
