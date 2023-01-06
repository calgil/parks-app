import s from "./SumbitBtn.module.css";

export const SubmitBtn = ({ text }) => (
  <input className={s.submitBtn} type="submit" value={text} />
);
