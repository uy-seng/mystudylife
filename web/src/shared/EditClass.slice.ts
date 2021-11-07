import { createSlice } from "@reduxjs/toolkit";
import { BatchParam, Param } from "../types";
import { RootState } from "../app/store";
import {
  ClassPayload,
  ClassSchedulePayload,
  OneOffSchedulePayload,
  RepeatSchedulePayload,
} from "./NewClass.slice";

export interface EditClassGlobalState {
  toBeUpdatedClassPayload: (ClassPayload & { id: string }) | undefined;
  toBeUpdatedClassSchedulePayload:
    | (ClassSchedulePayload & { id: string })
    | undefined;
  toBeUpdatedOneOffSchedulePayload:
    | (OneOffSchedulePayload & { id: string })
    | undefined;
  toBeUpdatedRepeatSchedules:
    | (RepeatSchedulePayload & { id: string })[]
    | undefined;
  toBeDeletedRepeatSchedules: (RepeatSchedulePayload & { id: string })[];
  newRepeatSchedules: RepeatSchedulePayload[];
}

const initialState: EditClassGlobalState = {
  toBeUpdatedClassPayload: undefined,
  toBeUpdatedClassSchedulePayload: undefined,
  toBeUpdatedOneOffSchedulePayload: undefined,
  toBeUpdatedRepeatSchedules: undefined,
  newRepeatSchedules: [],
  toBeDeletedRepeatSchedules: [],
};

export const EditClassSlice = createSlice({
  name: "EditClass",
  initialState,
  reducers: {
    setDefaultToBeUpdatedClassPayload: (
      state,
      params: { type: String; payload: ClassPayload & { id: string } }
    ) => {
      state.toBeUpdatedClassPayload = params.payload;
    },
    setToBeUpdatedClassPayload: (state, params: BatchParam<ClassPayload>) => {
      if (state.toBeUpdatedClassPayload)
        switch (params.payload.key) {
          case "academicYearId":
          case "subjectId":
            state.toBeUpdatedClassPayload[params.payload.key] =
              params.payload.value;
            break;
          default:
            state.toBeUpdatedClassPayload[params.payload.key] =
              params.payload.value;
            break;
        }
    },
    setDefaultToBeUpdatedClassSchedulePayload: (
      state,
      params: { type: String; payload: ClassSchedulePayload & { id: string } }
    ) => {
      state.toBeUpdatedClassSchedulePayload = params.payload;
    },
    setToBeUpdatedClassSchedulePayload: (
      state,
      params: BatchParam<ClassSchedulePayload>
    ) => {
      if (state.toBeUpdatedClassSchedulePayload)
        state.toBeUpdatedClassSchedulePayload[params.payload.key] =
          params.payload.value;
    },
    setDefaultToBeUpdatedOneOffSchedulePayload: (
      state,
      params: { type: String; payload: OneOffSchedulePayload & { id: string } }
    ) => {
      state.toBeUpdatedOneOffSchedulePayload = params.payload;
    },
    setToBeUpdatedOneOffSchedulePayload: (
      state,
      params: BatchParam<OneOffSchedulePayload>
    ) => {
      if (state.toBeUpdatedOneOffSchedulePayload)
        state.toBeUpdatedOneOffSchedulePayload[params.payload.key] =
          params.payload.value;
    },
    setDefaultToBeUpdatedRepeatSchedules: (
      state,
      params: {
        type: String;
        payload: (RepeatSchedulePayload & { id: string })[];
      }
    ) => {
      state.toBeUpdatedRepeatSchedules = params.payload;
    },
    setToBeUpdatedRepeatSchedules: (
      state,
      params: {
        type: String;
        payload: (RepeatSchedulePayload & { id: string })[];
      }
    ) => {
      state.toBeUpdatedRepeatSchedules = params.payload;
    },
    setDefaultToBeDeletedRepeatSchedules: (
      state,
      params: {
        type: String;
        payload: (RepeatSchedulePayload & { id: string })[];
      }
    ) => {
      state.toBeDeletedRepeatSchedules = params.payload;
    },
    setToBeDeletedRepeatSchedules: (
      state,
      params: {
        type: String;
        payload: (RepeatSchedulePayload & { id: string })[];
      }
    ) => {
      state.toBeDeletedRepeatSchedules = params.payload;
    },
    setNewRepeatSchedules: (
      state,
      params: {
        type: String;
        payload: RepeatSchedulePayload[];
      }
    ) => {
      state.newRepeatSchedules = params.payload;
    },
  },
});

export const selectToBeUpdatedClassPayload = (state: RootState) =>
  state.editclass.toBeUpdatedClassPayload;
export const selectToBeUpdatedClassSchedulePayload = (state: RootState) =>
  state.editclass.toBeUpdatedClassSchedulePayload;
export const selectToBeUpdatedOneOffSchedulePayload = (state: RootState) =>
  state.editclass.toBeUpdatedOneOffSchedulePayload;
export const selectToBeUpdatedRepeatSchedules = (state: RootState) =>
  state.editclass.toBeUpdatedRepeatSchedules;
export const selectToBeDeletedRepeatSchedules = (state: RootState) =>
  state.editclass.toBeDeletedRepeatSchedules;
export const selectNewRepeatSchedules = (state: RootState) =>
  state.editclass.newRepeatSchedules;

export const {
  setNewRepeatSchedules,
  setToBeUpdatedClassPayload,
  setToBeUpdatedClassSchedulePayload,
  setToBeUpdatedOneOffSchedulePayload,
  setToBeUpdatedRepeatSchedules,
  setDefaultToBeUpdatedClassPayload,
  setDefaultToBeUpdatedClassSchedulePayload,
  setDefaultToBeUpdatedOneOffSchedulePayload,
  setDefaultToBeUpdatedRepeatSchedules,
  setDefaultToBeDeletedRepeatSchedules,
  setToBeDeletedRepeatSchedules,
} = EditClassSlice.actions;

export default EditClassSlice.reducer;
