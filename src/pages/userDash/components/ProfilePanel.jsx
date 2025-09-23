import React, { useState } from 'react';
import SubscribeForm from './SubscribeForm';
import FirstSubscribeForm from './FirstSubscribeForm';

function Field({ label, value }) {
  return (
    <div className="p-2 rounded-lg border border-gray-200 bg-white">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-medium text-gray-900 truncate">{value || '—'}</p>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mt-5">
      <h4 className="text-sm font-semibold text-gray-900 mb-2">{title}</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {children}
      </div>
    </div>
  );
}

function hasValues(obj) {
  return obj && Object.values(obj).some(Boolean);
}

export default function ProfilePanel({ profile = {}, isRegistered = false, onUpdateClick = () => {}, onRegisterClick = () => {} }) {
  const [editing, setEditing] = useState(false);
  const [registering, setRegistering] = useState(false);
  const {
    nom,
    prenom,
    email,
    identifiant,
    passeport,
    adresse,
    profession,
    dateVenue,
    categorie, // 'etudiant' | 'professionnel' | 'touriste' | 'refugie'
    academic = {},
    professional = {},
    tourist = {},
    refugee = {},
  } = profile;

  return (
    <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-5 mb-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Mon profil</h3>
          <p className="text-sm text-gray-600 mt-1">
            Gérez vos informations personnelles, coordonnées et statut d'inscription.
          </p>
        </div>
        {isRegistered && !editing && (
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-emerald-600 text-white text-sm hover:bg-emerald-700"
          >
            Mettre à jour mon inscription
          </button>
        )}
      </div>

      {!isRegistered ? (
        registering ? (
          <div className="mt-4">
            <FirstSubscribeForm
              initialValues={{ nom, prenom, passeport, adresse, profession }}
              onCancel={() => setRegistering(false)}
              onSubmit={(payload) => {
                if (typeof onRegisterClick === 'function') {
                  onRegisterClick(payload);
                }
                setRegistering(false);
              }}
            />
          </div>
        ) : (
          <div className="mt-4 rounded-lg border-2 border-dashed border-emerald-300 bg-emerald-50 p-5 text-sm">
            <p className="text-gray-800 font-medium">Vous n'êtes pas encore inscrit au registre consulaire.</p>
            <p className="text-gray-600 mt-1">L'inscription permet à l'ambassade de mieux vous accompagner.</p>
            <button
              type="button"
              onClick={() => setRegistering(true)}
              className="mt-3 inline-flex items-center gap-2 px-3 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700"
            >
              S'inscrire au registre
            </button>
          </div>
        )
      ) : editing ? (
        <div className="mt-4">
          <SubscribeForm
            categorie={categorie}
            initialValues={
              categorie === 'etudiant' ? academic :
              categorie === 'professionnel' ? professional :
              categorie === 'touriste' ? tourist :
              categorie === 'refugie' ? refugee : {}
            }
            onCancel={() => setEditing(false)}
            onSubmit={(payload) => {
              if (typeof onUpdateClick === 'function') {
                onUpdateClick(payload);
              }
              setEditing(false);
            }}
          />
        </div>
      ) : (
        <>
          {/* Informations générales */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            <Field label="Nom" value={nom} />
            <Field label="Prénom" value={prenom} />
            <Field label="Email" value={email} />
            <Field label="Identifiant" value={identifiant} />
            <Field label="N° Passeport" value={passeport} />
            <Field label="Adresse" value={adresse} />
            <Field label="Profession" value={profession} />
            <Field label="Date de venue" value={dateVenue} />
            <Field label="Catégorie" value={categorie} />
          </div>

          {/* Étudiant */}
          {hasValues(academic) && (
            <Section title="Informations académiques">
              <Field label="Établissement" value={academic.etablissement} />
              <Field label="Filière" value={academic.filiere} />
              <Field label="Niveau d'étude" value={academic.niveau} />
              <Field label="Cycle" value={academic.cycle} />
              <Field label="Type de bourse" value={academic.typeBourse} />
            </Section>
          )}

          {/* Professionnel */}
          {hasValues(professional) && (
            <Section title="Informations professionnelles">
              <Field label="Entreprise" value={professional.entreprise} />
              <Field label="Diplôme" value={professional.diplome} />
              <Field label="Spécialité" value={professional.specialite} />
              <Field label="Poste" value={professional.poste} />
            </Section>
          )}

          {/* Touriste */}
          {hasValues(tourist) && (
            <Section title="Informations de séjour (Touriste)">
              <Field label="Motif de séjour" value={tourist.motif} />
              <Field label="Date d'arrivée" value={tourist.dateArrivee} />
              <Field label="Date de départ" value={tourist.dateDepart} />
              <Field label="Hébergement" value={tourist.hebergement} />
            </Section>
          )}

          {/* Réfugié */}
          {hasValues(refugee) && (
            <Section title="Informations réfugié">
              <Field label="Statut d'asile" value={refugee.statutAsile} />
              <Field label="N° de dossier" value={refugee.numeroDossier} />
              <Field label="Organisation d'accompagnement" value={refugee.organisation} />
            </Section>
          )}
        </>
      )}
    </div>
  );
}
