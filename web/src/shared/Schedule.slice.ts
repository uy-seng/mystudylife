import { createSlice } from "@reduxjs/toolkit";
import { BatchParam } from "../types";
import { RootState } from "../app/store";
import { Maybe } from "type-graphql";
import {
  GetAcademicYearQueryResult,
  GetAcademicYearsQuery,
  Term
} from "../generated/graphql";

export interface ScheduleGlobalState {
  scheduleComponentState: ScheduleComponentState;
}

const initialState: ScheduleGlobalState = {
  scheduleComponentState: {
    selectedYear: null,
    academicYears: [],
    selectedTerm: null
  }
};

export const ScheduleSlice = createSlice({
  name: "Schedule",
  initialState,
  reducers: {
    setScheduleComponentState: (
      state,
      params: BatchParam<ScheduleComponentState>
    ) => {
      switch (params.payload.key) {
        case "selectedYear":
          state.scheduleComponentState[params.payload.key] =
            params.payload.value;
          break;
        case "selectedTerm":
          state.scheduleComponentState[params.payload.key] =
            params.payload.value;
          break;
        case "academicYears":
          state.scheduleComponentState[params.payload.key] =
            params.payload.value;
          break;
        default:
          break;
      }
    }
  }
});

export const selectScheduleComponentState = (state: RootState) =>
  state.schedule.scheduleComponentState;

export const { setScheduleComponentState } = ScheduleSlice.actions;

export default ScheduleSlice.reducer;

export interface ScheduleComponentState {
  selectedYear: GetAcademicYearsQuery["getAcademicYears"][0] | null;
  selectedTerm: Term | null;
  academicYears: GetAcademicYearsQuery["getAcademicYears"];
}
