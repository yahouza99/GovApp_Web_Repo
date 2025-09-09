import React from 'react';
import { CheckCircle2, HelpCircle, MessageCircle, Phone } from 'lucide-react';

export default function StatusWidget({ registered = true }) {
  const items = [
    { icon: HelpCircle, label: 'FAQ', to: '#' },
    { icon: MessageCircle, label: 'Contact', to: '#' },
    { icon: Phone, label: 'WhatsApp ambassade', to: '#' },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-4">
      <div>
        <h3 className="font-semibold text-gray-900">Statut</h3>
        <div className="mt-2 flex items-center gap-2 text-sm">
          <CheckCircle2 className={`h-5 w-5 ${registered ? 'text-emerald-600' : 'text-gray-300'}`} />
          <span className="text-gray-700">{registered ? 'Inscription au registre' : 'Non inscrit'}</span>
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-900 mb-2">Notifications</p>
        <ul className="space-y-1">
          {items.map((it) => (
            <li key={it.label}>
              <a href={it.to} className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-50 text-gray-700 text-sm">
                <it.icon className="h-4 w-4 text-gray-500" />
                {it.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
