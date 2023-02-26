import { configureStore } from "@reduxjs/toolkit";
import answerSlice from "./slices/answerSlice";

import stepSlice from "./slices/stepSlice";
import userSlice from "./slices/userSlice";

const store = configureStore({
  reducer: {
    step: stepSlice.reducer,
    user: userSlice.reducer,
    answer: answerSlice.reducer,
  },
});

export default store;
