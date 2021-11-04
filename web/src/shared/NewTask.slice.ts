import { createSlice } from "@reduxjs/toolkit";
import { BatchParam } from "../types";
import { RootState } from "../app/store";
import { TaskType } from "../generated/graphql";
import { formatDate } from "../utils";

export interface CreateNewTaskGlobalState {
  taskPayload: TaskPayload;
}

const initialState: CreateNewTaskGlobalState = {
  taskPayload: {
    academicYearId: undefined,
    detail: "",
    due_date: formatDate(new Date()),
    subjectId: undefined,
    title: "",
    type: "assignment",
  },
};

export const NewTaskSlice = createSlice({
  name: "NewTask",
  initialState,
  reducers: {
    setTaskPayload: (state, params: BatchParam<TaskPayload>) => {
      switch (params.payload.key) {
        case "type":
          state.taskPayload[params.payload.key] = params.payload.value;
          break;
        case "academicYearId":
        case "subjectId":
          state.taskPayload[params.payload.key] = params.payload.value;
          break;
        default:
          state.taskPayload[params.payload.key] = params.payload.value;
          break;
      }
    },
    setTaskPayloadToDefault: (state) => {
      state.taskPayload = {
        ...state.taskPayload,
        academicYearId: undefined,
        detail: "",
        due_date: formatDate(new Date()),
        title: "",
        type: "assignment",
      };
    },
  },
});

export const selectTaskPayload = (state: RootState) =>
  state.newtask.taskPayload;

export const { setTaskPayload, setTaskPayloadToDefault } = NewTaskSlice.actions;

export default NewTaskSlice.reducer;

export interface TaskPayload {
  title: string;
  detail: string;
  due_date: string;
  type: TaskType;
  subjectId: string | undefined;
  academicYearId: string | undefined;
}
