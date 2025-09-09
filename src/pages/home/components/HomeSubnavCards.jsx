import React, { useEffect } from 'react';
import Aos from 'aos';
import "aos/dist/aos.css";
import { useNavigate } from 'react-router-dom';

const HOME_ITEMS = [
  { key: 'actualites', title: 'Actualités', icon: '🌍' },
  { key: 'e-services', title: 'e-services', icon: '💻' },
  { key: 'rendez-vous', title: 'Rendez-vous', icon: '📅' },
  { key: 'ambassade-et-moi', title: 'Ambassade et moi', icon: '👤' },
];

export default function HomeSubnavCards({ onSelect }) {
  const navigate = useNavigate();
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  const handleClick = (key) => {
    onSelect?.(key);
    const map = {
      'actualites': 'ambassade/actualites',
      'e-services': 'ambassade/eservices',
      'rendez-vous': 'ambassade/rendez-vous',
      'ambassade-et-moi': 'ambassade/ambassade-et-moi', // temporaire: page de login avant dashboard user
    };
    const path = map[key];
    if (path) navigate(path);
  };
  return (
    <div className="relative z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="-mt-12 sm:-mt-16 md:-mt-20">
          <div className="p-3 sm:p-4">
            <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 place-items-center w-full max-w-7xl mx-auto">
              {HOME_ITEMS.map((it) => (
                <li key={it.key} className="w-full" data-aos="fade-up">
                  <button
                    onClick={() => handleClick(it.key)}
                    className="w-full h-24 sm:h-28 md:h-32 rounded-md border border-gray-200 bg-gradient-to-b from-white to-gray-50 shadow-sm hover:shadow-md transition flex flex-col items-center justify-center gap-2"
                  >
                    <span className="text-2xl md:text-3xl" aria-hidden>
                      {it.icon}
                    </span>
                    <span className="text-sm md:text-base font-medium text-gray-800 text-center px-2">
                      {it.title}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
