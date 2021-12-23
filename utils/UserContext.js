import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [isSigned, setIsSigned] = useState(false);

  useEffect(async () => {
    try {
      await axios.get(process.env.API_SANCTUM);
      const systemToken = localStorage.getItem("londry");
      if (systemToken) {
        setToken(systemToken);
        setIsSigned(true);
      }
    } catch (e) {
      setIsSigned(false);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        token,
        setToken,
        isSigned,
        setIsSigned,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
