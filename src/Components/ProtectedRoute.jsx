import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/auth.provider";

const redirectToLogin = (navigate) => {
  navigate("/login");
};

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      return redirectToLogin(navigate);
    }
  }, []);

  return <>{user ? children : null}</>;
};
