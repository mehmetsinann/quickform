import { configureStore } from "@reduxjs/toolkit";
import answerSlice from "./slices/answerSlice";
import dashboardSlice from "./slices/dashboardSlice";
import stepSlice from "./slices/stepSlice";
import userSlice from "./slices/userSlice";

const store = configureStore({
  reducer: {
    step: stepSlice.reducer,
    user: userSlice.reducer,
    answer: answerSlice.reducer,
    dashboard: dashboardSlice.reducer,
  },
});

export default store;
