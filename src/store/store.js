import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import selectedUserSlice from "../features/user/selectedUserSlice";
import currentUserSlice from "../features/user/currentUserSlice";
import { userApi } from "./UserApi";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    selectedUser: selectedUserSlice,
    currentUser: currentUserSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

setupListeners(store.dispatch);
