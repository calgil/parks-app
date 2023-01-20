// import { createContext, useContext, useEffect, useState } from "react";
// import { getAllVisitedAPI } from "../fetch/parks/visited/getAllVisitedAPI";
// import { toggleVisitedAPI } from "../fetch/parks/visited/toggleVisitedAPI";

// const VisitedContext = createContext({});

// export const VisitedProvider = ({ children }) => {
//   const [visited, setVisited] = useState([]);

//   const refetch = () => {
//     getAllVisitedAPI().then(setVisited);
//   };

//   useEffect(() => {
//     refetch();
//   }, []);

//   const toggleVisited = async ({ userId, parkId, parkCode }) => {
//     await toggleVisitedAPI({ userId, parkId, parkCode });
//     refetch();
//   };

//   return (
//     <VisitedContext.Provider value={{ visited, toggleVisited }}>
//       {children}
//     </VisitedContext.Provider>
//   );
// };

// export const useVisited = () => {
//   const context = useContext(VisitedContext);
//   return {
//     visited: context.visited,
//     toggleVisited: context.toggleVisited,
//   };
// };
