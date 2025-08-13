import React from 'react';

const LANGS = [
  { code: 'FR', label: 'Français' },
  { code: 'EN', label: 'English' },
  { code: 'AR', label: 'العربية' },
  { code: 'ES', label: 'Español' },
];

export default function TopBar({ onLanguageChange, currentLang = 'FR' }) {
  return (
    <div className="w-full bg-gray-900 text-gray-100 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
        <div className="hidden sm:flex items-center gap-4">
          <a href="tel:+2126537566840" className="hover:text-white transition">+212 6 53 75 66 84</a>
          <a href="mailto:contact@ambassade-niger-ma.org" className="hover:text-white transition">contact@ambassadeniger-ma.org</a>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="lang-select" className="sr-only">Langue</label>
          <select
            id="lang-select"
            value={currentLang}
            onChange={(e) => onLanguageChange?.(e.target.value)}
            className="px-2 py-1 rounded border border-gray-700 bg-gray-900 text-gray-100 hover:border-gray-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            aria-label="Changer la langue"
          >
            {LANGS.map((l) => (
              <option key={l.code} value={l.code} className="text-gray-900">
                {l.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
