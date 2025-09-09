import React from 'react';

export default function ErrorAlert({ title = 'Erreur', message, onClose }) {
  return (
    <div role="alert" className="relative flex w-full items-start gap-3 rounded-md border border-red-200 bg-red-50 p-4 text-red-800">
      <div className="mt-0.5 text-red-600">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
          <path fillRule="evenodd" d="M9.401 1.592a2.25 2.25 0 0 1 3.198 0l8.809 8.809a2.25 2.25 0 0 1 0 3.198l-8.809 8.809a2.25 2.25 0 0 1-3.198 0l-8.809-8.809a2.25 2.25 0 0 1 0-3.198l8.809-8.809ZM12 7.5a.75.75 0 0 1 .75.75v5.25a.75.75 0 0 1-1.5 0V8.25A.75.75 0 0 1 12 7.5Zm0 9a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" clipRule="evenodd" />
        </svg>
      </div>
      <div className="flex-1">
        <p className="font-semibold">{title}</p>
        {message && <p className="mt-1 text-sm text-red-900">{message}</p>}
      </div>
      {onClose && (
        <button aria-label="Fermer" onClick={onClose} className="absolute right-2 top-2 rounded p-1 text-red-700 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
            <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </div>
  );
}
