import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from "lucide-react";


export default function CountrySection({ title, subtitle, items = [], moreLink, isOpen = true, onToggle }) {
  const trackRef = useRef(null);

  const scrollByAmount = (dir = 1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector('li');
    const delta = card ? card.getBoundingClientRect().width + 16 : 320; // +gap approx
    el.scrollBy({ left: dir * delta, behavior: 'smooth' });
  };

  return (
    <section className="py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header cliquable: ouvre/ferme la section */}
        <div className="flex items-end justify-between">
          <button
            type="button"
            onClick={onToggle}
            className="text-left"
          >
            <div className="inline-flex items-center gap-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{title}</h2>
              <span className={`inline-block transition-transform text-gray-500 ${isOpen ? 'rotate-90' : ''}`}><ChevronRight size={24} className='text-emerald-600' /></span>
            </div>
            {subtitle && <p className="mt-1 text-gray-600">{subtitle}</p>}
          </button>
          <div className="hidden sm:flex items-center gap-3">
            {moreLink && (
              <Link
                to={moreLink}
                className="inline-flex items-center px-3 h-9 rounded-md border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
              >
                Voir plus
              </Link>
            )}
          </div>
        </div>

        {isOpen && (
        <div className="relative mt-6">
          {/* Overlay arrows for mobile - centered vertically */}
          <button
            type="button"
            aria-label="Précédent"
            onClick={() => scrollByAmount(-1)}
            className="absolute left-1 top-1/2 -translate-y-1/2 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-orange-600 shadow"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Suivant"
            onClick={() => scrollByAmount(1)}
            className="absolute right-1 top-1/2 -translate-y-1/2 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-orange-600 shadow"
          >
            ›
          </button>

          {/* Carousel */}
          <ul
            ref={trackRef}
            className="flex gap-2 overflow-x-auto snap-x snap-mandatory scroll-px-4 no-scrollbar"
          >
            {items.map((it, idx) => (
              <li key={idx} className="snap-start shrink-0 w-52 sm:w-52 lg:w-[14rem] group">
                <div className="w-full text-left h-full overflow-hidden rounded-sm border border-gray-200 bg-white shadow-sm hover:shadow-md transition">
                  {it.image && (
                    <div className="aspect-[16/10] relative overflow-hidden bg-gray-100">
                      <img
                        src={it.image}
                        alt={it.title}
                        className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform"
                        loading="lazy"
                      />
                      {/* Overlay + texte au-dessus de l'image */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                      <div className="absolute bottom-2 left-3 right-3 text-white">
                        <div className="text-sm font-semibold leading-snug line-clamp-2">{it.title}</div>
                        {it.description && (
                          <p className="mt-1 text-xs text-white/90 line-clamp-2">{it.description}</p>
                        )}
                      </div>
                    </div>
                  )}
                  {/* Lien en dessous si fourni */}
                  {it.href && (
                    <div className="px-4 pb-4 pt-2">
                      <Link
                        to={it.href}
                        className="inline-block text-sm font-medium text-emerald-700 hover:text-emerald-800"
                      >
                        En savoir plus →
                      </Link>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
        )}
      </div>
    </section>
  );
}
