import { createSlice } from "@reduxjs/toolkit";
import { BatchParam } from "../types";
import { RootState } from "../app/store";

export interface CreateNewClasstGlobalState {
  classPayload: ClassPayload;
}

const initialState: CreateNewClasstGlobalState = {
  classPayload: {
    name: "",
    academicYearId: undefined,
  },
};

export const NewClassSlice = createSlice({
  name: "NewClass",
  initialState,
  reducers: {
    setClassPayload: (state, params: BatchParam<ClassPayload>) => {},
  },
});

export const selectClassPayload = (state: RootState) =>
  state.newclass.classPayload;

export const { setClassPayload } = NewClassSlice.actions;

export default NewClassSlice.reducer;

export interface ClassPayload {
  subjectId: string;
  academicYearId: string | undefined;
  module: string;
  room: string;
  building: string;
  teacher: string;
}
