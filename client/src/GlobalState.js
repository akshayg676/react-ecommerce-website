import React, { createContext, useState } from "react";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  return (
    <GlobalState.Provider value="value in globalsatae">
      {children}
    </GlobalState.Provider>
  );
};
