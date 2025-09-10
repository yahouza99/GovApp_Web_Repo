import React, { useState } from 'react';
import { Eye, Download, X } from 'lucide-react';

export default function DocumentsPanel({ documents = [] }) {
  const [preview, setPreview] = useState(null); // {name, url} | null

  const items = documents.length
    ? documents
    : [
        { name: 'Fiche ambassade', url: '/sample/fiche-ambassade.pdf' },
        { name: 'Carte consulaire', url: '/sample/carte-consulaire.pdf' },
      ];

  return (
    <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-5 mb-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Mes documents</h3>
          <p className="text-sm text-gray-600 mt-1">Aperçu et téléchargement des documents liés au profil.</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3">
        {items.map((doc) => (
          <div key={doc.name} className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 bg-white p-3">
            <div>
              <p className="font-medium text-gray-900">{doc.name}</p>
              <p className="text-xs text-gray-500">PDF</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPreview(doc)}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-gray-200 hover:bg-gray-50 text-sm text-gray-700"
                aria-label={`Aperçu ${doc.name}`}
              >
                <Eye className="h-4 w-4" /> 
              </button>
              <a
                href={doc.url}
                download
                className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-emerald-600 text-white text-sm hover:bg-emerald-700"
                aria-label={`Télécharger ${doc.name}`}
              >
                <Download className="h-4 w-4" /> 
              </a>
            </div>
          </div>
        ))}
      </div>

      {preview && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-5xl h-[80vh] bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="absolute top-2 right-2 flex items-center gap-2">
              <a
                href={preview.url}
                download
                className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-emerald-600 text-white text-sm hover:bg-emerald-700"
              >
                <Download className="h-4 w-4" /> Télécharger
              </a>
              <button
                type="button"
                onClick={() => setPreview(null)}
                className="inline-flex items-center justify-center h-9 w-9 rounded-md bg-white/90 border border-gray-200 hover:bg-gray-50"
                aria-label="Fermer l'aperçu"
              >
                <X className="h-5 w-5 text-gray-700" />
              </button>
            </div>

            <div className="h-full w-full">
              <iframe
                title={preview.name}
                src={preview.url}
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
