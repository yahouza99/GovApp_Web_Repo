import React, { useState } from 'react';
import TopBar from '../../shared/TopBar';
import Navbar from '../../shared/Navbar';
import SharedNavBanner from '../../shared/SharedNavBanner';
import AppointmentForm from './components/AppointmentForm';

export default function AppointmentPage() {
  const [lang, setLang] = useState('FR');
  const [section, setSection] = useState('Accueil');

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar currentLang={lang} onLanguageChange={setLang} />
      <Navbar current={section} onSelect={setSection} />

      <SharedNavBanner
        title="Prendre un rendez-vous"
        description="Planifiez votre rendez-vous avec nos services en quelques clics."
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="rounded-md border border-gray-200 bg-white p-6 shadow-sm">
          <AppointmentForm onSubmit={(payload) => {
            // TODO: hook to backend API here
            console.log('Appointment form submitted:', payload);
          }} />
        </div>
      </div>

      <footer className="mt-auto border-t border-gray-100 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Ambassade du Niger
      </footer>
    </div>
  );
}
