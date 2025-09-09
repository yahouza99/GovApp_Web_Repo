import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import communiques from '../../../assets/images/republic.png';
const SAMPLE_COMMUNIQUES = [
  {
    id: 1,
    title: "Communiqué: Ouverture des inscriptions consulaires",
    date: "2025-08-10",
    image: communiques,
  },
  {
    id: 2,
    title: "Annonce: Journée culturelle du Niger",
    date: "2025-08-07",
    image: communiques,
  },
  {
    id: 3,
    title: "Information: Nouveaux horaires d'accueil",
    date: "2025-08-01",
    image: communiques,
  },
];

export default function Communiques({ items = SAMPLE_COMMUNIQUES }) {
  const trackRef = useRef(null);
  const navigate = useNavigate();

  const scrollByAmount = (dir = 1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector('li');
    const delta = card ? card.getBoundingClientRect().width + 16 : 320; // +gap approx
    el.scrollBy({ left: dir * delta, behavior: 'smooth' });
  };

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Communiqués</h2>
          <div className="hidden sm:flex items-center gap-3">
            <Link
              to="/ambassade/actualites"
              className="inline-flex items-center px-3 h-9 rounded-md border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
            >
              Voir plus
            </Link>
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

        <div className="relative mt-6">
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
                  onClick={() => navigate('/ambassade/actualites', { state: { selectedComm: c } })}
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
                    <p className="text-xs text-gray-500">{new Date(c.date).toLocaleDateString()}</p>
                    <h3 className="mt-1 text-base font-semibold text-gray-900 line-clamp-2">{c.title}</h3>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
