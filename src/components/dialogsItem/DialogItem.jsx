import React from "react";
import s from "./DialogItem.module.scss";
import { NavLink } from "react-router-dom";

const DialogItem = (props) => {
  return (
    <div className={s.dialog}>
      <NavLink
        to={"/dialogs/" + props.id}
        className={({ isActive }) =>
          isActive ? `${s.active}` : `${s.navLink}`
        }
      >
        {props.name}
      </NavLink>
    </div>
  );
};

export default DialogItem;
