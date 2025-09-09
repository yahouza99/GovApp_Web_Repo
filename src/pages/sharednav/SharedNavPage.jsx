import React, { useState } from 'react';
import TopBar from '../../shared/TopBar';
import Navbar from '../../shared/Navbar';
import SharedNavBanner from '../../shared/SharedNavBanner';
import SharedNavLayout from '../../shared/SharedNavLayout';

/**
 * Example page that composes SharedNavBanner + SharedNavLayout
 * Use it as a destination for main navigation buttons.
 */
export default function SharedNavPage({
  title = 'Titre de la page',
  description = "Description courte de la section.",
  items = [],
}) {
  const [lang, setLang] = useState('FR');
  const [section, setSection] = useState('Accueil');

  const handleSelect = (key) => {
    // TODO: route or handle selection
    console.log('Subnav card selected:', key);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar currentLang={lang} onLanguageChange={setLang} />
      <Navbar current={section} onSelect={setSection} />

      <SharedNavBanner title={title} description={description} />
      <SharedNavLayout items={items} onSelect={handleSelect} />

      <footer className="mt-auto border-t border-gray-100 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Ambassade du Niger
      </footer>
    </div>
  );
}
