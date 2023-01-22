import { Parks } from "../Parks/Parks";
import s from "./Visited.module.css";
import { useRootLoaderData } from "../Root/Root";

export default function Visited() {
  const { userVisitedParks } = useRootLoaderData();
  console.log({ userVisitedParks });
  return (
    <>
      {userVisitedParks ? (
        <Parks parks={userVisitedParks} />
      ) : (
        <div className={s.noParks}>
          <p>You haven't visited any parks yet.</p>
          <p>Looks like it's time to head outside and see some parks!</p>
        </div>
      )}
    </>
  );
}
