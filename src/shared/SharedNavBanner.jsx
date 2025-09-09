import React from 'react';
import defaultBg from '../assets/images/banner_bg.jpg';
import republic from '../assets/images/republic.png';
import consulaires from '../assets/images/consul_bg.jpg';
import academiques from '../assets/images/academic_bg.png';

export default function SharedNavBanner({
  title = 'Titre de la page',
  description = "Courte description de la page de navigation.",
  background = null,
}) {
  // Mapping d'images par titre de menu (modifiable selon vos assets)
  const BG_BY_TITLE = {
    'Ambassade': defaultBg,
    'Niger': republic,
    'Services consulaires': consulaires,
    'Services académiques': academiques,
    'Prendre un rendez-vous': defaultBg,
    'Rapatriement': defaultBg,
  };

  const chosenBg = background || BG_BY_TITLE[title] || defaultBg;

  const style = chosenBg
    ? {
        backgroundImage: `linear-gradient(rgba(5, 10, 16, 0.75), rgba(5, 10, 16, 0.75)), url(${chosenBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : undefined;

  return (
    <section
      className={`relative w-full h-32 sm:h-40 md:h-48 ${background ? 'text-white' : 'text-gray-900'} ${
        background ? '' : 'bg-gray-50'
      }`}
      style={style}
    >
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <h1 className={`text-2xl sm:text-3xl md:text-4xl font-extrabold ${background ? 'text-white' : 'text-gray-100'}`}>
              {title}
            </h1>
            {description && (
              <p className={`mt-2 text-sm sm:text-base ${background ? 'text-white' : 'text-gray-100'}`}>
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
