import React, { useEffect } from "react";
import Profile from "./Profile";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProfile,
  getStatus,
  updateStatus,
} from "../../store/slices/profileSlice";
import { useParams } from "react-router-dom";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";

const ProfileContainer = (props) => {
  const profile = useSelector((state) => state.profile.profile);
  const profileStatus = useSelector((state) => state.profile.profileStatus);
  const dispatch = useDispatch();

  const updateStatusDispatch = (status) => {
    dispatch(updateStatus(status));
  };

  const { userId } = useParams();
  let currentUserId = userId || 28704;

  useEffect(() => {
    dispatch(getStatus(currentUserId));
    dispatch(fetchProfile(currentUserId));
  }, [dispatch, currentUserId]);

  return (
    <Profile
      {...props}
      profile={profile}
      profileStatus={profileStatus}
      updateStatus={updateStatusDispatch}
    />
  );
};

const AuthRedirectComponent = withAuthRedirect(ProfileContainer);

export default AuthRedirectComponent;
