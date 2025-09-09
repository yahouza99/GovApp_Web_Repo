import React from 'react';
import defaultLogo from '../../../assets/images/academic_bg.png';

export default function UtilSourceCard({
  title,
  createdAt,
  logo = defaultLogo,
  url = '#',
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={`Ouvrir ${title}`}
      className="group cursor-pointer relative block rounded-xl bg-white shadow-sm ring-1 ring-gray-100 hover:shadow-md transition overflow-hidden h-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
    >
      {/* Card inner spacing */}
      <div className="p-4 sm:p-5 h-full flex flex-col">
        {/* Top: logo */}
        <div className="h-14 sm:h-16 w-14 sm:w-16 rounded grid place-items-center overflow-hidden bg-white">
          <img src={logo} alt={title} className="max-h-full max-w-full object-contain" />
        </div>

        {/* Middle: title and meta */}
        <div className="mt-6">
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 leading-snug">
            {title}
          </h3>
          {createdAt && (
            <p className="mt-2 text-xs sm:text-sm text-gray-600">Date de création : {createdAt}</p>
          )}
        </div>

        {/* Bottom-right: globe icon (decorative) */}
        <div className="mt-auto flex items-end justify-end">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full text-emerald-700/80 group-hover:text-emerald-800 group-hover:bg-emerald-50 transition">
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </span>
        </div>
      </div>
    </a>
  );
}
