import React, { useState } from 'react';
import TopBar from '../../shared/TopBar';
import Navbar from '../../shared/Navbar';
import SharedNavBanner from '../../shared/SharedNavBanner';
import InvestIntro from './components/InvestIntro';
import WhyInvest from './components/WhyInvest';
import InvestSectors from './components/InvestSectors';
import InvestUtilSource from './components/InvestUtilSource';
import defaultBg from '../../assets/images/banner_bg.jpg';

export default function CountryInvestPage() {
  const [lang, setLang] = useState('FR');
  const [section, setSection] = useState('Niger');

  return (
    <div className="flex flex-col min-h-screen bg-white overflow-hidden">
      <TopBar currentLang={lang} onLanguageChange={setLang} />
      <Navbar current={section} onSelect={setSection} />

      <SharedNavBanner
        title="Investir au Niger"
        description="Opportunités d'investissement, secteurs porteurs et cadre des affaires."
        image={defaultBg}
      />

      <main className="flex-1">
        <InvestIntro />
        <WhyInvest />
        <InvestSectors />
        <InvestUtilSource />
      </main>

      <footer className="mt-auto border-t border-gray-100 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Ambassade du Niger
      </footer>
    </div>
  );
}
