import React from 'react';
import { FileClock, CheckCircle2, XCircle, ChevronRight, Plus } from 'lucide-react';

const STATUS_ORDER = ['en_cours', 'annulee', 'terminee'];
const STATUS_META = {
  en_cours: { label: 'En cours', color: 'bg-amber-50 text-amber-800 ring-amber-200', icon: FileClock },
  annulee: { label: 'Annulée', color: 'bg-rose-50 text-rose-800 ring-rose-200', icon: XCircle },
  terminee: { label: 'Terminée', color: 'bg-emerald-50 text-emerald-800 ring-emerald-200', icon: CheckCircle2 },
};

function Badge({ status }) {
  const meta = STATUS_META[status] || { label: status, color: 'bg-gray-50 text-gray-700 ring-gray-200', icon: FileClock };
  const Icon = meta.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium ring-1 ring-inset ${meta.color}`}>
      <Icon className="h-3.5 w-3.5" /> {meta.label}
    </span>
  );
}

function Group({ title, children }) {
  return (
    <div className="mt-4">
      <h4 className="text-sm font-semibold text-gray-900 mb-2">{title}</h4>
      <div className="rounded-xl border border-gray-200 overflow-hidden bg-white">
        {children}
      </div>
    </div>
  );
}

export default function DemandesPanel({ demandes = [], onNew = () => {} }) {
  const items = demandes.length
    ? demandes
    : [
        { id: 'D-001', type: 'Demande de rapatriement', status: 'en_cours', createdAt: '2025-08-10', ref: 'RPT-2025-0001' },
        { id: 'D-002', type: 'Carte consulaire', status: 'terminee', createdAt: '2025-06-02', ref: 'CC-2025-0142' },
        { id: 'D-003', type: 'Prise en charge', status: 'annulee', createdAt: '2025-07-15', ref: 'PEC-2025-0033' },
      ];

  const groups = STATUS_ORDER.map((s) => ({ key: s, title: STATUS_META[s].label, rows: items.filter(i => i.status === s) }));

  return (
    <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-5 mb-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Mes demandes</h3>
          <p className="text-sm text-gray-600 mt-1">Suivi des demandes (rapatriement, carte consulaire, prise en charge...).</p>
        </div>
        <button
          type="button"
          onClick={onNew}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-emerald-600 text-white text-sm hover:bg-emerald-700"
        >
          <Plus className="h-4 w-4" /> Nouvelle demande
        </button>
      </div>

      {groups.map((g) => (
        <Group key={g.key} title={g.title}>
          {g.rows.length === 0 ? (
            <div className="p-4 text-sm text-gray-500">Aucune demande {g.title.toLowerCase()}.</div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {g.rows.map((d) => (
                <li key={d.id} className="flex items-center justify-between gap-3 p-4">
                  <div className="min-w-0">
                    <p className="font-medium text-gray-900 truncate">{d.type}</p>
                    <p className="text-xs text-gray-500 mt-0.5">Référence: {d.ref} • Créée le {d.createdAt}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge status={d.status} />
                    <button className="inline-flex items-center gap-1 text-sm text-emerald-700 hover:text-emerald-800">
                      Détails <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Group>
      ))}
    </div>
  );
}
