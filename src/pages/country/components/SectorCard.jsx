import React from 'react';
import defaultBg from '../../../assets/images/banner_bg.jpg';

export default function SectorCard({ title, description, image = defaultBg, onDiscover }) {
  return (
    <div className="bg-white/90 backdrop-blur shadow-sm hover:shadow-lg transition rounded-md overflow-hidden border border-gray-100 h-full flex flex-col">
      <div className="h-40 sm:h-48 w-full overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="mt-2 text-sm text-gray-700 leading-relaxed line-clamp-4">{description}</p>
        <button
          type="button"
          onClick={onDiscover}
          className="mt-auto inline-flex justify-center items-center px-3 py-2 rounded-md bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700"
        >
          Découvrir
        </button>
      </div>
    </div>
  );
}
