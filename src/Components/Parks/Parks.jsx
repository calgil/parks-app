import { useLoaderData } from "react-router-dom";
import { Park } from "../Park/Park";
import { useVisitedData } from "../Visited/Visited";
import s from "./Parks.module.css";

export const Parks = ({ parks }) => {
  const { user } = useLoaderData();
  const { visited } = useVisitedData();
  console.log({ visited });
  return (
    <section className={s.parksContainer}>
      {parks &&
        parks.map((park) => {
          const isVisited =
            visited &&
            visited.find(
              (visited) =>
                visited.userId === user?.id && visited.parkId === park.id
            );
          return <Park key={park.id} park={park} visited={isVisited} />;
        })}
    </section>
  );
};
