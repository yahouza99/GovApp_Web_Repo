import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TopBar from '../../shared/TopBar';
import Navbar from '../../shared/Navbar';
import SharedNavBanner from '../../shared/SharedNavBanner';
import SubnavHome from '../../shared/SubnavHome';
import SubnavRestList from '../../shared/SubnavRestList';
import Team from './components/Team';
import defaultBg from '../../assets/images/banner_bg.jpg';

const DATA = [
  {
    key: 'personnels',
    title: 'Personnels',
    images: [defaultBg],
    paragraphs: [
      "Rencontrez l'équipe dirigeante et les principaux responsables.",
      "Découvrez leurs missions, attributions et coordonnées.",
    ],
  },
  {
    key: 'actualites',
    title: 'Actualités',
    images: [defaultBg],
    paragraphs: [
      "Les dernières informations officielles et communiqués.",
      "Suivez les événements et annonces récentes.",
    ],
  },
  { key: 'ambassade-et-moi', title: 'Ambassade et moi', images: [defaultBg], paragraphs: ["Espace de services et interactions avec l'Ambassade."] },
];

export default function EmbassySubPage() {
  const { sub } = useParams();
  const navigate = useNavigate();
  const [lang, setLang] = useState('FR');
  const [section, setSection] = useState('Ambassade');

  const currentKey = sub || DATA[0].key;
  const featured = useMemo(() => DATA.find(d => d.key === currentKey) || DATA[0], [currentKey]);
  const sliderItems = useMemo(() => DATA.map(d => ({ key: d.key, title: d.title, image: (d.images && d.images[0]) || defaultBg })), []);

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar currentLang={lang} onLanguageChange={setLang} />
      <Navbar current={section} onSelect={setSection} />
      <SharedNavBanner title="Ambassade" description="Sous-sections de l'Ambassade" />

      {featured.key === 'personnels' ? (
        <Team />
      ) : (
        <SubnavHome item={featured} />
      )}
      <SubnavRestList
        items={sliderItems}
        currentKey={featured.key}
        onSelect={(key) => {
          navigate(`/ambassade/${key}`);
        }}
      />

      <footer className="mt-auto border-t border-gray-100 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Ambassade du Niger
      </footer>
    </div>
  );
}
