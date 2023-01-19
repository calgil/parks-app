import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRootLoaderData } from "./Layout/Layout";

const redirectToRoot = (navigate) => {
  navigate("/");
};

export const UnProtectedRoute = ({ children }) => {
  const { user } = useRootLoaderData();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      return redirectToRoot(navigate);
    }
  });
  return <>{children}</>;
};
