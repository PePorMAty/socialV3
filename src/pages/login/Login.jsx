import React from "react";
import s from "./Login.module.scss";
import LoginForm from "../../components/loginForm/LoginForm";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Login = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const captcha = useSelector((state) => state.auth.captchaUrl);

  if (isAuth === true) {
    return <Navigate to={"/profile/"} />;
  }
  return (
    <div className={s.loginPage}>
      <h1 className={s.title}>Login</h1>
      <LoginForm captcha={captcha} />
    </div>
  );
};

export default Login;
