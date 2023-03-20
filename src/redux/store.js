import { configureStore } from "@reduxjs/toolkit";
import answerSlice from "./slices/answerSlice";
import userSlice from "./slices/userSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    answer: answerSlice.reducer,
  },
});

export default store;
