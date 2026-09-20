import { useState, useEffect, useCallback } from 'react';
import {
  X,
  ShoppingBag,
  CalendarClock,
  Truck,
  RefreshCw,
  LogOut,
  Phone,
  Car,
  Package,
  Clock,
} from 'lucide-react';
import { supabase, type CarOrder, type CarSlotBooking } from '@/lib/supabase';
import { formatPrice } from '@/data/services';

interface OwnerDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OwnerDashboard({ isOpen, onClose }: OwnerDashboardProps) {
  const [orders, setOrders] = useState<CarOrder[]>([]);
  const [bookings, setBookings] = useState<CarSlotBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    setRefreshing(true);
    const [ordersRes, bookingsRes] = await Promise.all([
      supabase.from('car_orders').select('*').order('created_at', { ascending: false }),
      supabase.from('car_slot_bookings').select('*').order('created_at', { ascending: false }),
    ]);

    if (ordersRes.data) setOrders(ordersRes.data);
    if (bookingsRes.data) setBookings(bookingsRes.data);
    setLoading(false);
    setRefreshing(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen, fetchData]);

  if (!isOpen) return null;

  const pickupOrders = orders.filter((o) => o.fulfillment_type === 'pickup');
  const onlineOrders = orders.filter((o) => o.fulfillment_type !== 'pickup');

  const updateOrderStatus = async (id: string, status: string) => {
    await supabase.from('car_orders').update({ status }).eq('id', id);
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  const updateBookingStatus = async (id: string, status: string) => {
    await supabase.from('car_slot_bookings').update({ status }).eq('id', id);
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
  };

  const statusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
      case 'completed':
        return 'bg-teal-400/15 text-teal-400 border-teal-400/30';
      case 'cancelled':
        return 'bg-red-500/15 text-red-400 border-red-500/30';
      default:
        return 'bg-slate-500/15 text-slate-400 border-slate-500/30';
    }
  };

  const StatusBadge = ({ status }: { status: string }) => (
    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${statusColor(status)}`}>
      {status}
    </span>
  );

  return (
    <div className="fixed inset-0 z-[90] overflow-y-auto bg-ink-900">
      {/* Top bar */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-ink-400/40 glass px-5 py-4 sm:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-400/15">
            <Package className="h-4 w-4 text-teal-400" />
          </div>
          <div>
            <h1 className="font-display text-base font-bold text-white">Owner Dashboard</h1>
            <p className="text-[11px] text-slate-500">Live management portal</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchData}
            disabled={refreshing}
            className="flex items-center gap-2 rounded-lg border border-ink-400/50 bg-ink-700/50 px-3 py-2 text-xs font-semibold text-slate-300 transition-colors hover:border-teal-400/50 hover:text-teal-400"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
          <button
            onClick={onClose}
            className="flex items-center gap-2 rounded-lg border border-ink-400/50 bg-ink-700/50 px-3 py-2 text-xs font-semibold text-slate-300 transition-colors hover:border-red-500/50 hover:text-red-400"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-ink-600 hover:text-white md:hidden"
            aria-label="Close dashboard"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex h-[60vh] items-center justify-center">
          <RefreshCw className="h-8 w-8 animate-spin text-teal-400" />
        </div>
      ) : (
        <div className="mx-auto max-w-7xl px-5 py-6 sm:px-8">
          {/* Summary stats */}
          <div className="mb-6 grid grid-cols-3 gap-3">
            <div className="rounded-2xl border border-ink-400/40 bg-ink-700/40 p-4">
              <p className="text-xs text-slate-500">Total Orders</p>
              <p className="mt-1 font-display text-2xl font-bold text-white">{orders.length}</p>
            </div>
            <div className="rounded-2xl border border-ink-400/40 bg-ink-700/40 p-4">
              <p className="text-xs text-slate-500">Slot Bookings</p>
              <p className="mt-1 font-display text-2xl font-bold text-white">{bookings.length}</p>
            </div>
            <div className="rounded-2xl border border-ink-400/40 bg-ink-700/40 p-4">
              <p className="text-xs text-slate-500">Pickup Requests</p>
              <p className="mt-1 font-display text-2xl font-bold text-white">{pickupOrders.length}</p>
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {/* Column 1: Online Bookings & Orders */}
            <div className="rounded-2xl border border-ink-400/40 bg-ink-700/30 p-4">
              <div className="flex items-center gap-2 border-b border-ink-400/30 pb-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-400/15">
                  <ShoppingBag className="h-4 w-4 text-teal-400" />
                </div>
                <h2 className="font-display text-sm font-bold text-white">Online Orders</h2>
                <span className="ml-auto rounded-full bg-ink-600 px-2 py-0.5 text-[10px] font-bold text-slate-400">
                  {onlineOrders.length}
                </span>
              </div>

              <div className="mt-3 space-y-3 max-h-[60vh] overflow-y-auto scrollbar-hide">
                {onlineOrders.length === 0 ? (
                  <p className="py-8 text-center text-xs text-slate-600">No orders yet.</p>
                ) : (
                  onlineOrders.map((order) => (
                    <div
                      key={order.id}
                      className="rounded-xl border border-ink-400/30 bg-ink-800/50 p-3"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-semibold text-white">{order.client_name}</p>
                          <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
                            <Phone className="h-3 w-3 text-teal-400" />
                            {order.phone}
                          </p>
                          <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
                            <Car className="h-3 w-3 text-teal-400" />
                            {order.car_number} · {order.vehicle_model}
                          </p>
                        </div>
                        <StatusBadge status={order.status} />
                      </div>

                      <div className="mt-2 flex flex-wrap gap-1">
                        {order.items_json?.map((item: { id: string; name: string; price: number }) => (
                          <span
                            key={item.id}
                            className="rounded-md bg-ink-600/60 px-2 py-0.5 text-[10px] text-slate-400"
                          >
                            {item.name}
                          </span>
                        ))}
                      </div>

                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs font-bold text-teal-400">
                          {formatPrice(order.items_json?.reduce((s: number, i: { price: number }) => s + i.price, 0) || 0)}
                        </span>
                        <span className="text-[10px] uppercase tracking-wide text-slate-500">
                          {order.fulfillment_type}
                        </span>
                      </div>

                      <div className="mt-2 flex gap-1.5">
                        {order.status === 'pending' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'completed')}
                            className="flex-1 rounded-lg bg-teal-400/15 py-1.5 text-[10px] font-semibold text-teal-400 transition-colors hover:bg-teal-400/25"
                          >
                            Mark Done
                          </button>
                        )}
                        <button
                          onClick={() => updateOrderStatus(order.id, 'cancelled')}
                          className="flex-1 rounded-lg bg-red-500/10 py-1.5 text-[10px] font-semibold text-red-400 transition-colors hover:bg-red-500/20"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Column 2: Slot Reservations */}
            <div className="rounded-2xl border border-ink-400/40 bg-ink-700/30 p-4">
              <div className="flex items-center gap-2 border-b border-ink-400/30 pb-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-aqua-500/15">
                  <CalendarClock className="h-4 w-4 text-aqua-400" />
                </div>
                <h2 className="font-display text-sm font-bold text-white">Slot Reservations</h2>
                <span className="ml-auto rounded-full bg-ink-600 px-2 py-0.5 text-[10px] font-bold text-slate-400">
                  {bookings.length}
                </span>
              </div>

              <div className="mt-3 space-y-3 max-h-[60vh] overflow-y-auto scrollbar-hide">
                {bookings.length === 0 ? (
                  <p className="py-8 text-center text-xs text-slate-600">No slot bookings yet.</p>
                ) : (
                  bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="rounded-xl border border-ink-400/30 bg-ink-800/50 p-3"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-semibold text-white">{booking.client_name}</p>
                          <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
                            <Phone className="h-3 w-3 text-aqua-400" />
                            {booking.phone}
                          </p>
                        </div>
                        <StatusBadge status={booking.status} />
                      </div>

                      <div className="mt-2 grid grid-cols-2 gap-1.5 text-xs">
                        <span className="flex items-center gap-1.5 text-slate-400">
                          <CalendarClock className="h-3 w-3 text-aqua-400" />
                          {booking.month} {booking.date}
                        </span>
                        <span className="flex items-center gap-1.5 text-slate-400">
                          <Clock className="h-3 w-3 text-aqua-400" />
                          {booking.time}
                        </span>
                        <span className="flex items-center gap-1.5 text-slate-400">
                          <Car className="h-3 w-3 text-aqua-400" />
                          {booking.vehicle_type}
                        </span>
                      </div>

                      <div className="mt-2 flex gap-1.5">
                        {booking.status === 'pending' && (
                          <button
                            onClick={() => updateBookingStatus(booking.id, 'completed')}
                            className="flex-1 rounded-lg bg-teal-400/15 py-1.5 text-[10px] font-semibold text-teal-400 transition-colors hover:bg-teal-400/25"
                          >
                            Mark Done
                          </button>
                        )}
                        <button
                          onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                          className="flex-1 rounded-lg bg-red-500/10 py-1.5 text-[10px] font-semibold text-red-400 transition-colors hover:bg-red-500/20"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Column 3: Pickup & Drop Requests */}
            <div className="rounded-2xl border border-ink-400/40 bg-ink-700/30 p-4">
              <div className="flex items-center gap-2 border-b border-ink-400/30 pb-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/15">
                  <Truck className="h-4 w-4 text-orange-400" />
                </div>
                <h2 className="font-display text-sm font-bold text-white">Pickup & Drop</h2>
                <span className="ml-auto rounded-full bg-ink-600 px-2 py-0.5 text-[10px] font-bold text-slate-400">
                  {pickupOrders.length}
                </span>
              </div>

              <div className="mt-3 space-y-3 max-h-[60vh] overflow-y-auto scrollbar-hide">
                {pickupOrders.length === 0 ? (
                  <p className="py-8 text-center text-xs text-slate-600">No pickup requests yet.</p>
                ) : (
                  pickupOrders.map((order) => (
                    <div
                      key={order.id}
                      className="rounded-xl border border-ink-400/30 bg-ink-800/50 p-3"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-semibold text-white">{order.client_name}</p>
                          <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
                            <Phone className="h-3 w-3 text-orange-400" />
                            {order.phone}
                          </p>
                          <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
                            <Car className="h-3 w-3 text-orange-400" />
                            {order.car_number} · {order.vehicle_model}
                          </p>
                        </div>
                        <StatusBadge status={order.status} />
                      </div>

                      <div className="mt-2 flex flex-wrap gap-1">
                        {order.items_json?.map((item: { id: string; name: string }) => (
                          <span
                            key={item.id}
                            className="rounded-md bg-ink-600/60 px-2 py-0.5 text-[10px] text-slate-400"
                          >
                            {item.name}
                          </span>
                        ))}
                      </div>

                      <div className="mt-2 flex gap-1.5">
                        {order.status === 'pending' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'completed')}
                            className="flex-1 rounded-lg bg-teal-400/15 py-1.5 text-[10px] font-semibold text-teal-400 transition-colors hover:bg-teal-400/25"
                          >
                            Mark Done
                          </button>
                        )}
                        <button
                          onClick={() => updateOrderStatus(order.id, 'cancelled')}
                          className="flex-1 rounded-lg bg-red-500/10 py-1.5 text-[10px] font-semibold text-red-400 transition-colors hover:bg-red-500/20"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
