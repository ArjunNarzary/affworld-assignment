import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "./services/apiSlice"
import authReducer from "./services/auth/authSlice"
import taskReducer from "./services/task/taskSlice"

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    task: taskReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),
})
