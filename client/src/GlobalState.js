import React, { createContext, useState, useEffect } from "react";
import ProductsAPI from "./api/ProductsAPI";
import UserAPI from "./api/UserAPI";
import CatagoriesAPI from "./api/CatagoriesAPI";
import axios from "axios";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);

  useEffect(() => {
    const refreshToken = async () => {
      const res = await axios.get("/user/refresh_token");

      setToken(res.data.accesstoken);

      setTimeout(() => {
        refreshToken();
      }, 15000);
    };
    refreshToken();
  }, []);

  const state = {
    token: [token, setToken],
    productsAPI: ProductsAPI(),
    userAPI: UserAPI(token),
    catagoriesAPI: CatagoriesAPI(),
  };

  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
