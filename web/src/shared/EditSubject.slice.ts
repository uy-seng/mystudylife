import { createSlice } from "@reduxjs/toolkit";
import { BatchParam } from "../types";
import { RootState } from "../app/store";
import { SubjectPayload } from "./NewSubject.slice";

export interface EditSubjectGlobalState {
  toBeUpdatedSubjectPayload: (SubjectPayload & { id: string }) | undefined;
}

const initialState: EditSubjectGlobalState = {
  toBeUpdatedSubjectPayload: undefined
};

export const EditSubjectSlice = createSlice({
  name: "EditSubject",
  initialState,
  reducers: {
    setToBeUpdatedSubjectPayload: (
      state,
      params: BatchParam<SubjectPayload>
    ) => {
      if (state.toBeUpdatedSubjectPayload) {
        switch (params.payload.key) {
          case "name":
            state.toBeUpdatedSubjectPayload[params.payload.key] =
              params.payload.value;
            break;
          case "academicYearId":
            state.toBeUpdatedSubjectPayload[params.payload.key] =
              params.payload.value;
            break;
          case "termId":
            state.toBeUpdatedSubjectPayload[params.payload.key] =
              params.payload.value;
            break;
          default:
            break;
        }
      }
    },
    setDefaultToBeUpdatedSubjectPayload: (
      state,
      params: { type: string; payload: SubjectPayload & { id: string } }
    ) => {
      state.toBeUpdatedSubjectPayload = params.payload;
    }
  }
});

export const selectToBeUpdatedSubjectPayload = (state: RootState) =>
  state.editsubject.toBeUpdatedSubjectPayload;

export const {
  setToBeUpdatedSubjectPayload,
  setDefaultToBeUpdatedSubjectPayload
} = EditSubjectSlice.actions;

export default EditSubjectSlice.reducer;
