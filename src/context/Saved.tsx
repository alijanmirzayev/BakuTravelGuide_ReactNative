import { createContext, useState } from "react";

interface SavedProviderProps {
    savedItem: any[]
    setSavedItem(item: any): void;
}

export const SavedContext = createContext<SavedProviderProps>({
    savedItem: [],
    setSavedItem: () => { }
});


export const SavedProvider = ({ children }: any) => {
    //global state
    const [savedItem, setSavedItem] = useState<any[]>([])

    const values: SavedProviderProps = {
        savedItem,
        setSavedItem
    }

    return (
        <SavedContext.Provider value={values}>
            {children}
        </SavedContext.Provider>
    );
};