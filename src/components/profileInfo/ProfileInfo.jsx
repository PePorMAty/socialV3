import React, { useState } from "react";
import s from "./ProfileInfo.module.scss";
import ava from "../../assets/P7c0Kkw.png";
import ProfileStatus from "../profileStatus/ProfileStatus";
import { ProfileDataForm } from "../profileDataForm/profileDataForm";
import { useDispatch } from "react-redux";
import { saveProfile } from "../../store/slices/profileSlice";

const ProfileInfo = (props) => {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);

  const mainPhotoSelected = (e) => {
    if (e.target.files.length) {
      props.savePhoto(e.target.files[0]);
    }
  };

  const onSubmit = (formData) => {
    dispatch(saveProfile(formData));
    setEditMode(false);
  };

  return (
    <div className={s.profile}>
      <img
        className={s.avatar}
        src={
          props.profile.photos.large != null ? props.profile.photos.large : ava
        }
        alt="avatar"
      />
      {props.isOwner && <input type="file" onChange={mainPhotoSelected} />}
      <div className={s.profileInfo}>
        <div className={s.contacts}>
          <ProfileStatus
            profileStatus={props.profileStatus}
            updateStatus={props.updateStatus}
          />
          {editMode ? (
            <ProfileDataForm profile={props.profile} onSubmit={onSubmit} />
          ) : (
            <>
              <div className={s.fullName}>{props.profile.fullName}</div>
              <div className={s.fullName}>AboutMe: {props.profile.aboutMe}</div>
              <ProfileData
                profile={props.profile}
                isOwner={props.isOwner}
                goEditMode={() => setEditMode(true)}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const ProfileData = ({ profile, isOwner, goEditMode }) => {
  const contactsObj = Object.keys(profile.contacts).map((key) => {
    return (
      <Contact
        key={key}
        contactTitle={key}
        contactValue={profile.contacts[key]}
      />
    );
  });

  return (
    <>
      {isOwner && <button onClick={goEditMode}>edit</button>}
      <div className={s.contactsList}>
        LookAjob: {profile.lookingForAJobDescription}
      </div>
      <div>
        <b>Contacts</b> {contactsObj}
      </div>
    </>
  );
};

export const Contact = ({ contactTitle, contactValue, contactFiled }) => {
  return (
    <div className={s.contactsObj}>
      <b>{contactTitle}</b> : {contactValue}
    </div>
  );
};

export default ProfileInfo;
