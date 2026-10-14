import React, { createContext, useContext, useState, useEffect } from "react";
import { translations } from "../data/translations";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    try {
      const saved = localStorage.getItem("portfolio_lang");
      if (saved === "pt" || saved === "en") return saved;
      // Detect browser language
      const navLang = navigator.language || navigator.userLanguage || "pt";
      return navLang.toLowerCase().startsWith("pt") ? "pt" : "en";
    } catch {
      return "pt";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("portfolio_lang", language);
    } catch {}
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "pt" ? "en" : "pt"));
  };

  const t = (path) => {
    if (!path) return "";
    const keys = path.split(".");
    let current = translations[language];
    for (const key of keys) {
      if (!current || current[key] === undefined) {
        // Fallback to pt if key missing
        let fallback = translations["pt"];
        for (const k of keys) {
          if (!fallback || fallback[k] === undefined) return path;
          fallback = fallback[k];
        }
        return fallback;
      }
      current = current[key];
    }
    return current;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
