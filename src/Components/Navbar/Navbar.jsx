import s from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import { UserInfo } from "../UserInfo/UserInfo";
import { useRootLoaderData } from "../Root/Root";
import logo from "../../assets/logo.png";
import classNames from "classnames";

export const Navbar = () => {
  const { user } = useRootLoaderData();

  return (
    <nav className={s.nav}>
      <div className={s.logo}>
        <a href="/">
          <img src={logo} alt="logo" />
        </a>
      </div>
      <ul className={s.navbar}>
        <li className={s.linkContainer}>
          <NavLink
            className={({ isActive }) => (isActive ? `${s.active}` : undefined)}
            to="/"
          >
            Pick a State
          </NavLink>
        </li>
        {user && <UserInfo />}
      </ul>
      {!user && (
        <div className={s.linkContainer}>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${s.link} ${s.active}` : `${s.link}`
            }
            to="/login"
          >
            Login
          </NavLink>
        </div>
      )}
    </nav>
  );
};
