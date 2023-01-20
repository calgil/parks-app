import { useLoaderData } from "react-router-dom";
import { getParksFromAPI } from "../../fetch/parks/getParksFromAPI";
import { Parks } from "../Parks/Parks";

export const loader = async ({ params }) => {
  const parks = await getParksFromAPI(params.stateCode);
  return { parks };
};

export default function StateParks() {
  const { parks } = useLoaderData();
  return <Parks parks={parks} />;
}
