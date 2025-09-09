import React from 'react';
import { MapPin, AtSign, Phone } from 'lucide-react';

export default function ContactBar({ address = 'Adresse', email = 'email@example.com', phone = '+00 00 00 00', className = '' }) {
  const items = [
    { icon: MapPin, label: 'Adresse', value: address },
    { icon: AtSign, label: 'Email', value: email },
    { icon: Phone, label: 'Téléphone', value: phone },
  ];
  return (
    <div className={`bg-white rounded-xl border border-gray-200 p-3 ${className}`}>
      <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
        {items.map((it) => (
          <div key={it.label} className="flex items-center gap-3 px-3 py-2">
            <it.icon className="h-4 w-4 text-gray-500" />
            <div className="text-sm">
              <p className="text-gray-500">{it.label}</p>
              <p className="font-medium text-gray-900">{it.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
