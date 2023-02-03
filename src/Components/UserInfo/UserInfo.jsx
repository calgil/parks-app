import s from "./UserInfo.module.css";
import { NavLink } from "react-router-dom";
import { UserActions } from "../UserActions/UserActions";
import { useRootLoaderData } from "../Root/Root";

export const UserInfo = () => {
  return (
    <div className={s.userLinks}>
      <ul className={s.navbar}>
        <li className={s.linkContainer}>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${s.link} ${s.active}` : `${s.link}`
            }
            to={"/visited"}
          >
            Visited
          </NavLink>
        </li>
        <li className={s.linkContainer}>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${s.link} ${s.active}` : `${s.link}`
            }
            to={"/next-adventure"}
          >
            Next Adventure
          </NavLink>
        </li>
      </ul>
      <UserActions />
    </div>
  );
};
