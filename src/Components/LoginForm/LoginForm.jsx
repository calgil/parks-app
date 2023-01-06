import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/auth.provider";
import { Form } from "../Form/Form";

export const LoginForm = () => {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const navigate = useNavigate();
  const { login, user } = useAuth();

  const loginUser = (e) => {
    e.preventDefault();
    login({ username: usernameInput, password: passwordInput })
      .then(() => {
        toast.success("Logged in");
        navigate("/");
      })
      .catch((e) => {
        console.log("error caught");
        toast.error(e.message);
      });
    setUsernameInput("");
    setPasswordInput("");
  };

  const inputData = [
    {
      labelText: "Username",
      value: usernameInput,
      type: "text",
      onChange: (e) => setUsernameInput(e.target.value),
    },
    {
      labelText: "Password",
      value: passwordInput,
      type: "password",
      onChange: (e) => setPasswordInput(e.target.value),
    },
  ];

  const link = {
    path: "/register",
    text: "Or Sign Up",
  };

  return (
    <Form
      inputs={inputData}
      onSubmit={loginUser}
      title="Login"
      buttonText="Login"
      link={link}
    />
  );
};
