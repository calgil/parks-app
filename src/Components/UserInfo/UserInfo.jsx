import s from "./UserInfo.module.css";
import { NavLink } from "react-router-dom";
import { UserActions } from "../UserActions/UserActions";

export const UserInfo = ({ userId }) => {
  return (
    <ul className={s.navbar}>
      <li className={s.li}>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${s.link} ${s.active}` : `${s.link}`
          }
          to={`/visited/${userId}`}
        >
          Visited
        </NavLink>
      </li>
      <li className={s.li}>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${s.link} ${s.active}` : `${s.link}`
          }
          to={`/next-adventure/${userId}`}
        >
          Next Adventure
        </NavLink>
      </li>
      <UserActions />
    </ul>
  );
};
