import { useLoaderData, useMatches } from "react-router-dom";
import { getParksData } from "../../fetch/parks/getParksData";
import { Parks } from "../Parks/Parks";
import { getAllVisitedAPI } from "../../fetch/parks/visited/getAllVisitedAPI";
import { filterById } from "../../utils/filterById";
import s from "./Visited.module.css";
import { useRootLoaderData } from "../Layout/Layout";

export const loader = async ({ params }) => {
  // const { user } = useRootLoaderData();
  // console.log({ user });
  const allVisitedParks = await getAllVisitedAPI();
  const userParks = filterById(allVisitedParks, +params.userId);
  const userVisitedParks = await getParksData(userParks);
  return { userVisitedParks };
};

export const useVisitedData = () => {
  const matches = useMatches();
  const visitedLoaderData = matches.find((match) => match.id === "0-0-6");
  return {
    visited: visitedLoaderData.data.userVisitedParks,
  };
};

export default function Visited() {
  const { userVisitedParks } = useLoaderData();
  const { visited } = useVisitedData();
  console.log({ visited });
  return (
    <>
      {userVisitedParks ? (
        <Parks parks={userVisitedParks} />
      ) : (
        <div className={s.noParks}>
          <p>You haven't visited any parks yet.</p>
          <p>Looks like it's time to head outside and see some parks!</p>
        </div>
      )}
    </>
  );
}
