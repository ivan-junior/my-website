"use client";

import { createContext, useContext, useEffect, useState } from "react";
import ptTranslations from "../locales/pt.json";
import enTranslations from "../locales/en.json";

type Language = "pt" | "en";

type Translations = {
  [key: string]: any;
};

type LanguageContextType = {
  language: Language;
  translations: Translations;
  toggleLanguage: () => void;
  t: (key: string) => string;
};

const translations = {
  pt: ptTranslations,
  en: enTranslations,
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("pt");

  useEffect(() => {
    // Check if user has a saved language preference
    const savedLanguage = localStorage.getItem("language") as Language | null;

    if (savedLanguage && (savedLanguage === "pt" || savedLanguage === "en")) {
      setLanguage(savedLanguage);
    }
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === "pt" ? "en" : "pt";
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  // Helper function to get nested translations
  const t = (key: string): string => {
    const keys = key.split(".");
    let result: any = translations[language];

    for (const k of keys) {
      if (result && result[k] !== undefined) {
        result = result[k];
      } else {
        return key; // Return key if translation not found
      }
    }

    return typeof result === "string" ? result : key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        translations: translations[language],
        toggleLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
