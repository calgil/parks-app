import { Parks } from "../Parks/Parks";
import s from "./Visited.module.css";
import { useRootLoaderData } from "../Root/Root";
import { Title } from "../Title/Title";

export default function Visited() {
  const { userVisitedParks } = useRootLoaderData();
  return (
    <>
      {userVisitedParks ? (
        <>
          <Title title={"Visited Parks"} />
          <Parks
            parks={userVisitedParks}
            showAddNext={false}
            showAddVisitBtn={true}
          />
        </>
      ) : (
        <div className={s.noParks}>
          <p>You haven't visited any parks yet.</p>
          <p>Looks like it's time to head outside and see some parks!</p>
        </div>
      )}
    </>
  );
}
