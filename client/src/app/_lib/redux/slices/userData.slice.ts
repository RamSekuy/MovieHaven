/** @format */

import { createSlice } from "@reduxjs/toolkit";
import { IUser, IAdmin } from "@/app/_model/user.model";

const initialState: IUser | IAdmin = {};

const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUserData: (
      state,
      action: { payload: IUser | IAdmin | undefined; type: string }
    ) => {
      if (!action.payload) {
        state = {};
      } else {
        state = { ...state, ...action.payload };
      }
      return state;
    },
  },
});

export default userDataSlice;
