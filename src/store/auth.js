const { createSlice } = require("@reduxjs/toolkit");

export const authSlice = createSlice({
  name: "auth",
  initialState: { isLogin: false },
  reducers: {
    logIn(state, actions) {
      state.isLogin = actions.payload;
    },
    logOut(state, actions) {
      state.isLogin = actions.payload;
    },
  },
});

export const authActions = authSlice.actions;
