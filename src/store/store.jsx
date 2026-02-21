import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.jsx";
import { api } from "./api.jsx";

export const store = configureStore({
    
  reducer: {
    auth: authReducer,
    [api.reducerPath]: api.reducer,
  },
  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
    
});