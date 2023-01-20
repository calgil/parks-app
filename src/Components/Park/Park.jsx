import { useLoaderData, useNavigate } from "react-router-dom";
import s from "./Park.module.css";
export const Park = ({
  park: { id, description, designation, fullName, images, parkCode },
  visited,
}) => {
  const { user } = useLoaderData();
  const navigate = useNavigate();
  const openDetails = () => {
    navigate(`/park/${parkCode}`);
  };

  const handleVisitedClick = (e) => {
    e.stopPropagation();
    // console.log(" add to visited", id);
  };

  const addToUpNext = (e) => {
    e.stopPropagation();
    // console.log(" add to next adventure", id);
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
        <button onClick={addToUpNext} className={`${s.actionBtn} ${s.nextBtn}`}>
          Add to Next Adventure
        </button>
        {/* {visited && user ? (
          <button onClick={handleVisitedClick} className={s.actionBtn}>
            Remove from Visited
          </button>
        ) : ( */}
        <button
          onClick={handleVisitedClick}
          className={`${s.actionBtn} ${s.visitedBtn}`}
        >
          Add to Visited
        </button>
        {/* // )} */}
      </div>
    </div>
  );
};
