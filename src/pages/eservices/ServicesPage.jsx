import React, { useState } from 'react';
import TopBar from '../../shared/TopBar';
import Navbar from '../../shared/Navbar';
import SharedNavBanner from '../../shared/SharedNavBanner';
import SharedNavLayout from '../../shared/SharedNavLayout';
import SharedIntroSectionList from '../../shared/SharedIntroSectionList';
import defaultBg from '../../assets/images/banner_bg.jpg';

const ESERVICES = [
  { key: 'eservices', title: 'EServices', icon: '🎓' },
];

export default function EservicesPage() {
  const [lang, setLang] = useState('FR');
  const [section, setSection] = useState('Eservices');

  const handleSelect = (key) => {
    console.log('Service sélectionné:', key);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar currentLang={lang} onLanguageChange={setLang} />
      <Navbar current={section} onSelect={setSection} />

      <SharedNavBanner
        title="EServices"
        description="Choisissez un service pour commencer votre démarche."
      />
      {/* <SharedNavLayout items={ESERVICES} onSelect={handleSelect} /> */}

      <SharedIntroSectionList
        items={ESERVICES.map((s) => ({
          key: s.key,
          title: s.title,
          description: "Informations détaillées sur le service et procédures.",
          image: defaultBg,
          href: `/eservices/${s.key}`,
        }))}
      />

      <footer className="mt-auto border-t border-gray-100 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Ambassade du Niger
      </footer>
    </div>
  );
}
