import React, { useEffect } from "react";
import Users from "./Users";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  followUser,
  setCurrentPage,
  unFollowUser,
} from "../../store/slices/UsersSlice";
import {
  getCurrentPage,
  getInProgress,
  getIsFetching,
  getPageSize,
  getTotalUsersCount,
  getUsers,
} from "../../store/selectors/usersSelector";

const UsersContainer = () => {
  const users = useSelector((state) => getUsers(state));
  const pageSize = useSelector((state) => getPageSize(state));
  const totalUsersCount = useSelector((state) => getTotalUsersCount(state));
  const currentPage = useSelector((state) => getCurrentPage(state));
  const isFetching = useSelector((state) => getIsFetching(state));
  const inProgress = useSelector((state) => getInProgress(state));
  const dispatch = useDispatch();

  const followDispatch = (id) => {
    dispatch(followUser({ id }));
  };

  const unFollowDispatch = (id) => {
    dispatch(unFollowUser({ id }));
  };

  const setCurrentPageDispatch = (currentPage) => {
    dispatch(setCurrentPage({ currentPage }));
  };

  useEffect(() => {
    dispatch(fetchUsers({ currentPage, pageSize }));
  }, [dispatch, currentPage, pageSize]);

  const pagesCount = Math.ceil(totalUsersCount / pageSize);
  const pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    if (pages.length < 20) {
      pages.push(i);
    }
  }

  return (
    <Users
      setCurrentPage={setCurrentPageDispatch}
      followUser={followDispatch}
      unFollowUser={unFollowDispatch}
      isFetching={isFetching}
      users={users}
      currentPage={currentPage}
      pages={pages}
      inProgress={inProgress}
    />
  );
};

export default UsersContainer;
