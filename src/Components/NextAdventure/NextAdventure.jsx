import { useLoaderData } from "react-router-dom";
import { getParksData } from "../../fetch/parks/getParksData";
import { getAllNextAdventureParksAPI } from "../../fetch/parks/nextAdventure/getAllNextAdventureParksAPI";
import { filterById } from "../../utils/filterById";
import { Parks } from "../Parks/Parks";

export const loader = async ({ params }) => {
  const allNextParks = await getAllNextAdventureParksAPI();
  const userParks = filterById(allNextParks, +params.userId);
  const userNextParks = await getParksData(userParks);
  return { userNextParks };
};

export default function NextAdventure() {
  const { userNextParks } = useLoaderData();
  return (
    <>
      {userNextParks.length ? (
        <Parks parks={userNextParks} />
      ) : (
        <div>
          <p>No parks yet</p>
        </div>
      )}
    </>
  );
}
