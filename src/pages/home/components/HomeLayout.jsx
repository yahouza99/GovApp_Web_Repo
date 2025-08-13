import React, { useState } from 'react';
import TopBar from '../../../shared/TopBar';
import Navbar from '../../../shared/Navbar';
import HomeBanner from './HomeBanner';
import HomeSubnavCards from './HomeSubnavCards';
import AmbassadorMessage from './AmbassadorMessage';
import Communiques from './Communiques';
import EmbassyInfo from './EmbassyInfo';

export default function HomeLayout() {
  const [lang, setLang] = useState('FR');
  const [section, setSection] = useState('Accueil');

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar currentLang={lang} onLanguageChange={setLang} />
      <Navbar current={section} onSelect={setSection} />

      <div className="relative">
        <HomeBanner />
        <div className="">
          <HomeSubnavCards onSelect={(key) => console.log('Home card clicked:', key)} />
        </div>
      </div>

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Section: Mot de l'ambassadeur */}
          <AmbassadorMessage />

          {/* Section: Communiqués */}
          <Communiques />

          {/* Section: Informations de l'ambassade (Map + Contact) */}
          <EmbassyInfo />
        </div>
      </main>

      <footer className="border-t border-gray-100 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Ambassade du Niger
      </footer>
    </div>
  );
}
