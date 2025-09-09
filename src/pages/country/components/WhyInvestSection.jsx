import React from 'react';
import defaultBg from '../../../assets/images/banner_bg.jpg';

export default function WhyInvestSection({ title, description, image = defaultBg, reverse = false }) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-b-[3px] rounded-md border-emerald-600 shadow hover:shadow-lg transition ${reverse ? 'md:[&>div:first-child]:order-2' : ''}`}>
      <div  className='m-2'>
        <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">{title}</h3>
        <p className="mt-3 text-gray-700 leading-relaxed">
          {description}
        </p>
      </div>
      <div>
        <img
          src={image}
          alt={title || 'Pourquoi investir'}
          className="w-full h-56 sm:h-72 object-cover rounded-sm shadow hover:shadow-lg transition"
        />
      </div>
    </div>
  );
}
