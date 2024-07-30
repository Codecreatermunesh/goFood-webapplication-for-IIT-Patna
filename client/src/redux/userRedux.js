import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
    loadfailure: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    loadStart: (state) => {
      state.isFetching = true;
    },
    loadSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loadFailure: (state) => {
      state.isFetching = false;
      state.loadfailure = true;
    },


    loginOut: (state) => {
      state.currentUser=null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, loadStart, loadSuccess, loadFailure, loginOut } = userSlice.actions;
export default userSlice.reducer;