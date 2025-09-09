import React from 'react';
import defaultBg from '../../../assets/images/banner_bg.jpg';

export default function InvestIntro({
  title = "Investir au Niger",
  description = "Découvrez les opportunités d'investissement au Niger: secteurs porteurs, cadres réglementaires et avantages compétitifs. Le pays offre un potentiel important dans l'agriculture, l'énergie, les infrastructures, les télécommunications, les mines et le tourisme, soutenu par une position géographique stratégique au Sahel.",
  image = defaultBg,
}) {
  return (
    <section className="py-10 sm:py-12 lg:py-16 mx-2 md:mx-4 lg:mx-6 xl:mx-8 border-b-[2px] rounded-md border-emerald-600 " >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{title}</h2>
            <p className="mt-4 text-gray-700 leading-relaxed">{description}</p>
            <ul className="mt-6 space-y-2 text-gray-700">
              <li className="flex items-start gap-2"><span className="text-emerald-600 mt-1">•</span> Cadre institutionnel en amélioration continue pour les investisseurs.</li>
              <li className="flex items-start gap-2"><span className="text-emerald-600 mt-1">•</span> Potentiel agricole et énergétique (solaire) considérable.</li>
              <li className="flex items-start gap-2"><span className="text-emerald-600 mt-1">•</span> Marché régional via la CEDEAO et l'UEMOA.</li>
            </ul>
          </div>
          <div>
           {/* <img
              src={image}
              alt="Investir au Niger"
              className="w-full h-64 sm:h-80 lg:h-[420px] object-cover rounded-sm shadow"
            /> */}
          </div>
        </div>
      </div>
    </section>
  );
}
