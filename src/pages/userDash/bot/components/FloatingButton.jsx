import React from 'react';
import { Bot } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function FloatingButton({ onClick }) {
  const { t } = useTranslation();
  return (
    <button
      type="button"
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 px-4 py-3 rounded-full shadow-lg bg-emerald-600 hover:bg-emerald-700 text-white"
      aria-label="Question"
    >
      <Bot className="h-5 w-5" />
      <span className="font-medium">{t("floatingButton.question")}</span>
    </button>
  );
}
