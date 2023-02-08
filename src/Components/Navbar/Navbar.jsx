import s from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import { UserInfo } from "../UserInfo/UserInfo";
import { useRootLoaderData } from "../Root/Root";
import logo from "../../assets/logo.png";
import { UserActions } from "../UserActions/UserActions";
import { HamburgerMenu } from "../HamburgerMenu/HamburgerMenu";

export const Navbar = () => {
  const { user } = useRootLoaderData();

  return (
    <nav className={s.nav}>
      <div className={s.leftContainer}>
        <div className={s.logo}>
          <a href="/">
            <img src={logo} alt="logo" />
          </a>
        </div>
        <HamburgerMenu />
      </div>
      <ul className={s.navbar}>
        <li className={s.linkContainer}>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${s.active}` : `${s.link}`
            }
            to="/"
          >
            Home
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
      {user && <UserActions />}
    </nav>
  );
};
