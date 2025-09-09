import React, { useState } from 'react';

const TABS = [
  { id: 'students', label: 'Étudiants' },
  { id: 'professionals', label: 'Professionnels' },
];

export default function NewsWidget({ data }) {
  const [tab, setTab] = useState('students');
  const items = data?.[tab] || [
    'Bourse 2025 ouverte !',
    'Conférence diaspora : 12 Septembre',
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900">Actualités</h3>
        <div className="flex items-center gap-3 text-sm">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-2 py-1 rounded ${tab === t.id ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
        {items.map((it, idx) => (
          <li key={idx}>{it}</li>
        ))}
      </ul>
    </div>
  );
}
