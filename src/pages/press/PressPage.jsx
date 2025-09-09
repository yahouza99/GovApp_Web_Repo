import React, { useState } from 'react';
import TopBar from '../../shared/TopBar';
import Navbar from '../../shared/Navbar';
import SharedNavBanner from '../../shared/SharedNavBanner';
import SharedNavLayout from '../../shared/SharedNavLayout';
import Communiques from '../home/components/Communiques';
import SharedIntroSectionList from '../../shared/SharedIntroSectionList';
import defaultBg from '../../assets/images/banner_bg.jpg';
import PressSubPage from './PressSubPage';

const ESERVICES = [
  { key: 'Actualites', title: 'Actualites', icon: '🎓' },
];

export default function PressPage() {
  const [lang, setLang] = useState('FR');
  const [section, setSection] = useState('Press');

  const handleSelect = (key) => {
    console.log('Service sélectionné:', key);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar currentLang={lang} onLanguageChange={setLang} />
      <Navbar current={section} onSelect={setSection} />

      <SharedNavBanner
        title="Actualités"
        description="Choisissez un service pour commencer votre démarche."
      />
     <PressSubPage />

      <footer className="mt-auto border-t border-gray-100 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Ambassade du Niger
      </footer>
    </div>
  );
}
