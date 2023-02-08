import { useFetcher } from "react-router-dom";
import s from "./NextVisitBtn.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as fasFaBookmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as farFaBookmark } from "@fortawesome/free-regular-svg-icons";
import { Tooltip } from "react-tooltip";
import { getParkNameByParkCode } from "../../fetch/parks/getParkName";
import { createNewNextVisitAPI } from "../../fetch/parks/nextVisit/createNewNextVisitAPI";
import { toast } from "react-hot-toast";
import { findAndDeleteNextVisit } from "../../fetch/parks/nextVisit/findAndDeleteNextVisit";

export async function action({ request, params }) {
  const userId = params.userId;
  const parkId = params.parkId;
  const parkCode = params.parkCode;
  const parkName = await getParkNameByParkCode(parkCode);
  let formData = await request.formData();
  const isNext = formData.get("next-visit") === "true";
  if (isNext) {
    toast.success(`${parkName} is added to Next Visit`);
    return createNewNextVisitAPI({
      userId,
      parkId,
      parkCode,
    });
  }
  if (!isNext) {
    toast.success(`${parkName} is removed from Next Visit`);
    findAndDeleteNextVisit({ userId, parkId });
  }
  return null;
}

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
