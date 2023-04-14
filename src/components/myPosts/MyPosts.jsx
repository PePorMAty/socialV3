import React, { useRef } from "react";
import s from "./MyPosts.module.scss";
import Post from "./Post/Post";

const MyPosts = (props) => {
  const ref = useRef();

  const postElements = props.posts.map((item) => (
    <Post
      message={item.message}
      likesCount={item.likesCount}
      id={item.id}
      key={item.id}
      profile={props.profile}
    />
  ));

  const addPostDispatch = () => {
    let text = ref.current.value;
    if (ref.current.value === "") {
      text = null;
    } else {
      props.addPost(text);
    }
  };

  const onPostChange = () => {
    let newText = ref.current.value;
    props.updateNewPostText(newText);
  };

  return (
    <div className={s.posts}>
      My posts
      <div className={s.wrapper}>
        <textarea
          className={s.area}
          ref={ref}
          onChange={onPostChange}
          value={props.postValue}
        ></textarea>
        <button className={s.btn} onClick={addPostDispatch}>
          Add post
        </button>
      </div>
      <div className={s.postsList}>{postElements}</div>
    </div>
  );
};

export default MyPosts;
