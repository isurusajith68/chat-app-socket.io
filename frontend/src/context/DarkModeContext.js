import { createContext, useContext, useState } from "react";

const DarkModeContext = createContext();

export const useDarkModeContext = () => {
  return useContext(DarkModeContext);
};

export const DarkModeContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);
  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
