import { useNavigate } from "react-router-dom";

export const LogoutButton = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        localStorage.removeItem("user");
        navigate("/");
      }}
    >
      Logout
    </button>
  );
};
