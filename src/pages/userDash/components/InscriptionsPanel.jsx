import React from 'react';
import { CalendarDays, FileClock, CheckCircle2, XCircle } from 'lucide-react';

const STATUS_META = {
  en_cours: { label: 'En cours', color: 'bg-amber-50 text-amber-800 ring-amber-200', icon: FileClock },
  validee: { label: 'Validée', color: 'bg-emerald-50 text-emerald-800 ring-emerald-200', icon: CheckCircle2 },
  annulee: { label: 'Annulée', color: 'bg-rose-50 text-rose-800 ring-rose-200', icon: XCircle },
};

function Badge({ status }) {
  if (!status) return null;
  const meta = STATUS_META[status] || { label: status, color: 'bg-gray-50 text-gray-700 ring-gray-200', icon: FileClock };
  const Icon = meta.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium ring-1 ring-inset ${meta.color}`}>
      <Icon className="h-3.5 w-3.5" /> {meta.label}
    </span>
  );
}

export default function InscriptionsPanel({ inscriptions = [] }) {
  const items = (inscriptions.length
    ? inscriptions
    : [
        { id: 'I-003', type: 'Inscription académique', date: '2025-09-01', status: 'en_cours', ref: 'ACA-2025-0102' },
        { id: 'I-002', type: 'Registre consulaire', date: '2025-07-12', status: 'validee', ref: 'REG-2025-0045' },
        { id: 'I-001', type: 'Inscription consulaire', date: '2025-05-28', status: 'annulee', ref: 'CON-2025-0011' },
      ]).slice();

  // Sort by date desc (most recent first)
  items.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-5 mb-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Mes inscriptions</h3>
          <p className="text-sm text-gray-600 mt-1">Historique des inscriptions, trié par date (plus récentes d'abord).</p>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-gray-200 bg-white overflow-hidden">
        {items.length === 0 ? (
          <div className="p-4 text-sm text-gray-500">Aucune inscription.</div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {items.map((it) => (
              <li key={it.id} className="p-4 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-medium text-gray-900 truncate">{it.type}</p>
                  <p className="text-xs text-gray-500 mt-0.5">Référence: {it.ref || '—'}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="inline-flex items-center gap-1 text-sm text-gray-700">
                    <CalendarDays className="h-4 w-4 text-gray-500" /> {it.date}
                  </div>
                  <Badge status={it.status} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
