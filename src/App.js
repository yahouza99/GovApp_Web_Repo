import React from 'react';
import './App.css';
import i18n from './i18n';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import HomeLayout from './pages/home/components/HomeLayout';
import Embassy from './pages/embassy/Embassy';
import Country from './pages/country/Country';
import Academic from './pages/academic/Academic';
import Consul from './pages/consul/Consul';
import Appointment from './pages/appointment/Appointment';
import Repatriation from './pages/repatriation/Repatriation';
import EmbassySubPage from './pages/embassy/EmbassySubPage';
import CountrySubPage from './pages/country/CountrySubPage';
import AcademicSubPage from './pages/academic/AcademicSubPage';
import ConsulSubPage from './pages/consul/ConsulSubPage';
import Press from './pages/press/Press';
import EservicesPage from './pages/eservices/ServicesPage';
import LoginPage from './pages/auth/LoginPage';
import CountryPresentationPage from './pages/country/CountryPresentationPage';
import CountryTourismPage from './pages/country/CountryTourismPage';
import CountryInvestPage from './pages/country/CountryInvestPage';
import Dash from './pages/userDash/Dash';
import ChatBot, { ChatBotProvider } from './pages/userDash/bot/ChatBot';

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);
  return null;
}

function App() {
  return (
    <ChatBotProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-white">
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomeLayout />} />
            <Route path="/ambassade" element={<Embassy />} />
            <Route path="/ambassade/:sub" element={<EmbassySubPage />} />
            <Route path="/ambassade/rendez-vous" element={<Appointment />} />
            <Route path="/ambassade/rapatriement" element={<Repatriation />} />
            <Route path="/ambassade/actualites" element={<Press />} />
            <Route path="/ambassade/eservices" element={<EservicesPage />} />
            <Route path="/ambassade/ambassade-et-moi" element={<LoginPage />} />
            <Route path="/niger" element={<Country />} />
            <Route path="/niger/republique-du-niger" element={<CountryPresentationPage />} />
            <Route path="/niger/tourisme" element={<CountryTourismPage />} />
            <Route path="/niger/investir-au-niger" element={<CountryInvestPage />} />
            <Route path="/niger/:sub" element={<CountrySubPage />} />
            <Route path="/services-consulaires" element={<Consul />} />
            <Route path="/services-consulaires/:sub" element={<ConsulSubPage />} />
            <Route path="/services-academiques" element={<Academic />} />
            <Route path="/services-academiques/:sub" element={<AcademicSubPage />} />
            <Route path="/dash" element={<Dash />} />
          </Routes>
          {/* Global chatbot */}
          <ChatBot />
        </div>
      </BrowserRouter>
    </ChatBotProvider>
  );
}


export default App;