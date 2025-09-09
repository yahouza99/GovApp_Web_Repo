import React from 'react';
import { Link } from 'react-router-dom';

export default function QuickTile({ title, to, onClick, icon: Icon, description, disabled = false, active = false, size = 'md', className = '' }) {
  const baseBorder = disabled ? 'border-gray-200' : active ? 'border-emerald-300' : 'border-gray-200';
  const baseBg = disabled ? 'bg-gray-50' : 'bg-white';
  const hover = disabled ? '' : active ? 'hover:border-emerald-300' : 'hover:border-emerald-200 hover:shadow-sm';
  const cursor = disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer';

  const pad = size === 'sm' ? 'p-3' : 'p-5';
  const iconBox = size === 'sm' ? 'h-10 w-10' : 'h-12 w-12';
  const iconSize = size === 'sm' ? 'h-5 w-5' : 'h-7 w-7';
  const titleSize = size === 'sm' ? 'text-sm' : 'text-base';
  const descShow = size !== 'sm';

  const content = (
    <div
      className={`group flex items-center gap-4 ${pad} rounded-xl border ${baseBorder} ${baseBg} ${hover} ${cursor} transition ${className}`}
      role="button"
      aria-disabled={disabled}
      onClick={disabled ? undefined : onClick}
    >
      <div className={`${iconBox} rounded-lg flex items-center justify-center ${disabled ? 'bg-gray-100' : active ? 'bg-emerald-100' : 'bg-emerald-50 group-hover:bg-emerald-100'} text-emerald-700`}>
        {Icon && <Icon className={`${iconSize}`} />}
      </div>
      <div className="flex-1">
        <p className={`font-semibold text-gray-900 ${titleSize}`}>{title}</p>
        {descShow && description && <p className="text-sm text-gray-500 mt-0.5">{description}</p>}
      </div>
      {!disabled && (
        <svg className={`shrink-0 ${size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'} ${active ? 'text-emerald-600' : 'text-gray-400 group-hover:text-emerald-600'} transition`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
      )}
    </div>
  );

  if (to && !disabled) {
    return (
      <Link to={to} aria-label={title} className="block">
        {content}
      </Link>
    );
  }
  return <div className="block">{content}</div>;
}
