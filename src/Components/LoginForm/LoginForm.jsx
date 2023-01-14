import { useState } from "react";
import { toast } from "react-hot-toast";
import { redirect, useNavigate } from "react-router-dom";
import { getUserFetch } from "../../fetch/user/getUserFetch";
import { useAuth } from "../../providers/auth.provider";
import { FormComponent } from "../Form/Form";

// this kind of works. pretty gross tho
export async function action({ request }) {
  const formData = await request.formData();
  console.log({ formData });
  const userData = Object.fromEntries(formData);
  console.log({ userData });
  const user = await getUserFetch(userData.username);
  if (!user) {
    return console.log("no user");
  }
  if (user.password !== userData.password) {
    return console.log("password not match");
    // throw new Error("Invalid Password");
  }
  localStorage.setItem("user", JSON.stringify(user));
  // setUser(user);
  return redirect("/");
}

export default function LoginForm() {
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
        toast.error(e.message);
      });
    setUsernameInput("");
    setPasswordInput("");
  };

  const inputData = [
    {
      labelText: "Username",
      value: usernameInput,
      name: "username",
      type: "text",
      onChange: (e) => setUsernameInput(e.target.value),
    },
    {
      labelText: "Password",
      value: passwordInput,
      name: "password",
      type: "password",
      onChange: (e) => setPasswordInput(e.target.value),
    },
  ];

  const link = {
    path: "/register",
    text: "Or Sign Up",
  };

  return (
    <FormComponent
      inputs={inputData}
      // onSubmit={loginUser}
      title="Login"
      buttonText="Login"
      link={link}
    />
  );
}
