import React from 'react';
import banner from '../assets/images/banner_bg.jpg';
import { useTranslation } from 'react-i18next';

export default function Banner() {
  const { t } = useTranslation();
  return (
    <section
      className="relative w-full h-[60vh] min-h-[360px] bg-center bg-cover animate-bannerpan"
      style={{
        backgroundImage: `linear-gradient(rgba(7, 15, 25, 0.55), rgba(7, 15, 25, 0.55)), url(${banner})`,
        backgroundSize: '110% 110%'
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center text-center px-6">
        <div className="text-white max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow">
            {t('banner.title')}
          </h1>
          <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-200">
            {t('banner.description')}
          </p>
        </div>
      </div>
    </section>
  );
}
