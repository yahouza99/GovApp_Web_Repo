import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TopBar from '../../shared/TopBar';
import Navbar from '../../shared/Navbar';
import SharedNavBanner from '../../shared/SharedNavBanner';
import SubnavHome from '../../shared/SubnavHome';
import SubnavRestList from '../../shared/SubnavRestList';
import defaultBg from '../../assets/images/banner_bg.jpg';

const DATA = [
  { key: 'bourses', title: 'Bourses', images: [defaultBg], paragraphs: ["Conditions, dossiers et calendrier des bourses."] },
  { key: 'inscription', title: 'Inscription', images: [defaultBg], paragraphs: ["Procédure d'inscription et documents requis."] },
  { key: 'renouvellement', title: 'Renouvellement', images: [defaultBg], paragraphs: ["Renouvellement des dossiers et attestations."] },
  { key: 'reclamation', title: 'Réclamation', images: [defaultBg], paragraphs: ["Soumettre une réclamation et suivi du traitement."] },
];

export default function AcademicSubPage() {
  const { sub } = useParams();
  const navigate = useNavigate();
  const [lang, setLang] = useState('FR');
  const [section, setSection] = useState('Services académiques');

  const currentKey = sub || DATA[0].key;
  const featured = useMemo(() => DATA.find(d => d.key === currentKey) || DATA[0], [currentKey]);
  const sliderItems = useMemo(() => DATA.map(d => ({ key: d.key, title: d.title, image: (d.images && d.images[0]) || defaultBg })), []);

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar currentLang={lang} onLanguageChange={setLang} />
      <Navbar current={section} onSelect={setSection} />
      <SharedNavBanner title="Services académiques" description="Choisissez une sous-section" />

      <SubnavHome item={featured} />
      <SubnavRestList
        items={sliderItems}
        currentKey={featured.key}
        onSelect={(key) => navigate(`/services-academiques/${key}`)}
      />

      <footer className="mt-auto border-t border-gray-100 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Ambassade du Niger
      </footer>
    </div>
  );
}
