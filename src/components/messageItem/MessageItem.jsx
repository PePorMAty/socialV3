import React from "react";
import s from "./MessageItem.module.scss";

const MessageItem = (props) => {
  return <div className={s.message}>{props.message}</div>;
};

export default MessageItem;
