import React, { useRef,useEffect } from 'react';
import Aos from 'aos';
import "aos/dist/aos.css";
import logo from '../../../assets/images/republic.png';
// Remplacez ces logos par vos ressources locales (ex: dans src/assets/images/)
const DEFAULT_LINKS = [
  { id: 'presidence', name: 'Présidence', url: '#', logo: logo },
  { id: 'mae', name: 'MAE', url: '#', logo: logo },
  { id: 'interieur', name: 'Intérieur', url: '#', logo: logo },
  { id: 'finances', name: 'Finances', url: '#', logo: logo },
  { id: 'education', name: 'Éducation', url: '#', logo: logo },
  { id: 'sante', name: 'Santé', url: '#', logo: logo },
  { id: 'culture', name: 'Culture', url: '#', logo: logo },
];

export default function UsefulLinks({ items = DEFAULT_LINKS }) {
  const trackRef = useRef(null);

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  const scrollByAmount = (dir = 1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector('li');
    const delta = card ? card.getBoundingClientRect().width + 16 : 280; // gap approx
    el.scrollBy({ left: dir * delta, behavior: 'smooth' });
  };

  return (
    <section className="py-10 sm:py-12 lg:py-16 bg-gray-50" data-aos="fade-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Liens utiles</h2>
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
            {items.map((l) => (
              <li key={l.id} className="snap-start shrink-0 w-56 sm:w-64 lg:w-72">
                <a
                  href={l.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block h-28 sm:h-32 md:h-32 rounded-lg bg-white shadow-sm hover:shadow-md transition overflow-hidden"
                  title={l.name}
                >
                  <div className="h-full w-full flex flex-col items-center justify-center p-3 sm:p-4">
                    <div className="text-[13px] sm:text-sm font-medium text-gray-700 text-center leading-snug line-clamp-2 mb-2">
                      {l.name}
                    </div>
                    <div className="flex-1 w-full grid place-items-center">
                      <img
                        src={l.logo}
                        alt={l.name}
                        className="max-h-12 sm:max-h-14 md:max-h-16 max-w-full object-contain"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
