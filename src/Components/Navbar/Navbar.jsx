import s from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import { UserInfo } from "../UserInfo/UserInfo";
import { useRootLoaderData } from "../Root/Root";
import classNames from "classnames";

export const Navbar = () => {
  const { user } = useRootLoaderData();
  return (
    <nav>
      <ul className={s.navbar}>
        <li className={s.li}>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${s.link} ${s.active}` : `${s.link}`
            }
            to="/"
          >
            Pick a State
          </NavLink>
        </li>
        {user ? (
          <UserInfo userId={user.id} />
        ) : (
          <li className={s.li}>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${s.link} ${s.active}` : `${s.link}`
              }
              to="/login"
            >
              Login
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};
