import React from 'react';

/**
 * SharedIntroSectionList
 * Renders a vertical list of intro sections. Each item:
 * { key, title, description, image, href }
 */
export default function SharedIntroSectionList({ items = [], maxWidth = 'max-w-6xl' }) {
  return (
    <section className="py-8 sm:py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`${maxWidth} mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8`}>
          {items.map((it, idx) => (
            <article
              key={it.key}
              className={`relative rounded-md border border-gray-100 bg-white shadow-sm hover:shadow-md transition overflow-hidden p-6 sm:p-7 lg:p-8`}
              data-aos="fade-up"
            >
              {/* Icon media in top-left */}
              <div className="absolute top-6 left-6 h-16 w-16 md:h-20 md:w-20 rounded-md overflow-hidden ring-1 ring-gray-100 bg-gray-50">
                {it.image ? (
                  <img
                    src={it.image}
                    alt={it.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="h-full w-full grid place-items-center text-gray-400 text-xs">Aperçu</div>
                )}
              </div>

              {/* Content */}
              <div className="pl-24 md:pl-28">
                <div className="flex items-center gap-3">
                  <span className="inline-block h-1.5 w-8 rounded-full bg-emerald-600" />
                  <span className="text-xs font-medium uppercase tracking-wide text-emerald-700/90">Section</span>
                </div>
                <h3 className="mt-3 text-xl sm:text-2xl font-semibold text-gray-900">
                  {it.title}
                </h3>
                {it.description && (
                  <p className="mt-3 sm:mt-4 text-gray-700 leading-relaxed max-w-prose">
                    {it.description}
                  </p>
                )}

                {it.href && (
                  <div className="mt-5">
                    <a
                      href={it.href}
                      className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
                    >
                      Découvrir
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 5l7 7-7 7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
