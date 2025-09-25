import React from 'react';

export default function Suggestions({ items = [], onSelect }) {
  if (!items.length) {
    return (
      <div className="p-3 text-sm text-gray-500">Aucune réponse trouvée</div>
    );
  }

  return (
    <ul className="max-h-56  divide-y divide-gray-100">
      {items.map((qa, idx) => (
        <li key={idx}>
          <button
            type="button"
            onClick={() => onSelect(qa)}
            className="w-full text-left p-3 hover:bg-gray-50"
          >
            <p className="font-medium text-gray-900">{qa.question}</p>
            <p className="text-sm text-gray-600 line-clamp-2">{qa.answer}</p>
          </button>
        </li>
      ))}
    </ul>
  );
}
