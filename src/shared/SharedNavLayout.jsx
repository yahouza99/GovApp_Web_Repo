import React, { useEffect } from 'react';
import Aos from 'aos';
import "aos/dist/aos.css";
/**
 * SharedNavLayout
 * Renders a responsive grid of cards to display sub-navigation items.
 * Props:
 * - items: Array<{ key: string, title: string, icon?: string, description?: string, onClick?: () => void }>
 * - onSelect: (key: string) => void
 */
export default function SharedNavLayout({ items = [], onSelect, selectedKey }) {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <section className="py-8 sm:py-10 lg:py-12" data-aos="fade-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 place-items-center w-full">
          {items.map((it, idx) => {
            const isSelected = (selectedKey ?? items[0]?.key) === it.key;
            const base = "w-full h-24 sm:h-28 md:h-32 rounded-md transition flex flex-col items-center justify-center gap-2 px-3";
            const selected = "border border-emerald-200 bg-emerald-50 text-emerald-700 shadow-md";
            const normal = "border border-gray-200 bg-gradient-to-b from-white to-gray-50 shadow-sm hover:shadow-md";
            return (
              <li key={it.key} className="w-full">
                <button
                  onClick={() => (it.onClick ? it.onClick() : onSelect?.(it.key))}
                  className={`${base} ${isSelected ? selected : normal}`}
                  aria-pressed={isSelected}
                >
                {it.icon && (
                  <span className="text-2xl md:text-3xl" aria-hidden>
                    {it.icon}
                  </span>
                )}
                <span className={`text-sm md:text-base font-medium text-center ${isSelected ? 'text-emerald-800' : 'text-gray-800'}`}>
                  {it.title}
                </span>
                {it.description && (
                  <span className={`text-xs text-center line-clamp-2 ${isSelected ? 'text-emerald-700/80' : 'text-gray-500'}`}>
                    {it.description}
                  </span>
                )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
