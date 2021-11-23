import { createSlice } from "@reduxjs/toolkit";
import { BatchParam } from "../types";
import { RootState } from "../app/store";
import { Maybe } from "type-graphql";
import { Term } from "../generated/graphql";

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
  selectedYear: AcademicYearResult | null;
  selectedTerm: Term | null;
  academicYears: AcademicYearResult[];
}

interface AcademicYearResult {
  __typename?: "AcademicYear";
  id: string;
  startDate: string;
  endDate: string;
  terms: Array<Term>;
  schedule: {
    __typename?: "AcademicYearSchedule";
    id: string;
    type: string;
    dayRotation?: Maybe<{
      __typename?: "DayRotationSchedule";
      id: string;
      numOfDay: number;
      startDay: number;
      repeatDays: Array<number>;
    }>;
    weekRotation?: Maybe<{
      __typename?: "WeekRotationSchedule";
      id: string;
      numOfWeek: number;
      startWeek: number;
    }>;
  };
}
