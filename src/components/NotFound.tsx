import { Droplets, Chrome as Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-5 text-center brushed-metal">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-teal-500/10 blur-[100px]" />
      </div>

      <div className="relative">
        <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-2xl bg-gradient-to-br from-teal-400 to-aqua-500">
          <Droplets className="h-7 w-7 text-ink-900" strokeWidth={2.5} />
        </div>
        <h1 className="mt-6 font-display text-7xl font-extrabold text-white">404</h1>
        <p className="mt-3 text-lg font-semibold text-slate-300">Page not found</p>
        <p className="mt-2 max-w-sm text-sm text-slate-500">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <a
          href="/"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-400 to-aqua-500 px-6 py-3 font-display text-sm font-bold text-ink-900 transition-all hover:brightness-110"
        >
          <Home className="h-4 w-4" />
          Back to Home
        </a>
      </div>
    </div>
  );
}
