import s from "./InputBase.module.css";
export const InputBase = ({ data: { labelText, type, name } }) => {
  return (
    <div className={s.inputContainer}>
      <label className={s.label}>{labelText}</label>
      <input className={s.input} name={name} type={type} autoComplete="off" />
    </div>
  );
};
