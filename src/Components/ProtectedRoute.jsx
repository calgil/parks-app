import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../providers/auth.provider";

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  //   useEffect(() => {
  //     if (!user) {
  //       setTimeout(() => {
  //         navigate("/login");
  //       }, 1000);
  //     }
  //   }, []);
  return (
    <div>
      {user ? (
        children
      ) : (
        <div>
          Not logged in <br /> You will be re-routed to login <br /> If you are
          not re-routed <Link to="/login">Click Here</Link>
        </div>
      )}
    </div>
  );
};
