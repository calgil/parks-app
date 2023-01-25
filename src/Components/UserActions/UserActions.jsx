import s from "./UserActions.module.css";
import { useEffect, useRef, useState } from "react";
import { LogoutButton } from "../LogoutBtn/LogoutBtn";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import { useRootLoaderData } from "../Root/Root";
import { Form, redirect, useNavigate } from "react-router-dom";
import { deleteUser } from "../../fetch/user/deleteUser";

export const deleteAction = async ({ params }) => {
  await deleteUser(params.userId);
  return redirect("/");
};

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
          <Form
            method="post"
            action={`delete/${user.id}`}
            onSubmit={(e) => {
              console.log("delete");
              // e.preventDefault();
            }}
          >
            <button type="submit">Delete User</button>
          </Form>
        </div>
      )}
    </div>
  );
};
