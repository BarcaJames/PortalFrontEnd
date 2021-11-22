import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
};

export const currentUserSlice = createSlice({
  name: "currentUserData",
  initialState,
  reducers: {
    addCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },

    resetCurrentUser: (state) => {
      state.currentUser = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addCurrentUser, resetCurrentUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;
