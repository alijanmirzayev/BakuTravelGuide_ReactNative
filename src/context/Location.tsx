import { createContext, useState } from "react";

interface LocationProviderProps {
    location: Object
    setLocation(item: any): void;
}

export const LocationContext = createContext<LocationProviderProps>({
    location: {},
    setLocation: () => { }
});


export const LocationProvider = ({ children }: any) => {
    //global state
    const [location, setLocation] = useState<any>({})

    const values: LocationProviderProps = {
        location,
        setLocation
    }

    return (
        <LocationContext.Provider value={values}>
            {children}
        </LocationContext.Provider>
    );
};