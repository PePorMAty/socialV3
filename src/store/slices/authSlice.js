import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authAPI, securityAPI } from "../../API/api";

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
  async function ({ email, password, rememberMe, captcha }, { dispatch }) {
    const response = await authAPI.loginMe(
      email,
      password,
      rememberMe,
      captcha
    );
    if (response.resultCode === 0) {
      dispatch(fetchLogin());
    } else {
      if (response.resultCode === 10) {
        dispatch(getCaptchaUrl());
      }
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

export const getCaptchaUrl = createAsyncThunk(
  "auth/getCaptchaUrl",
  async function () {
    const response = await securityAPI.getCaptcha();
    return response.url;
  }
);

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
    captchaUrl: null,
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
    builder.addCase(getCaptchaUrl.fulfilled, (state, action) => {
      return {
        ...state,
        captchaUrl: action.payload,
      };
    });
  },
});

export const { inCorrectSubmit, isInitialized } = authSlice.actions;

export default authSlice.reducer;
