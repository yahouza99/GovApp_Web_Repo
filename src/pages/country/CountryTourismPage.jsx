import React, { useState, useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useParams } from 'react-router-dom';
import TopBar from '../../shared/TopBar';
import Navbar from '../../shared/Navbar';
import SharedNavBanner from '../../shared/SharedNavBanner';
import TourismIntro from './components/TourismIntro';
import TourismSelectDestination from './components/TourismSelectDestination';
import TourismDestinations from './components/TourismDestinations';
import TourismSection from './components/TourismSection';
import defaultBg from '../../assets/images/banner_bg.jpg';

// Données de démonstration - À remplacer par des appels API
const DESTINATIONS = [
  {
    id: 'w-national-park',
    title: 'Parc National du W',
    description: 'Classé au patrimoine mondial de l\'UNESCO, le parc national du W est un sanctuaire de biodiversité abritant une faune sauvage exceptionnelle, dont des éléphants, des lions et des hippopotames.',
    images: [
      defaultBg,
      defaultBg,
    ]
  },
  {
    id: 'tenere',
    title: 'Tenere du Niger',
    description: 'Le Tenere du Niger  situé, dans la région du Sahara. Il est connu pour ses vastes étendues de sable et ses nombreuses espèces de faune sauvage.',
    images: [
      defaultBg,
      defaultBg,
    ]
  },
  {
    id: 'musee-national',
    title: 'Musée National du Niger',
    description: 'Le Musée National du Niger est un musée situé à Niamey, la capitale du Niger. Il présente l\'histoire et la culture du Niger.',
    images: [
      defaultBg,
      defaultBg,
    ]
  },
  // Ajouter d'autres destinations ici
];

const TRANSPORT_COMPANIES = [
  { name: 'Air Niger', url: '#', logo: 'air-niger.png' },
  { name: 'Rimbo Transport', url: '#', logo: 'rimbo.png' },
];

const TRAVEL_AGENCIES = [
  { name: 'Sahel Voyages', url: '#', logo: 'sahel-voyages.png' },
  { name: 'Ténéré Tourisme', url: '#', logo: 'tenere-tourisme.png' },
];

const HOTELS = [
  { name: 'Hôtel Gaweye', url: '#', rating: 4, logo: 'gaweye.png' },
  { name: 'Grand Hôtel du Niger', url: '#', rating: 4, logo: 'grand-hotel.png' },
];

export default function CountryTourismPage() {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  const [lang, setLang] = useState('FR');
  const [section, setSection] = useState('Niger');
  const { destinationId } = useParams();
  const [selectedDestination, setSelectedDestination] = useState(DESTINATIONS[0]);
  const [currentDestinationId, setCurrentDestinationId] = useState(DESTINATIONS[0]?.id);
  const [openSectionIdx, setOpenSectionIdx] = useState(0);

  const handleSelectDestination = (destination) => {
    setSelectedDestination(destination);
    setCurrentDestinationId(destination.id);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white overflow-hidden">
      <TopBar currentLang={lang} onLanguageChange={setLang} />
      <Navbar current={section} onSelect={setSection} />
      
      <SharedNavBanner 
        title="Tourisme au Niger"
        description="Découvrez les merveilles naturelles et culturelles du Niger"
        image={defaultBg}
      />
      
      {/*<TourismIntro />*/}
      
      <div className="mt-8 md:mx-8" >
        <TourismSelectDestination 
          destination={selectedDestination} 
          onNext={() => {
            const currentIndex = DESTINATIONS.findIndex(d => d.id === selectedDestination.id);
            const nextIndex = (currentIndex + 1) % DESTINATIONS.length;
            const nextDestination = DESTINATIONS[nextIndex];
            setSelectedDestination(nextDestination);
            setCurrentDestinationId(nextDestination.id);
          }}
          onPrevious={() => {
            const currentIndex = DESTINATIONS.findIndex(d => d.id === selectedDestination.id);
            const prevIndex = (currentIndex - 1 + DESTINATIONS.length) % DESTINATIONS.length;
            const prevDestination = DESTINATIONS[prevIndex];
            setSelectedDestination(prevDestination);
            setCurrentDestinationId(prevDestination.id);
          }}
        />
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-12">     
        <div className="" data-aos="fade-up">
          <TourismDestinations 
            destinations={DESTINATIONS.filter(d => d.id !== selectedDestination?.id)}
            onSelectDestination={handleSelectDestination}
          />
        </div>
        <div className="" data-aos="fade-left">
          <TourismSection 
            title="Transport"
            subtitle="Découvrez les différents moyens de transport pour vous rendre au Niger et vous déplacer sur place."
            items={TRANSPORT_COMPANIES}
            moreLink="/transport"
            isOpen={openSectionIdx === 0}
            onToggle={() => setOpenSectionIdx(0)}
          />
          
          <TourismSection 
            title="Agences de voyage"
            subtitle="Faites confiance à des agences locales pour organiser votre séjour au Niger."
            items={TRAVEL_AGENCIES}
            moreLink="/agences-voyage"
            isOpen={openSectionIdx === 1}
            onToggle={() => setOpenSectionIdx(1)}
          />
          
          <TourismSection 
            title="Hébergements"
            subtitle="Trouvez l'hébergement idéal pour votre séjour au Niger, du confort simple au luxe le plus raffiné."
            items={HOTELS}
            moreLink="/hebergements"
            isOpen={openSectionIdx === 2}
            onToggle={() => setOpenSectionIdx(2)}
          />
        </div>
      </div>
    </div>
  );
}
