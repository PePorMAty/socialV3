import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, updateMessageText } from "../../store/slices/dialogsSlice";
import Dialogs from "./Dialogs";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";

const DialogsContainer = () => {
  const messages = useSelector((state) => state.dialogs.messagesData);
  const dialogs = useSelector((state) => state.dialogs.dialogsData);
  const newMessageText = useSelector((state) => state.dialogs.newMessageText);
  const dispatch = useDispatch();

  const addMessageDispatch = (text) => {
    dispatch(addMessage({ text }));
  };

  const onMessageChange = (newText) => {
    dispatch(updateMessageText({ newText }));
  };

  return (
    <Dialogs
      newMessageText={newMessageText}
      messages={messages}
      dialogs={dialogs}
      addMessage={addMessageDispatch}
      updateMessageText={onMessageChange}
    />
  );
};

const AuthRedirectComponent = withAuthRedirect(DialogsContainer);

export default AuthRedirectComponent;
