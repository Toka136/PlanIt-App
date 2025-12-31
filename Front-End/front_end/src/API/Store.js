import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import { tasksSlice } from "./tasksSlice";

export const store = configureStore({
  reducer: {
    [authSlice.reducerPath]: authSlice.reducer,
    [tasksSlice.reducerPath]: tasksSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authSlice.middleware)
      .concat(tasksSlice.middleware),
});
