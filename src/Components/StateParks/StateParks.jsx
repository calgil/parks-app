import s from "./StateParks.module.css";
import { useParks } from "../../providers/parks.provider";
import { Park } from "../Park/Park";

export const StateParks = () => {
  const { parks } = useParks();

  return (
    <div className={s.parksContainer}>
      {parks && parks.map((park) => <Park key={park.id} park={park} />)}
    </div>
  );
};
