import s from "./SubmitBtn.module.css";

export const SubmitBtn = ({ text }) => (
  <input className={s.submitBtn} type="submit" value={text} />
);
