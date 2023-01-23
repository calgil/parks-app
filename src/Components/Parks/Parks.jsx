import { useRootLoaderData } from "../Root/Root";
import { Park } from "../Park/Park";
import s from "./Parks.module.css";
import { UNSAFE_convertRoutesToDataRoutes } from "@remix-run/router";

export const Parks = ({ parks }) => {
  const { user, userVisited, userNextAdventure } = useRootLoaderData();
  return (
    <section className={s.parksContainer}>
      {parks &&
        parks.map((park) => {
          const isVisited =
            userVisited &&
            !!userVisited.find(
              (visited) =>
                +visited.userId === user?.id && visited.parkId === park.id
            );
          const isNextAdventure =
            userNextAdventure &&
            !!userNextAdventure.find(
              (next) => +next.userId === user?.id && next.parkId === park.id
            );
          return (
            <Park
              key={park.id}
              park={park}
              visited={isVisited}
              nextAdventure={isNextAdventure}
            />
          );
        })}
    </section>
  );
};
