import s from "./StateParks.module.css";
import { Park } from "../Park/Park";
import { useLoaderData } from "react-router-dom";

export const StateParks = () => {
  const parks = useLoaderData();

  return (
    <div className={s.parksContainer}>
      {parks && parks.map((park) => <Park key={park.id} park={park} />)}
    </div>
  );
};
