import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./slices/profileSlice";
import dialogsReducer from "./slices/dialogsSlice";
import usersSlice from "./slices/UsersSlice";
import authSlice from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    dialogs: dialogsReducer,
    users: usersSlice,
    auth: authSlice,
  },
});
