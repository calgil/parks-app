import { useState } from "react";
import { toast } from "react-hot-toast";
import { redirect } from "react-router-dom";
import { API_CONFIG } from "../../fetch/config";
import { registerFetch } from "../../fetch/user/registerFetch";
import { FormContainer as FormContainer } from "../FormContainer/FormContainer";

export async function action({ request }) {
  return Promise.resolve()
    .then(async () => {
      const formData = await request.formData();
      return formData;
    })
    .then((formData) => {
      const newUserData = Object.fromEntries(formData);
      return newUserData;
    })
    .then(({ username, password }) => {
      if (!username || !password) {
        throw new Error("No Username or Password");
      }
      return { username, password };
    })
    .then(async ({ username, password }) => {
      const getAllUsers = await fetch(`${API_CONFIG.baseUrl}/users`);
      const allUsers = await getAllUsers.json();
      const existingUser = allUsers.find((user) => user.username === username);
      if (existingUser) {
        throw new Error("User already exists");
      }
      return { username, password };
    })
    .then(async ({ username, password }) => {
      const user = await registerFetch({ username, password });
      if (!user) {
        throw new Error("Could not create user");
      }
      return user;
    })
    .then((user) => {
      localStorage.setItem("user", JSON.stringify(user));
    })
    .then(() => {
      toast.success("Created new User");
      return redirect("/");
    })
    .catch((error) => {
      // reset inputs
      return toast.error(error.message);
    });
}

export default function UserRegister() {
  const inputData = [
    {
      labelText: "Username",
      name: "username",
      type: "text",
      placeholder: "username",
    },
    {
      labelText: "Password",
      name: "password",
      type: "password",
      placeholder: "password",
    },
  ];

  const link = {
    path: "/login",
    text: "Already have an account?",
  };

  return (
    <FormContainer
      inputs={inputData}
      title="Create Account"
      buttonText="Sign Up"
      link={link}
    />
  );
}
