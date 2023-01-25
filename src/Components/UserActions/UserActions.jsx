import s from "./UserActions.module.css";
import { useEffect, useRef, useState } from "react";
import { LogoutButton } from "../LogoutBtn/LogoutBtn";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import { useRootLoaderData } from "../Root/Root";
import { useNavigate } from "react-router-dom";

export const UserActions = () => {
  const { user } = useRootLoaderData();
  const [showActions, setShowActions] = useState(false);
  const actionContainerRef = useRef(null);
  const navigate = useNavigate();

  const handleClickOutside = (e) => {
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
      onClick={() => setShowActions(true)}
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
          <button onClick={() => navigate(`/edit/${user.id}`)}>
            Edit User
          </button>
          <LogoutButton />
          <button>Delete User</button>
        </div>
      )}
    </div>
  );
};
