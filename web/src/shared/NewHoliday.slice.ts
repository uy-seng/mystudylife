import { createSlice } from "@reduxjs/toolkit";
import { BatchParam } from "../types";
import { RootState } from "../app/store";
import { formatDate } from "../utils";

export interface CreateNewHolidayGlobalState {
  holidayPayload: HolidayPayload;
}

const initialState: CreateNewHolidayGlobalState = {
  holidayPayload: {
    name: "",
    academicYearId: undefined,
    startDate: formatDate(new Date()),
    endDate: formatDate(new Date())
  }
};

export const NewHolidaySlice = createSlice({
  name: "NewHoliday",
  initialState,
  reducers: {
    setHolidayPayload: (state, params: BatchParam<HolidayPayload>) => {
      switch (params.payload.key) {
        case "academicYearId":
          state.holidayPayload[params.payload.key] = params.payload.value;
          break;
        default:
          state.holidayPayload[params.payload.key] = params.payload.value;
          break;
      }
    },
    setHolidayPayloadToDefault: (state) => {
      state.holidayPayload = {
        academicYearId: undefined,
        name: "",
        startDate: formatDate(new Date()),
        endDate: formatDate(new Date())
      };
    }
  }
});

export const selectHolidayPayload = (state: RootState) =>
  state.newholiday.holidayPayload;

export const { setHolidayPayload, setHolidayPayloadToDefault } =
  NewHolidaySlice.actions;

export default NewHolidaySlice.reducer;

export interface HolidayPayload {
  name: string;
  academicYearId: string | undefined;
  startDate: string;
  endDate: string;
}
