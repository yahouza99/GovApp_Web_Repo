import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function TourismSection({ title, subtitle, items = [], moreLink, isOpen = true, onToggle }) {
  const trackRef = useRef(null);

  const scrollByAmount = (dir = 1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector('li');
    const delta = card ? card.getBoundingClientRect().width + 16 : 320; // +gap approx
    el.scrollBy({ left: dir * delta, behavior: 'smooth' });
  };

  const getButtonClass = (type) => {
    switch (type) {
      case 'transport':
        return 'bg-blue-600 hover:bg-blue-700';
      case 'agencies':
        return 'bg-emerald-600 hover:bg-emerald-700';
      case 'hotels':
        return 'bg-purple-600 hover:bg-purple-700';
      default:
        return 'bg-gray-600 hover:bg-gray-700';
    }
  };

  if (items.length === 0) return null;

  const handleToggle = (e) => {
    e.preventDefault();
    if (onToggle) onToggle();
  };

  return (
    <section className="py-8 sm:py-8 lg:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header cliquable: ouvre/ferme la section */}
        <div className="flex items-end justify-between">
          <button
            type="button"
            onClick={handleToggle}
            className="text-left w-full text-left"
            aria-expanded={isOpen}
          >
            <div className="inline-flex items-center gap-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{title}</h2>
              <span className={`inline-block transition-transform text-gray-500 ${isOpen ? 'rotate-90' : ''}`}>
                <ChevronRight size={24} className='text-emerald-600' />
              </span>
            </div>
            {subtitle && <p className="mt-1 text-gray-600">{subtitle}</p>}
          </button>
          {/*<div className="hidden sm:flex items-center gap-3">
            {moreLink && (
              <Link
                to={moreLink}
                className="inline-flex items-center px-3 h-9 rounded-md border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
              >
                Voir plus
              </Link>
            )}
          </div>*/}
        </div>

        {isOpen && (
          <div className="relative mt-6">
            {/* Overlay arrows */}
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
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-4 no-scrollbar"
            >
              {items.map((it, idx) => (
                <li key={idx} className="snap-start shrink-0 w-64 sm:w-80 lg:w-96">
                  <div className="w-full text-left h-full p-6 rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition">
                    <h3 className="text-lg font-semibold text-gray-900">{it.name}</h3>
                    {it.description && (
                      <p className="mt-2 text-gray-600">{it.description}</p>
                    )}
                    {it.rating && (
                      <div className="mt-3 flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${i < it.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    )}
                    {it.url && (
                      <a
                        href={it.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center text-sm font-medium text-emerald-700 hover:text-emerald-800"
                      >
                        En savoir plus →
                      </a>
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
};
