import s from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import { UserInfo } from "../UserInfo/UserInfo";
import { useRootLoaderData } from "../Layout/Layout";

export const Navbar = () => {
  const { user } = useRootLoaderData();
  // console.log({ user });
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
          <UserInfo userId={user.id} />
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
