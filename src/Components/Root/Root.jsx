import { toast } from "react-hot-toast";
import { Outlet, useMatches } from "react-router-dom";
import { getParksData } from "../../fetch/parks/getParksData";
import { getAllNextAdventureParksAPI } from "../../fetch/parks/nextAdventure/getAllNextAdventureParksAPI";
import { getAllVisitedAPI } from "../../fetch/parks/visited/getAllVisitedAPI";
import { getUserFetch } from "../../fetch/user/getUserFetch";
import { filterById } from "../../utils/filterById";
import { Navbar } from "../Navbar/Navbar";

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
      toast.success("Welcome back");
      return { user };
    })
    .then(async ({ user }) => {
      const allVisitedParks = await getAllVisitedAPI();
      const userParks = filterById(allVisitedParks, user.id);
      const userVisitedParks = await getParksData(userParks);
      return {
        user,
        userVisitedParks,
      };
    })
    .then(async ({ user, userVisitedParks }) => {
      const allNextParks = await getAllNextAdventureParksAPI();
      const userParks = filterById(allNextParks, user.id);
      const userNextParks = await getParksData(userParks);
      return { user, userVisitedParks, userNextParks };
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
    userNextParks: rootLoaderData.data.userNextParks,
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
