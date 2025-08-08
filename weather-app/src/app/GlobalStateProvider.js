import React, { createContext, useContext, useState } from "react";

const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [globalValue, setGlobalValue] = useState("default");

  return (
    <GlobalStateContext.Provider value={{ globalValue, setGlobalValue }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);
