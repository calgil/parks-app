import s from "./Layout.module.css";
import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../../providers/auth.provider";
import { LogoutButton } from "../LogoutButton";

export const Layout = () => {
  const { user } = useAuth();
  const activeStyle = {
    color: "darkGreen",
    textDecoration: "underline",
  };
  return (
    <div>
      <nav>
        <ul className={s.navbar}>
          <li className={s.li}>
            <NavLink
              className={s.link}
              to="/"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Pick a State
            </NavLink>
          </li>
          {user ? (
            <div>Hi, {user.username}!</div>
          ) : (
            <li className={s.li}>
              <NavLink
                className={s.link}
                to="/login"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                Login
              </NavLink>
            </li>
          )}
          <li className={s.li}>
            <NavLink
              className={s.link}
              to="up-next"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Up Next
            </NavLink>
          </li>
        </ul>
      </nav>
      <LogoutButton />
      <Outlet />
    </div>
  );
};
