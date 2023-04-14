import { createSlice } from "@reduxjs/toolkit";

const dialogsSlice = createSlice({
  name: "dialogs",
  initialState: {
    dialogsData: [
      { name: "Anton", id: 1 },
      { name: "Krynkul", id: 2 },
      { name: "Vanek", id: 3 },
      { name: "Egr", id: 4 },
    ],

    messagesData: [
      { id: 1, message: "Hi" },
      { id: 2, message: "Hiii" },
      { id: 3, message: "How are u" },
      { id: 4, message: "Good" },
    ],
    newMessageText: "da",
  },
  reducers: {
    addMessage(state, action) {
      let text = state.newMessageText;
      return {
        ...state,
        newMessageText: "",
        messagesData: [
          ...state.messagesData,
          { id: Math.random(), message: text },
        ],
      };
    },
    updateMessageText(state, action) {
      return { ...state, newMessageText: action.payload.newText };
    },
  },
});

export const { addMessage, updateMessageText } = dialogsSlice.actions;
export default dialogsSlice.reducer;
