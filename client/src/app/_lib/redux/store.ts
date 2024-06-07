/** @format */

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import selectTicketSlice from "./slices/selectTicket.slice";

export const store = configureStore({
  reducer: {
    selectTicket:selectTicketSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;