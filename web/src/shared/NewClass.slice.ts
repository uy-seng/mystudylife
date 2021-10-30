import { createSlice } from "@reduxjs/toolkit";
import { BatchParam, Param } from "../types";
import { RootState } from "../app/store";
import { formatDate } from "../utils";
import { ClassScheduleType, DayOfWeek } from "../generated/graphql";

export interface CreateNewClasstGlobalState {
  classPayload: ClassPayload;
  classSchedulePayload: ClassSchedulePayload;
  oneOffSchedulePayload: OneOffSchedulePayload;
  repeatSchedules: RepeatSchedulePayload[];
}

const initialState: CreateNewClasstGlobalState = {
  classPayload: {
    name: "",
    academicYearId: undefined,
    subjectId: undefined,
    module: "",
    room: "",
    building: "",
    teacher: "",
  },
  classSchedulePayload: {
    type: "oneOff",
  },
  oneOffSchedulePayload: {
    date: formatDate(new Date()),
    startTime: "08:00",
    endTime: "09:50",
  },
  repeatSchedules: [],
};

export const NewClassSlice = createSlice({
  name: "NewClass",
  initialState,
  reducers: {
    setClassPayload: (state, params: BatchParam<ClassPayload>) => {
      switch (params.payload.key) {
        case "academicYearId":
        case "subjectId":
          state.classPayload[params.payload.key] = params.payload.value;
          break;
        default:
          state.classPayload[params.payload.key] = params.payload.value;
          break;
      }
    },
    setClassSchedulePayload: (
      state,
      params: BatchParam<ClassSchedulePayload>
    ) => {
      state.classSchedulePayload[params.payload.key] = params.payload.value;
    },
    setOneOffSchedulePayload: (
      state,
      params: BatchParam<OneOffSchedulePayload>
    ) => {
      state.oneOffSchedulePayload[params.payload.key] = params.payload.value;
    },
    setRepeatSchedules: (
      state,
      repeatSchedule: Param<RepeatSchedulePayload[]>
    ) => {
      state.repeatSchedules = repeatSchedule.payload;
    },
  },
});

export const selectClassPayload = (state: RootState) =>
  state.newclass.classPayload;
export const selectClassSchedulePayload = (state: RootState) =>
  state.newclass.classSchedulePayload;
export const selectOneOffSchedulePayload = (state: RootState) =>
  state.newclass.oneOffSchedulePayload;
export const selectRepeatSchedules = (state: RootState) =>
  state.newclass.repeatSchedules;

export const {
  setClassPayload,
  setClassSchedulePayload,
  setOneOffSchedulePayload,
  setRepeatSchedules,
} = NewClassSlice.actions;

export default NewClassSlice.reducer;

export interface ClassPayload {
  subjectId: string | undefined;
  academicYearId: string | undefined;
  module: string;
  room: string;
  building: string;
  teacher: string;
  name: string;
}

export interface ClassSchedulePayload {
  type: ClassScheduleType;
}

export interface OneOffSchedulePayload {
  date: string;
  startTime: string;
  endTime: string;
}

export interface RepeatSchedulePayload {
  days: DayOfWeek[];
  startTime: string;
  endTime: string;
  rotationWeek?: number;
}
