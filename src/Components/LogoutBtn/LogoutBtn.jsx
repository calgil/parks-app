import { Form, useNavigate } from "react-router-dom";

export const LogoutButton = () => {
  const navigate = useNavigate();
  return (
    <Form>
      <button
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
