const { configureStore } = require("@reduxjs/toolkit");
const { authSlice } = require("./auth");

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export default store;
