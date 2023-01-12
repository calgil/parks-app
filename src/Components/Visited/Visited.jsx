import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { getParksData } from "../../fetch/parks/getParksData";
import { useAuth } from "../../providers/auth.provider";
import { Park } from "../Park/Park";

// this is fucked technically working but fucked
// there has to be a way cleaner way of getting all the parks and their data

export const Visited = () => {
  const allVisitedParks = useLoaderData();
  const { user } = useAuth();
  const [parks, setParks] = useState([]);
  const userVisitedParks = allVisitedParks.filter(
    (park) => park.userId === user.id
  );
  console.log({ userVisitedParks });
  const getVisitedParksData = async (parks) => {
    const data = await getParksData(parks);
    setParks(data);
  };
  useEffect(() => {
    getVisitedParksData(userVisitedParks);
  }, []);
  console.log({ parks });
  return (
    <div>
      Visited
      {parks &&
        parks.map((park) => (
          <Park key={park.id} park={park} isVisited={true} />
        ))}
    </div>
  );
};
