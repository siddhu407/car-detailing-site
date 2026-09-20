import { useState } from 'react';
import { X, Lock, Loader as Loader2, CircleAlert as AlertCircle } from 'lucide-react';

interface OwnerLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const OWNER_PASSWORD = 'jeevan9002';

export default function OwnerLoginModal({ isOpen, onClose, onSuccess }: OwnerLoginModalProps) {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      if (password === OWNER_PASSWORD) {
        setLoading(false);
        setPassword('');
        onSuccess();
      } else {
        setLoading(false);
        setError('Incorrect password. Access denied.');
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink-900/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 w-full max-w-sm rounded-2xl border border-ink-400/50 bg-ink-700 shadow-2xl">
        <div className="flex items-center justify-between border-b border-ink-400/40 px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-400/15">
              <Lock className="h-4 w-4 text-teal-400" />
            </div>
            <h2 className="font-display text-lg font-bold text-white">Owner Login</h2>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-ink-600 hover:text-white"
            aria-label="Close login"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-6">
          <p className="mb-4 text-sm text-slate-400">
            Enter the owner password to access the management dashboard.
          </p>

          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError('');
            }}
            placeholder="Password"
            autoFocus
            className="w-full rounded-xl border border-ink-400/50 bg-ink-800/60 px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-colors focus:border-teal-400"
          />

          {error && (
            <div className="mt-3 flex items-center gap-2 rounded-lg bg-red-500/10 px-3 py-2 text-xs font-medium text-red-400">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-400 to-aqua-500 py-3 font-display text-sm font-bold text-ink-900 transition-all hover:brightness-110 disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Authenticating...
              </>
            ) : (
              'Access Dashboard'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
