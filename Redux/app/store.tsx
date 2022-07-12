import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import modifyReducer from "../features/customer/modifySlice"

export const store = configureStore({
  reducer: {
    detail: userReducer,
    modify: modifyReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
