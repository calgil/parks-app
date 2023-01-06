import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/auth.provider";
import { Form } from "../Form/Form";
import s from "./UserLogin.module.css";

export const SignUpForm = () => {
  const { register } = useAuth();

  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const navigate = useNavigate();

  const signUpUser = async (e) => {
    e.preventDefault();
    if (!usernameInput || !passwordInput) {
      return toast.error("Please input username or password");
    }
    try {
      register({ username: usernameInput, password: passwordInput });
      toast.success("Created new User");
      navigate("/");
    } catch (error) {
      toast.error("Cannot create user");
    }
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
    path: "/login",
    text: "Already have an account?",
  };

  return (
    <Form
      inputs={inputData}
      onSubmit={signUpUser}
      title="Create Account"
      buttonText="Sign Up"
      link={link}
    />
  );
};
