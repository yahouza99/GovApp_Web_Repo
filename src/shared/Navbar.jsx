import React, { useState } from 'react';
import logo from '../assets/images/logo.jpg';

const sections = [
  { id: 'Accueil', label: 'Accueil' },
  { id: 'Niger', label: 'Niger' },
  { id: 'Ambassade', label: 'Ambassade' },
  { id: 'Services consulaires', label: 'Services consulaires' },
  { id: 'Services académiques', label: 'Services académiques' },
];

const subnav = {
  Accueil: [],
  Niger: ['République du Niger', 'Investir au Niger', 'Tourisme'],
  Ambassade: ['Personnels', 'Actualités','Evénements'],
  'Services consulaires': ['Visa', 'Passeport', 'Carte consulaire', 'Prise en charge', 'Laissez-passer', 'Etat civil'],
  'Services académiques': ['Bourses', 'Inscription', 'Renouvellement', 'Réclamation'],
};

export default function Navbar({ current = 'Accueil', onSelect }) {
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const itemsFor = (id) => subnav[id] || [];
  return (
    <nav className="w-full bg-white/90 backdrop-blur border-b border-gray-100 sticky top-0 z-40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Ambassade du Niger" className="h-10 w-auto" />
            <div className="hidden lg:block">
              <p className="text-gray-900 font-semibold leading-tight">Ambassade du Niger</p>
              <p className="text-xs text-gray-500">Service au citoyen et au visiteur</p>
            </div>
          </div>

          {/* Desktop menu (only from large screens) */}
          <ul className="hidden lg:flex items-center gap-6 xl:gap-8 text-gray-700 font-medium">
            {/* Right-to-left visual order */}
            {[...sections].map((s) => (
              <li key={s.id} onMouseEnter={() => setActiveMenu(s.id)}>
                <button
                  onClick={() => onSelect?.(s.id)}
                  className={`py-2 transition hover:text-gray-900 relative ${
                    current === s.id ? 'text-gray-900' : ''
                  }`}
                >
                  {s.label}
                  {current === s.id && (
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-0.5 w-6 bg-emerald-600 rounded-full" />
                  )}
                </button>
              </li>
            ))}
          </ul>

          {/* Desktop popover subnav */}
          {activeMenu && itemsFor(activeMenu).length > 0 && (
            <div
              className="hidden lg:block absolute inset-x-0 top-full bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm z-50"
              onMouseLeave={() => setActiveMenu(null)}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                <ul className="flex flex-wrap gap-3">
                  {itemsFor(activeMenu).map((item) => (
                    <li key={item}>
                      <button className="px-3 py-2 rounded-md hover:bg-gray-50 text-gray-800 text-sm font-medium">
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Mobile/Tablet hamburger (show below large) */}
          <button
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100"
            aria-label="Ouvrir le menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {!open ? (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            ) : (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile/Tablet panel (overlay below navbar) */}
      {open && (
        <div className="lg:hidden absolute inset-x-0 top-full bg-white shadow-lg ring-1 ring-black/5 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-gray-700 font-medium">
              {sections.map((s) => (
                <li key={s.id}>
                  <div className="w-full">
                    <button
                      onClick={() => { onSelect?.(s.id); }}
                      className={`w-full text-left px-3 py-2 rounded-md hover:bg-gray-50 ${
                        current === s.id ? 'text-emerald-700 font-semibold' : ''
                      }`}
                    >
                      {s.label}
                    </button>
                    {itemsFor(s.id).length > 0 && (
                      <div className="mt-1 pl-3">
                        <ul className="grid grid-cols-2 gap-1 text-sm">
                          {itemsFor(s.id).map((sub) => (
                            <li key={sub}>
                              <button className="w-full text-left px-2 py-1 rounded hover:bg-gray-50 text-gray-600">
                                {sub}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}
