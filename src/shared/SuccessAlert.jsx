import React from 'react';

export default function SuccessAlert({ title = 'Succès', message, onClose }) {
  return (
    <div role="alert" className="relative flex w-full items-start gap-3 rounded-md border border-emerald-200 bg-emerald-50 p-4 text-emerald-800">
      <div className="mt-0.5 text-emerald-600">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
          <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-2.59a.75.75 0 0 0-1.22-.876l-3.236 4.513-1.47-1.47a.75.75 0 1 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.147-.089l3.65-5.388Z" clipRule="evenodd" />
        </svg>
      </div>
      <div className="flex-1">
        <p className="font-semibold">{title}</p>
        {message && <p className="mt-1 text-sm text-emerald-900">{message}</p>}
      </div>
      {onClose && (
        <button aria-label="Fermer" onClick={onClose} className="absolute right-2 top-2 rounded p-1 text-emerald-700 hover:bg-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-500">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
            <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </div>
  );
}
