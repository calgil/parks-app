import s from "./InputBase.module.css";
export const InputBase = ({
  data: { labelText, value, onChange, type, name },
}) => {
  return (
    <div className={s.inputContainer}>
      <label className={s.label}>{labelText}</label>
      <input
        className={s.input}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete="off"
      />
    </div>
  );
};
