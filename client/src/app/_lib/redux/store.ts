/** @format */

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import selectTicketSlice from "./slices/selectTicket.slice";
import userDataSlice from "./slices/userData.slice";

export const store = configureStore({
  reducer: {
    selectTicket:selectTicketSlice,
    userData:userDataSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;