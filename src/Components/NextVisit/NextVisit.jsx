import { useRootLoaderData } from "../Root/Root";
import { Parks } from "../Parks/Parks";
import { Title } from "../Title/Title";

export default function Projects() {
  const { userNextParks } = useRootLoaderData();
  return (
    <>
      {userNextParks.length ? (
        <>
          <Title title={"Next Visit"} />{" "}
          <Parks
            parks={userNextParks}
            showAddVisitBtn={true}
            showAddNext={true}
          />
        </>
      ) : (
        <div>
          <p>No parks yet</p>
        </div>
      )}
    </>
  );
}
