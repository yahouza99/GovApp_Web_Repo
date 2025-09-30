import React, { useEffect } from 'react';
import Aos from 'aos';
import "aos/dist/aos.css";
import ambassador from '../../../assets/images/president.jpg';
import { useTranslation } from 'react-i18next';
export default function AmbassadorMessage({
  name = "S.E. l'Ambassadeur Abdoulaye Keita",
  title = "Mot de l'ambassadeur",
  portraitUrl = ambassador,
  messageHead = "Chers compatriotes, chers amis du Niger,",
  messageBody = "C’est avec un profond honneur et un réel plaisir que je vous souhaite la bienvenue sur le site officiel de l’Ambassade du Niger. Ce portail a été conçu comme un espace d’information, de dialogue et de proximité, afin de renforcer les liens entre notre mission diplomatique, la communauté nigérienne et tous ceux qui s’intéressent à notre pays.",
  messageFooter = "Le Niger, terre d’histoire et de culture, se distingue par la richesse de ses traditions, la chaleur de son hospitalité et la détermination de son peuple à bâtir un avenir prospère et solidaire. Notre Ambassade œuvre quotidiennement pour promouvoir l’image du Niger, défendre ses intérêts, accompagner nos compatriotes à l’étranger et développer des partenariats constructifs avec notre pays hôte.",
}) {
  const { t } = useTranslation();
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <section className="py-10 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{t("ambassadorMessage.title")}</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8 items-start">
          <div className="md:col-span-2" data-aos="fade-right">
            <div className="overflow-hidden rounded-lg shadow-sm border border-gray-200 bg-white">
              <img
                src={portraitUrl}
                alt={`Portrait - ${name}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <p className="mt-3 text-sm text-gray-600 font-bold">{name}</p>
          </div>
          <div className="md:col-span-3" data-aos="fade-left">
            <div className="prose max-w-none text-gray-700">
              <p>{messageHead}</p>
              <p className="mt-4">{messageBody}</p>
              <p className="mt-4">{messageFooter}</p>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
}
