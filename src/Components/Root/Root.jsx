import { Outlet, useMatches } from "react-router-dom";
import { getParksData } from "../../fetch/parks/getParksData";
import { getAllNextAdventureParksAPI } from "../../fetch/parks/nextAdventure/getAllNextAdventureParksAPI";
import { getAllVisitedAPI } from "../../fetch/parks/visited/getAllVisitedAPI";
import { getUserFetch } from "../../fetch/user/getUserFetch";
import { filterById } from "../../utils/filterById";
import { Navbar } from "../Navbar/Navbar";

// TODO: This loader function looks huge maybe lines 34-36 & 44-46 could be moved to a helper function

export async function loader() {
  return Promise.resolve()
    .then(() => localStorage.getItem("user"))
    .then((potentialUser) => {
      if (!potentialUser) {
        throw new Error("no user in local storage");
      }
      return JSON.parse(potentialUser);
    })
    .then(({ username, password }) => {
      if (!username || !password) {
        throw new Error("no username or password");
      }
      return { username, password };
    })
    .then(async ({ username, password }) => {
      const user = await getUserFetch({ username, password });
      if (password !== user.password) {
        throw new Error("passwords do not match");
      }
      return { user };
    })
    .then(async ({ user }) => {
      const allVisitedParks = await getAllVisitedAPI();
      const userVisited = filterById(allVisitedParks, +user.id);
      const userVisitedParks = await getParksData(userVisited);
      return {
        user,
        userVisited,
        userVisitedParks,
      };
    })
    .then(async ({ user, userVisitedParks, userVisited }) => {
      const allNextParks = await getAllNextAdventureParksAPI();
      const userNextAdventure = filterById(allNextParks, user.id);
      const userNextParks = await getParksData(userNextAdventure);
      return {
        user,
        userVisitedParks,
        userVisited,
        userNextParks,
        userNextAdventure,
      };
    })
    .catch((error) => {
      localStorage.removeItem("user");
      console.error(error.message);
      return {
        user: null,
      };
    });
}

export const useRootLoaderData = () => {
  const matches = useMatches();
  const rootLoaderData = matches.find((match) => match.id === "0");
  return {
    user: rootLoaderData.data.user,
    userVisitedParks: rootLoaderData.data.userVisitedParks,
    userVisited: rootLoaderData.data.userVisited,
    userNextParks: rootLoaderData.data.userNextParks,
    userNextAdventure: rootLoaderData.data.userNextAdventure,
  };
};

export default function Root() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
