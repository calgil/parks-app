import React, { createContext, useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { getParksFromAPI } from "../fetch/parks/getParksFromAPI";

const ParksContext = createContext({});

export const ParksProvider = ({ children }) => {
  const [parks, setParks] = useState([]);

  const getStateParks = async (stateCode) => {
    console.log("park code", stateCode);
    try {
      const parks = await getParksFromAPI(stateCode);
      console.log("provider", parks);
      setParks(parks);
    } catch (error) {
      // console.error(error);
      // toast.error("Cannot get parks");
      throw error;
    }
    // if (!parks) {
    //   throw new Error("Provider problem fetching parks");
    // }
  };

  return (
    <ParksContext.Provider value={{ parks, getStateParks }}>
      {children}
    </ParksContext.Provider>
  );
};

export const useParks = () => {
  const context = useContext(ParksContext);
  return {
    parks: context.parks,
    getStateParks: context.getStateParks,
  };
};
