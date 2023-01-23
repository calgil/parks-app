import { Form, useNavigate } from "react-router-dom";

export const LogoutButton = () => {
  const navigate = useNavigate();
  return (
    <Form method="post">
      <button
        name="logout"
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          localStorage.removeItem("user");
          navigate("/");
        }}
      >
        Logout
      </button>
    </Form>
  );
};
