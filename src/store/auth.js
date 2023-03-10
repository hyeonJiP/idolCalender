import { removeCookie, setCookie } from "../cookie/cookie";
import moment from "moment";

const { createSlice } = require("@reduxjs/toolkit");

export const authSlice = createSlice({
  name: "auth",
  initialState: { userToken: "" },
  reducers: {
    logIn(state, actions) {
      const expiresTime = moment().add("10", "m").toDate();
      setCookie("userToken", actions.payload, { expires: expiresTime });
      state.userToken = actions.payload;
    },
    logOut(state) {
      removeCookie("userToken");
      state.userToken = null;
    },
  },
});

export const authActions = authSlice.actions;
