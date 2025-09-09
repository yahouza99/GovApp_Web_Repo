import React from 'react';
import UtilSourceCard from './UtilSourceCard';
import defaultLogo from '../../../assets/images/academic_bg.png';

export default function InvestUtilSource({
  title = 'Ressources et institutions utiles',
  sources = [],
}) {
  const items = sources.length > 0 ? sources : [
    {
      title: "Agence Nigérienne de Promotion des Investissements (ANPI)",
      createdAt: '2014',
      logo: defaultLogo,
      url: '#',
    },
    {
      title: "Chambre de Commerce et d'Industrie du Niger (CCIN)",
      createdAt: '1960',
      logo: defaultLogo,
      url: '#',
    },
    {
      title: 'Ministère du Commerce',
      createdAt: '—',
      logo: defaultLogo,
      url: '#',
    },
    {
      title: 'Banque Centrale (BCEAO)',
      createdAt: '1959',
      logo: defaultLogo,
      url: '#',
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50 mx-2 md:mx-4 lg:mx-6 xl:mx-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{title}</h2>
          <p className="mt-2 text-gray-600">Institutions, guichets uniques et ressources pour s'informer et entreprendre.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-2 lg:gap-4">
          {items.map((s, idx) => (
            <UtilSourceCard key={idx} title={s.title} createdAt={s.createdAt} logo={s.logo} url={s.url} />
          ))}
        </div>
      </div>
    </section>
  );
}
