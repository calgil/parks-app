import { Tooltip } from "react-tooltip";
import s from "./InputBase.module.css";
export const InputBase = ({
  data: { labelText, value, onChange, type, name, placeholder },
}) => {
  return (
    <div className={s.inputContainer}>
      <label className={s.label}>{labelText}</label>
      <input
        id={type}
        placeholder={placeholder}
        className={s.input}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete="off"
      />
      {type === "password" && (
        <Tooltip
          anchorId="password"
          content="Database not secure use generic non-important passwords"
          place="top"
        />
      )}
    </div>
  );
};
