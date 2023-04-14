import React from "react";
import s from "./ProfileInfo.module.scss";
import ava from "../../assets/P7c0Kkw.png";
import ProfileStatus from "../profileStatus/ProfileStatus";

const ProfileInfo = (props) => {
  return (
    <div className={s.profile}>
      <img
        className={s.avatar}
        src={
          props.profile.photos.large != null ? props.profile.photos.large : ava
        }
        alt="avatar"
      />
      <div className={s.profileInfo}>
        <div className={s.fullName}>{props.profile.fullName}</div>
        <div className={s.contacts}>
          <ProfileStatus
            profileStatus={props.profileStatus}
            updateStatus={props.updateStatus}
          />
          <div className={s.contactsList}>
            Desc: {props.profile.lookingForAJobDescription}
          </div>
          <div className={s.contactsList}>
            Git: {props.profile.contacts.github}
          </div>
          <div className={s.contactsList}>VK: {props.profile.contacts.vk}</div>
          <div className={s.contactsList}>
            Inst: {props.profile.contacts.instagram}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
