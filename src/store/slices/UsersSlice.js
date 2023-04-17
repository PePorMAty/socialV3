import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { usersAPI } from "../../API/api";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async function ({ currentPage, pageSize }) {
    const response = await usersAPI.getUsers(currentPage, pageSize);
    return { users: response.items, count: response.totalCount };
  }
);

const followUnFollowFlow = async ({
  id,
  dispatch,
  apiMethod,
  actionCreator,
}) => {
  const response = await apiMethod(id);

  if (response.resultCode === 0) {
    dispatch(actionCreator({ id }));
  }
};

export const followUser = createAsyncThunk(
  "user/followUser",
  async function ({ id }, { dispatch }) {
    let apiMethod = usersAPI.setFollow.bind(usersAPI);
    let actionCreator = follow;
    followUnFollowFlow({ id, dispatch, apiMethod, actionCreator });
  }
);

export const unFollowUser = createAsyncThunk(
  "user/unFollowUser",
  async function ({ id }, { dispatch }) {
    let apiMethod = usersAPI.setUnFollow.bind(usersAPI);
    let actionCreator = unFollow;
    followUnFollowFlow({ id, dispatch, apiMethod, actionCreator });
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: null,
    status: null,
    error: null,
  },

  reducers: {
    follow(state, action) {
      return {
        ...state,
        /* users: updateObjectInArray(state.users, action.payload.id, "id", {
          followed: true,
        }), */
        users: state.users.map((u) => {
          if (u.id === action.payload.id) {
            return { ...u, followed: true };
          }
          return u;
        }),
      };
    },
    unFollow(state, action) {
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.payload.id) {
            return { ...u, followed: false };
          }
          return u;
        }),
      };
    },
    setCurrentPage(state, action) {
      return { ...state, currentPage: action.payload.currentPage };
    },
    setTotalUsersCount(state, action) {
      return { ...state, totalUsersCount: action.payload.totalUsersCount };
    },
    setIsFetching(state, action) {
      return { ...state, isFetching: action.payload.isFetching };
    },
    setFollowingProgress(state, action) {
      return { ...state, followingInProgress: action.payload.id };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      return { ...state, isFetching: true };
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return {
        ...state,
        isFetching: false,
        status: "ok",
        totalUsersCount: action.payload.count,
        users: action.payload.users,
      };
    });
  },
});

export const {
  follow,
  unFollow,
  setCurrentPage,
  setTotalUsersCount,
  setIsFetching,
  setFollowingProgress,
} = usersSlice.actions;

export default usersSlice.reducer;
