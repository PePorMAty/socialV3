import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authAPI } from "../../API/api";

export const fetchLogin = createAsyncThunk(
  "auth/fetchLogin",
  async function () {
    const response = await authAPI.getLogin();
    try {
      if (response.resultCode === 0) {
        let { id, email, login } = response.data;

        return { id: id, email: email, login: login };
      } else {
        throw new Error();
      }
    } catch (error) {
      throw new Error();
    }
  }
);

export const loginMe = createAsyncThunk(
  "auth/loginMe",
  async function ({ email, password, rememberMe }, { dispatch }) {
    const response = await authAPI.loginMe(email, password, rememberMe);
    if (response.resultCode === 0) {
      dispatch(fetchLogin());
    } else {
      dispatch(inCorrectSubmit());
    }
  }
);

export const logOut = createAsyncThunk("auth/logOut", async function () {
  const response = await authAPI.logOut();
  if (response.resultCode === 0) {
    fetchLogin();
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    status: null,
    error: null,
    initialized: false,
  },
  reducers: {
    inCorrectSubmit(state) {
      return {
        ...state,
        error: "Incorrect password or email",
      };
    },
    isInitialized(state) {
      return {
        ...state,
        initialized: true,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLogin.pending, (state) => {
      return {
        ...state,
        email: null,
        login: null,
        isAuth: null,
        status: "pending",
      };
    });
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      return {
        ...state,
        status: "resolved",
        id: action.payload.id,
        email: action.payload.email,
        login: action.payload.login,
        isAuth: true,
        isInitialized: true,
      };
    });
    builder.addCase(logOut.fulfilled, (state) => {
      return {
        ...state,
        isAuth: false,
      };
    });
  },
});

export const { inCorrectSubmit, isInitialized } = authSlice.actions;

export default authSlice.reducer;
