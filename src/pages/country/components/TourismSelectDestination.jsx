import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TourismSelectDestination = ({ destination }) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  if (!destination) return null;

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === destination.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? destination.images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className=" border border-gray-200 rounded-sm  overflow-hidden mx-2 py-4 md:py-12 md:mx-12 ">

      {/* Partie basse : Carrousel d’images en overlay */}
      {destination.images && destination.images.length > 0 && (
        <div className="relative w-full h-[350px] sm:h-[350px] md:h-[450px] lg:h-[500px] ">
          <img
            src={destination.images[currentImageIndex]}
            alt={destination.title}
            className="w-full h-full object-contain sm:object-contain"
          />

          {/* Overlay dégradé bas pour lisibilité */}
          <div className="absolute inset-0 "></div>

          {/* Boutons navigation */}
          {destination.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 sm:p-3 rounded-full hover:bg-black/60 transition"
                aria-label="Image précédente"
              >
                <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 sm:p-3 rounded-full hover:bg-black/60 transition"
                aria-label="Image suivante"
              >
                <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7" />
              </button>

              {/* Indicateurs ronds */}
              <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 flex justify-center space-x-2">
                {destination.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
                      index === currentImageIndex
                        ? "bg-white scale-125"
                        : "bg-white/50 hover:bg-white/80"
                    }`}
                    aria-label={`Aller à l'image ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Partie haute : Titre + Description */}
      <div className="md:mt-8 text-center">
        <h2 className="text-xl sm:text-xl md:text-xl font-bold text-gray-900 mb-4 sm:mb-2">
          {destination.title}
        </h2>
        <p className="text-base sm:text-md text-gray-600 leading-relaxed max-w-3xl mx-auto">
          {destination.description}
        </p>

        {destination.highlights && (
          <div className="mt-6 text-left max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold mb-3">À ne pas manquer</h3>
            <ul className="space-y-2">
              {destination.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-emerald-600 mr-2">✓</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {destination.tips && (
          <div className="mt-6 bg-blue-50 p-4 rounded-md max-w-2xl mx-auto text-left">
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <span className="text-blue-600 mr-2">💡</span>
              Bon à savoir
            </h3>
            <p className="text-blue-700">{destination.tips}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TourismSelectDestination;
