import { useFetcher } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faMinus } from "@fortawesome/free-solid-svg-icons";
import s from "./VisitBtn.module.css";

export const VisitBtn = ({ parkId, userId, parkCode, visited }) => {
  const fetcher = useFetcher();
  let isVisited = visited;
  if (fetcher.formData) {
    isVisited = fetcher.formData.get("visited") === "true";
  }
  return (
    <fetcher.Form
      method="post"
      action={`/visited/${parkId}/${userId}/${parkCode}`}
      className={s.visitedContainer}
    >
      <button
        name="visited"
        value={isVisited ? false : true}
        onClick={(e) => e.stopPropagation()}
        className={s.visitBtn}
      >
        {isVisited ? (
          <>
            <FontAwesomeIcon className={s.visitIcon} icon={faMinus} />
            <span>Remove from Visited</span>
          </>
        ) : (
          <>
            <FontAwesomeIcon className={s.visitIcon} icon={faCheck} />
            <span>I visited</span>
          </>
        )}
      </button>
    </fetcher.Form>
  );
};
