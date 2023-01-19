import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import { getParksData } from "../../fetch/parks/getParksData";
import { useVisited } from "../../providers/visited.provider";
import { Parks } from "../Parks/Parks";

export const Visited = () => {
  const visitedParks = useLoaderData();
  // const [parks, setParks] = useState([]);
  // const { visited } = useVisited();

  // const getUserVisitedParks = async () => {
  //   const userParks = visited.filter((park) => park.userId === user.id);
  //   await getParksData(userParks).then(setParks);
  // };

  // useEffect(() => {
  //   console.log("use effect");
  //   getUserVisitedParks();
  // }, [visited]);

  return <Parks parks={visitedParks} />;
};
