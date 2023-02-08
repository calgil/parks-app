import { useFetcher } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faMinus } from "@fortawesome/free-solid-svg-icons";
import s from "./VisitBtn.module.css";
import { getParkNameByParkCode } from "../../fetch/parks/getParkName";
import { findAndDeleteNextVisit } from "../../fetch/parks/nextVisit/findAndDeleteNextVisit";
import { createVisitedAPI } from "../../fetch/parks/visited/createVisitedAPI";
import { toast } from "react-hot-toast";
import { findAndDeleteVisited } from "../../fetch/parks/visited/deleteVisitedAPI";

export async function action({ request, params }) {
  const userId = params.userId;
  const parkId = params.parkId;
  const parkCode = params.parkCode;
  const parkName = await getParkNameByParkCode(parkCode);
  let formData = await request.formData();
  const addVisited = formData.get("visited") === "true";
  if (addVisited) {
    findAndDeleteNextVisit({ userId, parkId });
    createVisitedAPI({ userId, parkId, parkCode });
    return toast.success(`${parkName} added to Visited`);
  }
  if (!addVisited) {
    findAndDeleteVisited({ userId, parkId });
  }
  return null;
}

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
            <span>I Visited</span>
          </>
        )}
      </button>
    </fetcher.Form>
  );
};
