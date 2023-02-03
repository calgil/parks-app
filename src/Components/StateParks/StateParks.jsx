import s from "./StateParks.module.css";
import { useLoaderData } from "react-router-dom";
import { getParksFromAPI } from "../../fetch/parks/getParksFromAPI";
import { Parks } from "../Parks/Parks";
import statesFullName from "../../../data/statesFullName.json";

export const loader = async ({ params }) => {
  const parks = await getParksFromAPI(params.stateCode);
  const stateName = statesFullName.find(
    (state) => state.abbreviation.toLowerCase() === params.stateCode
  ).name;
  return { parks, stateName };
};

export default function StateParks() {
  const { parks, stateName } = useLoaderData();
  return (
    <>
      <div className={s.nameContainer}>
        <h2 className={s.stateName}>{stateName} Public Lands</h2>
        <div className={s.nameBorder}></div>
      </div>

      <Parks parks={parks} />
    </>
  );
}
