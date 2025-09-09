import React, { useState, useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import defaultBg from '../../../assets/images/banner_bg.jpg';
import presidentImg from '../../../assets/images/president.jpg';

export default function CountryPresentation({
  sliderImages = [defaultBg, defaultBg, defaultBg],
  president = {
    name: 'S.E Le General d\'armée Abdourahmane Tiani',
    photo: presidentImg,
    description:
      "Le Président de la République incarne l'unité nationale et veille au respect de la Constitution. Il définit les grandes orientations de la politique de la Nation.",
  },
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide toutes les 4s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [sliderImages.length]);

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
  };

  return (
    <section className="py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {/* Slider images */}
        <div className="order-1 lg:order-2 lg:col-span-2 relative">
          <div className="relative w-full h-[340px] rounded-md overflow-hidden bg-white">
            {sliderImages.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Niger ${i + 1}`}
                className={`absolute top-0 left-0 w-full h-full object-contain transition-opacity duration-1000 ${
                  i === currentIndex ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
          </div>

          {/* Boutons navigation */}
          <button
            onClick={goToPrev}
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/40 text-white px-3 py-2 rounded-full hover:bg-black/60"
          >
            ❮
          </button>
          <button
            onClick={goToNext}
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/40 text-white px-3 py-2 rounded-full hover:bg-black/60"
          >
            ❯
          </button>

          {/* Indicateurs en bas */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {sliderImages.map((_, i) => (
              <span
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
                  i === currentIndex
                    ? 'bg-orange-500 scale-110'
                    : 'bg-green-500 hover:bg-green-600'
                }`}
              ></span>
            ))}
          </div>
        </div>

        {/* President card */}
          <article className="order-2 lg:order-1 lg:col-span-1 flex flex-col items-center text-center rounded-md border border-gray-200 bg-orange-200 p-5 shadow-sm" data-aos="flip-left">
            <div className="w-40 h-40 md:w-60 md:h-60 overflow-hidden rounded-sm mb-4">
              <img
                src={president.photo}
                alt={president.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h4 className="text-md text-green-600">Président de la République du Niger</h4>
            <h3 className="text-md font-semibold text-gray-900">{president.name}</h3>
            <p className="mt-2 text-sm text-gray-700">{president.description}</p>
          </article>

      </div>
    </section>
  );
}
