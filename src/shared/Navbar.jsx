import React, { useEffect, useState } from 'react';
import Aos from 'aos';
import "aos/dist/aos.css";
import logo from '../assets/images/logo.jpg';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';


export default function Navbar({ current = 'Accueil', onSelect }) {
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const itemsFor = (id) => subnav[id] || [];
  const navigate = useNavigate();
  const { t } = useTranslation();


  const sections = [
    { id: 'Accueil', label: t('menu.home') },
    { id: 'Niger', label: t('menu.country') },
    { id: 'Ambassade', label: t('menu.embassy') },
    { id: 'Services consulaires', label: t('menu.consular') },
    { id: 'Services académiques', label: t('menu.academic') },
  ];
  
  const subnav = {
    Accueil: [],
    Niger: ['République du Niger', 'Investir au Niger', 'Tourisme'],
    Ambassade: ['Personnels', 'Actualités','Ambassade et moi'],
    'Services consulaires': ['Visa', 'Passeport', 'Carte consulaire', 'Prise en charge', 'Laissez-passer', 'Etat civil'],
    'Services académiques': ['Bourses', 'Inscription', 'Renouvellement', 'Réclamation'],
  };

  // Track scroll to collapse TopBar (nav moves to top:0) and add shadow
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goto = (id) => {
    const map = {
      'Accueil': '/',
      'Niger': '/niger/republique-du-niger',
      'Ambassade': '/ambassade/personnels',
      'Services consulaires': '/services-consulaires',
      'Services académiques': '/services-academiques',
    };
    const path = map[id] || '/';
    navigate(path);
  };

  // Build path for subnav items
  const toSlug = (s) =>
    (s || '')
      .toString()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // remove diacritics
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

  const basePathFor = (id) => ({
    'Niger': '/niger',
    'Ambassade': '/ambassade',
    'Services consulaires': '/services-consulaires',
    'Services académiques': '/services-academiques',
  })[id];

  const gotoSub = (parentId, subLabel) => {
    const base = basePathFor(parentId);
    if (!base) return;
    const slug = toSlug(subLabel);
    navigate(`${base}/${slug}`);
  };
  return (
    <>
    <nav
      className={`w-full bg-white/90 backdrop-blur border-b border-gray-100 fixed left-0 right-0 z-50 transition-shadow ${
        scrolled ? 'shadow-sm' : ''
      }`}
      style={{ top: scrolled ? 0 : 40 }}
    >
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
            {[...sections].map((s) => (
              <li
                key={s.id}
                className="relative"
                onMouseEnter={() => setActiveMenu(s.id)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <button
                  onClick={() => { onSelect?.(s.id); goto(s.id); }}
                  className={`py-2 transition hover:text-gray-900 relative ${
                    current === s.id ? 'text-gray-900' : ''
                  }`}
                >
                  {s.label}
                  {current === s.id && (
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-0.5 w-6 bg-emerald-600 rounded-full" />
                  )}
                </button>

                {activeMenu === s.id && itemsFor(s.id).length > 0 && (
                  <div
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-white/95 backdrop-blur border border-gray-100 shadow-lg rounded-md py-2 z-50"
                    data-aos="fade-down"
                  >
                    <ul className="flex flex-col min-w-[220px]">
                      {itemsFor(s.id).map((item) => (
                        <li key={item}>
                          <button
                            onClick={() => { gotoSub(s.id, item); setActiveMenu(null); }}
                            className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-800 text-sm"
                          >
                            {item}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* Right controls: search button + mobile hamburger */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Rechercher"
              onClick={() => setSearchOpen(true)}
              className="inline-flex items-center justify-center h-9 w-9 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <Search className="h-5 w-5" />
            </button>

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
      </div>

      {/* Mobile/Tablet panel (overlay below navbar) */}
      {open && (
        <div className="lg:hidden absolute inset-x-0 top-full bg-white shadow-lg ring-1 ring-black/5 z-50" data-aos="fade-down">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-gray-700 font-medium">
              {sections.map((s) => (
                <li key={s.id}>
                  <div className="w-full">
                    <button
                      onClick={() => { onSelect?.(s.id); goto(s.id); setOpen(false); }}
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
                              <button
                                onClick={() => { gotoSub(s.id, sub); setOpen(false); }}
                                className="w-full text-left px-2 py-1 rounded hover:bg-gray-50 text-gray-600"
                              >
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

      {/* Search dropdown panel */}
      {searchOpen && (
        <div className="absolute inset-x-0 top-full bg-white shadow-lg ring-1 ring-black/5 z-50" data-aos="fade-down">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Rechercher..."
                className="w-full px-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
              <button
                type="button"
                aria-label="Fermer la recherche"
                onClick={() => setSearchOpen(false)}
                className="inline-flex items-center bg-emerald-600 justify-center h-9 w-9 rounded-md text-gray-700 hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
    {/* Spacer to offset fixed navbar height (h-16 = 64px) */}
    <div aria-hidden className="h-16" />
    </>
  );
}
