import React, { useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import SubnavHome from '../../shared/SubnavHome';
import SubnavRestCommuniqueList from './components/SubnavRestCommuniqueList';
import defaultBg from '../../assets/images/banner_bg.jpg';
import communiquesImg from '../../assets/images/republic.png';


const SAMPLE_COMMUNIQUES = [
  { id: 1, title: "Communiqué: Ouverture des inscriptions consulaires", date: "2025-08-10", image: communiquesImg },
  { id: 2, title: "Annonce: Journée culturelle du Niger", date: "2025-08-07", image: communiquesImg },
  { id: 3, title: "Information: Nouveaux horaires d'accueil", date: "2025-08-01", image: communiquesImg },
  { id: 4, title: "Communiqué: Procédure de renouvellement de passeport", date: "2025-07-25", image: communiquesImg },
  { id: 5, title: "Annonce: Service e-Consulat disponible", date: "2025-07-18", image: communiquesImg },
  { id: 6, title: "Information: Jours fériés et fermetures", date: "2025-07-10", image: communiquesImg },
];

export default function PressSubPage() {
  const { sub } = useParams();
  const location = useLocation();
  const initialComm = location.state?.selectedComm || SAMPLE_COMMUNIQUES[0];
  const [selectedComm, setSelectedComm] = useState(initialComm);

  const displayedItem = useMemo(() => {
    return {
      key: `communique-${selectedComm.id}`,
      title: selectedComm.title,
      images: [selectedComm.image || defaultBg],
      paragraphs: [
        selectedComm.date ? new Date(selectedComm.date).toLocaleDateString() : 'Communiqué',
      ],
    };
  }, [selectedComm]);

  return (
    <div className="">
      {/* Partie principale à gauche */}
      <SubnavHome item={displayedItem} />
      {/* Partie droite: communiqués (sans 'Voir plus') */}
      <SubnavRestCommuniqueList items={SAMPLE_COMMUNIQUES} onSelect={setSelectedComm} />
    </div>
  );
}