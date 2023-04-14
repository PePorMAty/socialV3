import React from "react";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../store/slices/authSlice";

const HeaderContainer = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const login = useSelector((state) => state.auth.login);
  const dispatch = useDispatch();

  const logOutDispatch = () => {
    dispatch(logOut());
  };

  return <Header isAuth={isAuth} login={login} logOut={logOutDispatch} />;
};

export default HeaderContainer;
