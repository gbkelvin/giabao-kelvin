import React from 'react';

const LanguageContext = React.createContext("");

const LanguageProvider = ({children, languagesValue}) => {
  return (
    <LanguageContext.Provider value={languagesValue}>
      {children}
    </LanguageContext.Provider>
  );
};
  
export {LanguageContext, LanguageProvider};