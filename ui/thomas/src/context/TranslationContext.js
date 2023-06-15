import React, {createContext, useContext, useState} from 'react';

const translationContext = createContext('en')


const TranslationContextProvider = ({children}) => {
    const [lang, setLang] = useState('en')
    const [translation, setTranslation] = useState({})

    const setTranslations = (translations) => {
        setTranslation(translations)
    }

    const changeLanguage = (lang) => {
        setLang(lang)
    }

    const t = (key) =>{
        if( !translation || !translation[lang] || translation[lang][key] === null || translation[lang][key] === undefined) {
            return key
        }
        return translation[lang][key]
    }

    return (
        <translationContext.Provider value={{t, changeLanguage, lang, setTranslations}}>
            {children}
        </translationContext.Provider>
    );
};

export const useTranslation = () => {
    return useContext(translationContext)
}

export default TranslationContextProvider;
