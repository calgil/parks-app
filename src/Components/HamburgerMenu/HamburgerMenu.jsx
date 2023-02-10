import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import s from "./HamburgerMenu.module.css";
import { NavLink } from "react-router-dom";
import { useRootLoaderData } from "../Root/Root";
import { useClickOutside } from "../../hooks/useClickOutside";

export const HamburgerMenu = () => {
  const { user } = useRootLoaderData();
  const [showLinks, setShowLinks] = useState(false);
  const menuContainerRef = useRef(null);

  useClickOutside({
    containerRef: menuContainerRef,
    dependencies: [setShowLinks, menuContainerRef],
    onClickOutside: () => {
      setShowLinks(false);
    },
  });

  return (
    <div ref={menuContainerRef} className={s.hamburgerMenu}>
      <button
        className={s.hamburgerBtn}
        onClick={() => setShowLinks(!showLinks)}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
      {showLinks && (
        <ul className={s.links}>
          <li className={s.linkContainer}>
            <NavLink
              onClick={() => setShowLinks(false)}
              className={({ isActive }) =>
                isActive ? `${s.active}` : `${s.link}`
              }
              to="/"
            >
              Home
            </NavLink>
          </li>
          {user && (
            <>
              <li className={s.linkContainer}>
                <NavLink
                  onClick={() => setShowLinks(false)}
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
                  onClick={() => setShowLinks(false)}
                  className={({ isActive }) =>
                    isActive ? `${s.link} ${s.active}` : `${s.link}`
                  }
                  to={"/visited"}
                >
                  Visited
                </NavLink>
              </li>
            </>
          )}
        </ul>
      )}
    </div>
  );
};
