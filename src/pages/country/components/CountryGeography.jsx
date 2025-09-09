import React from 'react';
import defaultBg from '../../../assets/images/banner_bg.jpg';

export default function CountryGeography({
  image = defaultBg,
  title = 'Géographie du Niger',
  description =
    "Situé en Afrique de l'Ouest, le Niger est un vaste pays sahélo-saharien sans littoral. Son territoire est dominé par le désert du Sahara au nord, le Sahel au centre, et des zones plus soudaniennes au sud le long du fleuve Niger.",
  area = '1,267,000 km²',
  population = '25,000,000',
  birthRate = '5.5',
  deathRate = '1.2',
  GDP = '125',
}) {
  return (
    <section className="p-5 border border-gray-200 rounded-md">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <img src={image} alt={title} className="md:col-span-1 h-full w-full rounded-sm object-cover border border-gray-200" />
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <p className="mt-3 text-gray-700 leading-relaxed">{description}</p>

          <h2 className="mt-3 text-md font-semibold text-gray-900">Superficie : {area}</h2>
          <h2 className="mt-1 text-md font-semibold text-gray-900">Population : {population} habitants</h2>
          <h2 className="mt-1 text-md font-semibold text-gray-900">Taux de natalité : {birthRate}</h2>
          <h2 className="mt-1 text-md font-semibold text-gray-900">Taux de mortalité : {deathRate}</h2>
          <h2 className="mt-1 text-md font-semibold text-gray-900">PIB : {GDP} Milliards de Dollars</h2>
        </div>
      </div>
    </section>
  );
}
