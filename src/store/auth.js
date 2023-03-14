const { createSlice } = require("@reduxjs/toolkit");

export const authSlice = createSlice({
  name: "auth",
  initialState: { isLogin: false, userCsrfToken: "" },
  reducers: {
    logIn(state, actions) {
      console.log(actions.payload);
      state.isLogin = true;
      state.userCsrfToken = actions.payload.userCsrfToken;
    },
    logOut(state) {
      state.isLogin = false;
      state.userCsrfToken = "";
    },
  },
});

export const authActions = authSlice.actions;
