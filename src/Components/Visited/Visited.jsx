import { useLoaderData } from "react-router-dom";
import { Park } from "../Park/Park";
import s from "./Visited.module.css";

export const Visited = () => {
  const visitedParks = useLoaderData();
  return (
    <div className={s.parksContainer}>
      {visitedParks &&
        visitedParks.map((park) => (
          <Park key={park.id} park={park} isVisited={true} />
        ))}
    </div>
  );
};
