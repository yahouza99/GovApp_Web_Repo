import React, { useRef } from 'react';

export default function SubnavRestCommuniqueList({ items = [], onSelect }) {
  const trackRef = useRef(null);

  const scrollByAmount = (dir = 1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector('li');
    const delta = card ? card.getBoundingClientRect().width + 16 : 320; // +gap approx
    el.scrollBy({ left: dir * delta, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      <div className="flex items-end justify-between">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Récentes actualités</h3>
        <div className="hidden sm:flex items-center gap-2">
          <button
            type="button"
            aria-label="Précédent"
            onClick={() => scrollByAmount(-1)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Suivant"
            onClick={() => scrollByAmount(1)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
          >
            ›
          </button>
        </div>
      </div>

      <div className="relative mt-4">
        {/* Overlay arrows for mobile */}
        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <button
            type="button"
            aria-label="Précédent"
            onClick={() => scrollByAmount(-1)}
            className="ml-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-gray-800 shadow"
          >
            ‹
          </button>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
          <button
            type="button"
            aria-label="Suivant"
            onClick={() => scrollByAmount(1)}
            className="mr-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-gray-800 shadow"
          >
            ›
          </button>
        </div>

        <ul
          ref={trackRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-4 no-scrollbar"
        >
          {items.map((c) => (
            <li key={c.id} className="snap-start shrink-0 w-72 sm:w-80 lg:w-[26rem] group">
              <button
                type="button"
                onClick={() => onSelect?.(c)}
                className="w-full text-left h-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition"
              >
                <div className="aspect-[16/10] overflow-hidden bg-gray-100">
                  <img
                    src={c.image}
                    alt={c.title}
                    className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  {c.date && (
                    <p className="text-xs text-gray-500">{new Date(c.date).toLocaleDateString()}</p>
                  )}
                  <h3 className="mt-1 text-base font-semibold text-gray-900 line-clamp-2">{c.title}</h3>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
