import { createContext, useEffect, useState } from "react";

interface FavoritesProviderProps {
    favoriteCategory: any[]
    setFavoriteCategory(item: any): void;
}

export const FavoriteCategoryContext = createContext<FavoritesProviderProps>({
    favoriteCategory: [],
    setFavoriteCategory: () => { }
});


export const FavoriteCategoryProvider = ({ children }: any) => {



    //global state
    const [favoriteCategory, setFavoriteCategory] = useState<any[]>([])

    const values: FavoritesProviderProps = {
        favoriteCategory,
        setFavoriteCategory
    }

    return (
        <FavoriteCategoryContext.Provider value={values}>
            {children}
        </FavoriteCategoryContext.Provider>
    );
};