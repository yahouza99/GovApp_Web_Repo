import React from 'react';

export default function RendezVousPanel() {
  return (
    <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-5 mb-4">
      <h3 className="text-lg font-semibold text-gray-900">Mes rendez-vous</h3>
      <p className="text-sm text-gray-600 mt-1">Consultez et gérez vos rendez-vous à l'ambassade.</p>
      <div className="mt-4 rounded-lg border border-gray-200 bg-white p-4 text-sm text-gray-600">
        Aucun rendez-vous à afficher pour le moment.
      </div>
    </div>
  );
}
