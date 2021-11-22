import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
};

export const selectedUserSlice = createSlice({
  name: "selectedUserData",
  initialState,
  reducers: {
    addSelectedUser: (state, action) => {
      let { allUsers, selectedUserId } = action.payload;
      let user = allUsers.filter((user) => user.userId === selectedUserId);
      // console.log("shouldState --->", user[0]);
      state.user = user[0];
    },

    resetSelectedUser: (state) => {
      state.user = {};
    },
  },
});

// Action creators are generated for each case reducer function
export const { addSelectedUser, resetSelectedUser } = selectedUserSlice.actions;

export default selectedUserSlice.reducer;
