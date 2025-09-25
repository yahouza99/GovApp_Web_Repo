import React, { createContext, useContext, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import FloatingButton from './components/FloatingButton';
import ChatPanel from './components/ChatPanel';

const ChatBotContext = createContext(null);

export function ChatBotProvider({ children }) {
  const [open, setOpen] = useState(false);
  const value = useMemo(() => ({ open, setOpen }), [open]);
  return <ChatBotContext.Provider value={value}>{children}</ChatBotContext.Provider>;
}

export function useChatBot() {
  const ctx = useContext(ChatBotContext);
  if (!ctx) throw new Error('useChatBot must be used within ChatBotProvider');
  return ctx;
}

// Simulated knowledge base
const QA_DATA = [
  { question: 'Comment prendre un rendez-vous ?', answer: 'Allez à la page Rendez-vous depuis le menu, puis suivez les étapes pour choisir la date et l\'heure.' },
  { question: 'Comment obtenir une carte consulaire ?', answer: 'Dans votre espace, ouvrez Mes demandes et créez une nouvelle demande de Carte consulaire.' },
  { question: 'Quels documents pour le rapatriement ?', answer: 'Pièce d\'identité, justificatifs de situation et formulaire de demande rempli.' },
  { question: 'Horaires de l\'ambassade', answer: 'Du lundi au vendredi, de 9h à 17h (hors jours fériés).'},
  { question: 'Contact de l\'ambassade', answer: 'Email: contact@ambassade-ne.org, Téléphone: (+33) 1 23 45 67 89.'},
];

export default function ChatBot() {
  const { open, setOpen } = useChatBot();
  const location = useLocation();

  // Hide on user dashboard pages
  const hideOnThisPage = location.pathname.startsWith('/dash');

  const [query, setQuery] = useState('');
  const [selectedQA, setSelectedQA] = useState(null);

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return QA_DATA.slice(0, 5);
    return QA_DATA.filter((qa) => qa.question.toLowerCase().includes(q)).slice(0, 10);
  }, [query]);

  const onSelectSuggestion = (qa) => {
    setSelectedQA(qa);
  };

  const clearSelection = () => setSelectedQA(null);

  if (hideOnThisPage) return null;

  return (
    <>
      <FloatingButton onClick={() => setOpen(true)} />
      <ChatPanel
        open={open}
        onClose={() => setOpen(false)}
        query={query}
        setQuery={setQuery}
        suggestions={suggestions}
        onSelectSuggestion={onSelectSuggestion}
        selectedQA={selectedQA}
        clearSelection={clearSelection}
      />
    </>
  );
}
