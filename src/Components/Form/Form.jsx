import { Link, Form } from "react-router-dom";
import { InputBase } from "../InputBase/InputBase";
import { SubmitBtn } from "../SumbitBtn/SubmitBtn";
import s from "./Form.module.css";

export const FormComponent = ({ inputs, title, buttonText, link }) => {
  return (
    <section>
      <div className={s.formContainer}>
        <Form method="post">
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
