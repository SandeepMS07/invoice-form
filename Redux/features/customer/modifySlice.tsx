import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

interface ModifyState {
  id: string;
  phone_number: string;
}

const initialState: ModifyState = {
  id: "",
  phone_number: "",
};

export const modifySlice = createSlice({
  name: "modify",
  initialState,
  reducers: {
    update: (state, action: PayloadAction<any>) => {
      state.id += action.payload;
      state.phone_number += action.payload;
    },
  },
});

export const { update } = modifySlice.actions;
// export const selectCount = (state: RootState) => state.modify;

export default modifySlice.reducer;
