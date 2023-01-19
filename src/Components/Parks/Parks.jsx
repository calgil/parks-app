import { useLoaderData } from "react-router-dom";
import { Park } from "../Park/Park";
import s from "./Parks.module.css";

export const Parks = ({ parks }) => {
  const { user } = useLoaderData();
  return (
    <section className={s.parksContainer}>
      {parks &&
        parks.map((park) => {
          return <Park key={park.id} park={park} />;
        })}
    </section>
  );
};
