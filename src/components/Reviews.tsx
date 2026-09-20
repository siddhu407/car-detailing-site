import { Star, Quote } from 'lucide-react';

const REVIEWS = [
  { name: 'KK', text: 'Super servicing. Felt like driving a new car after the service. They give attention to minute details voluntarily.', rating: 5, time: '2 months ago' },
  { name: 'PrintBro', text: 'Excellent service done my car 2002 model zen. Very professional team.', rating: 5, time: '4 years ago' },
  { name: 'Purushothama S', text: 'Washed my car before in other stations but here was a different ambience. Well maintained infrastructure and professionals.', rating: 5, time: '7 years ago' },
  { name: 'Car Owner', text: 'Very good service and services are worth for money. Highly recommend.', rating: 5, time: '3 months ago' },
  { name: 'Detail Fan', text: 'Great place with highly professional and skilled staff.', rating: 5, time: '5 months ago' },
  { name: 'Auto Lover', text: 'Very nice work, lovely worker. Good quality output every time.', rating: 5, time: '6 months ago' },
];

function ReviewCard({ review }: { review: (typeof REVIEWS)[number] }) {
  return (
    <div className="mx-3 w-72 flex-shrink-0 rounded-2xl border border-ink-400/40 bg-ink-700/60 p-5 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-aqua-500 font-display text-sm font-bold text-ink-900">
          {review.name.charAt(0)}
        </div>
        <div>
          <p className="font-display text-sm font-bold text-white">{review.name}</p>
          <p className="text-[11px] text-slate-500">{review.time}</p>
        </div>
        <div className="ml-auto flex gap-0.5">
          {Array.from({ length: review.rating }).map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-teal-400 text-teal-400" />
          ))}
        </div>
      </div>
      <div className="mt-3 flex gap-2">
        <Quote className="h-4 w-4 flex-shrink-0 text-teal-400/40" />
        <p className="text-sm leading-relaxed text-slate-300">{review.text}</p>
      </div>
    </div>
  );
}

export default function Reviews() {
  const doubled = [...REVIEWS, ...REVIEWS];

  return (
    <section id="reviews" className="relative py-20 sm:py-28">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop"
          alt="Mirror gloss car finish at Dolphin Car Spa"
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-ink-900/85" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-800 via-ink-900/90 to-ink-800" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-400">
            Review Us
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
            Loved by 132+ car owners
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-teal-400 text-teal-400" />
              ))}
            </div>
            <span className="font-display text-lg font-bold text-white">4.6</span>
            <span className="text-sm text-slate-400">on Google</span>
          </div>
        </div>
      </div>

      {/* Moving slider */}
      <div className="relative mt-12 overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-ink-800 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-ink-800 to-transparent" />

        <div className="flex w-max animate-marquee">
          {doubled.map((review, i) => (
            <ReviewCard key={i} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
