import { useFetcher, useNavigate } from "react-router-dom";
import { useRootLoaderData } from "../Root/Root";
import s from "./Park.module.css";

export const Park = ({ park, visited, nextAdventure }) => {
  const { user } = useRootLoaderData();
  const { id, description, designation, fullName, images, parkCode } = park;
  const navigate = useNavigate();
  const openDetails = () => {
    navigate(`/park/${parkCode}`);
  };

  const fetcher = useFetcher();
  // let isVisited = visited
  return (
    <div onClick={openDetails} className={s.parkBody}>
      <div className={s.nameContainer}>
        <h3>{fullName}</h3>
      </div>
      <div className={s.imgContainer}>
        <img
          className={s.parkImg}
          src={images[0].url}
          alt={images[0].altText}
        />
      </div>
      <fetcher.Form
        method="post"
        action={`/next-adventure/${id}/${user.id}/${parkCode}`}
        className={s.btnContainer}
      >
        <button
          name="next-adventure"
          value={nextAdventure ? false : true}
          // value={nextAdventure ? `${nextAdventure.id}` : true}
          onClick={(e) => e.stopPropagation()}
          className={
            nextAdventure
              ? `${s.actionBtn} ${s.nextBtn} ${s.next}`
              : `${s.actionBtn} ${s.nextBtn}`
          }
        >
          {nextAdventure
            ? "Remove from Next Adventure"
            : "Add to Next Adventure"}
        </button>
      </fetcher.Form>
      <fetcher.Form
        method="post"
        action={`/visited/${parkCode}`}
        className={s.btnContainer}
      >
        <button
          name="visited"
          value={visited ? false : true}
          onClick={(e) => e.stopPropagation()}
          className={
            visited
              ? `${s.actionBtn} ${s.visitedBtn} ${s.visited}`
              : `${s.actionBtn} ${s.visitedBtn}`
          }
        >
          {visited ? "Remove from Visited" : "Add to Visited"}
        </button>
      </fetcher.Form>
    </div>
  );
};
