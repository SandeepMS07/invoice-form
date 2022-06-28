import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  name: string;
  email: string;
  phone: string;
  student_id: string;
  learncab_id: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  gst_number: string;
  payment_id: string;
  date: string;
  itemList: [];
}

const initialState: CounterState = {
  name: "",
  email: "",
  phone: "",
  student_id: "",
  learncab_id: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  country: "",
  gst_number: "",
  payment_id: "",
  date: "",
  itemList: [],
};

export const userSlice = createSlice({
  name: "detail",
  initialState,
  reducers: {
    update: (state, action: PayloadAction<any>) => {
      state.name += action.payload;
      state.email += action.payload;
      state.phone += action.payload;
      state.student_id += action.payload;
      state.learncab_id += action.payload;
      state.address += action.payload;
      state.city += action.payload;
      state.state += action.payload;
      state.pincode += action.payload;
      state.country += action.payload;
      state.gst_number += action.payload;
      state.payment_id += action.payload;
      state.date += action.payload;
      state.itemList += action.payload;
    },
    reset: (state) => {
      state.name = "";
      state.email = "";
      state.phone = "";
      state.student_id = "";
      state.learncab_id = "";
      state.address = "";
      state.city = "";
      state.state = "";
      state.pincode = "";
      state.country = "";
      state.gst_number = "";
      state.payment_id = "";
      state.date = "";
      state.itemList = [];
    },
  },
});

export const { update, reset } = userSlice.actions;
export default userSlice.reducer;
