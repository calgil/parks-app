import { useNavigate } from "react-router-dom";

export const LogoutButton = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={(e) => {
        // console.log("logout", localStorage.getItem("user"));
        localStorage.removeItem("user");
        navigate("/");
        // console.log("logout end", localStorage.getItem("user"));
        // e.stopPropagation();
      }}
    >
      Logout
    </button>
  );
};
