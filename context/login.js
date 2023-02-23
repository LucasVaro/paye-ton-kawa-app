import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginContext = createContext();

const LoginContextProvider = ({ children }) => {
  const [token, setToken] = useState(undefined);

  const updateToken = async () => {
    const tokenValue = await AsyncStorage.getItem("token");
    if (tokenValue) {
      setToken(tokenValue);
    }
  };

  useEffect(() => {
    updateToken();
  }, []);

  const contextValue = {
    token,
    setToken,
  };

  return (
    <LoginContext.Provider value={contextValue}>
      {children}
    </LoginContext.Provider>
  );
};

export { LoginContext, LoginContextProvider };
