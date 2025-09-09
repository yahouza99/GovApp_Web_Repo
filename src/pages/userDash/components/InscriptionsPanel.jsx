import React from 'react';

export default function InscriptionsPanel() {
  return (
    <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-5 mb-4">
      <h3 className="text-lg font-semibold text-gray-900">Mes inscriptions</h3>
      <p className="text-sm text-gray-600 mt-1">Suivez vos inscriptions (registre, académique, consulaire) et mettez-les à jour.</p>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="p-3 rounded-lg border border-gray-200 bg-white">
          <p className="text-xs text-gray-500">Inscription au registre</p>
          <p className="font-medium text-gray-900">—</p>
        </div>
        <div className="p-3 rounded-lg border border-gray-200 bg-white">
          <p className="text-xs text-gray-500">Inscription académique</p>
          <p className="font-medium text-gray-900">—</p>
        </div>
      </div>
    </div>
  );
}
