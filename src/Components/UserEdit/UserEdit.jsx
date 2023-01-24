import { patchUser } from "../../fetch/user/patchUser";
import { FormContainer } from "../FormContainer/FormContainer";
import { useRootLoaderData } from "../Root/Root";

// TODO: finish edit action

export async function action({ request, params }) {
  return Promise.resolve()
    .then(async () => {
      const formData = await request.formData();
      const data = Object.fromEntries(formData);
      const userId = params.userId;
      console.log({ data, userId });
      return { data, userId };
    })
    .then(({ data, userId }) => {
      console.log({ userId, data });
      // patch user
      return patchUser(userId, data);
    })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.error(err);
    });
  //   console.log({ request });
  //   return null;
}

export default function UserEdit() {
  const { user } = useRootLoaderData();
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
      inputs={inputData}
      title="Edit"
      buttonText="Edit"
      link={link}
    />
  );
}
