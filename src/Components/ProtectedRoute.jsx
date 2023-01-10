import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/auth.provider";

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const redirectToLogin = useCallback(() => {
    navigate("/login");
  }, []);

  useEffect(() => {
    if (!user) {
      return redirectToLogin();
    }
  }, [user, redirectToLogin]);
  return <>{user ? children : null}</>;
};
