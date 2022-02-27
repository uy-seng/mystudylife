import { createSlice } from "@reduxjs/toolkit";
import { BatchParam } from "../types";
import { RootState } from "../app/store";

export interface CreateNewSubjectGlobalState {
  subjectPayload: SubjectPayload;
}

const initialState: CreateNewSubjectGlobalState = {
  subjectPayload: {
    name: "",
    academicYearId: undefined,
    termId: undefined,
  },
};

export const NewSubjectSlice = createSlice({
  name: "NewSubject",
  initialState,
  reducers: {
    setSubjectPayload: (state, params: BatchParam<SubjectPayload>) => {
      switch (params.payload.key) {
        case "name":
          state.subjectPayload[params.payload.key] = params.payload.value;
          break;
        case "academicYearId":
          state.subjectPayload[params.payload.key] = params.payload.value;
          break;
        case "termId":
          state.subjectPayload[params.payload.key] = params.payload.value;
          break;
        default:
          break;
      }
    },
    setSubjectPayloadToDefault: (state) => {
      state.subjectPayload = {
        name: "",
        academicYearId: undefined,
        termId: undefined,
      };
    },
  },
});

export const selectSubjectPayload = (state: RootState) =>
  state.newsubject.subjectPayload;

export const { setSubjectPayload, setSubjectPayloadToDefault } =
  NewSubjectSlice.actions;

export default NewSubjectSlice.reducer;

export interface SubjectPayload {
  name: string;
  academicYearId: string | undefined;
  termId: string | undefined;
}
