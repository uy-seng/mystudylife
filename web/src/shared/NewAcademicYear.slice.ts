import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BatchParam } from "../types";
import { RootState } from "../app/store";
import { formatDate } from "../utils";
import { AcademicYearScheduleType } from "../generated/graphql";

export interface CreateNewAcademicYearGlobalState {
  academicYearPayload: AcademicYearPayload;
  academicYearSchedulePayload: AcademicYearSchedulePayload;
  weekRotationPayload: WeekRotationPayload;
  dayRotationPayload: DayRotationPayload;
  createTermComponentState: {
    active: boolean;
    payload: TermPayload;
    terms: TermPayload[];
  };
  refreshCounter: number;
  editTermPayload: TermPayload | undefined;
}

const initialState: CreateNewAcademicYearGlobalState = {
  createTermComponentState: {
    active: false,
    payload: {
      id: undefined,
      name: "",
      startDate: formatDate(new Date()),
      endDate: formatDate(
        new Date(new Date().setMonth(new Date().getMonth() + 1))
      ),
    },
    terms: [],
  },
  editTermPayload: undefined,
  academicYearSchedulePayload: {
    type: "fixed",
  },
  academicYearPayload: {
    startDate: formatDate(new Date()),
    endDate: formatDate(
      new Date(new Date().setMonth(new Date().getMonth() + 6))
    ),
  },
  weekRotationPayload: {
    numOfWeek: 2,
    startWeek: 1,
  },
  dayRotationPayload: {
    numOfDay: 2,
    startDay: 1,
    repeatDays: [],
  },
  refreshCounter: 0,
};

export const NewAcademicYearSlice = createSlice({
  name: "NewAcademicYear",
  initialState,
  reducers: {
    setAcademicYearPayload: (
      state,
      params: BatchParam<AcademicYearPayload>
    ) => {
      state.academicYearPayload[params.payload.key] = params.payload.value;
    },
    setAcademicYearSchedulePayload: (
      state,
      params: BatchParam<AcademicYearSchedulePayload>
    ) => {
      state.academicYearSchedulePayload[params.payload.key] =
        params.payload.value;
    },
    setWeekRotationPayload: (
      state,
      params: BatchParam<WeekRotationPayload>
    ) => {
      state.weekRotationPayload[params.payload.key] = params.payload.value;
    },
    setDayRotationPayload: (state, params: BatchParam<DayRotationPayload>) => {
      switch (params.payload.key) {
        case "numOfDay":
        case "startDay":
          state.dayRotationPayload[params.payload.key] = params.payload.value;
          break;
        case "repeatDays":
          state.dayRotationPayload[params.payload.key] = params.payload.value;
          break;
      }
    },
    setTermPayload: (state, params: BatchParam<TermPayload>) => {
      switch (params.payload.key) {
        case "id":
          state.createTermComponentState.payload[params.payload.key] =
            params.payload.value;
          break;
        case "name":
        case "startDate":
        case "endDate":
          state.createTermComponentState.payload[params.payload.key] =
            params.payload.value;
          break;
      }
    },
    showCreateTermComponent: (state) => {
      state.createTermComponentState.active = true;
    },
    hideCreateTermComponent: (state) => {
      state.createTermComponentState.active = false;
    },
    setTerms: (state, newTerms: PayloadAction<TermPayload[]>) => {
      state.createTermComponentState.terms = newTerms.payload;
    },
    setTermsToDefault: (state) => {
      state.createTermComponentState.terms = [];
    },
    setTermPayloadToDefault: (state) => {
      state.createTermComponentState.payload.name = "";
      const endDate = new Date(state.createTermComponentState.payload.endDate);
      const newStartDate = new Date(endDate.setDate(endDate.getDate() + 15));
      state.createTermComponentState.payload.startDate =
        formatDate(newStartDate);
      state.createTermComponentState.payload.endDate = formatDate(
        new Date(newStartDate.setMonth(newStartDate.getMonth() + 1))
      );
    },
    rerenderNewAcademicYearComponent: (state) => {
      state.refreshCounter += 1;
    },
    setDefaultEditTermPayload: (
      state,
      params: PayloadAction<TermPayload | undefined>
    ) => {
      state.editTermPayload = params.payload;
    },
    setEditTermPayload: (state, params: BatchParam<TermPayload>) => {
      if (state.editTermPayload) {
        switch (params.payload.key) {
          case "id":
            state.editTermPayload[params.payload.key] = params.payload.value;
            break;
          case "name":
          case "startDate":
          case "endDate":
            state.editTermPayload[params.payload.key] = params.payload.value;
            break;
        }
      }
    },
  },
});

export const selectAcademicYearPayload = (state: RootState) =>
  state.newacademicyear.academicYearPayload;
export const selectAcademicYearSchedulePayload = (state: RootState) =>
  state.newacademicyear.academicYearSchedulePayload;
export const selectWeekRotationPayload = (state: RootState) =>
  state.newacademicyear.weekRotationPayload;
export const selectDayRotationPayload = (state: RootState) =>
  state.newacademicyear.dayRotationPayload;
export const selectCreateTermComponentState = (state: RootState) =>
  state.newacademicyear.createTermComponentState;
export const selectAcademicYearComponentRefreshCounter = (state: RootState) =>
  state.newacademicyear.refreshCounter;
export const selectEditTermPayload = (state: RootState) =>
  state.newacademicyear.editTermPayload;

export const {
  showCreateTermComponent,
  hideCreateTermComponent,
  setAcademicYearPayload,
  setAcademicYearSchedulePayload,
  setTermPayload,
  setDayRotationPayload,
  setWeekRotationPayload,
  rerenderNewAcademicYearComponent,
  setDefaultEditTermPayload,
  setEditTermPayload,
  setTermsToDefault,
  setTerms,
  setTermPayloadToDefault,
} = NewAcademicYearSlice.actions;

export default NewAcademicYearSlice.reducer;

export interface AcademicYearPayload {
  startDate: string;
  endDate: string;
}

export interface AcademicYearSchedulePayload {
  type: AcademicYearScheduleType;
}

export interface WeekRotationPayload {
  numOfWeek: number;
  startWeek: number;
}

export interface DayRotationPayload {
  numOfDay: number;
  startDay: number;
  repeatDays: number[];
}

export interface TermPayload {
  id: string | undefined;
  name: string;
  startDate: string;
  endDate: string;
}
