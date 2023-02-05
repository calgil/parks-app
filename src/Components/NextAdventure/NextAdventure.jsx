import { useRootLoaderData } from "../Root/Root";
import { Parks } from "../Parks/Parks";
import { Title } from "../Title/Title";

export default function NextAdventure() {
  const { userNextParks } = useRootLoaderData();
  return (
    <>
      {userNextParks.length ? (
        <>
          {" "}
          <Title title={"Up Next"} /> <Parks parks={userNextParks} />
        </>
      ) : (
        <div>
          <p>No parks yet</p>
        </div>
      )}
    </>
  );
}
