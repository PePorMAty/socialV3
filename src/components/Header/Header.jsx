import React from "react";
import s from "./Header.module.scss";
import { IoLogoReact } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const Header = (props) => {
  return (
    <header className={s.header}>
      <IoLogoReact className={s.logo} alt="logo" />
      <div className={s.loginBlock}>
        {props.isAuth ? (
          <div className={s.authBlock}>
            <div className={s.login}>{props.login}</div>
            <button className={s.loginBtn} onClick={props.logOut}>
              Log out
            </button>
          </div>
        ) : (
          <NavLink className={s.loginBtn} to="/login">
            Login
          </NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;
