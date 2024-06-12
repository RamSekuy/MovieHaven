/** @format */

import { createSlice } from "@reduxjs/toolkit";
import { ITicket } from "@/app/_model/ticket.model";
import { ISeat } from "@/app/_model/seat.model";

interface ITicketSeat extends ITicket {
  seat: ISeat;
}

interface IState {
  studioId?: number;
  time?: Date;
  tickets: ITicketSeat[];
}

const initialState: IState = {
  studioId: undefined,
  time: undefined,
  tickets: [],
};

export const selectTicket = createSlice({
  name: "selectTicket",
  initialState,
  reducers: {
    setSelectTicket: (
      state,
      action: { payload: IState | undefined; type: string }
    ) => {
      if (action.payload) {
        state = { ...state, ...action.payload };
        return state;
      } else {
        state = initialState;
        return state;
      }
    },
  },
});

export const { setSelectTicket } = selectTicket.actions;
export default selectTicket.reducer;
