import { redirect } from "react-router-dom";
import { patchUser } from "../../fetch/user/patchUser";
import { FormContainer } from "../FormContainer/FormContainer";
import { useRootLoaderData } from "../Root/Root";
import editBackground from "../../assets/editBackground.webp";

export async function action({ request, params }) {
  return Promise.resolve()
    .then(async () => {
      const formData = await request.formData();
      const data = Object.fromEntries(formData);
      const userId = params.userId;
      return { data, userId };
    })
    .then(async ({ data, userId }) => {
      const user = await patchUser(userId, data);
      return { user };
    })
    .then(({ user }) => {
      localStorage.setItem("user", JSON.stringify(user));
      return redirect("/");
    })
    .catch((err) => {
      console.error(err);
      return null;
    });
}

export default function UserEdit() {
  const { user } = useRootLoaderData();
  const backgroundImg = editBackground;
  const inputData = [
    {
      labelText: "Username",
      name: "username",
      placeholder: user.username,
      type: "text",
    },
  ];

  const link = {
    path: "/",
    text: "Go Home",
  };

  return (
    <FormContainer
      backgroundImg={backgroundImg}
      inputs={inputData}
      title="Edit your profile"
      buttonText="Edit"
      link={link}
    />
  );
}
