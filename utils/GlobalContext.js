import { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [menu, setMenu] = useState("HOME");
  return (
    <GlobalContext.Provider value={{ menu, setMenu }}>
      {children}
    </GlobalContext.Provider>
  );
};
