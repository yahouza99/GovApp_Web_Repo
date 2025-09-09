import React, { useState } from 'react';
import TopBar from '../../shared/TopBar';
import Navbar from '../../shared/Navbar';
import SharedNavBanner from '../../shared/SharedNavBanner';
import SharedNavLayout from '../../shared/SharedNavLayout';
import SharedIntroSectionList from '../../shared/SharedIntroSectionList';
import defaultBg from '../../assets/images/banner_bg.jpg';

const CONSULAIRES = [
  { key: 'visa', title: 'Visa', icon: '🛂' },
  { key: 'passeport', title: 'Passeport', icon: '🛃' },
  { key: 'carte-consulaire', title: 'Carte consulaire', icon: '🪪' },
  { key: 'prise-en-charge', title: 'Prise en charge', icon: '🤝' },
  { key: 'laissez-passer', title: 'Laissez-passer', icon: '📄' },
  { key: 'etat-civil', title: 'État civil', icon: '📜' },
];

export default function ConsulPage() {
  const [lang, setLang] = useState('FR');
  const [section, setSection] = useState('Services consulaires');

  const handleSelect = (key) => {
    console.log('Service consulaire sélectionné:', key);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar currentLang={lang} onLanguageChange={setLang} />
      <Navbar current={section} onSelect={setSection} />

      <SharedNavBanner
        title="Services consulaires"
        description="Choisissez un service consulaire pour commencer votre démarche."
      />
      {/* <SharedNavLayout items={CONSULAIRES} onSelect={handleSelect} /> */}

      <SharedIntroSectionList
        items={CONSULAIRES.map((s) => ({
          key: s.key,
          title: s.title,
          description: "Informations détaillées sur le service consulaire et démarches à suivre.",
          image: defaultBg,
          href: `/nav/services-consulaires/${s.key}`,
        }))}
      />

      <footer className="mt-auto border-t border-gray-100 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Ambassade du Niger
      </footer>
    </div>
  );
}
