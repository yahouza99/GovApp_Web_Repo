import React, { useState } from 'react';
import TopBar from '../../shared/TopBar';
import Navbar from '../../shared/Navbar';
import SharedNavBanner from '../../shared/SharedNavBanner';
import SharedNavLayout from '../../shared/SharedNavLayout';
import SharedIntroSectionList from '../../shared/SharedIntroSectionList';
import president from '../../assets/images/president.jpg';
import defaultBg from '../../assets/images/banner_bg.jpg';

const ITEMS = [
  { key: 'republique', title: 'République du Niger', icon: '🏛️' },
  { key: 'investir', title: 'Investir au Niger', icon: '💼' },
  { key: 'tourisme', title: 'Tourisme', icon: '🗺️' },
];

export default function CountryPage() {
  const [lang, setLang] = useState('FR');
  const [section, setSection] = useState('Niger');

  const handleSelect = (key) => {
    console.log('Niger subnav selected:', key);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar currentLang={lang} onLanguageChange={setLang} />
      <Navbar current={section} onSelect={setSection} />

      <SharedNavBanner
        title="Niger"
        description="Découvrir le Niger: institutions, investissement et tourisme."
      />
     {/* <SharedNavLayout items={ITEMS} onSelect={handleSelect} /> */}

      {/* Intros des sous-menus */}
      <SharedIntroSectionList
        items={[
          {
            key: 'republique',
            title: 'République du Niger',
            description:
              "Présentation du Niger, ses institutions et sa vision. Le Président de la République incarne l'unité nationale et conduit la politique de la nation.",
            image: president,
            href: '/niger/republique-du-niger',
          },
          {
            key: 'investir',
            title: 'Investir au Niger',
            description:
              "Découvrez les opportunités d'investissement: secteurs porteurs, incitations, et démarches pour accompagner les investisseurs.",
            image: defaultBg,
            href: '/nav/niger/investir-au-niger',
          },
          {
            key: 'tourisme',
            title: 'Tourisme',
            description:
              "Des paysages sahéliens à l'Aïr et au Ténéré, le Niger offre un patrimoine naturel et culturel exceptionnel à explorer.",
            image: defaultBg,
            href: '/nav/niger/tourisme',
          },
        ]}
      />

      <footer className="mt-auto border-t border-gray-100 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Ambassade du Niger
      </footer>
    </div>
  );
}
