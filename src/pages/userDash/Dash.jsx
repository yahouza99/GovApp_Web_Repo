import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IdCard, GraduationCap, BriefcaseBusiness, FileText, CalendarCheck, AlertTriangle } from 'lucide-react';
import QuickTile from './components/QuickTile';
import NewsWidget from './components/NewsWidget';
import StatusWidget from './components/StatusWidget';
import ContactBar from './components/ContactBar';
import ProfilePanel from './components/ProfilePanel';
import InscriptionsPanel from './components/InscriptionsPanel';
import RendezVousPanel from './components/RendezVousPanel';
import DemandesPanel from './components/DemandesPanel';
import DocumentsPanel from './components/DocumentsPanel';
import AlertesPanel from './components/AlertesPanel';
import TileCarousel from './components/TileCarousel';

export default function Dash({ user = { name: 'Yahouza', role: 'Étudiant' } }) {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  const tiles = [
    { key: 'profil', title: 'Mon profil', icon: IdCard, onClick: () => setSelected('profil') },
    { key: 'inscriptions', title: 'Mes inscriptions', icon: GraduationCap, onClick: () => setSelected('inscriptions') },
    { key: 'demandes', title: 'Mes demandes', icon: BriefcaseBusiness, onClick: () => setSelected('demandes') },
    { key: 'documents', title: 'Mes documents', icon: FileText, onClick: () => setSelected('documents') },
    { key: 'rendezvous', title: 'Rendez-vous', icon: CalendarCheck , onClick: () => setSelected('rendezvous') },
    { key: 'alertes', title: 'Alertes', icon:  AlertTriangle, onClick: () => setSelected('alertes') },
  ];

  // Example ressortissant data (replace with real data source)
  const profileData = {
    nom: 'Issa',
    prenom: 'Yahouza',
    email: 'yahouza@example.com',
    identifiant: '12345678',
    passeport: 'NE1234567',
    adresse: '12 Rue de la Paix, 75002 Paris, France',
    profession: 'Étudiant',
    statut: false, // boolean registration status
    dateVenue: '12/09/2023',
    categorie: 'etudiant', // etudiant | professionnel | touriste | refugie

    // Étudiant
    academic: {
      etablissement: 'Université de Paris',
      filiere: 'Informatique',
      niveau: 'Master 1',
      cycle: 'Master',
      typeBourse: 'Bourse d’État',
    },

    // Professionnel
    // professional: {
    //   entreprise: 'TechCorp',
    //   diplome: 'Ingénieur',
    //   specialite: 'Réseaux',
    //   poste: 'Administrateur système',
    // },

    // Touriste
    // tourist: {
    //   motif: 'Visite familiale',
    //   dateArrivee: '01/08/2025',
    //   dateDepart: '21/08/2025',
    //   hebergement: 'Hôtel Paris Centre',
    // },

    // Réfugié
    // refugee: {
    //   statutAsile: 'Demande en cours',
    //   numeroDossier: 'RF-2025-0001',
    //   organisation: 'HCR',
    // },
  };

  const renderPanel = () => {
    switch (selected) {
      case 'profil':
        return (
          <ProfilePanel
            profile={profileData}
            isRegistered={!!profileData.statut}
            onUpdateClick={() => setSelected('inscriptions')}
            onRegisterClick={() => setSelected('inscriptions')}
          />
        );
      case 'inscriptions':
        return <InscriptionsPanel />;
      case 'rendezvous':
        return <RendezVousPanel />;
      case 'demandes':
        return <DemandesPanel />;
      case 'documents':
        return <DocumentsPanel />;
      case 'alertes':
        return <AlertesPanel />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-50 min-h-[80vh] py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
          <div className="p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Bienvenue sur votre espace Ambassade, {user.name}</h1>
            <p className="text-gray-600 mt-2">Le portail pour le citoyen Nigerien</p>

            {/* Main grid */}
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left: quick tiles / panels */}
              <div className="lg:col-span-2">
                {selected ? (
                  <>
                    {/* Persistent compact carousel on top */}
                    <TileCarousel tiles={tiles} selected={selected} onSelect={setSelected} />
                    {/* Selected panel below it */}
                    {renderPanel()}
                  </>
                ) : (
                  // Initial grid view when nothing is selected
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {tiles.map(t => (
                      <QuickTile
                        key={t.key}
                        title={t.title}
                        icon={t.icon}
                        onClick={t.onClick}
                        active={selected === t.key}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Right: widgets */}
              <div className="space-y-4">
                <NewsWidget />
                <StatusWidget />
              </div>
            </div>
          </div>

          {/* Bottom contact bar */}
          <div className="border-t border-gray-100 p-4 md:p-6 bg-gray-50 rounded-b-2xl">
            <ContactBar address="Paris, France" email="contact@ambassade-ne.org" phone="(+33) 1 23 45 67 89" />
          </div>
        </div>
      </div>
    </div>
  );
}
