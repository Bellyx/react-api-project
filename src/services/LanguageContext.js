import React, { createContext, useState } from 'react';
import th from '../local/th.json';
import en from '../local/en.json';

export const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('th');
  const translationsData = { th, en };

  const changeLanguage = (lang) => {
    if (translationsData[lang]) {
      setLanguage(lang);
    }
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        translations: translationsData[language],
        changeLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}
