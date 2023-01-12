import s from "./StateParks.module.css";
import { Park } from "../Park/Park";
import { useLoaderData } from "react-router-dom";
import { useAuth } from "../../providers/auth.provider";
import { useVisited } from "../../providers/visited.provider";

export const StateParks = () => {
  const parks = useLoaderData();
  const { user } = useAuth();
  const { visited } = useVisited();

  console.log({
    user,
    visited,
  });

  return (
    <div className={s.parksContainer}>
      {parks &&
        parks.map((park) => {
          const isVisited = !!visited.find(
            (visited) =>
              visited.userId === user?.id && visited.parkId === park.id
          );
          return <Park key={park.id} park={park} isVisited={isVisited} />;
        })}
    </div>
  );
};
