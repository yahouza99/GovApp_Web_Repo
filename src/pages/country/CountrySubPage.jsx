import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TopBar from '../../shared/TopBar';
import Navbar from '../../shared/Navbar';
import SharedNavBanner from '../../shared/SharedNavBanner';
import SubnavHome from '../../shared/SubnavHome';
import SubnavRestList from '../../shared/SubnavRestList';
import defaultBg from '../../assets/images/banner_bg.jpg';

const DATA = [
  {
    key: 'republique-du-niger',
    title: 'République du Niger',
    images: [defaultBg],
    paragraphs: [
      "Présentation du Niger, ses institutions et sa vision.",
      "Le Président de la République incarne l'unité nationale et conduit la politique de la nation.",
    ],
  },
  {
    key: 'investir-au-niger',
    title: 'Investir au Niger',
    images: [defaultBg],
    paragraphs: [
      "Opportunités d'investissement, secteurs porteurs et incitations.",
      "Démarches et accompagnement des investisseurs.",
    ],
  },
  {
    key: 'tourisme',
    title: 'Tourisme',
    images: [defaultBg],
    paragraphs: [
      "Sahara du Ténéré, Aïr, patrimoine naturel et culturel à explorer.",
    ],
  },
];

export default function CountrySubPage() {
  const { sub } = useParams();
  const navigate = useNavigate();
  const [lang, setLang] = useState('FR');
  const [section, setSection] = useState('Niger');

  const currentKey = sub || DATA[0].key;
  const featured = useMemo(() => DATA.find(d => d.key === currentKey) || DATA[0], [currentKey]);
  const sliderItems = useMemo(() => DATA.map(d => ({ key: d.key, title: d.title, image: (d.images && d.images[0]) || defaultBg })), []);

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar currentLang={lang} onLanguageChange={setLang} />
      <Navbar current={section} onSelect={setSection} />
      <SharedNavBanner title="Niger" description="Sous-sections du Niger" />

      <SubnavHome item={featured} />
      <SubnavRestList
        items={sliderItems}
        currentKey={featured.key}
        onSelect={(key) => navigate(`/niger/${key}`)}
      />

      <footer className="mt-auto border-t border-gray-100 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Ambassade du Niger
      </footer>
    </div>
  );
}
