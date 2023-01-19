import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRootLoaderData } from "./Layout/Layout";

const redirectToLogin = (navigate) => {
  navigate("/login");
};

export const ProtectedRoute = ({ children }) => {
  const { user } = useRootLoaderData();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      return redirectToLogin(navigate);
    }
  }, []);

  return <>{user ? children : null}</>;
};
