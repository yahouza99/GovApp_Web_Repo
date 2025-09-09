import React, { useState } from 'react';
import TopBar from '../../shared/TopBar';
import Navbar from '../../shared/Navbar';
import SharedNavBanner from '../../shared/SharedNavBanner';
import SharedNavLayout from '../../shared/SharedNavLayout';
import SharedIntroSectionList from '../../shared/SharedIntroSectionList';
import defaultBg from '../../assets/images/banner_bg.jpg';

const ACADEMIQUES = [
  { key: 'bourses', title: 'Bourses', icon: '🎓' },
  { key: 'inscription', title: 'Inscription', icon: '📝' },
  { key: 'renouvellement', title: 'Renouvellement', icon: '♻️' },
  { key: 'reclamation', title: 'Réclamation', icon: '❗' },
];

export default function AcademicPage() {
  const [lang, setLang] = useState('FR');
  const [section, setSection] = useState('Services académiques');

  const handleSelect = (key) => {
    console.log('Service académique sélectionné:', key);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar currentLang={lang} onLanguageChange={setLang} />
      <Navbar current={section} onSelect={setSection} />

      <SharedNavBanner
        title="Services académiques"
        description="Choisissez un service académique pour commencer votre démarche."
      />
      {/* <SharedNavLayout items={ACADEMIQUES} onSelect={handleSelect} /> */}

      <SharedIntroSectionList
        items={ACADEMIQUES.map((s) => ({
          key: s.key,
          title: s.title,
          description: "Informations détaillées sur le service académique et procédures.",
          image: defaultBg,
          href: `/nav/services-academiques/${s.key}`,
        }))}
      />

      <footer className="mt-auto border-t border-gray-100 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Ambassade du Niger
      </footer>
    </div>
  );
}
