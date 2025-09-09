import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function AlertesPanel() {
  return (
    <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-5 mb-4">
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-5 w-5 text-amber-500" />
        <h3 className="text-lg font-semibold text-gray-900">Alertes</h3>
      </div>
      <p className="text-sm text-gray-600 mt-1">Consultez les messages importants et urgents vous concernant.</p>
      <div className="mt-4 rounded-lg border border-gray-200 bg-white p-4 text-sm text-gray-600">
        Aucune alerte pour le moment.
      </div>
    </div>
  );
}
