/** @format */

import { createSlice } from "@reduxjs/toolkit";
import { ITicket } from "@/app/_model/ticket.model";

interface ITicketSeat extends ITicket {
  seat: ISeat;
}

interface IState {
  studioId?: number;
  time?: Date;
  tickets: ITicketSeat[];
}

const initialState: IState = {
  studioId: 0,
  time: new Date(),
  tickets: [],
};

export const selectTicket = createSlice({
  name: "selectTicket",
  initialState,
  reducers: {
    setSelectTicket: (state, action) => {
      console.log(action.payload);

      if (!action.payload) {
        state = { tickets: [] };
      } else {
        state = { ...state, ...action.payload };
      }
      return state;
    },
  },
});

export const { setSelectTicket } = selectTicket.actions;
export default selectTicket.reducer;
