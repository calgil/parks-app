import { Outlet } from "react-router-dom";
import { useAuth } from "../../providers/auth.provider";
import { Navbar } from "../Navbar/Navbar";

export const Layout = () => {
  const { isLoading } = useAuth();

  return (
    <>
      {isLoading ? (
        <div> Loading ...</div>
      ) : (
        <div>
          <Navbar />
          <Outlet />
        </div>
      )}
    </>
  );
};
