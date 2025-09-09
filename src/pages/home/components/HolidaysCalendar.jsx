import React, { useMemo, useState } from 'react';

// Simple static data; can be replaced by API later
const NATIONAL_HOLIDAYS = [
    { date: '2025-01-01', label: 'Jour de l’An' },
    { date: '2025-04-24', label: 'Journée de la Concorde' },
    { date: '2025-05-01', label: 'Fête du Travail' },
    { date: '2025-07-26', label: 'Anniversaire du Coup d’État (CNSP)' },
    { date: '2025-08-03', label: 'Fête de l’Indépendance' },
    { date: '2025-12-18', label: 'Fête de la République' },
    { date: '2025-12-25', label: 'Noël' },
    // Jours religieux mobiles (à ajuster selon calendrier lunaire local) :
    { date: '2025-03-30', label: 'Korité (Aïd al-Fitr)' },     // ex.
    { date: '2025-06-07', label: 'Tabaski (Aïd al-Adha)' },     // ex.
    { date: '2025-06-26', label: 'Nouvel An islamique (Muharram)' },
    { date: '2025-09-05', label: 'Mawlid' },
];

const HOST_HOLIDAYS = [
    { date: '2025-01-01', label: 'Jour de l’An' },
    { date: '2025-01-11', label: 'Manifeste de l’Indépendance' },
    { date: '2025-01-14', label: 'Nouvel An amazigh' },
    { date: '2025-05-01', label: 'Fête du Travail' },
    { date: '2025-07-30', label: 'Fête du Trône' },
    { date: '2025-08-14', label: 'Récupération d’Oued Ed-Dahab' },
    { date: '2025-08-20', label: 'Révolution Roi & Peuple' },
    { date: '2025-08-21', label: 'Fête de la Jeunesse' },
    { date: '2025-11-06', label: 'Marche Verte' },
    { date: '2025-11-18', label: 'Fête de l’Indépendance' },
    // Jours religieux (à ajuster) :
    { date: '2025-03-31', label: 'Aïd al-Fitr' },
    { date: '2025-06-07', label: 'Aïd al-Adha' },
    { date: '2025-06-27', label: 'Nouvel An islamique (Hijra)' },
    { date: '2025-09-05', label: 'Mawlid ' },
];

function formatDate(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
  } catch {
    return iso;
  }
}

export default function HolidaysCalendar({ national = NATIONAL_HOLIDAYS, host = HOST_HOLIDAYS, hostLabel = 'Pays hôte' }) {
  const [tab, setTab] = useState('national');
  const list = useMemo(() => (tab === 'national' ? national : host), [tab, national, host]);

  return (
    <section className="mt-12">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Jours fériés officiels 2025</h2>
      </div>

      {/* Tabs */}
      <div className="mt-4 inline-flex rounded-lg border border-gray-200 p-1 bg-white">
        <button
          type="button"
          className={`px-3 py-1.5 text-sm rounded-md transition ${tab === 'national' ? 'bg-emerald-600 text-white' : 'text-gray-700 hover:bg-gray-50'}`}
          onClick={() => setTab('national')}
        >
          National (Niger)
        </button>
        <button
          type="button"
          className={`ml-1 px-3 py-1.5 text-sm rounded-md transition ${tab === 'host' ? 'bg-emerald-600 text-white' : 'text-gray-700 hover:bg-gray-50'}`}
          onClick={() => setTab('host')}
        >
          {hostLabel}
        </button>
      </div>

      {/* List */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {list.map((h, idx) => (
          <article key={idx} className="flex items-start gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition">
            <div className="shrink-0 rounded-md bg-emerald-50 text-emerald-700 px-2 py-1 text-xs font-semibold">
              {new Date(h.date).toLocaleDateString(undefined, { month: 'short' }).toUpperCase()}
            </div>
            <div>
              <p className="text-sm text-gray-500">{formatDate(h.date)}</p>
              <p className="text-base font-semibold text-gray-900">{h.label}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
