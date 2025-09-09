import React, { useRef } from 'react';
import SectorCard from './SectorCard';
import defaultBg from '../../../assets/images/banner_bg.jpg';

export default function InvestSectors({ title = 'Secteurs porteurs', background = defaultBg, sectors = [] }) {
  const items = sectors.length > 0 ? sectors : [
    {
      title: 'Agriculture et agro-industrie',
      description:
        "Valorisation des filières (riz, oignon, sésame, bétail), transformation locale et chaînes de froid.",
      image: defaultBg,
    },
    {
      title: 'Énergies renouvelables',
      description:
        "Fort ensoleillement pour le solaire, mini-réseaux, stockage et solutions d'efficacité énergétique.",
      image: defaultBg,
    },
    {
      title: 'Infrastructures et BTP',
      description:
        "Routes, logements, hydraulique, et PPP pour soutenir la croissance urbaine.",
      image: defaultBg,
    },
    {
      title: 'Télécoms & Numérique',
      description:
        "Connectivité, services digitaux, fintech et modernisation des services publics.",
      image: defaultBg,
    },
    {
      title: 'Mines',
      description:
        "Exploration et valorisation responsable des ressources minières avec des standards internationaux.",
      image: defaultBg,
    },
    {
      title: 'Tourisme',
      description:
        "Écotourisme, patrimoine culturel et circuits sahariens à forte valeur distinctive.",
      image: defaultBg,
    },
  ];

  const handleDiscover = (sector) => () => {
    // TODO: route or modal with sector details
    console.log('Découvrir secteur:', sector.title);
    alert(`Découvrir: ${sector.title}`);
  };

  return (
    <section className="relative py-7 sm:py-8 lg:py-12">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img src={background} alt="Fond secteurs" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-emerald-900/70 mix-blend-multiply" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-white mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold">{title}</h2>
          <p className="mt-2 opacity-90">Découvrez les domaines d'investissement prioritaires au Niger</p>
        </div>

        {/* Scoped style to hide native scrollbar on webkit and firefox */}
        <style>{`
          .no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
          .no-scrollbar::-webkit-scrollbar { display: none; }
        `}</style>

        <Slider items={items} onDiscover={handleDiscover} />
      </div>
    </section>
  );
}

function Slider({ items, onDiscover }) {
  const trackRef = useRef(null);

  return (
    <div className="relative">
      {/* Left gradient + control */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-white/0 to-white/10 md:from-white/10 md:to-white/0 z-10" />
      <button
        type="button"
        aria-label="Précédent"
        onClick={() => {
          const el = trackRef.current; if (!el) return;
          const amount = Math.max(el.clientWidth * 0.9, 320);
          el.scrollBy({ left: -amount, behavior: 'smooth' });
        }}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow ring-1 ring-black/5 hover:bg-white transition focus:outline-none focus:ring-2 focus:ring-emerald-400"
      >
        <svg className="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L8.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd"/>
        </svg>
      </button>

      {/* Right gradient + control */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-white/0 to-white/10 md:from-white/10 md:to-white/0 z-10" />
      <button
        type="button"
        aria-label="Suivant"
        onClick={() => {
          const el = trackRef.current; if (!el) return;
          const amount = Math.max(el.clientWidth * 0.9, 320);
          el.scrollBy({ left: amount, behavior: 'smooth' });
        }}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow ring-1 ring-black/5 hover:bg-white transition focus:outline-none focus:ring-2 focus:ring-emerald-400"
      >
        <svg className="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M7.293 4.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L11.586 10 7.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
        </svg>
      </button>

      <div
        ref={trackRef}
        className="no-scrollbar -mx-2 flex gap-4 overflow-x-auto pb-2 pl-2 pr-6 scroll-smooth snap-x snap-mandatory"
      >
        {items.map((s, idx) => (
          <div key={idx} className="snap-start shrink-0 w-60 sm:w-64 md:w-72 h-80 md:h-96">
            <SectorCard title={s.title} description={s.description} image={s.image} onDiscover={onDiscover(s)} />
          </div>
        ))}
      </div>
    </div>
  );
}
