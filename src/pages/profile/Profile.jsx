import React from "react";
import space from "../../assets/space.jpg";
import s from "./Profile.module.scss";
import ProfileInfo from "../../components/profileInfo/ProfileInfo";
import MyPostsContainer from "../../components/myPosts/MyPostsContainer";
import Preloader from "./../../UI/preloader/Preloader";

const Profile = (props) => {
  if (!props.profile) {
    return <Preloader />;
  }

  return (
    <div className={s.profilePage}>
      <img src={space} alt="logo" className={s.img} />
      <ProfileInfo
        profile={props.profile}
        updateStatus={props.updateStatus}
        profileStatus={props.profileStatus}
      />
      <MyPostsContainer profile={props.profile} />
    </div>
  );
};

export default Profile;
