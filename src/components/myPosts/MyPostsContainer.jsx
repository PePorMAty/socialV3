import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, updateNewPostText } from "../../store/slices/profileSlice";
import MyPosts from "./MyPosts";

const MyPostsContainer = (props) => {
  const posts = useSelector((state) => state.profile.postData);
  const postValue = useSelector((state) => state.profile.newPostText);
  const dispatch = useDispatch();

  const addPostDispatch = (text) => {
    dispatch(addPost({ text }));
  };

  const onPostChange = (newText) => {
    dispatch(updateNewPostText({ newText }));
  };

  return (
    <MyPosts
      updateNewPostText={onPostChange}
      addPost={addPostDispatch}
      posts={posts}
      postValue={postValue}
      profile={props.profile}
    />
  );
};

export default MyPostsContainer;
