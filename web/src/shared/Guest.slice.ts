import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

type SignInMode = "social" | "email";
export interface GuestPageGlobalState {
  signInMode: SignInMode;
}

const initialState: GuestPageGlobalState = {
  signInMode: "social",
};

export const GuestPageSlice = createSlice({
  name: "guestpage",
  initialState,
  reducers: {
    changeSignInMode: (state, newSignInMode: PayloadAction<SignInMode>) => {
      state.signInMode = newSignInMode.payload;
    },
  },
});

export const { changeSignInMode } = GuestPageSlice.actions;

export const selectSignInMode = (state: RootState) =>
  state.guestpage.signInMode;

export default GuestPageSlice.reducer;
