import NavBar from "./components/navBar/NavBar";
import { Navigate, Route, Routes } from "react-router-dom";
import ProfileContainer from "./pages/profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./pages/login/Login";
import { useDispatch } from "react-redux";
import React, { Suspense, useEffect } from "react";
import { fetchLogin } from "./store/slices/authSlice";
import Preloader from "./UI/preloader/Preloader";
import NotFound from "./pages/notFound/NotFound";

const DialogsContainer = React.lazy(() =>
  import("./pages/dialogs/DialogsContainer")
);

const UsersContainer = React.lazy(() => import("./pages/users/UsersContainer"));

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLogin());
  }, [dispatch]);

  return (
    <div className="App">
      <HeaderContainer className="header" />
      <NavBar className="nav" />
      <main className="content">
        <Suspense
          fallback={
            <div>
              <Preloader />
            </div>
          }
        >
          <Routes>
            <Route
              path={`/profile/:userId?`}
              element={<ProfileContainer />}
            ></Route>
            <Route path={`/`} element={<Navigate to="/profile" />}></Route>
            <Route path="/dialogs/*" element={<DialogsContainer />}></Route>
            <Route path="/users" element={<UsersContainer />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};

export default App;
