import s from "./InputBase.module.css";
export const InputBase = ({ data: { labelText, type, value, onChange } }) => {
  return (
    <div className={s.inputContainer}>
      <label className={s.label}>{labelText}</label>
      <input
        className={s.input}
        value={value}
        type={type}
        onChange={onChange}
        autoComplete="off"
      />
    </div>
  );
};
