import s from "./StateParks.module.css";
import { useLoaderData } from "react-router-dom";
import { getParksFromAPI } from "../../fetch/parks/getParksFromAPI";
import { Parks } from "../Parks/Parks";
import statesFullName from "../../../data/statesFullName.json";
import { Title } from "../Title/Title";

export const loader = async ({ params }) => {
  const parks = await getParksFromAPI(params.stateCode);
  const stateName = statesFullName.find(
    (state) => state.abbreviation.toLowerCase() === params.stateCode
  ).name;
  return { parks, stateName };
};

export default function StateParks() {
  const { parks, stateName } = useLoaderData();
  // TODO: Make header component
  return (
    <>
      <Title title={`${stateName} Public Lands`} />
      <Parks parks={parks} />
    </>
  );
}
