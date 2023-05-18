import { createContext, useState } from "react";

interface LanguageProviderProps {
    currentLanguage: string
    setcurrentLanguage(item: any): void;
}

export const LanguageContext = createContext<LanguageProviderProps>({
    currentLanguage: '',
    setcurrentLanguage: () => { }
});



export const LanguageProvider = ({ children }: any) => {

    const [currentLanguage, setcurrentLanguage] = useState('');

    const values: LanguageProviderProps = {
        currentLanguage, setcurrentLanguage
    }
    return (
        <LanguageContext.Provider value={values} >
            {children}
        </LanguageContext.Provider >
    );
};