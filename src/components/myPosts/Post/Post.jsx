import React from "react";
import s from "./Post.module.scss";
import ava from "../../../assets/P7c0Kkw.png";

const Post = (props) => {
  return (
    <div className={s.post}>
      <div className={s.wrapper}>
        <img
          className={s.avatar}
          src={
            props.profile.photos.small != null
              ? props.profile.photos.small
              : ava
          }
          alt="ava"
        />
        <p className="">{props.message}</p>
      </div>

      <div className="">
        <span className={s.like}>Like</span>
        {props.likesCount}
      </div>
    </div>
  );
};

export default Post;
