import { useNavigate } from "react-router-dom";
import { useRootLoaderData } from "../Root/Root";
import s from "./Park.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as fasFaBookmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as farFaBookmark } from "@fortawesome/free-regular-svg-icons";
import { toast } from "react-hot-toast";
import { NextVisitBtn } from "../NextVisitBtn/NextVisitBtn";
import { VisitBtn } from "../VisitBtn/visitBtn";

export const Park = ({ park, visited, nextVisit, showAddVisitBtn }) => {
  const { user } = useRootLoaderData();
  const { id, fullName, images, parkCode } = park;
  const navigate = useNavigate();

  const openDetails = () => {
    navigate(`/park/${parkCode}`);
  };

  return (
    <div tabIndex="0" onClick={openDetails} className={s.parkBody}>
      <div className={s.imgContainer}>
        <img
          className={s.parkImg}
          src={images[0].url}
          alt={images[0].altText}
        />

        {user && !visited && (
          <NextVisitBtn
            parkId={id}
            userId={user.id}
            parkCode={parkCode}
            nextVisit={nextVisit}
          />
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
                    nextVisit ? `${s.bookmark} ${s.next}` : `${s.bookmark}`
                  }
                />
              </span>
            </button>
          </div>
        )}
      </div>
      <h3 className={s.parkName}>{fullName}</h3>
      {user && showAddVisitBtn && (
        <VisitBtn
          parkId={id}
          userId={user.id}
          parkCode={parkCode}
          visited={visited}
        />
      )}
    </div>
  );
};
