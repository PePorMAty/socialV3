import NavBar from "./components/navBar/NavBar";
import { Route, Routes } from "react-router-dom";
import DialogsContainer from "./pages/dialogs/DialogsContainer";
import UsersContainer from "./pages/users/UsersContainer";
import ProfileContainer from "./pages/profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./pages/login/Login";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchLogin } from "./store/slices/authSlice";

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
        <Routes>
          <Route
            path={`/profile/:userId?`}
            element={<ProfileContainer />}
          ></Route>
          <Route path="/dialogs/*" element={<DialogsContainer />}></Route>
          <Route path="/users" element={<UsersContainer />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </main>
    </div>
  );
};

export default App;
