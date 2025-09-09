import React, { useState } from 'react';
import TopBar from '../../shared/TopBar';
import Navbar from '../../shared/Navbar';
import SharedNavBanner from '../../shared/SharedNavBanner';
import SharedNavLayout from '../../shared/SharedNavLayout';
import SharedIntroSectionList from '../../shared/SharedIntroSectionList';
import defaultBg from '../../assets/images/banner_bg.jpg';
import president from '../../assets/images/president.jpg';

const ITEMS = [
  { key: 'personnels', title: 'Personnels', icon: '👥' },
  { key: 'actualites', title: 'Actualités', icon: '📰' },
  { key: 'evenements', title: 'Événements', icon: '📅' },
  { key: 'mon-espace', title: 'Mon espace', icon: '🔐' },
];

export default function EmbassyPage() {
  const [lang, setLang] = useState('FR');
  const [section, setSection] = useState('Ambassade');

  const handleSelect = (key) => {
    console.log('Ambassade subnav selected:', key);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar currentLang={lang} onLanguageChange={setLang} />
      <Navbar current={section} onSelect={setSection} />

      <SharedNavBanner
        title="Ambassade"
        description="Informations et services liés à l'Ambassade du Niger."
      />
      {/* <SharedNavLayout items={ITEMS} onSelect={handleSelect} />

      {/* Intros des sous-menus Ambassade */}
      <SharedIntroSectionList
        items={[
          {
            key: 'personnels',
            title: 'Personnels',
            description:
              "Rencontrez l'équipe dirigeante et les principaux responsables de l'Ambassade. Découvrez leurs missions et leurs coordonnées.",
            image: president,
            href: '/nav/ambassade/personnels',
          },
          {
            key: 'actualites',
            title: 'Actualités',
            description:
              "Découvrez les dernières informations officielles, communiqués et événements récents de l'Ambassade.",
            image: defaultBg,
            href: '/press',
          },
          {
            key: 'evenements',
            title: 'Événements',
            description:
              "Découvrez les derniers événements de l'Ambassade.",
            image: defaultBg,
            href: '/nav/ambassade/evenements',
          },
          {
            key: 'ambassade-et-moi',
            title: 'Ambassade et moi',
            description:
              "Découvrez les opportunités d'investissement: secteurs porteurs, incitations, et démarches pour accompagner les investisseurs.",
            image: defaultBg,
            href: '/login',
          },
        ]}
      />

      <footer className="mt-auto border-t border-gray-100 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Ambassade du Niger
      </footer>
    </div>
  );
}
