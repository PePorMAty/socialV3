import React, { useRef } from "react";
import s from "./Dialogs.module.scss";
import DialogItem from "../../components/dialogsItem/DialogItem";
import MessageItem from "./../../components/messageItem/MessageItem";

const Dialogs = (props) => {
  const dialogsElements = props.dialogs.map((item) => (
    <DialogItem name={item.name} id={item.id} key={item.id} />
  ));
  const messagesElements = props.messages.map((item) => (
    <MessageItem message={item.message} id={item.id} key={item.id} />
  ));

  const ref = useRef();

  const addMessageDispatch = () => {
    let text = ref.current.value;
    if (ref.current.value === "") {
      text = null;
    } else {
      props.addMessage(text);
    }
  };

  const onMessageChange = () => {
    let newText = ref.current.value;
    props.updateMessageText(newText);
  };

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogsElements}</div>
      <div className={s.messagesItems}>
        {messagesElements}
        <div className={s.areaWrapper}>
          <textarea
            className={s.area}
            ref={ref}
            value={props.newMessageText}
            onChange={onMessageChange}
          ></textarea>
          <button className={s.btn} onClick={addMessageDispatch}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dialogs;
