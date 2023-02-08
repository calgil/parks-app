import s from "./UserInfo.module.css";
import { NavLink } from "react-router-dom";
import { UserActions } from "../UserActions/UserActions";

export const UserInfo = () => {
  return (
    <div className={s.userLinks}>
      <ul className={s.navbar}>
        <li className={s.linkContainer}>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${s.link} ${s.active}` : `${s.link}`
            }
            to={"/next-visit"}
          >
            Next Visit
          </NavLink>
        </li>
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
      </ul>
    </div>
  );
};
