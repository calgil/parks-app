import s from "./UserInfo.module.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../providers/auth.provider";

export const UserInfo = () => {
  const { user } = useAuth();
  const activeStyle = {
    color: "darkGreen",
    textDecoration: "underline",
  };
  return (
    <ul className={s.navbar}>
      <li className={s.li}>
        <NavLink
          className={s.link}
          to="/visited"
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
      <div>Hi, {user.username}!</div>
    </ul>
  );
};
