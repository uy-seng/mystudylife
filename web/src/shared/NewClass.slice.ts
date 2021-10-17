import { createSlice } from "@reduxjs/toolkit";
import { BatchParam } from "../types";
import { RootState } from "../app/store";
import { ClassScheduleType } from "../generated/graphql";
import { formatDate } from "../utils";

export interface CreateNewClasstGlobalState {
  classPayload: ClassPayload;
  classSchedulePayload: ClassSchedulePayload;
  oneOffSchedulePayload: OneOffSchedulePayload;
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
    startTime: "",
    endTime: "",
  },
};

export const NewClassSlice = createSlice({
  name: "NewClass",
  initialState,
  reducers: {
    setClassPayload: (state, params: BatchParam<ClassPayload>) => {},
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
  },
});

export const selectClassPayload = (state: RootState) =>
  state.newclass.classPayload;
export const selectClassSchedulePayload = (state: RootState) =>
  state.newclass.classSchedulePayload;

export const {
  setClassPayload,
  setClassSchedulePayload,
  setOneOffSchedulePayload,
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
  type: string;
}

export interface OneOffSchedulePayload {
  date: string;
  startTime: string;
  endTime: string;
}
