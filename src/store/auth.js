const { createSlice } = require("@reduxjs/toolkit");

const initialData = { pick: null, is_admin: null };

export const authSlice = createSlice({
  name: "auth",
  initialState: { authState: initialData },
  reducers: {
    logIn(state, actions) {
      state.authState = actions.payload;
    },
    logOut(state) {
      state.authState = initialData;
    },
  },
});

export const authActions = authSlice.actions;
