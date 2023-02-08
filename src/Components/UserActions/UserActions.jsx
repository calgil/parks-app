import s from "./UserActions.module.css";
import { useEffect, useRef, useState } from "react";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import { useRootLoaderData } from "../Root/Root";
import { Form, redirect } from "react-router-dom";
import { deleteUser } from "../../fetch/user/deleteUser";

export const deleteAction = async ({ params }) => {
  await deleteUser(params.userId);
  return redirect("/");
};

export const logoutAction = () => {
  localStorage.removeItem("user");
  return redirect("/");
};

export const UserActions = () => {
  const { user } = useRootLoaderData();
  const [showActions, setShowActions] = useState(false);
  const actionContainerRef = useRef(null);

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
      <h3
        className={showActions ? `${s.username} ${s.active}` : `${s.username}`}
      >
        Hi, {capitalizeFirstLetter(user.username)}!
      </h3>
      <button className={s.dropdownBtn}>
        {showActions ? (
          <i className="fa fa-caret-up"></i>
        ) : (
          <i className="fa fa-caret-down"></i>
        )}
      </button>
      {showActions && (
        <div className={s.actionsDropdown}>
          <Form className={s.actionForm} action={`/edit/${user.id}`}>
            <button className={s.userActionBtn} type="submit">
              Edit User
            </button>
          </Form>
          <Form
            className={s.actionForm}
            method="post"
            action="/logout"
            onSubmit={(e) => {
              if (!confirm("Do you want to logout?")) {
                e.preventDefault();
              }
            }}
          >
            <button className={s.userActionBtn} type="submit">
              Logout
            </button>
          </Form>
          <Form
            className={s.actionForm}
            method="post"
            action={`delete/${user.id}`}
            onSubmit={(e) => {
              if (!confirm("Do you want to delete this user?")) {
                e.preventDefault();
              }
            }}
          >
            <button className={s.userActionBtn} type="submit">
              Delete User
            </button>
          </Form>
        </div>
      )}
    </div>
  );
};
