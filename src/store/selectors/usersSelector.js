/* import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
 */
/* const getUsers = useSelector((state) => state.users);
 */
/* export const getUsersSuperSelector = createSelector([getUsers], (users) => {
  return users.filter((u) => true);
}); */

/* export const getUsersSelector = (state) => {
  return getUsers(state).filter((u) => true);
}; */

export const getUsers = (state) => {
  return state.users.users;
};

export const getPageSize = (state) => {
  return state.users.pageSize;
};
export const getTotalUsersCount = (state) => {
  return state.users.totalUsersCount;
};
export const getCurrentPage = (state) => {
  return state.users.currentPage;
};
export const getIsFetching = (state) => {
  return state.users.isFetching;
};
export const getInProgress = (state) => {
  return state.users.inProgress;
};
