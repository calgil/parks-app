import { useRootLoaderData } from "../Layout/Layout";
import { Parks } from "../Parks/Parks";

export default function NextAdventure() {
  const { userNextParks } = useRootLoaderData();
  return (
    <>
      {userNextParks.length ? (
        <Parks parks={userNextParks} />
      ) : (
        <div>
          <p>No parks yet</p>
        </div>
      )}
    </>
  );
}
