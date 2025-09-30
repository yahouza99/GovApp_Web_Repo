import React ,{useEffect} from 'react';
import Aos from 'aos';
import "aos/dist/aos.css";
import { useTranslation } from 'react-i18next';

export default function EmbassyInfo() {
  const { t } = useTranslation();
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <section className="py-10 sm:py-12 lg:py-16" data-aos="fade-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{t("embassyInfo.title")}</h2>
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Map */}
          <div className="rounded-lg overflow-hidden border border-gray-200 bg-white shadow-sm">
            {/* Remplacez src par votre URL Google Maps (embed) */}
            <iframe
              title="Ambassade de la République du Niger"
             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3308.5193365087094!2d-6.850694923579815!3d33.99126502180244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda76c8a66dd9673%3A0x9f3ff73266a7e62c!2sAmbassade%20de%20la%20R%C3%A9publique%20du%20Niger!5e0!3m2!1sfr!2sma!4v1723547420000!5m2!1sfr!2sma"
              width="100%"
              height="360"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Contact details */}
          <div className="rounded-lg border border-gray-200 bg-white shadow-sm p-5">
            <h3 className="text-lg font-semibold text-gray-900">{t("embassyInfo.contact")}</h3>
            <ul className="mt-3 space-y-2 text-gray-700">
              <li><span className="font-medium">{t("embassyInfo.address")}:</span> 123, Avenue Ahmed Balafrej, Rabat, Maroc</li>
              <li><span className="font-medium">{t("embassyInfo.phone")}:</span> <a className="text-emerald-700 hover:underline" href="tel:+212653756684">212 6 53 75 66 84</a></li>
              <li><span className="font-medium">{t("embassyInfo.email")}:</span> <a className="text-emerald-700 hover:underline" href="mailto:contact@ambassadeniger-ma.org">contact@ambassadeniger-ma.org</a></li>
              <li><span className="font-medium">{t("embassyInfo.hours")}:</span> Lun - Ven, 09:00 - 16:00</li>
            </ul>

            <div className="mt-5">
              <h4 className="text-md font-semibold text-gray-900">{t("embassyInfo.networks")}</h4>
              <div className="mt-2 flex gap-3 text-sm text-gray-700">
                <a className="hover:text-emerald-700" href="#">Facebook</a>
                <a className="hover:text-emerald-700" href="#">Twitter</a>
                <a className="hover:text-emerald-700" href="#">LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
