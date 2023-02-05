import { Link, Form } from "react-router-dom";
import { InputBase } from "../InputBase/InputBase";
import { SubmitBtn } from "../SubmitBtn/SubmitBtn";
import s from "./FormContainer.module.css";

export const FormContainer = ({
  backgroundImg,
  inputs,
  title,
  buttonText,
  link,
}) => {
  return (
    <section
      className={s.imgContainer}
      style={{
        backgroundImage: `url(${backgroundImg})`,
      }}
    >
      <div className={s.formContainer}>
        <Form method="post" className={s.form}>
          <h3 className={s.title}>{title}</h3>
          {inputs.map((input, i) => (
            <InputBase data={input} key={i} />
          ))}
          <SubmitBtn text={buttonText} />
        </Form>
        <Link className={s.link} to={link.path}>
          {link.text}
        </Link>
      </div>
    </section>
  );
};
