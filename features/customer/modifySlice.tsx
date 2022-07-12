import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

interface ModifyState {
  id: string;
}

const initialState: ModifyState = {
  id: "",
};

export const modifySlice = createSlice({
  name: "modify",
  initialState,
  reducers: {},
});

export default modifySlice.reducer;
