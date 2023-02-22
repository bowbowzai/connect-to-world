import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

// Define a type for the slice state
interface AuthState {
  token: string;
}

// Define the initial state using that type
const initialState: AuthState = {
  token: "",
};

export const authSlice = createSlice({
  name: "counter",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
});

export const {} = authSlice.actions;
export default authSlice.reducer;
