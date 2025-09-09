import React, { useState } from 'react';
import TopBar from '../../shared/TopBar';
import Navbar from '../../shared/Navbar';
import SharedNavBanner from '../../shared/SharedNavBanner';
import CountryPresentation from './components/CountryPresentation';
import CountryGeography from './components/CountryGeography';
import CountrySection from './components/CountrySection';
import defaultBg from '../../assets/images/banner_bg.jpg';

export default function CountryPresentationPage() {
  const [lang, setLang] = useState('FR');
  const [section, setSection] = useState('Niger');
  // Index de la section ouverte (une seule ouverte à la fois)
  const [openIdx, setOpenIdx] = useState(0);

  const sliderImages = [defaultBg, defaultBg, defaultBg];

  // Placeholder datasets — replace with real content/images later
  const regions = [
    { title: 'Agadez', description: "Région saharienne réputée pour le massif de l'Aïr et le Ténéré.", image: defaultBg },
    { title: 'Diffa', description: 'À l’extrême est, zone du bassin du Lac Tchad.', image: defaultBg },
    { title: 'Dosso', description: 'Au sud-ouest, région agricole et carrefour historique.', image: defaultBg },
    { title: 'Maradi', description: 'Pôle commercial majeur du sud-centre.', image: defaultBg },
    { title: 'Tahoua', description: 'Entre Sahel et Sahara, diversité de paysages.', image: defaultBg },
    { title: 'Tillabéri', description: 'Région du fleuve Niger, à l’ouest.', image: defaultBg },
    { title: 'Zinder', description: 'Centre historique et culturel du sud-est.', image: defaultBg },
    { title: 'Niamey (capitale)', description: 'Capitale politique et administrative.', image: defaultBg },
  ];

  const cultures = [
    { title: 'Peul', description: 'Traditions pastorales et musicales riches.', image: defaultBg },
    { title: 'Hausa', description: 'Artisanat, commerce et culture urbaine.', image: defaultBg },
    { title: 'Touareg', description: 'Culture saharienne, poésie et artisanat du cuir.', image: defaultBg },
    { title: 'Djerma-Songhay', description: 'Traditions agricoles le long du fleuve.', image: defaultBg },
  ];

  const langues = [
    { title: 'Français (officiel)', description: 'Langue de l’administration et de l’enseignement.', image: defaultBg },
    { title: 'Hausa', description: 'Très répandue, langue de commerce.', image: defaultBg },
    { title: 'Zarma', description: 'Langue majeure du sud-ouest.', image: defaultBg },
    { title: 'Tamajaght (Touareg)', description: 'Langue berbère du nord.', image: defaultBg },
  ];

  const demographie = [
    { title: 'Population', description: "Population jeune et en croissance, dynamique urbaine à Niamey.", image: defaultBg },
    { title: 'Répartition', description: 'Concentrée au sud le long du fleuve et zones sahéliennes.', image: defaultBg },
  ];

  const medias = [
    { title: 'Presse', description: 'Titres nationaux et régionaux, médias publics et privés.', image: defaultBg },
    { title: 'En ligne', description: 'Portails d’information numériques.', image: defaultBg },
  ];

  const televisions = [
    { title: 'Télé Sahel', description: 'Chaîne publique.', image: defaultBg },
    { title: 'Chaînes privées', description: 'Offre diversifiée selon les opérateurs.', image: defaultBg },
  ];

  const radios = [
    { title: 'Radio nationale', description: 'Service public audiovisuel.', image: defaultBg },
    { title: 'Radios communautaires', description: 'Ancrées dans les régions, langues locales.', image: defaultBg },
  ];

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <TopBar currentLang={lang} onLanguageChange={setLang} />
      <Navbar current={section} onSelect={setSection} />

      <SharedNavBanner
        title="République du Niger"
        description="Présentation générale, géographie et aperçu des régions et cultures."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        <CountryPresentation sliderImages={sliderImages} />
        <CountryGeography />

      </div>

      
        <CountrySection
          title="Régions"
          subtitle="Decouvrez les Huits principales régions du Niger"
          items={regions}
          isOpen={openIdx === 0}
          onToggle={() => setOpenIdx(0)}
        />
        <CountrySection
          title="Culture"
          subtitle="Découvrez la diversité culturelle et traditions"
          items={cultures}
          isOpen={openIdx === 1}
          onToggle={() => setOpenIdx(1)}
        />
        <CountrySection
          title="Langues"
          subtitle="Découvrez le panorama linguistique"
          items={langues}
          isOpen={openIdx === 2}
          onToggle={() => setOpenIdx(2)}
        />
        <CountrySection
          title="Démographie"
          subtitle="Découvrez la Population et répartition"
          items={demographie}
          isOpen={openIdx === 3}
          onToggle={() => setOpenIdx(3)}
        />
        <CountrySection
          title="Médias"
          subtitle="Découvrez la Presse, en ligne et audiovisuels"
          items={medias}
          isOpen={openIdx === 4}
          onToggle={() => setOpenIdx(4)}
        />
        <CountrySection
          title="Télévision"
          subtitle="Découvrez le Panorama des chaînes TV"
          items={televisions}
          isOpen={openIdx === 5}
          onToggle={() => setOpenIdx(5)}
        />
        <CountrySection
          title="Radio"
          subtitle="Découvrez le Panorama des radios"
          items={radios}
          isOpen={openIdx === 6}
          onToggle={() => setOpenIdx(6)}
        />

      <footer className="mt-auto border-t border-gray-100 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Ambassade du Niger
      </footer>
    </div>
  );
}
