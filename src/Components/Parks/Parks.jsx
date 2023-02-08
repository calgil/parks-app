import { useRootLoaderData } from "../Root/Root";
import { Park } from "../Park/Park";
import s from "./Parks.module.css";

export const Parks = ({ parks, showAddVisitBtn, showAddNext }) => {
  const { user, userVisited, userNextVisits } = useRootLoaderData();
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
          const isNext =
            userNextVisits &&
            !!userNextVisits.find(
              (next) => +next.userId === user?.id && next.parkId === park.id
            );
          return (
            <Park
              key={park.id}
              park={park}
              visited={isVisited}
              nextVisit={isNext}
              showAddVisitBtn={showAddVisitBtn}
              showAddNext={showAddNext}
            />
          );
        })}
    </section>
  );
};
