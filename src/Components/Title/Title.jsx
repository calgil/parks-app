import s from "./Title.module.css";

export const Title = ({ title }) => {
  return (
    <div className={s.titleContainer}>
      <h1 className={s.title}>{title}</h1>
      <div className={s.titleBorder}></div>
    </div>
  );
};
