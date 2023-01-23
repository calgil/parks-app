import { useFetcher, useNavigate } from "react-router-dom";
import { useRootLoaderData } from "../Root/Root";
import s from "./Park.module.css";

export const Park = ({ park, visited, nextAdventure }) => {
  const { user } = useRootLoaderData();
  const { id, description, designation, fullName, images, parkCode } = park;
  const navigate = useNavigate();
  const openDetails = () => {
    navigate(`/park/${park.parkCode}`);
  };

  const navigateToLogin = (e) => {
    e.stopPropagation();
    navigate("/login");
  };

  const fetcher = useFetcher();
  let isNext = nextAdventure;
  let isVisited = visited;
  if (fetcher.formData) {
    isNext = fetcher.formData.get("next-adventure") === "true";
    isVisited = fetcher.formData.get("visited") === "true";
  }
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
      {user && (
        <>
          <fetcher.Form
            method="post"
            action={`/next-adventure/${id}/${user.id}/${parkCode}`}
            className={s.btnContainer}
          >
            <button
              name="next-adventure"
              value={isNext ? false : true}
              // value={nextAdventure ? `${nextAdventure.id}` : true}
              onClick={(e) => e.stopPropagation()}
              className={
                isNext
                  ? `${s.actionBtn} ${s.nextBtn} ${s.next}`
                  : `${s.actionBtn} ${s.nextBtn}`
              }
            >
              {isNext ? "Remove from Next Adventure" : "Add to Next Adventure"}
            </button>
          </fetcher.Form>
          <fetcher.Form
            method="post"
            action={`/visited/${id}/${user.id}/${parkCode}`}
            className={s.btnContainer}
          >
            <button
              name="visited"
              value={isVisited ? false : true}
              onClick={(e) => e.stopPropagation()}
              className={
                isVisited
                  ? `${s.actionBtn} ${s.visitedBtn} ${s.visited}`
                  : `${s.actionBtn} ${s.visitedBtn}`
              }
            >
              {isVisited ? "Remove from Visited" : "Add to Visited"}
            </button>
          </fetcher.Form>
        </>
      )}
      {!user && (
        <div className={s.btnContainer}>
          <button
            className={`${s.actionBtn} ${s.nextBtn}`}
            onClick={navigateToLogin}
          >
            Login to Add to Next Adventure
          </button>
          <button
            className={`${s.actionBtn} ${s.visitedBtn}`}
            onClick={navigateToLogin}
          >
            Login to Add to Visited
          </button>
        </div>
      )}
    </div>
  );
};
