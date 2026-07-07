import { createSlice } from "@reduxjs/toolkit";
import { LIVE_CHAT_COUNT } from "./constant";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.splice(LIVE_CHAT_COUNT, 1); // remove the last message if the array length is greater than LIVE_CHAT_COUNT
      state.messages.push(action.payload);
      // state.messages.unshift(action.payload); // add message to the beginning of the array, msg on live chat will go from bottom to top
    },
  },
});

export const { addMessage } = chatSlice.actions;
export default chatSlice.reducer;