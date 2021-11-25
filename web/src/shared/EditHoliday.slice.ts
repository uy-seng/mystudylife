import { createSlice } from "@reduxjs/toolkit";
import { BatchParam } from "../types";
import { RootState } from "../app/store";
import { HolidayPayload } from "./NewHoliday.slice";

export interface EditHolidayGlobalState {
  toBeUpdatedHolidayPayload: (HolidayPayload & { id: string }) | undefined;
}

const initialState: EditHolidayGlobalState = {
  toBeUpdatedHolidayPayload: undefined
};

export const EditHolidaySlice = createSlice({
  name: "EditHoliday",
  initialState,
  reducers: {
    setToBeUpdatedHolidayPayload: (
      state,
      params: BatchParam<HolidayPayload>
    ) => {
      if (state.toBeUpdatedHolidayPayload) {
        switch (params.payload.key) {
          case "academicYearId":
            state.toBeUpdatedHolidayPayload[params.payload.key] =
              params.payload.value;
            break;
          default:
            state.toBeUpdatedHolidayPayload[params.payload.key] =
              params.payload.value;
            break;
        }
      }
    },
    setDefaultToBeUpdatedHolidayPayload: (
      state,
      params: {
        type: string;
        payload: HolidayPayload & { id: string };
      }
    ) => {
      state.toBeUpdatedHolidayPayload = params.payload;
    }
  }
});

export const selectToBeUpdatedHolidayPayload = (state: RootState) =>
  state.editholiday.toBeUpdatedHolidayPayload;

export const {
  setToBeUpdatedHolidayPayload,
  setDefaultToBeUpdatedHolidayPayload
} = EditHolidaySlice.actions;

export default EditHolidaySlice.reducer;
