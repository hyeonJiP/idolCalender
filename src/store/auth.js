import { removeCookie, setCookie } from "../cookie/cookie";
import moment from "moment";

const { createSlice } = require("@reduxjs/toolkit");

export const authSlice = createSlice({
  name: "auth",
  initialState: { usersSessionId: "", userCsrfToken: "" },
  reducers: {
    logIn(state, actions) {
      state.usersSessionId = actions.payload;
    },
    logOut(state) {
      // removeCookie("sessionid");
      // removeCookie("csrftoken");
      state.usersSessionId = "";
      state.userCsrfToken = "";
      console.log();
    },
  },
});

export const authActions = authSlice.actions;
