import { useFetcher } from "react-router-dom";
import s from "./NextVisitBtn.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as fasFaBookmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as farFaBookmark } from "@fortawesome/free-regular-svg-icons";
import { Tooltip } from "react-tooltip";

export const NextVisitBtn = ({ parkId, userId, parkCode, nextVisit }) => {
  const fetcher = useFetcher();
  let isNext = nextVisit;
  if (fetcher.formData) {
    isNext = fetcher.formData.get("next-visit") === "true";
  }
  return (
    <fetcher.Form
      method="post"
      action={`/next-visit/${parkId}/${userId}/${parkCode}`}
      className={s.btnContainer}
    >
      <button
        id={parkId}
        name="next-visit"
        value={isNext ? false : true}
        onClick={(e) => e.stopPropagation()}
        className={s.actionBtn}
      >
        <span className={`${s.iconContainer} fa-layers fa-fw fa-lg`}>
          <FontAwesomeIcon className={s.outline} icon={farFaBookmark} />
          <FontAwesomeIcon
            icon={fasFaBookmark}
            className={isNext ? `${s.bookmark} ${s.next}` : `${s.bookmark}`}
          />
        </span>
      </button>
      <Tooltip
        anchorId={parkId}
        content={isNext ? "Remove from Next Visit" : "Add to Next Visit"}
        place="top"
      />
    </fetcher.Form>
  );
};
