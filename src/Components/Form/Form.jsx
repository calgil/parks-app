import { Link } from "react-router-dom";
import { InputBase } from "../InputBase/InputBase";
import { SubmitBtn } from "../SumbitBtn/SubmitBtn";
import s from "./Form.module.css";

export const Form = ({ inputs, onSubmit, title, buttonText, link }) => {
  return (
    <section>
      <div className={s.formContainer}>
        <form className={s.form} onSubmit={onSubmit}>
          <h3 className={s.title}>{title}</h3>
          {inputs.map((input, i) => (
            <InputBase data={input} key={i} />
          ))}
          <SubmitBtn text={buttonText} />
        </form>
        <Link className={s.link} to={link.path}>
          {link.text}
        </Link>
      </div>
    </section>
  );
};
