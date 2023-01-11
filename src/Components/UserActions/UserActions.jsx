import s from "./UserActions.module.css";
import { useAuth } from "../../providers/auth.provider";
import { useEffect, useRef, useState } from "react";
import { LogoutButton } from "../LogoutBtn/LogoutBtn";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";

export const UserActions = () => {
  const { user } = useAuth();
  const [showActions, setShowActions] = useState(false);
  const actionContainerRef = useRef(null);

  const handleClickOutside = (e) => {
    console.log("click outside");
    if (
      actionContainerRef.current &&
      !actionContainerRef.current.contains(e.target)
    ) {
      setShowActions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setShowActions, actionContainerRef]);

  return (
    <div
      ref={actionContainerRef}
      className={s.actionContainer}
      onClick={() => setShowActions(!showActions)}
    >
      Hi, {capitalizeFirstLetter(user.username)}!
      <button className={s.actionBtn}>
        {showActions ? (
          <i className="fa fa-caret-up"></i>
        ) : (
          <i className="fa fa-caret-down"></i>
        )}
      </button>
      {showActions && (
        <div className={s.actionsDropdown}>
          <button>Edit User</button>
          <LogoutButton />
          <button>Delete User</button>
        </div>
      )}
    </div>
  );
};
