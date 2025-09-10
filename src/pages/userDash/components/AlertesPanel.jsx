import React from 'react';
import { AlertTriangle, Info, Bell } from 'lucide-react';

const SEVERITY_META = {
  info: { label: 'Info', color: 'bg-sky-50 text-sky-800 ring-sky-200', icon: Info },
  important: { label: 'Important', color: 'bg-amber-50 text-amber-800 ring-amber-200', icon: Bell },
  urgent: { label: 'Urgent', color: 'bg-rose-50 text-rose-800 ring-rose-200', icon: AlertTriangle },
};

function Badge({ severity = 'info' }) {
  const meta = SEVERITY_META[severity] || SEVERITY_META.info;
  const Icon = meta.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium ring-1 ring-inset ${meta.color}`}>
      <Icon className="h-3.5 w-3.5" /> {meta.label}
    </span>
  );
}

export default function AlertesPanel({ alertes = [] }) {
  const items = alertes.length
    ? alertes
    : [
        { id: 'A-001', titre: 'Rappel rendez-vous', message: 'Votre rendez-vous du 20/09 approche.', date: '2025-09-15', severity: 'info' },
        { id: 'A-002', titre: 'Document prêt', message: 'Votre carte consulaire est prête au retrait.', date: '2025-09-12', severity: 'important' },
        { id: 'A-003', titre: 'Alerte de sécurité', message: 'Veuillez éviter la zone X jusqu’à nouvel ordre.', date: '2025-09-01', severity: 'urgent' },
      ];

  return (
    <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-5 mb-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Alertes</h3>
          <p className="text-sm text-gray-600 mt-1">Notifications liées à votre profil.</p>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-gray-200 bg-white overflow-hidden">
        {items.length === 0 ? (
          <div className="p-4 text-sm text-gray-500">Aucune alerte pour le moment.</div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {items.map((a) => (
              <li key={a.id} className="p-4 flex items-start gap-3">
                <Badge severity={a.severity} />
                <div className="min-w-0">
                  <p className="font-medium text-gray-900 truncate">{a.titre}</p>
                  <p className="text-sm text-gray-700 mt-0.5">{a.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{a.date}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
