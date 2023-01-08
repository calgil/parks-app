import s from "./Park.module.css";
export const Park = ({
  park: { id, description, designation, fullName, name, images, parkCode },
}) => {
  return (
    <div className={s.parkBody}>
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
        <button className={s.actionBtn}>Add to Up Next</button>
        <button className={s.actionBtn}>Add to Visited</button>
      </div>
    </div>
  );
};
