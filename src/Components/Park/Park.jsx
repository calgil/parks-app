import { useFetcher, useNavigate } from "react-router-dom";
import { useRootLoaderData } from "../Root/Root";
import s from "./Park.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-hot-toast";
import { Tooltip } from "react-tooltip";

export const Park = ({ park, visited, nextAdventure }) => {
  const { user } = useRootLoaderData();
  const { id, description, designation, fullName, images, parkCode } = park;
  const navigate = useNavigate();

  const openDetails = () => {
    navigate(`/park/${park.parkCode}`);
  };

  const fetcher = useFetcher();
  let isNext = nextAdventure;
  let isVisited = visited;
  if (fetcher.formData) {
    isNext = fetcher.formData.get("next-adventure") === "true";
    isVisited = fetcher.formData.get("visited") === "true";
  }
  return (
    <div tabIndex="0" onClick={openDetails} className={s.parkBody}>
      <div className={s.imgContainer}>
        <img
          className={s.parkImg}
          src={images[0].url}
          alt={images[0].altText}
        />
        {user && (
          <fetcher.Form
            method="post"
            action={`/next-adventure/${id}/${user.id}/${parkCode}`}
            className={s.bookmarkContainer}
          >
            <button
              id={id}
              name="next-adventure"
              value={isNext ? false : true}
              onClick={(e) => e.stopPropagation()}
              className={s.actionBtn}
            >
              <FontAwesomeIcon
                size="2x"
                icon={faBookmark}
                className={isNext ? `${s.bookmark} ${s.next}` : `${s.bookmark}`}
              />
            </button>
            <Tooltip
              anchorId={id}
              content={isNext ? "Remove from Up Next" : "Add to Up Next"}
              place="top"
            />
          </fetcher.Form>
        )}
        {!user && (
          <div className={s.bookmarkContainer}>
            <button
              className={s.actionBtn}
              onClick={(e) => {
                e.stopPropagation();
                toast.error("Must login to start saving parks");
              }}
            >
              <FontAwesomeIcon
                size="2x"
                icon={faBookmark}
                className={isNext ? `${s.bookmark} ${s.next}` : `${s.bookmark}`}
              />
            </button>
          </div>
        )}
      </div>
      <h3 className={s.parkName}>{fullName}</h3>

      {/* {user && (
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
              {isNext ? (
                <span>
                  <i className="fa fa-minus "></i> Remove from Next Adventure
                </span>
              ) : (
                <span>
                  <i className="fa fa-check"></i> Add To Next Adventure
                </span>
              )}
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
              {isVisited ? (
                <span>
                  <i className="fa fa-times"></i> Remove From Visited
                </span>
              ) : (
                <span>
                  <i className="fa fa-plus"></i> Add To Visited
                </span>
              )}
            </button>
          </fetcher.Form>
        </>
      )} */}
      {/* {!user && (
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
      )} */}
    </div>
  );
};
