import React, { useRef } from 'react';

/**
 * SubnavRestList
 * Horizontal slider of cards for remaining subnav items.
 * Each card is clickable to load into SubnavHome.
 * Props:
 * - items: Array<{ key, title, image?: string }>
 * - currentKey?: string (selected/featured key)
 * - onSelect?: (key: string) => void
 */
export default function SubnavRestList({ items = [], currentKey, onSelect }) {
  const trackRef = useRef(null);

  return (
    <section className="py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">Découvrir aussi</h3>
          <div className="text-xs text-gray-500">Utilisez les flèches</div>
        </div>

        {/* Scoped style to hide native scrollbar on webkit and firefox */}
        <style>{`
          .no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
          .no-scrollbar::-webkit-scrollbar { display: none; }
        `}</style>

        <div className="relative">
          {/* Left gradient + control */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-white to-transparent" />
          <button
            type="button"
            aria-label="Précédent"
            onClick={() => {
              const el = trackRef.current; if (!el) return;
              const amount = Math.max(el.clientWidth * 0.9, 320);
              el.scrollBy({ left: -amount, behavior: 'smooth' });
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow ring-1 ring-black/5 hover:bg-white transition focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <svg className="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L8.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd"/></svg>
          </button>

          {/* Right gradient + control */}
          <div className="pointer-events-none absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-white to-transparent" />
          <button
            type="button"
            aria-label="Suivant"
            onClick={() => {
              const el = trackRef.current; if (!el) return;
              const amount = Math.max(el.clientWidth * 0.9, 320);
              el.scrollBy({ left: amount, behavior: 'smooth' });
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow ring-1 ring-black/5 hover:bg-white transition focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <svg className="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.293 4.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L11.586 10 7.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
          </button>

          <div
            ref={trackRef}
            className="no-scrollbar -mx-2 flex gap-4 overflow-x-auto pb-2 pl-2 pr-6 scroll-smooth snap-x snap-mandatory"
          >
            {items.map((it) => {
              const selected = it.key === currentKey;
              return (
                <button
                  key={it.key}
                  onClick={() => onSelect?.(it.key)}
                  className={`snap-start shrink-0 w-60 sm:w-64 md:w-72 h-60 sm:h-64 md:h-72 rounded-md overflow-hidden ring-1 transition shadow-sm hover:shadow-md text-left relative group ${
                    selected ? 'ring-emerald-300' : 'ring-gray-100'
                  }`}
                  aria-pressed={selected}
                >
                  {/* Image full */}
                  {it.image ? (
                    <img
                      src={it.image}
                      alt={it.title}
                      className="absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center text-gray-400 bg-gray-100">Aperçu</div>
                  )}
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  {/* Title */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <div
                      className={`inline-block rounded px-2 py-1 text-xs font-semibold ${
                        selected ? 'bg-emerald-500 text-white' : 'bg-white/90 text-gray-900'
                      }`}
                    >
                      {it.title}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
