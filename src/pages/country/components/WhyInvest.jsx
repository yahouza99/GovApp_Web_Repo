import React, { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import WhyInvestSection from './WhyInvestSection';
import defaultBg from '../../../assets/images/banner_bg.jpg';

export default function WhyInvest({ sections = [] }) {
  const items = sections.length > 0 ? sections : [
    {
      title: "Stabilité et potentiel régional",
      description: "Le Niger occupe une position stratégique au Sahel, au carrefour des marchés de la CEDEAO et de l'UEMOA, offrant des opportunités d'expansion régionale.",
      image: defaultBg,
    },
    {
      title: "Secteurs porteurs",
      description: "Agriculture, énergie solaire, infrastructures, télécommunications, mines et tourisme présentent des perspectives de croissance significatives.",
      image: defaultBg,
    },
    {
      title: "Réformes et incitations",
      description: "Amélioration continue du climat des affaires, guichet unique pour les investisseurs, et cadre incitatif compétitif.",
      image: defaultBg,
    },
  ];

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      {/* Conteneur très centré avec grandes marges latérales */}
      <div className="max-w-7xl mx-auto px-4 md:px-12 lg:px-20 xl:px-28">
        <div className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Pourquoi investir au Niger ?</h2>
          <p className="mt-2 text-gray-600">Un cadre attractif et des opportunités concrètes.</p>
        </div>
        <div className="space-y-12" data-aos="fade-up">
          {items.map((sec, idx) => (
            <WhyInvestSection key={idx} {...sec} reverse={idx % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
