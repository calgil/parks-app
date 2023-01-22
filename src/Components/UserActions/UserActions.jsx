import s from "./UserActions.module.css";
import { useEffect, useRef, useState } from "react";
import { LogoutButton } from "../LogoutBtn/LogoutBtn";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import { useRootLoaderData } from "../Root/Root";

export const UserActions = () => {
  const { user } = useRootLoaderData();
  const [showActions, setShowActions] = useState(false);
  const actionContainerRef = useRef(null);

  const handleClickOutside = (e) => {
    // console.log("click");
    if (
      actionContainerRef.current &&
      !actionContainerRef.current.contains(e.target)
    ) {
      // console.log("click inside");
      setShowActions(false);
    }
    // console.log("click outside");
  };

  useEffect(() => {
    // console.log("use effect triggered");
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
          <button>Edit User</button>
          <LogoutButton />
          <button>Delete User</button>
        </div>
      )}
    </div>
  );
};
