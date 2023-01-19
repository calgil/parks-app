import { useLoaderData, useNavigate } from "react-router-dom";
import { useVisited } from "../../providers/visited.provider";
import s from "./Park.module.css";
export const Park = ({
  park: { id, description, designation, fullName, images, parkCode },
  isVisited,
}) => {
  const { user } = useLoaderData();
  const { toggleVisited } = useVisited();
  const navigate = useNavigate();
  const openDetails = () => {
    navigate(`/park/${parkCode}`);
  };

  const handleVisitedClick = (e) => {
    e.stopPropagation();
    toggleVisited({ userId: user.id, parkId: id, parkCode });
  };

  const addToUpNext = (e) => {
    e.stopPropagation();
  };
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
      <div className={s.btnContainer}>
        <button onClick={addToUpNext} className={s.actionBtn}>
          Add to Up Next
        </button>
        {isVisited && user ? (
          <button onClick={handleVisitedClick} className={s.actionBtn}>
            Remove from Visited
          </button>
        ) : (
          <button onClick={handleVisitedClick} className={s.actionBtn}>
            Add to Visited
          </button>
        )}
      </div>
    </div>
  );
};
