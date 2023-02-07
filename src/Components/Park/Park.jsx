import { useFetcher, useNavigate } from "react-router-dom";
import { useRootLoaderData } from "../Root/Root";
import s from "./Park.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as fasFaBookmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as farFaBookmark } from "@fortawesome/free-regular-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-hot-toast";
import { Tooltip } from "react-tooltip";

export const Park = ({ park, visited, nextVisit, addVisitBtn }) => {
  const { user } = useRootLoaderData();
  // Future: destructure designation to filter parks
  const { id, fullName, images, parkCode } = park;
  const navigate = useNavigate();

  const openDetails = () => {
    navigate(`/park/${park.parkCode}`);
  };

  const fetcher = useFetcher();
  let isNext = nextVisit;
  let isVisited = visited;
  if (fetcher.formData) {
    isNext = fetcher.formData.get("next-visit") === "true";
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
        {/* TODO: Create component for this button */}
        {/* Props: parkId userId parkCode nextVisit */}
        {user && (
          <fetcher.Form
            method="post"
            action={`/next-visit/${id}/${user.id}/${parkCode}`}
            className={s.bookmarkContainer}
          >
            <button
              id={id}
              name="next-visit"
              value={isNext ? false : true}
              onClick={(e) => e.stopPropagation()}
              className={s.actionBtn}
            >
              <span className={`${s.iconContainer} fa-layers fa-fw fa-lg`}>
                <FontAwesomeIcon className={s.outline} icon={farFaBookmark} />
                <FontAwesomeIcon
                  icon={fasFaBookmark}
                  className={
                    isNext ? `${s.bookmark} ${s.next}` : `${s.bookmark}`
                  }
                />
              </span>
            </button>
            <Tooltip
              anchorId={id}
              content={isNext ? "Remove from Next Visit" : "Add to Next Visit"}
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
              <span className={`${s.iconContainer} fa-layers fa-fw fa-lg`}>
                <FontAwesomeIcon className={s.outline} icon={farFaBookmark} />
                <FontAwesomeIcon
                  icon={fasFaBookmark}
                  className={
                    isNext ? `${s.bookmark} ${s.next}` : `${s.bookmark}`
                  }
                />
              </span>
            </button>
          </div>
        )}
      </div>
      <h3 className={s.parkName}>{fullName}</h3>
      {user && addVisitBtn && (
        <fetcher.Form
          method="post"
          action={`/visited/${id}/${user.id}/${parkCode}`}
          className={s.visitedContainer}
        >
          <button
            name="visited"
            value={isVisited ? false : true}
            onClick={(e) => e.stopPropagation()}
            className={s.actionBtn}
          >
            <FontAwesomeIcon icon={faCheck} /> I visited
          </button>
        </fetcher.Form>
      )}
    </div>
  );
};
