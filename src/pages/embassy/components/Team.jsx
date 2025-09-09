import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import { Mail, Linkedin } from "lucide-react"; // icons
import ambassadorImg from "../../../assets/images/president.jpg";
import defaultBg from "../../../assets/images/banner_bg.jpg";
import firstSecretaire from "../../../assets/images/firstsec1.png";
import secondSecretaire from "../../../assets/images/firstSec.png";
import attacheDefense from "../../../assets/images/attachedefence.png";
import attacheAcadémique from "../../../assets/images/attacheAccadmique.png";
import secretaireAdministratif from "../../../assets/images/adminsecretaire.png";



const defaultAmbassador = {
  name: "Son Excellence Abdoulaye Keita",
  title: "Ambassadeur Extraordinaire et Plénipotentiaire",
  photo: ambassadorImg,
  bio: "Représentant officiel de la République du Niger, chargé de porter la voix du pays et de renforcer les liens diplomatiques.",
};

const defaultStaff = [
  { name: "M. Issoufou Soffo", title: "Affaires consulaires", photo: firstSecretaire,email:"admin@ambassade.com",linkedin:"https://www.linkedin.com/in/ambassadeur/" },
  { name: "M. Mamane Mouhamadou", title: "Affaires consulaires", photo: secondSecretaire,email:"admin@ambassade.com",linkedin:"https://www.linkedin.com/in/ambassadeur/" },
  { name: "COLONEL MAJOR AMADOU SANDA", title: "la Défense", photo: attacheDefense,email:"admin@ambassade.com",linkedin:"https://www.linkedin.com/in/ambassadeur/" },
  { name: "M. Christian Djondo", title: "Affaires Accadémiques", photo: attacheAcadémique ,email:"admin@ambassade.com",linkedin:"https://www.linkedin.com/in/ambassadeur/"},
  { name: "Mme. BOUKARI KOLO ZEINABOU", title: "L'Administratif", photo:secretaireAdministratif,email:"admin@ambassade.com",linkedin:"https://www.linkedin.com/in/ambassadeur/" },
 
];

export default function Team({ ambassador = defaultAmbassador, staff = defaultStaff }) {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-4 bg-gradient-to-b from-white via-gray-50 to-white mb-16">
      
      {/* 🟢 Ambassadeur Highlight */}
      <div className="relative overflow-hidden rounded-md border border-gray-200 shadow-lg max-w-6xl mx-auto bg-gradient-to-r from-emerald-700/90 via-emerald-600/90 to-emerald-800/90 text-white p-4 md:p-8 text-center"
      data-aos="flip-up"
      data-aos-delay={0}
      >
        <div className="flex flex-col items-center gap-6">
          <div className="w-72 h-72 rounded-full overflow-hidden border-4 border-yellow-400 shadow-lg">
            <img
              src={ambassador.photo}
              alt={ambassador.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <p className="text-sm uppercase tracking-widest text-yellow-400 font-bold">Ambassadeur</p>
            <h2 className="mt-1 text-3xl md:text-4xl font-extrabold">{ambassador.name}</h2>
            {ambassador.bio && (
              <p className="mt-2 text-base md:text-lg leading-relaxed max-w-3xl mx-auto text-gray-200 italic">
                "{ambassador.bio}"
              </p>
            )}
          </div>
        </div>
      </div>

      {/* 🟢 Équipe */}
      <div className="mt-16">
        <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-900">
          Équipe Diplomatique
        </h3>
        <p className="text-center mt-2 text-gray-600">
          Découvrez les principaux membres qui contribuent à la mission de l’ambassade
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {staff.map((m, idx) => (
           <article
           key={idx}
           className="rounded-md bg-white shadow-md hover:shadow-lg transition p-4 flex flex-col items-center"
           data-aos="fade-up"
           data-aos-delay={idx * 100}
         >
           {/* Portrait image style officiel */}
           <div className="w-full aspect-square rounded-sm overflow-hidden bg-gray-100">
              <img
                src={m.photo || defaultBg}
                alt={m.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
           {/* Texte en dessous */}
           <div className="mt-4 text-center">
             <h4 className="text-lg font-semibold text-gray-900">{m.name}</h4>
             <p className="text-sm text-gray-500">{m.title}</p>
         
             {m.email && (
               <div className="mt-3 flex justify-center gap-3">
                 <a href={`mailto:${m.email}`} className="text-emerald-600 hover:text-emerald-800">
                   <Mail className="h-5 w-5" />
                 </a>
                 {m.linkedin && (
                   <a href={m.linkedin} className="text-emerald-600 hover:text-emerald-800">
                     <Linkedin className="h-5 w-5" />
                   </a>
                 )}
               </div>
             )}
           </div>
         </article>
         
          ))}
        </div>
      </div>
    </section>
  );
}
