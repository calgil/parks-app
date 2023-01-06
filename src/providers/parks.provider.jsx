import React, { createContext, useContext, useState } from "react";
import { getParksByState } from "../fetch/parks/getParksByState";

const ParkContext = createContext({});

export const ParkProvider = ({ children }) => {
  const [parks, setParks] = useState([]);

  const getStateParks = async (stateCode) => {
    console.log("park code", stateCode);
    const parks = await getParksByState(stateCode);
  };

  return (
    <ParkContext.Provider value={{ parks, getStateParks }}>
      {children}
    </ParkContext.Provider>
  );
};

export const usePark = () => {
  const context = useContext(ParkContext);
  return {
    parks: context.parks,
    getStateParks: context.getStateParks,
  };
};
