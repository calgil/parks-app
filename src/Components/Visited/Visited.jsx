import { useLoaderData, useMatches } from "react-router-dom";
import { getParksData } from "../../fetch/parks/getParksData";
import { Parks } from "../Parks/Parks";
import { getAllVisitedAPI } from "../../fetch/parks/visited/getAllVisitedAPI";
import { filterById } from "../../utils/filterById";
import s from "./Visited.module.css";

export const loader = async ({ params }) => {
  const allVisitedParks = await getAllVisitedAPI();
  const userParks = filterById(allVisitedParks, +params.userId);
  const visited = await getParksData(userParks);
  console.log({ visited });
  return { visited };
};

export const useVisitedData = () => {
  const matches = useMatches();
  console.log({ matches });
  const visitedLoaderData = matches.find((match) => match.id === "0-0-6");
  console.log({ visitedLoaderData });
  return {
    visited: visitedLoaderData,
  };
};

export default function Visited() {
  const { visitedParks } = useLoaderData();
  console.log({ visitedParks });
  return (
    <>
      {visitedParks ? (
        <Parks parks={visitedParks} />
      ) : (
        <div className={s.noParks}>
          <p>You haven't visited any parks yet.</p>
          <p>Looks like it's time to head outside and see some parks!</p>
        </div>
      )}
    </>
  );
}
