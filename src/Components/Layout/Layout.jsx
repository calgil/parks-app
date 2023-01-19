import { toast } from "react-hot-toast";
import { Outlet, useMatches } from "react-router-dom";
import { getUserFetch } from "../../fetch/user/getUserFetch";
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
      return { user };
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
  };
};

export default function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
