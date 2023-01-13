import { useAuth } from "../../providers/auth.provider";
import { useVisited } from "../../providers/visited.provider";
import { Park } from "../Park/Park";
import s from "./Parks.module.css";

export const Parks = ({ parks }) => {
  const { user } = useAuth();
  const { visited } = useVisited();
  return (
    <section className={s.parksContainer}>
      {parks &&
        parks.map((park) => {
          const isVisited = !!visited.find(
            (visited) =>
              visited.userId === user?.id && visited.parkId === park.id
          );
          return <Park key={park.id} park={park} isVisited={isVisited} />;
        })}
    </section>
  );
};
