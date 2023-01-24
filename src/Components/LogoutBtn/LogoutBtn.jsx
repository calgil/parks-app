import { Form, useNavigate } from "react-router-dom";

export const LogoutButton = () => {
  const navigate = useNavigate();
  return (
    <button
      name="logout"
      type="submit"
      onClick={() => {
        // TODO: fix bug! Double navigate isn't cool
        localStorage.removeItem("user");
        navigate("/");
        navigate("/");
      }}
    >
      Logout
    </button>
  );
};
