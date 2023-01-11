import s from "./Navbar.module.css";
import { useAuth } from "../../providers/auth.provider";
import { NavLink } from "react-router-dom";
import { UserInfo } from "../UserInfo/UserInfo";

export const Navbar = () => {
  const { user } = useAuth();
  const activeStyle = {
    color: "darkGreen",
    textDecoration: "underline",
  };
  return (
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
          <UserInfo />
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
      </ul>
    </nav>
  );
};
