import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { profileAPI } from "../../API/api";

export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async function (id) {
    const response = await profileAPI.getProfile(id);
    return response;
  }
);

export const getStatus = createAsyncThunk(
  "profile/getStatus",
  async function (id) {
    const response = await profileAPI.getStatus(id);
    return response;
  }
);

export const updateStatus = createAsyncThunk(
  "profile/updateStatus",
  async function (status) {
    const response = await profileAPI.updateStatus(status);
    if (response.resultCode === 0) {
      return response.data;
    }
  }
);

export const savePhoto = createAsyncThunk(
  "profile/savePhoto",
  async function (photos) {
    const response = await profileAPI.savePhoto(photos);
    if (response.resultCode === 0) {
      return response.data;
    }
  }
);

export const saveProfile = createAsyncThunk(
  "profile/saveContacts",
  async function (profile, { dispatch, getState }) {
    const userId = getState().auth.id;
    const response = await profileAPI.saveProfile(profile);
    if (response.resultCode === 0) {
      dispatch(fetchProfile(userId));
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    postData: [
      { id: 1, message: "hi how are u", likesCount: 2 },
      { id: 2, message: "it`s my first post", likesCount: 21 },
    ],
    newPostText: "dsa",
    profile: null,
    profileStatus: "",
    status: null,
  },
  reducers: {
    addPost(state) {
      let text = state.newPostText;
      return {
        ...state,
        newPostText: "no",
        postData: [
          ...state.postData,
          { id: Math.random(), message: text, likesCount: 0 },
        ],
      };
    },
    updateNewPostText(state, action) {
      return { ...state, newPostText: action.payload.newText };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      return {
        ...state,
        status: "resolved",
        profile: action.payload,
      };
    });
    builder.addCase(getStatus.fulfilled, (state, action) => {
      return {
        ...state,
        status: "resolved",
        profileStatus: action.payload,
      };
    });
    builder.addCase(updateStatus.fulfilled, (state, action) => {
      return {
        ...state,
        status: "resolved",
        profileStatus: !action.payload.status
          ? state.profileStatus
          : action.payload.status,
      };
    });
    builder.addCase(savePhoto.fulfilled, (state, action) => {
      return {
        ...state,
        profile: { ...state.profile, photos: action.payload.photos },
      };
    });
    /* builder.addCase(saveProfile.fulfilled, (state, action) => {
      return {
        ...state,
        profile: { ...state.profile, profile: action.payload.profile },
      };
    }); */
  },
});

export const { addPost, updateNewPostText } = profileSlice.actions;

export default profileSlice.reducer;
