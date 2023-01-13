import s from "./UserInfo.module.css";
import { NavLink } from "react-router-dom";
import { UserActions } from "../UserActions/UserActions";

export const UserInfo = ({ userId }) => {
  const activeStyle = {
    color: "darkGreen",
    textDecoration: "underline",
  };
  return (
    <ul className={s.navbar}>
      <li className={s.li}>
        <NavLink
          className={s.link}
          to={`/visited/${userId}`}
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          Visited
        </NavLink>
      </li>
      <li className={s.li}>
        <NavLink
          className={s.link}
          to="/up-next"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          Up Next
        </NavLink>
      </li>
      <UserActions />
    </ul>
  );
};
