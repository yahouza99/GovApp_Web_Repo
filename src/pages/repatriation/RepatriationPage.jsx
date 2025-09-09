import React, { useState } from 'react';
import TopBar from '../../shared/TopBar';
import Navbar from '../../shared/Navbar';
import SharedNavBanner from '../../shared/SharedNavBanner';

export default function RepatriationPage() {
  const [lang, setLang] = useState('FR');
  const [section, setSection] = useState('Accueil');

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar currentLang={lang} onLanguageChange={setLang} />
      <Navbar current={section} onSelect={setSection} />

      <SharedNavBanner
        title="Rapatriement"
        description="Assistance et informations sur les procédures de rapatriement."
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="rounded-md border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-gray-700">
            Contenu du service de rapatriement à intégrer ici.
          </p>
        </div>
      </div>

      <footer className="mt-auto border-t border-gray-100 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Ambassade du Niger
      </footer>
    </div>
  );
}
