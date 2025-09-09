import React, { useEffect, useMemo, useRef, useState } from 'react';

/**
 * SubnavHome
 * Full-height hero-like section showing:
 * - Left: auto-sliding images (array)
 * - Right: title + multiple paragraphs
 * Props:
 * - item: { key, title, paragraphs?: string[] , images?: string[] }
 * - intervalMs?: number (default 4000)
 */
export default function SubnavHome({ item, intervalMs = 4000 }) {
  const images = useMemo(() => item?.images?.length ? item.images : [item?.image].filter(Boolean), [item]);
  const [idx, setIdx] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    timerRef.current = setInterval(() => {
      setIdx((i) => (i + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(timerRef.current);
  }, [images, intervalMs]);

  return (
    <section className="w-full py-6 sm:py-8 lg:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-stretch min-h-[60vh] lg:min-h-[70vh]">
          {/* Left slider */}
          <div className="relative rounded-md overflow-hidden bg-gray-100 ring-1 ring-gray-100 ">
            {images && images.length > 0 ? (
              images.map((src, i) => (
                <img
                  key={src + i}
                  src={src}
                  alt={item?.title || 'aperçu'}
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${i === idx ? 'opacity-100' : 'opacity-0'}`}
                  loading="lazy"
                />
              ))
            ) : (
              <div className="absolute inset-0 grid place-items-center text-gray-400">Aperçu</div>
            )}
            {/* Indicators */}
            {images && images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, i) => (
                  <span
                    key={i}
                    aria-hidden
                    className={`h-1.5 w-6 rounded-full ${i === idx ? 'bg-white' : 'bg-white/50'}`}
                  />)
                )}
              </div>
            )}
          </div>

          {/* Right content */}
          <div className="flex flex-col justify-center p-4 sm:p-6 lg:p-8 bg-white rounded-md ring-1 ring-gray-100 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="inline-block h-1.5 w-8 rounded-full bg-emerald-600" />
              <span className="text-xs font-medium uppercase tracking-wide text-emerald-700/90">En vedette</span>
            </div>
            <h2 className="mt-3 text-2xl sm:text-3xl font-semibold text-gray-900">{item?.title}</h2>
            <div className="mt-4 space-y-4 text-gray-700 leading-relaxed">
              {(item?.paragraphs || (item?.description ? [item.description] : [])).map((p, i) => (
                <p key={i} className="max-w-prose">{p}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
