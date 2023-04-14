import React from "react";
import s from "./NavBar.module.scss";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className={s.nav}>
      <ul className={s.navList}>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${s.active}` : `${s.navLink}`
          }
          to="/profile"
        >
          Profile
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${s.active}` : `${s.navLink}`
          }
          to="/dialogs"
        >
          Messages
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${s.active}` : `${s.navLink}`
          }
          to="/users"
        >
          Users
        </NavLink>
      </ul>
    </div>
  );
};

export default NavBar;
