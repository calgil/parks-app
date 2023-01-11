import s from "./UserActions.module.css";
import { useAuth } from "../../providers/auth.provider";
import { useState } from "react";
import { LogoutButton } from "../LogoutBtn/LogoutBtn";

export const UserActions = () => {
  const { user } = useAuth();
  const [showActions, setShowActions] = useState(false);
  return (
    <div className={s.actionContainer}>
      Hi, {user.username}!
      <button
        className={s.actionBtn}
        onClick={() => setShowActions(!showActions)}
      >
        {showActions ? (
          <i className="fa fa-caret-up"></i>
        ) : (
          <i className="fa fa-caret-down"></i>
        )}
      </button>
      {showActions && (
        <div className={s.actionsDropdown}>
          {/* <div> */}
          <button>Edit User</button>
          {/* </div> */}
          {/* <div> */}
          <LogoutButton />
          {/* </div> */}
          {/* <div> */}
          <button>Delete User</button>
          {/* </div> */}
        </div>
      )}
    </div>
  );
};
