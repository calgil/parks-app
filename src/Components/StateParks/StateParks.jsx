import { useLoaderData } from "react-router-dom";
import { Parks } from "../Parks/Parks";

export const StateParks = () => {
  const parks = useLoaderData();
  return <Parks parks={parks} />;
};
