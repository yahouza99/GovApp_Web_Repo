import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TopBar from '../../shared/TopBar';
import Navbar from '../../shared/Navbar';
import SharedNavBanner from '../../shared/SharedNavBanner';
import SubnavHome from '../../shared/SubnavHome';
import SubnavRestList from '../../shared/SubnavRestList';
import defaultBg from '../../assets/images/banner_bg.jpg';

const DATA = [
  { key: 'visa', title: 'Visa', images: [defaultBg], paragraphs: ["Types de visas, conditions et procédure de demande."] },
  { key: 'passeport', title: 'Passeport', images: [defaultBg], paragraphs: ["Demande, renouvellement et pièces requises."] },
  { key: 'carte-consulaire', title: 'Carte consulaire', images: [defaultBg], paragraphs: ["Obtention et avantages de la carte consulaire."] },
  { key: 'prise-en-charge', title: 'Prise en charge', images: [defaultBg], paragraphs: ["Assistance et accompagnement des usagers."] },
  { key: 'laissez-passer', title: 'Laissez-passer', images: [defaultBg], paragraphs: ["Délivrance de laissez-passer et conditions."] },
  { key: 'etat-civil', title: 'État civil', images: [defaultBg], paragraphs: ["Actes d'état civil et formalités associées."] },
];

export default function ConsulSubPage() {
  const { sub } = useParams();
  const navigate = useNavigate();
  const [lang, setLang] = useState('FR');
  const [section, setSection] = useState('Services consulaires');

  const currentKey = sub || DATA[0].key;
  const featured = useMemo(() => DATA.find(d => d.key === currentKey) || DATA[0], [currentKey]);
  const sliderItems = useMemo(() => DATA.map(d => ({ key: d.key, title: d.title, image: (d.images && d.images[0]) || defaultBg })), []);

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar currentLang={lang} onLanguageChange={setLang} />
      <Navbar current={section} onSelect={setSection} />
      <SharedNavBanner title="Services consulaires" description="Choisissez une sous-section" />

      <SubnavHome item={featured} />
      <SubnavRestList
        items={sliderItems}
        currentKey={featured.key}
        onSelect={(key) => navigate(`/services-consulaires/${key}`)}
      />

      <footer className="mt-auto border-t border-gray-100 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Ambassade du Niger
      </footer>
    </div>
  );
}
