const { createSlice } = require("@reduxjs/toolkit");

export const authSlice = createSlice({
  name: "auth",
  initialState: { userToken: "" },
  reducers: {
    logIn(state, actions) {
      console.log("login!!!");
      state.userToken = actions.payload;
    },
    logOut(state) {},
  },
});

export const authActions = authSlice.actions;
