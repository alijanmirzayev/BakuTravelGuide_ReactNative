
import React, { createContext, useState } from 'react';

// Define the initial state
interface SettingsState {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

// Create the context
export const SettingsContext = createContext<SettingsState>({
  darkMode: false,
  toggleDarkMode: () => {},
});

// Create the provider component
export const SettingsProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  // Function to toggle the dark mode
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <SettingsContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </SettingsContext.Provider>
  );
};