import React, { useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import Suggestions from './Suggestions';

export default function ChatPanel({ open, onClose, query, setQuery, suggestions, onSelectSuggestion, selectedQA, clearSelection }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center sm:justify-end pointer-events-none overflow-hidden">
      {/* Backdrop clickable to close */}
      <div className="absolute inset-0 bg-black/20 pointer-events-auto" onClick={onClose} />

      {/* Panel */}
      <div className="relative pointer-events-auto m-4 sm:mr-6 sm:mb-6 w-full max-w-md">
        <div className="rounded-2xl bg-white shadow-xl ring-1 ring-black/5 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Assistance</h3>
            <button type="button" onClick={onClose} className="p-1 rounded-md hover:bg-gray-100">
              <X className="h-5 w-5 text-gray-700" />
            </button>
          </div>

          {/* Search input */}
          <div className="p-3 border-b border-gray-100">
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => {
                if (selectedQA) clearSelection();
                setQuery(e.target.value);
              }}
              type="text"
              placeholder="Posez votre question (ex: Comment prendre un rendez-vous ?)"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          {/* Body */}
          <div className="max-h-80">
            {selectedQA ? (
              <div className="p-4">
                <p className="text-sm text-gray-500">Question</p>
                <p className="font-medium text-gray-900">{selectedQA.question}</p>
                <div className="mt-3">
                  <p className="text-sm text-gray-500">Réponse</p>
                  <div className="prose prose-sm max-w-none text-gray-800">
                    {selectedQA.answer}
                  </div>
                </div>
              </div>
            ) : (
              <Suggestions items={suggestions} onSelect={onSelectSuggestion} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
