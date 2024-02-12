import { createContext, useContext, useState } from "react";

const SideBarContext = createContext();

export const useSideBarContext = () => {
  return useContext(SideBarContext);
};

export const SideBarContextProvider = ({ children }) => {
  const [nav, setNav] = useState(false);
  return (
    <SideBarContext.Provider
      value={{
        nav,
        setNav,
      }}
    >
      {children}
    </SideBarContext.Provider>
  );
};
