import React from 'react';

export default function DemandesPanel() {
  return (
    <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-5 mb-4">
      <h3 className="text-lg font-semibold text-gray-900">Mes demandes</h3>
      <p className="text-sm text-gray-600 mt-1">Suivi de vos demandes (passeport, carte consulaire, attestations, etc.).</p>
      <div className="mt-4 rounded-lg border border-gray-200 bg-white p-4 text-sm text-gray-600">
        Aucune demande en cours.
      </div>
    </div>
  );
}
