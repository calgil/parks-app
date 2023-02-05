import { toast } from "react-hot-toast";
import { redirect } from "react-router-dom";
import { getUserFetch } from "../../fetch/user/getUserFetch";
import { FormContainer } from "../FormContainer/FormContainer";
import loginBackground from "../../assets/loginBackground.webp";

export async function action({ request }) {
  return Promise.resolve()
    .then(async () => {
      const formData = await request.formData();
      return formData;
    })
    .then((formData) => {
      const userData = Object.fromEntries(formData);
      return userData;
    })
    .then(({ username, password }) => {
      if (!username || !password) {
        throw new Error("No Username or Password");
      }
      return { username, password };
    })
    .then(async ({ username, password }) => {
      const user = await getUserFetch({ username, password });
      if (!user) {
        throw new Error("User not Found");
      }
      if (user.password !== password) {
        throw new Error("Passwords do not match");
      }
      localStorage.setItem("user", JSON.stringify(user));
    })
    .then(() => {
      toast.success("Logged In!");
      return redirect("/");
    })
    .catch((error) => {
      return toast.error(error.message);
    });
}

export default function UserLogin() {
  const backgroundImg = loginBackground;

  const inputData = [
    {
      labelText: "Username",
      name: "username",
      type: "text",
      placeholder: "Username",
    },
    {
      labelText: "Password",
      name: "password",
      type: "password",
      placeholder: "Password",
    },
  ];

  const link = {
    path: "/register",
    text: "Or Sign Up",
  };

  return (
    <FormContainer
      backgroundImg={backgroundImg}
      inputs={inputData}
      title="Pick up where you left off..."
      buttonText="Login"
      link={link}
    />
  );
}
