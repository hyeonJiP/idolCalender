import { reportSchedulesSlice } from "./reportSchedules";

const { configureStore } = require("@reduxjs/toolkit");
const { authSlice } = require("./auth");

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    reportSchedule: reportSchedulesSlice.reducer,
  },
});

export default store;
