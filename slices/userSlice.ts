import { user } from './../utils/user.d';
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";



export interface CounterState {
  value: user;
}

const initialState: CounterState = {
  value: {},
  
};


export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    initUser: (state, action: PayloadAction<user>) => {
      state.value = action.payload;
    },
    changeUser: (state, action: PayloadAction<user>) => {
      state.value = action.payload;
    }

  },
});

// Action creators are generated for each case reducer function
export const { initUser, changeUser } = userSlice.actions;

export default userSlice.reducer;
