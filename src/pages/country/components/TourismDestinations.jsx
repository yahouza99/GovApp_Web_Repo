import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

const TourismDestinations = ({ destinations = [], onSelectDestination, currentDestinationId }) => {
  const trackRef = useRef(null);

  if (!destinations || destinations.length === 0) {
    return null;
  }

  return (
    <section className="py-6 sm:py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">Autres destinations à explorer</h3>
          <div className="text-xs text-gray-500"></div>
        </div>

        {/* Scoped style to hide native scrollbar on webkit and firefox */}
        <style>{`
          .no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
          .no-scrollbar::-webkit-scrollbar { display: none; }
        `}</style>

        <div className="relative">
          {/* Left gradient + control */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-white to-transparent z-10" />
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
            <svg className="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L8.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd"/>
            </svg>
          </button>

          {/* Right gradient + control */}
          <div className="pointer-events-none absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-white to-transparent z-10" />
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
            <svg className="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 4.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L11.586 10 7.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
            </svg>
          </button>

          <div
            ref={trackRef}
            className="no-scrollbar -mx-2 flex gap-4 overflow-x-auto pb-2 pl-2 pr-6 scroll-smooth snap-x snap-mandatory"
          >
            {destinations.map((destination) => {
              const selected = destination.id === currentDestinationId;
              return (
                <button
                  key={destination.id}
                  onClick={() => onSelectDestination(destination)}
                  className={`snap-start shrink-0 w-60 sm:w-64 md:w-72 h-60 sm:h-64 md:h-72 rounded-md overflow-hidden ring-1 transition shadow-sm hover:shadow-md text-left relative group ${
                    selected ? 'ring-emerald-300' : 'ring-gray-100'
                  }`}
                  aria-pressed={selected}
                >
                  {/* Image */}
                  {destination.images && destination.images.length > 0 ? (
                    <img
                      src={destination.images[0]}
                      alt={destination.title}
                      className="absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center text-gray-400 bg-gray-100">
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  
                  {/* Content */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <div
                      className={`inline-block rounded px-2 py-1 text-xs font-semibold ${
                        selected ? 'bg-emerald-500 text-white' : 'bg-white/90 text-gray-900'
                      }`}
                    >
                      {destination.title}
                    </div>
                    <p className="mt-1 text-sm text-white/90 line-clamp-2">
                      {destination.shortDescription || destination.description}
                    </p>
                    <div className="mt-2 flex items-center text-xs text-white/80">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {destination.region || 'Niger'}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

       {/* <div className="mt-8 text-center">
          <Link 
            to="/niger/tourisme/destinations"
            className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            Voir toutes les destinations
            <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div> */}
      </div> 
    </section>
  );
};

export default TourismDestinations;
